package com.goodcare.server.domain.patient.repository;

import com.goodcare.server.domain.patient.repository.patientinfo.*;
import com.goodcare.server.domain.patient.repository.dailychecklist.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@Getter
public class PatientRepositoryBundle {
    private final PatientRepository patientRepository;
    private final HealthInfoRepository healthInfoRepository;
    private final EmergencyContactRepository emergencyContactRepository;
    private final MedicalServiceNeedsRepository medicalServiceNeedsRepository;
    private final ResidentialInfoRepository residentialInfoRepository;
    private final PatientFileRepository patientFileRepository;
    private final ConsciousnessRepository consciousnessRepository;
    private final DailyCheckListRepository dailyCheckListRepository;
    private final MedicationsRepository medicationsRepository;
    private final PhysicalStatusRepository physicalStatusRepository;
    private final SpecialNotesRepository specialNotesRepository;
    private final VitalSignsRepository vitalSignsRepository;
}
