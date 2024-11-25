package com.goodcare.server.domain.patient.dao.dailychecklist;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="checklist_medications")
public class Medications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="checkllist_id", nullable = false)
    private Long checkListId;

    @Column(name="medication_taken", nullable = false)
    private boolean medicationTaken;

    @Column(name="side_effects")
    private String sideEffects;
}
