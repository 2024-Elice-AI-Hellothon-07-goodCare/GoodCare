package com.goodcare.server.domain.caregiver.repository;

import com.goodcare.server.domain.caregiver.dao.CaregiverSpeciality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaregiverSpecialityRepository extends JpaRepository<CaregiverSpeciality, Long> {
}
