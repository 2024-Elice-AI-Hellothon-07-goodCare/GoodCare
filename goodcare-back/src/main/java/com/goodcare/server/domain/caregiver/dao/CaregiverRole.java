package com.goodcare.server.domain.caregiver.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="caregiver_role")
public class CaregiverRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="caregiver_code", nullable = false)
    private String code;

    @Column(name="is_prime_gaurdian")
    private boolean isPrimeGaurdian;

    @Column(name="needs_guardian_info")
    private boolean needsGuardianInfo;
}
