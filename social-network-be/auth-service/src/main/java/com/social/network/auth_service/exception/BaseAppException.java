package com.social.network.auth_service.exception;

import lombok.Getter;

@Getter
public abstract class BaseAppException extends RuntimeException{
    private final String errorCode;
    private final int status;

    public BaseAppException(String message, String errorCode, int status){
        super(message);
        this.errorCode = errorCode;
        this.status = status;
    }

    public BaseAppException(String message, String errorCode, int status, Throwable cause){
        super(message,cause);
        this.errorCode = errorCode;
        this.status =status;
    }

}


