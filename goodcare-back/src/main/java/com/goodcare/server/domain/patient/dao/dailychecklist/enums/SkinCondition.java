package com.goodcare.server.domain.patient.dao.dailychecklist.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SkinCondition {
    NORMAL("정상"),
    REDNESS("발적"),
    EDEMA("부종"),
    BEDSORE("욕창 발생 여부");

    private final String skinCondition;
}
