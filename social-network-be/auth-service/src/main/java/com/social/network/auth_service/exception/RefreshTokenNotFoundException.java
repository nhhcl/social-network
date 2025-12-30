package com.social.network.auth_service.exception;

public class RefreshTokenNotFoundException extends BaseAppException {
    public RefreshTokenNotFoundException() {
        super("Refresh token not found", "REFRESH_TOKEN_NOT_FOUND", 404);
    }
}
