package com.goodcare.server.domain.patient.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "patient_emergency_contact")
public class EmergencyContact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="patient_code", nullable = false)
    private String patientCode;

    @Column(name = "emergency_name")
    private String emergencyName;

    @Column(name = "emergency_contact")
    private String emergencyContact;

    private String relationship;
}
