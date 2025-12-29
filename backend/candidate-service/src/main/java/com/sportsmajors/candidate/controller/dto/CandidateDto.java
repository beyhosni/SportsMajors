package com.sportsmajors.candidate.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

public class CandidateDto {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CandidateProfileRequest {
        private String university;
        private String sport;
        private LocalDate graduationDate;
        private LocalDate optStart;
        private LocalDate optEnd;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CandidateResponse {
        private UUID id;
        private String university;
        private String sport;
        private LocalDate graduationDate;
        private LocalDate optStart;
        private LocalDate optEnd;
        private String cvUrl;
    }
}
