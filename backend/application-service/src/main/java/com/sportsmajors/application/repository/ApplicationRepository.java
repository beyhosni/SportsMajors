package com.sportsmajors.application.repository;

import com.sportsmajors.application.domain.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<Application, UUID> {
    List<Application> findByCandidateId(UUID candidateId);
    List<Application> findByJobId(UUID jobId);
    boolean existsByCandidateIdAndJobId(UUID candidateId, UUID jobId);
}
