package com.sportsmajors.application.service;

import com.sportsmajors.application.domain.Application;
import com.sportsmajors.application.domain.Application.ApplicationStatus;
import com.sportsmajors.application.repository.ApplicationRepository;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ApplyRequest {
        @NonNull private UUID jobId;
        private String resumeUrl;
        private String coverLetter;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ApplicationResponse {
        private UUID id;
        private UUID candidateId;
        private UUID jobId;
        private String resumeUrl;
        private String coverLetter;
        private ApplicationStatus status;
        private java.time.OffsetDateTime appliedAt;
    }

    @Transactional
    public ApplicationResponse apply(UUID candidateId, ApplyRequest request) {
        if (applicationRepository.existsByCandidateIdAndJobId(candidateId, request.getJobId())) {
            throw new RuntimeException("Already applied to this job");
        }

        Application application = Application.builder()
                .candidateId(candidateId)
                .jobId(request.getJobId())
                .resumeUrl(request.getResumeUrl())
                .coverLetter(request.getCoverLetter())
                .build();

        Application saved = applicationRepository.save(application);
        return mapToResponse(saved);
    }

    public List<ApplicationResponse> getCandidateApplications(UUID candidateId) {
        return applicationRepository.findByCandidateId(candidateId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ApplicationResponse> getJobApplications(UUID jobId) {
        return applicationRepository.findByJobId(jobId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ApplicationResponse updateStatus(UUID applicationId, ApplicationStatus status) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setStatus(status);
        return mapToResponse(applicationRepository.save(application));
    }

    private ApplicationResponse mapToResponse(Application app) {
        return ApplicationResponse.builder()
                .id(app.getId())
                .candidateId(app.getCandidateId())
                .jobId(app.getJobId())
                .resumeUrl(app.getResumeUrl())
                .coverLetter(app.getCoverLetter())
                .status(app.getStatus())
                .appliedAt(app.getAppliedAt())
                .build();
    }
}
