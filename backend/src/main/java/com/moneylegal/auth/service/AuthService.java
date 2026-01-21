package com.moneylegal.auth.service;

import com.moneylegal.auth.dto.*;

/**
 * Interface AuthService - Serviço de Autenticação
 * 
 * Responsabilidades:
 * - Registro de novos usuários
 * - Login (email/senha)
 * - Login OAuth (Google, Facebook, Apple)
 * - Refresh token
 * - Logout
 * - Recuperação de senha
 * - Verificação de email
 */
public interface AuthService {

    /**
     * Registrar novo usuário
     */
    AuthResponseDTO register(RegisterRequestDTO request);

    /**
     * Login com email e senha
     */
    AuthResponseDTO login(LoginRequestDTO request);

    /**
     * Login com Google OAuth
     */
    AuthResponseDTO loginWithGoogle(String googleToken);

    /**
     * Login com Facebook OAuth
     */
    AuthResponseDTO loginWithFacebook(String facebookToken);

    /**
     * Login com Apple OAuth
     */
    AuthResponseDTO loginWithApple(String appleToken);

    /**
     * Refresh access token
     */
    AuthResponseDTO refreshToken(RefreshTokenRequestDTO request);

    /**
     * Logout (revogar refresh token)
     */
    void logout(String refreshToken);

    /**
     * Logout de todos os dispositivos (revogar todos os tokens)
     */
    void logoutAll(String userId);

    /**
     * Solicitar recuperação de senha
     */
    void forgotPassword(ForgotPasswordRequestDTO request);

    /**
     * Resetar senha com token
     */
    void resetPassword(ResetPasswordRequestDTO request);

    /**
     * Verificar email com token
     */
    void verifyEmail(VerifyEmailRequestDTO request);

    /**
     * Reenviar email de verificação
     */
    void resendVerificationEmail(String email);
}
