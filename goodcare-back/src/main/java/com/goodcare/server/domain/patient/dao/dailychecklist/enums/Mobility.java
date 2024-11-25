package com.goodcare.server.domain.patient.dao.dailychecklist.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Mobility {
    NORMAL("정상"),
    LIMITED("제한적"),
    NEED_TO_HELP("부축 필요");

    private final String mobility;
}
