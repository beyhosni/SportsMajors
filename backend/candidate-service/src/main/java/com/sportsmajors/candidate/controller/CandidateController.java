package com.sportsmajors.candidate.controller;

import com.sportsmajors.candidate.controller.dto.CandidateDto.*;
import com.sportsmajors.candidate.service.CandidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/candidates")
@RequiredArgsConstructor
public class CandidateController {

    private final CandidateService candidateService;

    // In a real scenario, the userId would be extracted from the JWT/SecurityContext
    // For MVP/Phase 1 simplicity, we'll assume a header or direct ID for now
    // In actual execution, we'll use @AuthenticationPrincipal
    
    @PostMapping("/me")
    public ResponseEntity<CandidateResponse> updateProfile(
            @RequestHeader("X-User-Id") UUID userId,
            @RequestBody CandidateProfileRequest request
    ) {
        return ResponseEntity.ok(candidateService.createOrUpdateProfile(userId, request));
    }

    @GetMapping("/me")
    public ResponseEntity<CandidateResponse> getProfile(@RequestHeader("X-User-Id") UUID userId) {
        return ResponseEntity.ok(candidateService.getProfile(userId));
    }
}
