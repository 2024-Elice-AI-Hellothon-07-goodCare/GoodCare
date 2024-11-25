package com.goodcare.server.domain.caregiver.repository;

import com.goodcare.server.domain.caregiver.dao.Caregiver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaregiverRepository extends JpaRepository<Caregiver, Long> {
}
