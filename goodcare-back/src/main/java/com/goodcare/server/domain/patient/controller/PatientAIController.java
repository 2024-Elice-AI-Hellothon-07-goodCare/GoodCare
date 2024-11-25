package com.goodcare.server.domain.patient.controller;

import com.goodcare.server.domain.patient.service.PatientAIService;
import com.goodcare.server.global.response.ApiResponse;
import com.goodcare.server.global.response.Status;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Tag(name = "Patient_AI", description = "Patient AI 관련 API")
@RestController
@RequestMapping("/patient/ai")
@AllArgsConstructor
public class PatientAIController {
    private final PatientAIService patientAIService;
    
    @GetMapping(value = "/chat")
    @Operation(
            summary = "챗봇 creation 관련 test api",
            description = "주어진 문장에 대한 답을 create 합니다"
    )
    public ApiResponse<String> CreateChat(@RequestParam("text") String text) throws IOException, InterruptedException {
        String answer = patientAIService.getChat(text);
        return ApiResponse.onSuccess(Status.OK.getCode(), Status.OK.getMessage(), answer);
    }

    @PostMapping(value = "speech")
    @Operation(
            summary = "IntraSpeech 관련 api",
            description = "환자 코드로 저장된 오디오 정보를 이용해 주어진 문장에 대한 speech를 생성합니다.\n" +
                    "현재 API 서버 내 오류가 있어 사용하지 못합니다."
    )
    public ApiResponse<?> createSpeech(
            @RequestParam("code") String code,
            @RequestParam("text") String text
    ) throws IOException, InterruptedException {
//        String answer = patientAIService.getIntraSpeechFromPatientFile(code, text);
//        return ApiResponse.onSuccess(Status.OK.getCode(), Status.OK.getMessage(), answer);
        return ApiResponse.onSuccess(Status.OK.getCode(), Status.OK.getMessage(), "현재 사용 불가");
    }
}
