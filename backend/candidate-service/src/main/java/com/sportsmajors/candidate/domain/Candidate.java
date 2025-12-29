package com.sportsmajors.candidate.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "candidates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Candidate {

    @Id
    private UUID id; // Matches User ID from identity-service

    @Column(nullable = false)
    private String university;

    @Column(nullable = false)
    private String sport;

    @Column(name = "graduation_date", nullable = false)
    private LocalDate graduationDate;

    @Column(name = "opt_start")
    private LocalDate optStart;

    @Column(name = "opt_end")
    private LocalDate optEnd;

    @Column(name = "cv_url")
    private String cvUrl;

    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = OffsetDateTime.now();
    }
}
