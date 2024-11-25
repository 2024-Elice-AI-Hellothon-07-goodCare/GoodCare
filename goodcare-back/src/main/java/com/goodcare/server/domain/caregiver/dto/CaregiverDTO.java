package com.goodcare.server.domain.caregiver.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CaregiverDTO {
    private String name;
    private LocalDate dateOfBirth;
    private String gender;
    private String contactNumber;
}
