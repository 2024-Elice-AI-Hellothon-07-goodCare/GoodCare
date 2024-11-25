package com.goodcare.server.domain.caregiver.repository;

import com.goodcare.server.domain.caregiver.dao.CaregiverRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaregiverRoleRepository extends JpaRepository<CaregiverRole, Long> {
}
