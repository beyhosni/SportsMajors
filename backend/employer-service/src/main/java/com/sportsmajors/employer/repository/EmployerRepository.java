package com.sportsmajors.employer.repository;

import com.sportsmajors.employer.domain.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EmployerRepository extends JpaRepository<Employer, UUID> {
}
