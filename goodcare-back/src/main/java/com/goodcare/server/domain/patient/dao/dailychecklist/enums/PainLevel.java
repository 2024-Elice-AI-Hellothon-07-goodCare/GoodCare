package com.goodcare.server.domain.patient.dao.dailychecklist.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PainLevel {
    NONE("없음"),
    MIGHT("경미"),
    MEDIUM("중증도"),
    SERIOUS("심각");

    private final String painLevel;
}
