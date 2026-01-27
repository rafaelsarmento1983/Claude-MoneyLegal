// com.moneylegal.auth.service.EmailService.java
package com.moneylegal.auth.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Envia código OTP para recuperação de senha
     */
    public void sendPasswordResetCode(String to, String code, String userName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Money Legal - Código de Recuperação de Senha");
        message.setText(buildPasswordResetEmail(code, userName));

        mailSender.send(message);
    }

    private String buildPasswordResetEmail(String code, String userName) {
        return String.format(
                "Olá %s,\n\n" +
                        "Você solicitou a recuperação de senha da sua conta Money Legal.\n\n" +
                        "Seu código de verificação é: %s\n\n" +
                        "Este código é válido por 15 minutos.\n\n" +
                        "Se você não solicitou esta recuperação, ignore este email.\n\n" +
                        "Atenciosamente,\n" +
                        "Equipe Money Legal",
                userName,
                code
        );
    }
}