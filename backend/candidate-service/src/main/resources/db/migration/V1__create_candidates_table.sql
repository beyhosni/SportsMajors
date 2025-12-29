CREATE TABLE IF NOT EXISTS candidates (
    id UUID PRIMARY KEY,
    university VARCHAR(255) NOT NULL,
    sport VARCHAR(100) NOT NULL,
    graduation_date DATE NOT NULL,
    opt_start DATE,
    opt_end DATE,
    cv_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
