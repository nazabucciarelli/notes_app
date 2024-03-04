package com.ensolvers.notes_app.infra.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> ErrorHandler404(ResourceNotFoundException ex) {
        ErrorData errorData = new ErrorData(ex.getMessage());
        return new ResponseEntity<>(errorData, HttpStatus.NOT_FOUND);
    }
}
