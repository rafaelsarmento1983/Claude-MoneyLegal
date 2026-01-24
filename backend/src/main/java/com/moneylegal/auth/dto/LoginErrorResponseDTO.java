package com.moneylegal.auth.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginErrorResponseDTO {
    private String message;
    private String code;   // opcional (ex: INVALID_CREDENTIALS)
}
