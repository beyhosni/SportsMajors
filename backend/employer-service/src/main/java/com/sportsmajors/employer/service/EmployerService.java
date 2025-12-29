package com.sportsmajors.employer.service;

import com.sportsmajors.employer.domain.Employer;
import com.sportsmajors.employer.repository.EmployerRepository;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmployerService {

    private final EmployerRepository employerRepository;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class EmployerProfileRequest {
        private String companyName;
        private String website;
        private String description;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class EmployerResponse {
        private UUID id;
        private String companyName;
        private String website;
        private String description;
        private String logoUrl;
    }

    @Transactional
    public EmployerResponse createOrUpdateProfile(UUID userId, EmployerProfileRequest request) {
        Employer employer = employerRepository.findById(userId)
                .orElse(new Employer());
        
        employer.setId(userId);
        employer.setCompanyName(request.getCompanyName());
        employer.setWebsite(request.getWebsite());
        employer.setDescription(request.getDescription());
        
        Employer savedEmployer = employerRepository.save(employer);
        return mapToResponse(savedEmployer);
    }

    public EmployerResponse getProfile(UUID userId) {
        return employerRepository.findById(userId)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("Organization not found"));
    }

    private EmployerResponse mapToResponse(Employer employer) {
        return EmployerResponse.builder()
                .id(employer.getId())
                .companyName(employer.getCompanyName())
                .website(employer.getWebsite())
                .description(employer.getDescription())
                .logoUrl(employer.getLogoUrl())
                .build();
    }
}
