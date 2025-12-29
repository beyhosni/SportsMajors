package com.sportsmajors.employer.controller;

import com.sportsmajors.employer.service.EmployerService;
import com.sportsmajors.employer.service.EmployerService.EmployerProfileRequest;
import com.sportsmajors.employer.service.EmployerService.EmployerResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/employers")
@RequiredArgsConstructor
public class EmployerController {

    private final EmployerService employerService;

    @PostMapping("/me")
    public ResponseEntity<EmployerResponse> updateProfile(
            @RequestHeader("X-User-Id") UUID userId,
            @RequestBody EmployerProfileRequest request
    ) {
        return ResponseEntity.ok(employerService.createOrUpdateProfile(userId, request));
    }

    @GetMapping("/me")
    public ResponseEntity<EmployerResponse> getProfile(@RequestHeader("X-User-Id") UUID userId) {
        return ResponseEntity.ok(employerService.getProfile(userId));
    }
}
