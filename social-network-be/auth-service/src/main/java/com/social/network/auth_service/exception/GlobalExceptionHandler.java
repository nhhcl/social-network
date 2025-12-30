package com.social.network.auth_service.exception;

import com.social.network.auth_service.dto.response.BaseResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BaseAppException.class)
    public ResponseEntity<BaseResponse<Object>> handleBaseAppException(BaseAppException ex) {
        BaseResponse<Object> body = BaseResponse.builder().status(ex.getStatus()).message(ex.getMessage()).errorCode(ex.getErrorCode()).timestamp(LocalDateTime.now()).data(null).build();

        return ResponseEntity.status(ex.getStatus()).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponse<Object>> handleAll(Exception ex) {
        BaseResponse<Object> body = BaseResponse.builder().status(500).message("Internal server error").errorCode("INTERNAL_ERROR").timestamp(LocalDateTime.now()).data(null).build();

        return ResponseEntity.status(500).body(body);
    }
}
