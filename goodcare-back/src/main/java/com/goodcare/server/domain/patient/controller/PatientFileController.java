package com.goodcare.server.domain.patient.controller;

import com.goodcare.server.domain.patient.dao.PatientFile;
import com.goodcare.server.domain.patient.service.PatientFileService;
import com.goodcare.server.global.response.ApiResponse;
import com.goodcare.server.global.response.Status;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Tag(name = "Patient_file", description = "Patient 음성 파일 관련 API")
@RestController
@RequestMapping("/patient/file")
@AllArgsConstructor
public class PatientFileController {
    private final PatientFileService patientFileService;

    @PostMapping(value =  "/upload", consumes = "multipart/form-data")
    @Operation(
            summary = "파일 업로드 관련 테스트 api",
            description = "서버 내 저장소에 파일을 업로드합니다."
    )
    public ApiResponse<?> fileUpload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("code") String code
    ) throws IOException {
        PatientFile patientFile = patientFileService.uploadFile(file, code);
        return ApiResponse.onSuccess(Status.OK.getCode(), Status.OK.getMessage(), patientFile);
    }

    @GetMapping(value =  "/")
    @Operation(
            summary = "파일 다운로드 url api",
            description = "파일 다운로드 url을 받아옵니다"
    )
    public ApiResponse<?> getFile(
            @RequestParam("code") String code // 추후 환자 코드로 변경하기
    ) throws IOException{
        ResponseEntity<Resource> responseEntity = patientFileService.downloadFile(code);
        // 실제 다운로드를 처리하는 URL
        String downloadUrl = "/download/file?code=" + code;
        Map<String, Object> responseBody = Map.of(
                "downloadUrl", downloadUrl,
                "fileName",  responseEntity.getHeaders().getContentDisposition().getFilename(),
                "contentLength", responseEntity.getHeaders().getContentLength(),
                "contentType", responseEntity.getHeaders().getContentType()
        );

        return ApiResponse.onSuccess(Status.OK.getCode(), Status.OK.getMessage(), responseBody);
    }

    // 실제 다운로드 처리
    @GetMapping("/download")
    @Operation(
            summary = "파일 다운로드 api",
            description = "실제 파일을 다운로드 합니다."
    )
    public ResponseEntity<Resource> downloadFile(@RequestParam("code") String code) throws IOException {
        return patientFileService.downloadFile(code);
    }
}
