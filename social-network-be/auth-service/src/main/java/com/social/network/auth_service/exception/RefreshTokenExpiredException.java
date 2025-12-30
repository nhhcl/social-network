package com.social.network.auth_service.exception;

public class RefreshTokenExpiredException extends BaseAppException {
    public RefreshTokenExpiredException() {
        super("Refresh token expired", "REFRESH_TOKEN_EXPIRED", 401);
    }
}
