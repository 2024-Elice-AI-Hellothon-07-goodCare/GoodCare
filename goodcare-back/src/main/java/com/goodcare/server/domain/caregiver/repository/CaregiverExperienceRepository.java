package com.goodcare.server.domain.caregiver.repository;

import com.goodcare.server.domain.caregiver.dao.CaregiverExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaregiverExperienceRepository extends JpaRepository<CaregiverExperience, Long> {
}
