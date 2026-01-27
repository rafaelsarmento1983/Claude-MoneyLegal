// com.moneylegal.auth.dto.VerifyResetCodeResponse.java
package com.moneylegal.auth.dto;

public class VerifyResetCodeResponse {

    private String message;
    private boolean valid;

    public VerifyResetCodeResponse() {
    }

    public VerifyResetCodeResponse(String message, boolean valid) {
        this.message = message;
        this.valid = valid;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }
}