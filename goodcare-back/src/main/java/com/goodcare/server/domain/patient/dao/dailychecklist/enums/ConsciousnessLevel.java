package com.goodcare.server.domain.patient.dao.dailychecklist.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ConsciousnessLevel {
    CLEAR("명료"),
    SLEEPY("졸림"),
    CHAOS("혼돈"),
    NO_RESPONSE("반응_없음");

    private final String consciousnessLevel;
}
