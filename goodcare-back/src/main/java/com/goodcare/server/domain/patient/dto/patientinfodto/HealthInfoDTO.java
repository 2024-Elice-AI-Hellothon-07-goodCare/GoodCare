package com.goodcare.server.domain.patient.dto.patientinfodto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HealthInfoDTO {
    private String diseaseHistory;
    private String medications;
    private String allergies;
}
