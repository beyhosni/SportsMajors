package com.sportsmajors.candidate.service;

import com.sportsmajors.candidate.controller.dto.CandidateDto.*;
import com.sportsmajors.candidate.domain.Candidate;
import com.sportsmajors.candidate.repository.CandidateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CandidateService {

    private final CandidateRepository candidateRepository;

    @Transactional
    public CandidateResponse createOrUpdateProfile(UUID userId, CandidateProfileRequest request) {
        Candidate candidate = candidateRepository.findById(userId)
                .orElse(new Candidate());
        
        candidate.setId(userId);
        candidate.setUniversity(request.getUniversity());
        candidate.setSport(request.getSport());
        candidate.setGraduationDate(request.getGraduationDate());
        candidate.setOptStart(request.getOptStart());
        candidate.setOptEnd(request.getOptEnd());
        
        Candidate savedCandidate = candidateRepository.save(candidate);
        return mapToResponse(savedCandidate);
    }

    public CandidateResponse getProfile(UUID userId) {
        return candidateRepository.findById(userId)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    private CandidateResponse mapToResponse(Candidate candidate) {
        return CandidateResponse.builder()
                .id(candidate.getId())
                .university(candidate.getUniversity())
                .sport(candidate.getSport())
                .graduationDate(candidate.getGraduationDate())
                .optStart(candidate.getOptStart())
                .optEnd(candidate.getOptEnd())
                .cvUrl(candidate.getCvUrl())
                .build();
    }
}
