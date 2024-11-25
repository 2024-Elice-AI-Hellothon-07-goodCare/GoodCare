package com.goodcare.server.domain.caregiver.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CaregiverExperienceDTO {
    private Integer yearsOfExperience;

    private boolean hasCertification;

    private boolean completedTraining;
}
