package com.goodcare.server.domain.caregiver.repository;

import com.goodcare.server.domain.caregiver.dao.CaregiverSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaregiverScheduleRepository extends JpaRepository<CaregiverSchedule, Long> {
}
