package com.goodcare.server.domain.patient.dao.dailychecklist;

import com.goodcare.server.domain.patient.dao.dailychecklist.enums.ConsciousnessLevel;
import com.goodcare.server.domain.patient.dao.dailychecklist.enums.MoodBehaviour;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="checklist_consciousness")
public class Consciousness {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="checkllist_id", nullable = false)
    private Long checkListId;

    @Column(name="consciousness_level")
    private ConsciousnessLevel consciousnessLevel;

    @Column(name="mood_behaviour")
    private MoodBehaviour moodBehaviour;
}
