package com.goodcare.server.domain.patient.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="patient_residential_info")
public class ResidentialInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="patient_code", nullable = false)
    private String patientCode;

    private String residence;
}
