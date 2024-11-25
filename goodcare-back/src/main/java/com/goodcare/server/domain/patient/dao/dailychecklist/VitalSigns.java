package com.goodcare.server.domain.patient.dao.dailychecklist;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="checklist_vital_signs")
public class VitalSigns {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="checkllist_id", nullable = false)
    private Long checkListId;

    @Column(name="temperature", nullable = false)
    private Double temperature;         // 체온

    @Column(name="blood_pressure_sys", nullable = false)
    private Double bloodPressureSys;    // 수축기 혈압

    @Column(name="blood_pressure_dia", nullable = false)
    private Double bloodPressureDia;    //  이완기 혈압

    @Column(name="pulse", nullable = false)
    private Integer pulse;  // 맥박

    @Column(name="oxygen", nullable = false)
    private Integer oxygen; // 산소 포화도

    @Column(name="respiration_rate", nullable = false)
    private Integer respirationRate;    // 호흠수
}
