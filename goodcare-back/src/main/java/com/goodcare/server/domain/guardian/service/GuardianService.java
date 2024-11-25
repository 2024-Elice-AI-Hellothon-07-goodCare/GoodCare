package com.goodcare.server.domain.guardian.service;

import com.goodcare.server.domain.guardian.repository.GuardianRepositoryBundle;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class GuardianService {
    private final GuardianRepositoryBundle guardianRepositoryBundle;
}
