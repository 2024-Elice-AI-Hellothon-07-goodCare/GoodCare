package com.goodcare.server.domain.guardian.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="guardian_contact_preference")
public class GuardianContactPreference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "guardian_code", nullable = false)
    private String code;

    @Column(name = "preferred_contact_method")
    private String preferredContactMethod;
}
