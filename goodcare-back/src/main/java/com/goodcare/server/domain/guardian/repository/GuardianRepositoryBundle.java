package com.goodcare.server.domain.guardian.repository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
@Getter
public class GuardianRepositoryBundle {
    private final GuardianRepository guardianRepository;
    private final GuardianConsentRepository guardianConsentRepository;
    private final GuardianContactPreferenceRepository guardianContactPreferenceRepository;
}
