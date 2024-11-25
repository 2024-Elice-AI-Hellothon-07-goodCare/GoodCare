package com.goodcare.server.domain.caregiver.service;

import com.goodcare.server.domain.caregiver.repository.CaregiverRepositoryBundle;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CaregiverService {
    private final CaregiverRepositoryBundle caregiverRepositoryBundle;
}
