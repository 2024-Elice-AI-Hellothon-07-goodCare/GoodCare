package com.goodcare.server.domain.guardian.repository;

import com.goodcare.server.domain.guardian.dao.GuardianContactPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuardianContactPreferenceRepository extends JpaRepository<GuardianContactPreference, Long> {
}
