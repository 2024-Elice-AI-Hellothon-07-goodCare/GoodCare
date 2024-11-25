package com.goodcare.server.domain.patient.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="patient_file")
public class PatientFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="patient_code", nullable = false)
    private String code;

    @Column(name="patient_file_name")
    private String fileName;

    @Column(name="patient_original_file_name")
    private String originalFileName;

    @Column(name="patient_file_path")
    private String filePath;

    @Column(name="patient_file_size")
    private Long fileSize;
}
