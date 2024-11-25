package com.goodcare.server.domain.patient.repository.patientinfo;

import com.goodcare.server.domain.patient.dao.MedicalServiceNeeds;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalServiceNeedsRepository extends JpaRepository<MedicalServiceNeeds, Long> {
}
