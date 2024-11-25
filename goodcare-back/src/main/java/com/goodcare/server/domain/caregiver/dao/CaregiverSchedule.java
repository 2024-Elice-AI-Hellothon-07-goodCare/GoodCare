package com.goodcare.server.domain.caregiver.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="caregiver_schedule")
public class CaregiverSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "caregiver_code", nullable = false)
    private String code;

    @Column(name="available_hours")
    private String availableHours;

    @Column(name="day_off")
    private String dayOff;
}
