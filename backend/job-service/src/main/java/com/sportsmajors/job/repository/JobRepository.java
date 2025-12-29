package com.sportsmajors.job.repository;

import com.sportsmajors.job.domain.Job;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface JobRepository extends JpaRepository<Job, UUID>, JpaSpecificationExecutor<Job> {
    
    static Specification<Job> hasSport(String sport) {
        return (root, query, cb) -> sport == null ? null : cb.equal(root.get("sport"), sport);
    }

    static Specification<Job> hasLocation(String location) {
        return (root, query, cb) -> location == null ? null : cb.like(root.get("location"), "%" + location + "%");
    }

    static Specification<Job> isOptFriendly(Boolean optFriendly) {
        return (root, query, cb) -> optFriendly == null ? null : cb.equal(root.get("optFriendly"), optFriendly);
    }
}
