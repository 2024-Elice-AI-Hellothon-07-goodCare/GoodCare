package com.goodcare.server.domain.caregiver.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "caregiver_speciality")
public class CaregiverSpeciality {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="caregiver_code")
    private String code;

    @Column(name="special_patient_care_experience")
    private boolean specialPatientCareExperience;
}
