package com.social.network.auth_service.exception;

public class UserNotFoundException extends BaseAppException {
    public UserNotFoundException() {
        super("User not found", "USER_NOT_FOUND", 404);
    }
}
