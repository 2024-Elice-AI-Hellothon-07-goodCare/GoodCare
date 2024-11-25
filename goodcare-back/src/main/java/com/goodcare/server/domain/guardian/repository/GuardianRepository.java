package com.goodcare.server.domain.guardian.repository;

import com.goodcare.server.domain.guardian.dao.Guardian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuardianRepository extends JpaRepository<Guardian, Long> {
}
