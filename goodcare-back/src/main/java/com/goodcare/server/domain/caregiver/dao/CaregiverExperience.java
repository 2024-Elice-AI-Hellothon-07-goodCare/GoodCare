package com.goodcare.server.domain.caregiver.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="caregiver_experience")
public class CaregiverExperience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="caregiver_code", nullable = false)
    private String code;

    @Column(name="years_of_experience")
    private Integer yearsOfExperience;

    @Column(name="has_certification")
    private boolean hasCertification;

    @Column(name = "completed_training")
    private boolean completedTraining;
}
