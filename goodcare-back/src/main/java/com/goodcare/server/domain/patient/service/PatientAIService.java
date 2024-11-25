package com.goodcare.server.domain.patient.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.goodcare.server.domain.patient.dao.PatientFile;
import com.goodcare.server.domain.patient.repository.PatientRepositoryBundle;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.AlternativeJdkIdGenerator;

import java.io.*;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
@Getter
@RequiredArgsConstructor
public class PatientAIService {
    @Value("${api.elice.ml-api-key}")
    private String mlApiKey;

    private final PatientRepositoryBundle patientRepositoryBundle;

    private String getUUID(){
        UUID uuid = new AlternativeJdkIdGenerator().generateId();
        return uuid.toString();
    }

    public String getChat(String text) throws IOException, InterruptedException {
        String jsonBody = String.format(
                "{\"model\":\"helpy-pro\",\"sess_id\":\"%s\",\"messages\":[{\"role\":\"user\",\"content\":\"%s\"}],\"max_tokens\":512}"
                ,getUUID(), text);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api-cloud-function.elice.io/5a327f26-cc55-45c5-92b7-e909c2df0ba4/v1/chat/completions"))
                .header("accept", "application/json")
                .header("content-type", "application/json")
                .header("authorization", "Bearer " + getMlApiKey())
                .method("POST", HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        // content만 뽑기
        // Jackson ObjectMapper 초기화
        ObjectMapper objectMapper = new ObjectMapper();

        // JSON 문자열 파싱
        JsonNode rootNode = objectMapper.readTree(response.body());

        return rootNode
                .path("choices")  // "choices" 배열
                .get(0)           // 배열의 첫 번째 요소
                .path("message")  // "message" 객체
                .path("content")  // "content" 필드
                .asText();
    }

    public String getIntraSpeechFromPatientFile(String code, String text) throws IOException, InterruptedException {
        // PatientFile 조회
        PatientFile patientFile = patientRepositoryBundle.getPatientFileRepository().findByCode(code)
                .orElseThrow(() -> new FileNotFoundException("This member has no file: " + code));

        Path filePath = Paths.get(patientFile.getFilePath());

        // 파일 내용 읽고 Base64로 인코딩
        byte[] fileBytes = Files.readAllBytes(filePath);
        String base64FileContent = Base64.getEncoder().encodeToString(fileBytes);

        // JSON 형식으로 데이터 구성
        String jsonBody = String.format(
                "{\"audio\":\"data:%s;name=%s;base64,%s\",\"text\":\"%s\"}",
                "audio/mpeg",
                filePath.getFileName().toString(),
                base64FileContent,
                text
        );

        // HTTP 요청 생성
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api-cloud-function.elice.io/fb0764c6-4aff-4e22-b93f-e51552fefde0/generate"))
                .header("accept", "application/json")
                .header("content-type", "application/json")
                .header("Authorization", "Bearer " + getMlApiKey())
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        // HTTP 요청 전송
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        return response.body();
    }
}
