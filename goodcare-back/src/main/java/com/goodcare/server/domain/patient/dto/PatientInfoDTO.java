package com.goodcare.server.domain.patient.dto;

import com.goodcare.server.domain.patient.dto.patientinfodto.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PatientInfoDTO {
    private EmergencyContactDTO emergencyContactDTO;
    private HealthInfoDTO healthInfoDTO;
    private MedicalServiceNeedsDTO medicalServiceNeedsDTO;
    private PatientDTO patientDTO;
    private ResidentialInfoDTO residentialInfoDTO;
}
