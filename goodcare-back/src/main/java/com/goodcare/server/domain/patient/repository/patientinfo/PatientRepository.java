package com.goodcare.server.domain.patient.repository.patientinfo;

import com.goodcare.server.domain.patient.dao.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
}
