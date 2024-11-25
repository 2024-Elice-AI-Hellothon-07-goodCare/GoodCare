package com.goodcare.server.domain.patient.repository.patientinfo;

import com.goodcare.server.domain.patient.dao.PatientFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientFileRepository extends JpaRepository<PatientFile, Long> {
    Optional<PatientFile> findByCode(String code);
}
