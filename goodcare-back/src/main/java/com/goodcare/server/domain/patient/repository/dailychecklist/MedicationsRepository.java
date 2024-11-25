package com.goodcare.server.domain.patient.repository.dailychecklist;

import com.goodcare.server.domain.patient.dao.dailychecklist.Medications;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MedicationsRepository extends JpaRepository<Medications, Long> {
}
