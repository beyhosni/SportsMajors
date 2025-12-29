CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY,
    employer_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    sport VARCHAR(100),
    is_opt_friendly BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'PUBLISHED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_jobs_sport ON jobs(sport);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_opt_friendly ON jobs(is_opt_friendly);
