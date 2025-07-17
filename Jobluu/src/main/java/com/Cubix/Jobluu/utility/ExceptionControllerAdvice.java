package com.Cubix.Jobluu.utility;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.bson.codecs.jsr310.LocalDateTimeCodec;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.validation.ObjectError;


import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ExceptionControllerAdvice {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorInfo> generalException(Exception exception){
        ErrorInfo error = new ErrorInfo(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), LocalDateTime.now());
        return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);

    }
    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public ResponseEntity<ErrorInfo> validatorExceptionHandler(Exception exception) {
        String message = "";

        if (exception instanceof MethodArgumentNotValidException manvException) {
            message = manvException.getBindingResult()
                    .getAllErrors()
                    .stream()
                    .map(ObjectError::getDefaultMessage)
                    .collect(Collectors.joining(", "));
        } else {
            ConstraintViolationException cvException = (ConstraintViolationException) exception;
            message = cvException.getConstraintViolations()
                    .stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(", "));
        }

        ErrorInfo error = new ErrorInfo(message, HttpStatus.BAD_REQUEST.value(), LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
