package com.goodcare.server.domain.guardian.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="guardian_consent")
public class GuardianConsent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "guardian_code", nullable = false)
    private String code;

    @Column(name = "medical_care_access_consent")
    private boolean medicalCareAccessConsent;
}
