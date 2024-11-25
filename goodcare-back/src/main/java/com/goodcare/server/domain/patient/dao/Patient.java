package com.goodcare.server.domain.patient.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name="patient")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="patient_id")
    private Long id;

    @Column(name="patient_code")
    private String code;

    private String name;

    @Column(name="date_of_birth")
    private LocalDate dateOfBirth;

    private String gender;

    @Column(name="contact_number")
    private String contactNumber;
}
