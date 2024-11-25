package com.goodcare.server.domain.patient.repository.dailychecklist;

import com.goodcare.server.domain.patient.dao.dailychecklist.DailyCheckList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyCheckListRepository extends JpaRepository<DailyCheckList, Long> {
}
