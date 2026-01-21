package com.moneylegal.auth.controller;

import com.moneylegal.auth.dto.*;
import com.moneylegal.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController - Endpoints de Autenticação
 * 
 * Endpoints:
 * POST /api/v1/auth/register - Cadastro
 * POST /api/v1/auth/login - Login
 * POST /api/v1/auth/logout - Logout
 * POST /api/v1/auth/refresh - Refresh token
 * POST /api/v1/auth/forgot-password - Esqueci senha
 * POST /api/v1/auth/reset-password - Resetar senha
 * POST /api/v1/auth/verify-email - Verificar email
 * POST /api/v1/auth/resend-verification - Reenviar verificação
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    /**
     * POST /api/v1/auth/register
     * Cadastrar novo usuário
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterRequestDTO request) {
        log.info("POST /api/v1/auth/register - email: {}", request.getEmail());
        AuthResponseDTO response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/v1/auth/login
     * Login com email e senha
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        log.info("POST /api/v1/auth/login - email: {}", request.getEmail());
        AuthResponseDTO response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/v1/auth/refresh
     * Renovar access token
     */
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDTO> refreshToken(@Valid @RequestBody RefreshTokenRequestDTO request) {
        log.info("POST /api/v1/auth/refresh");
        AuthResponseDTO response = authService.refreshToken(request);
        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/v1/auth/logout
     * Fazer logout (revogar refresh token)
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@Valid @RequestBody RefreshTokenRequestDTO request) {
        log.info("POST /api/v1/auth/logout");
        authService.logout(request.getRefreshToken());
        return ResponseEntity.noContent().build();
    }

    /**
     * POST /api/v1/auth/forgot-password
     * Solicitar recuperação de senha
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@Valid @RequestBody ForgotPasswordRequestDTO request) {
        log.info("POST /api/v1/auth/forgot-password - email: {}", request.getEmail());
        authService.forgotPassword(request);
        return ResponseEntity.ok().build();
    }

    /**
     * POST /api/v1/auth/reset-password
     * Resetar senha com token
     */
    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@Valid @RequestBody ResetPasswordRequestDTO request) {
        log.info("POST /api/v1/auth/reset-password");
        authService.resetPassword(request);
        return ResponseEntity.ok().build();
    }

    /**
     * POST /api/v1/auth/verify-email
     * Verificar email com token
     */
    @PostMapping("/verify-email")
    public ResponseEntity<Void> verifyEmail(@Valid @RequestBody VerifyEmailRequestDTO request) {
        log.info("POST /api/v1/auth/verify-email");
        authService.verifyEmail(request);
        return ResponseEntity.ok().build();
    }

    /**
     * POST /api/v1/auth/resend-verification
     * Reenviar email de verificação
     */
    @PostMapping("/resend-verification")
    public ResponseEntity<Void> resendVerification(@RequestParam String email) {
        log.info("POST /api/v1/auth/resend-verification - email: {}", email);
        authService.resendVerificationEmail(email);
        return ResponseEntity.ok().build();
    }
}
