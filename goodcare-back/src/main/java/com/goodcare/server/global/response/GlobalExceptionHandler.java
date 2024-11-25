package com.goodcare.server.global.response;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@RestControllerAdvice(annotations = {RestController.class})
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    private final WebRequest webRequest;

    public GlobalExceptionHandler(@Qualifier("webRequest") WebRequest webRequest) {
        this.webRequest = webRequest;
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> unexpectedException(
            Exception unexpectedException,
            WebRequest webRequest
    ) {
        log.error(unexpectedException.getClass().toGenericString());
        log.error("예상치 못한 오류 발생: {}", unexpectedException.getMessage());
        log.error("발생 지점: {}", unexpectedException.getStackTrace()[0]);
        Body body = Status.INTERNAL_SERVER_ERROR.getBody();
        ApiResponse<Object> response = ApiResponse.onFailure(body.getCode(), body.getMessage(), null);
        return super.handleExceptionInternal(
                unexpectedException,
                response,
                HttpHeaders.EMPTY,
                HttpStatus.INTERNAL_SERVER_ERROR,
                webRequest
        );
    }

    @ExceptionHandler(GeneralException.class)
    public ResponseEntity<Object> exception(
            GeneralException generalException,
            HttpServletRequest request
    ) {
        Body body = generalException.getBody();
        ApiResponse<Object> response = ApiResponse.onFailure(body.getCode(), body.getMessage(), null);
        WebRequest webRequest = new ServletWebRequest(request);
        log.warn(body.getMessage());
        return super.handleExceptionInternal(
                generalException,
                response,
                HttpHeaders.EMPTY,
                body.getHttpStatus(),
                webRequest
        );
    }

    @Override
    public ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException exception,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request
    ) {
        Map<String, String> errors = new LinkedHashMap<>();
        Body body = Status.BAD_REQUEST.getBody();
        exception.getBindingResult().getFieldErrors()
                .forEach(fieldError -> {
                    String fieldName = fieldError.getField();
                    String errorMessage = Optional.ofNullable(fieldError.getDefaultMessage())
                            .orElse("");
                    errors.merge(fieldName, errorMessage,
                            (existingErrorMessage, newErrorMessage) -> existingErrorMessage + ", "
                                    + newErrorMessage);
                });

        ApiResponse<Object> response = ApiResponse.onFailure(body.getCode(), body.getMessage(),
                errors);

        log.warn(body.getMessage());
        return super.handleExceptionInternal(
                exception,
                response,
                headers,
                Status.BAD_REQUEST.getHttpStatus(),
                request
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> exception(
            AccessDeniedException exception,
            HttpServletRequest request
    ) {
        Body body = Status.UNAUTHORIZED.getBody();
        ApiResponse<Object> response = ApiResponse.onFailure(body.getCode(), body.getMessage(), null);
        WebRequest webRequest = new ServletWebRequest(request);

        log.warn(body.getMessage());
        return super.handleExceptionInternal(
                exception,
                response,
                HttpHeaders.EMPTY,
                body.getHttpStatus(),
                webRequest
        );
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<Object> handleIOException(
            IOException exception,
            HttpServletRequest request
    ){
        Body body = Status.UNSUPPORTED_MEDIA_TYPE.getBody();
        ApiResponse<Object> response = ApiResponse.onFailure(body.getCode(), body.getMessage(), null);
        log.warn(body.getMessage());

        return super.handleExceptionInternal(
                exception,
                response,
                HttpHeaders.EMPTY,
                body.getHttpStatus(),
                webRequest
        );
    }

    @ExceptionHandler(HttpMessageConversionException.class)
    public ResponseEntity<?> handleHttpMessageConversionException(HttpMessageConversionException ex) {
        Throwable cause = ex.getCause();
        log.error("역직렬화 오류: {}", cause != null ? cause.getMessage() : "원인 알 수 없음", ex);
        return ResponseEntity.badRequest().body("입력 데이터가 DTO 구조와 일치하지 않습니다.");
    }
}