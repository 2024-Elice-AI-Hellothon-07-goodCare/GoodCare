package com.goodcare.server.domain.guardian.repository;

import com.goodcare.server.domain.guardian.dao.GuardianConsent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuardianConsentRepository extends JpaRepository<GuardianConsent, Long> {
}
