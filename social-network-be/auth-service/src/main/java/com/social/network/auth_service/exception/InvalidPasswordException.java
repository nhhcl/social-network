package com.social.network.auth_service.exception;

public class InvalidPasswordException extends BaseAppException {
    public InvalidPasswordException() {
        super("Invalid password", "INVALID_PASSWORD", 401);
    }
}
