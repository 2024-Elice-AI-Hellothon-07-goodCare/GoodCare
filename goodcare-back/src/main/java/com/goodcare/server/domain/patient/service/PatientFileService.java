package com.goodcare.server.domain.patient.service;

import com.goodcare.server.domain.patient.dao.PatientFile;
import com.goodcare.server.domain.patient.repository.PatientRepositoryBundle;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
@Transactional
public class PatientFileService {
    private PatientRepositoryBundle patientRepositoryBundle;

    // 음성파일 확장자 목록입니다.
    // 음성파일 지원 가능한 종류 확인 후 추후 추가 예정입니다.
    private static final List<String> ALLOW_EXTENSIONS = Arrays.asList("mp3", "wav", "ogg", "m4a");

    // 파일 확장자 검사 로직
    private boolean checkFileExtension(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        if(originalFilename != null){
            String fileExtension = originalFilename.
                    substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();

            if(!ALLOW_EXTENSIONS.contains(fileExtension)){
                return false;
            }
        }
        return true;
    }
    
    // 파일 다운로드 로직
    public PatientFile uploadFile(MultipartFile file, String code) throws IOException {
        String uploadDir = Paths.get(System.getProperty("user.dir"), "file", code).toString();
        // 파일 확장자 검사
        // 음성파일 아닌 경우 Exception 반환
        if(!checkFileExtension(file)){
            throw new IOException();
        }

        String fileExtension = Objects.requireNonNull(file.getOriginalFilename()).
                substring(file.getOriginalFilename().lastIndexOf(".") + 1).toLowerCase();
        String fileName = code + "." + fileExtension;
        String filePath = Paths.get(uploadDir, fileName).toString();

        // 폴더가 없으면 생성
        File folder = new File(uploadDir);
        if (!folder.exists() && !folder.mkdirs()) {
            throw new IOException();
        }

        File destinationFile = new File(filePath);
        // 모든 사용자에게 읽기 권한 부여
        // 이거 없으면 파일 다운로드 안됨!!
        destinationFile.setReadable(true, false);
        FileUtils.copyInputStreamToFile(file.getInputStream(), destinationFile);

        // 추후 회원 정보 나온 후 DB 내 추가로 정보 저장 예정
        PatientFile patientFile = new PatientFile();
        patientFile.setCode(code);
        patientFile.setFileName(fileName);
        patientFile.setOriginalFileName(file.getOriginalFilename());
        patientFile.setFilePath(filePath);
        patientFile.setFileSize(file.getSize());

        patientRepositoryBundle.getPatientFileRepository().save(patientFile);

        return patientFile;
    }

    // 나중에 환자 코드 사용해서 파일 가져오는 것으로 바꾸기
    public ResponseEntity<Resource> downloadFile(String code) throws IOException {
        PatientFile patientFile = patientRepositoryBundle.getPatientFileRepository()
                .findByCode(code).orElseThrow(
                () -> new FileNotFoundException("This member has no file" + code));

        File file = new File(patientFile.getFilePath());

        if(!file.exists()){
            throw new FileNotFoundException("파일을 찾을 수 없습니다.");
        }

        Resource resource = new FileSystemResource(file);
        String contentType = Files.probeContentType(file.toPath());
        long contentLength = file.length(); // 파일 크기 설정

        // Content-Type을 지정, 기본값은 audio/mpeg
        if (contentType == null || !contentType.startsWith("audio")) {
            contentType = "audio/mpeg";
        }

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        // 바로 스트리밍 하기를 원하면 헤더 밑에줄로 바꾸기
//        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getName() + "\"");
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"");
        headers.add(HttpHeaders.CONTENT_TYPE, contentType);

        // ResponseEntity로 반환
        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(contentLength)
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}
