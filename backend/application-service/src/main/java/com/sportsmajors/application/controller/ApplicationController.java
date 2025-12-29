package com.sportsmajors.application.controller;

import com.sportsmajors.application.domain.Application.ApplicationStatus;
import com.sportsmajors.application.service.ApplicationService;
import com.sportsmajors.application.service.ApplicationService.ApplicationResponse;
import com.sportsmajors.application.service.ApplicationService.ApplyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<ApplicationResponse> apply(
            @RequestHeader("X-User-Id") UUID candidateId,
            @RequestBody ApplyRequest request
    ) {
        return ResponseEntity.ok(applicationService.apply(candidateId, request));
    }

    @GetMapping("/me")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(@RequestHeader("X-User-Id") UUID candidateId) {
        return ResponseEntity.ok(applicationService.getCandidateApplications(candidateId));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicationResponse>> getJobApplications(@PathVariable UUID jobId) {
        return ResponseEntity.ok(applicationService.getJobApplications(jobId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApplicationResponse> updateStatus(
            @PathVariable UUID id,
            @RequestParam ApplicationStatus status
    ) {
        return ResponseEntity.ok(applicationService.updateStatus(id, status));
    }
}
