package com.sportsmajors.job.service;

import com.sportsmajors.job.controller.dto.JobDto.*;
import com.sportsmajors.job.domain.Job;
import com.sportsmajors.job.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static com.sportsmajors.job.repository.JobRepository.*;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;

    @Transactional
    public JobResponse createJob(UUID employerId, JobCreateRequest request) {
        Job job = Job.builder()
                .employerId(employerId)
                .title(request.getTitle())
                .description(request.getDescription())
                .location(request.getLocation())
                .sport(request.getSport())
                .optFriendly(request.isOptFriendly())
                .build();
        
        Job savedJob = jobRepository.save(job);
        return mapToResponse(savedJob);
    }

    public Page<JobResponse> searchJobs(String sport, String location, Boolean optFriendly, Pageable pageable) {
        Specification<Job> spec = Specification.where(hasSport(sport))
                .and(hasLocation(location))
                .and(isOptFriendly(optFriendly));
        
        return jobRepository.findAll(spec, pageable).map(this::mapToResponse);
    }

    public JobResponse getJob(UUID id) {
        return jobRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    private JobResponse mapToResponse(Job job) {
        return JobResponse.builder()
                .id(job.getId())
                .employerId(job.getEmployerId())
                .title(job.getTitle())
                .description(job.getDescription())
                .location(job.getLocation())
                .sport(job.getSport())
                .optFriendly(job.isOptFriendly())
                .status(job.getStatus())
                .build();
    }
}
