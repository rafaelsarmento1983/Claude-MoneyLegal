package com.moneylegal.auth.service;

import com.moneylegal.auth.dto.*;
import com.moneylegal.auth.entity.RefreshToken;
import com.moneylegal.auth.entity.User;
import com.moneylegal.auth.repository.RefreshTokenRepository;
import com.moneylegal.auth.repository.UserRepository;
import com.moneylegal.exception.BadRequestException;
import com.moneylegal.exception.UnauthorizedException;
import com.moneylegal.security.JwtTokenProvider;
import com.moneylegal.tenant.entity.Tenant;
import com.moneylegal.tenant.entity.TenantMember;
import com.moneylegal.tenant.repository.TenantMemberRepository;
import com.moneylegal.tenant.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Implementação do AuthService
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final TenantRepository tenantRepository;
    private final TenantMemberRepository tenantMemberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    private static final int REFRESH_TOKEN_EXPIRATION_DAYS = 7;
    private static final int ACCESS_TOKEN_EXPIRATION_MINUTES = 15;

    @Override
    @Transactional
    public AuthResponseDTO register(RegisterRequestDTO request) {
        log.info("Registrando novo usuário: {}", request.getEmail());

        // Validar se email já existe
        if (userRepository.existsByEmailIgnoreCase(request.getEmail())) {
            throw new BadRequestException("Email já cadastrado");
        }

        // Validar telefone se fornecido
        if (request.getPhone() != null && userRepository.existsByPhone(request.getPhone())) {
            throw new BadRequestException("Telefone já cadastrado");
        }

        // Criar usuário
        User user = User.builder()
            .name(request.getName())
            .email(request.getEmail().toLowerCase())
            .phone(request.getPhone())
            .passwordHash(passwordEncoder.encode(request.getPassword()))
            .emailVerified(false)
            .phoneVerified(false)
            .isActive(true)
            .build();

        user = userRepository.save(user);
        log.info("Usuário criado com sucesso: {}", user.getId());

        // Criar tenant pessoal automático
        Tenant personalTenant = createPersonalTenant(user);

        // Criar membership (OWNER)
        TenantMember membership = TenantMember.builder()
            .tenantId(personalTenant.getId())
            .userId(user.getId())
            .role(TenantMember.MemberRole.OWNER)
            .isActive(true)
            .build();
        tenantMemberRepository.save(membership);

        // TODO: Enviar email de verificação
        // emailService.sendVerificationEmail(user.getEmail(), verificationToken);

        // Gerar tokens
        String accessToken = jwtTokenProvider.generateAccessToken(user.getId());
        String refreshToken = jwtTokenProvider.generateRefreshToken();

        // Salvar refresh token
        saveRefreshToken(user.getId(), refreshToken);

        // Construir response
        return buildAuthResponse(user, accessToken, refreshToken, personalTenant, TenantMember.MemberRole.OWNER);
    }

    @Override
    @Transactional
    public AuthResponseDTO login(LoginRequestDTO request) {
        log.info("Login attempt: {}", request.getEmail());

        // Buscar usuário
        User user = userRepository.findByEmailIgnoreCase(request.getEmail())
            .orElseThrow(() -> new UnauthorizedException("Email ou senha inválidos"));

        // Verificar senha
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Email ou senha inválidos");
        }

        // Verificar se usuário está ativo
        if (!user.getIsActive()) {
            throw new UnauthorizedException("Usuário inativo");
        }

        // Atualizar last login
        user.updateLastLogin();
        userRepository.save(user);

        // Buscar tenant padrão (primeiro ativo)
        TenantMember defaultMembership = tenantMemberRepository.findByUserIdAndIsActiveTrue(user.getId())
            .stream()
            .findFirst()
            .orElseThrow(() -> new BadRequestException("Usuário sem tenant"));

        Tenant defaultTenant = tenantRepository.findById(defaultMembership.getTenantId())
            .orElseThrow(() -> new BadRequestException("Tenant não encontrado"));

        // Gerar tokens
        String accessToken = jwtTokenProvider.generateAccessToken(user.getId());
        String refreshToken = jwtTokenProvider.generateRefreshToken();

        // Salvar refresh token
        saveRefreshToken(user.getId(), refreshToken);

        log.info("Login successful: {}", user.getId());

        return buildAuthResponse(user, accessToken, refreshToken, defaultTenant, defaultMembership.getRole());
    }

    @Override
    @Transactional
    public AuthResponseDTO loginWithGoogle(String googleToken) {
        // TODO: Implementar OAuth Google
        // 1. Validar token com Google API
        // 2. Extrair dados (email, nome, foto)
        // 3. Criar ou buscar usuário
        // 4. Gerar tokens JWT
        throw new UnsupportedOperationException("Google OAuth não implementado ainda");
    }

    @Override
    @Transactional
    public AuthResponseDTO loginWithFacebook(String facebookToken) {
        // TODO: Implementar OAuth Facebook
        throw new UnsupportedOperationException("Facebook OAuth não implementado ainda");
    }

    @Override
    @Transactional
    public AuthResponseDTO loginWithApple(String appleToken) {
        // TODO: Implementar OAuth Apple
        throw new UnsupportedOperationException("Apple OAuth não implementado ainda");
    }

    @Override
    @Transactional
    public AuthResponseDTO refreshToken(RefreshTokenRequestDTO request) {
        log.info("Refresh token request");

        // Validar refresh token
        RefreshToken refreshToken = refreshTokenRepository.findValidToken(
            request.getRefreshToken(), 
            LocalDateTime.now()
        ).orElseThrow(() -> new UnauthorizedException("Refresh token inválido ou expirado"));

        // Buscar usuário
        User user = userRepository.findById(refreshToken.getUserId())
            .orElseThrow(() -> new UnauthorizedException("Usuário não encontrado"));

        // Verificar se usuário está ativo
        if (!user.getIsActive()) {
            throw new UnauthorizedException("Usuário inativo");
        }

        // Revogar token antigo
        refreshToken.revoke();
        refreshTokenRepository.save(refreshToken);

        // Gerar novos tokens
        String newAccessToken = jwtTokenProvider.generateAccessToken(user.getId());
        String newRefreshToken = jwtTokenProvider.generateRefreshToken();

        // Salvar novo refresh token
        saveRefreshToken(user.getId(), newRefreshToken);

        // Buscar tenant padrão
        TenantMember defaultMembership = tenantMemberRepository.findByUserIdAndIsActiveTrue(user.getId())
            .stream()
            .findFirst()
            .orElseThrow(() -> new BadRequestException("Usuário sem tenant"));

        Tenant defaultTenant = tenantRepository.findById(defaultMembership.getTenantId())
            .orElseThrow(() -> new BadRequestException("Tenant não encontrado"));

        log.info("Refresh token successful: {}", user.getId());

        return buildAuthResponse(user, newAccessToken, newRefreshToken, defaultTenant, defaultMembership.getRole());
    }

    @Override
    @Transactional
    public void logout(String refreshToken) {
        log.info("Logout request");

        refreshTokenRepository.findByToken(refreshToken)
            .ifPresent(token -> {
                token.revoke();
                refreshTokenRepository.save(token);
            });
    }

    @Override
    @Transactional
    public void logoutAll(String userId) {
        log.info("Logout all devices: {}", userId);

        refreshTokenRepository.revokeAllUserTokens(userId, LocalDateTime.now());
    }

    @Override
    @Transactional
    public void forgotPassword(ForgotPasswordRequestDTO request) {
        log.info("Forgot password request: {}", request.getEmail());

        // Buscar usuário (não retornar erro se não existir por segurança)
        userRepository.findByEmailIgnoreCase(request.getEmail())
            .ifPresent(user -> {
                // Gerar token de reset
                String resetToken = UUID.randomUUID().toString();

                // TODO: Salvar token no banco (criar entidade PasswordReset)
                // TODO: Enviar email com link de reset
                // emailService.sendPasswordResetEmail(user.getEmail(), resetToken);

                log.info("Password reset email sent: {}", user.getId());
            });
    }

    @Override
    @Transactional
    public void resetPassword(ResetPasswordRequestDTO request) {
        log.info("Reset password request");

        // TODO: Validar token (buscar na tabela PasswordReset)
        // TODO: Atualizar senha do usuário
        // TODO: Invalidar token
        throw new UnsupportedOperationException("Reset password não implementado ainda");
    }

    @Override
    @Transactional
    public void verifyEmail(VerifyEmailRequestDTO request) {
        log.info("Verify email request");

        // TODO: Validar token
        // TODO: Marcar email como verificado
        throw new UnsupportedOperationException("Verify email não implementado ainda");
    }

    @Override
    @Transactional
    public void resendVerificationEmail(String email) {
        log.info("Resend verification email: {}", email);

        userRepository.findByEmailIgnoreCase(email)
            .ifPresent(user -> {
                if (user.getEmailVerified()) {
                    throw new BadRequestException("Email já verificado");
                }

                // TODO: Gerar novo token
                // TODO: Enviar email
                log.info("Verification email resent: {}", user.getId());
            });
    }

    /**
     * Métodos auxiliares privados
     */
    private void saveRefreshToken(String userId, String token) {
        RefreshToken refreshToken = RefreshToken.create(userId, token, REFRESH_TOKEN_EXPIRATION_DAYS);
        refreshTokenRepository.save(refreshToken);
    }

    private Tenant createPersonalTenant(User user) {
        String slug = generateTenantSlug(user.getName());

        Tenant tenant = Tenant.builder()
            .name("Pessoal - " + user.getName())
            .slug(slug)
            .type(Tenant.TenantType.PERSONAL)
            .plan(Tenant.TenantPlan.FREE)
            .ownerId(user.getId())
            .isActive(true)
            .build();

        tenant.startSubscription(Tenant.TenantPlan.FREE, 365); // 1 ano de trial

        return tenantRepository.save(tenant);
    }

    private String generateTenantSlug(String name) {
        String baseSlug = name.toLowerCase()
            .replaceAll("[^a-z0-9\\s-]", "")
            .replaceAll("\\s+", "-")
            .replaceAll("-+", "-")
            .trim();

        String slug = baseSlug;
        int counter = 1;

        while (tenantRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + counter++;
        }

        return slug;
    }

    private AuthResponseDTO buildAuthResponse(
        User user, 
        String accessToken, 
        String refreshToken, 
        Tenant tenant,
        TenantMember.MemberRole role
    ) {
        return AuthResponseDTO.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .tokenType("Bearer")
            .expiresIn((long) ACCESS_TOKEN_EXPIRATION_MINUTES * 60) // segundos
            .user(AuthResponseDTO.UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .avatarUrl(user.getAvatarUrl())
                .emailVerified(user.getEmailVerified())
                .phoneVerified(user.getPhoneVerified())
                .build())
            .defaultTenant(AuthResponseDTO.TenantDTO.builder()
                .id(tenant.getId())
                .name(tenant.getName())
                .slug(tenant.getSlug())
                .type(tenant.getType().name())
                .plan(tenant.getPlan().name())
                .role(role.name())
                .build())
            .build();
    }
}
