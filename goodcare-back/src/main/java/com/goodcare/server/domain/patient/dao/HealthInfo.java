package com.goodcare.server.domain.patient.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="patient_health_info")
public class HealthInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(name="patient_code", nullable = false)
    private String patientCode;

    @Column(name = "disease_history", columnDefinition = "TEXT")
    private String diseaseHistory;

    @Column(columnDefinition = "TEXT")
    private String medications;

    @Column(columnDefinition = "TEXT")
    private String allergies;
}
