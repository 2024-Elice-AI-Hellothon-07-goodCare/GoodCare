package com.goodcare.server.domain.patient.repository.patientinfo;

import com.goodcare.server.domain.patient.dao.EmergencyContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmergencyContactRepository extends JpaRepository<EmergencyContact, Long> {
}
