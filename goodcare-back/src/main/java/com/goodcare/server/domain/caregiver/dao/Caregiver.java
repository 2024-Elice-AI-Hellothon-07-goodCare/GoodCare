package com.goodcare.server.domain.caregiver.dao;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name="caregiver")
public class Caregiver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="caregiver_code", nullable = false)
    private String code;

    @Column(name="patient_code", nullable = false)
    private String patientCode;

    private String name;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    private String gender;
    @Column(name="contact_number")
    private String contactNumber;
}
