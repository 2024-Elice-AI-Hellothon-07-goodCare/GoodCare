package com.goodcare.server.domain.patient.dao.dailychecklist.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MoodBehaviour {
    SAME_AS_USUAL("평소와_동일"),
    ANXIETY("불안감"),
    DEPRESSION("우울감"),
    EXCITEMENT_OVERCROWD("흥분 과민");

    private String moodBehaviour;
}
