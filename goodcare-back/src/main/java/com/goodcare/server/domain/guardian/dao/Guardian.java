package com.goodcare.server.domain.guardian.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name="guardian")
public class Guardian {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "guardian_code", nullable = false)
    private String code;

    @Column(name="patient_code", nullable = false)
    private String patientCode;

    private String name;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    private String gender;

    @Column(name="contact")
    private String contactNumber;
}
