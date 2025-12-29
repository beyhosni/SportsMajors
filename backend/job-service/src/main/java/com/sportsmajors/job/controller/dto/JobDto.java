package com.sportsmajors.job.controller.dto;

import com.sportsmajors.job.domain.Job;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

public class JobDto {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class JobCreateRequest {
        private String title;
        private String description;
        private String location;
        private String sport;
        private boolean optFriendly;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class JobResponse {
        private UUID id;
        private UUID employerId;
        private String title;
        private String description;
        private String location;
        private String sport;
        private boolean optFriendly;
        private Job.JobStatus status;
    }
}
