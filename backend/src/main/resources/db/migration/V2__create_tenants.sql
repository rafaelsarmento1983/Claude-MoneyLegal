CREATE TABLE tenants (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    type VARCHAR(20) NOT NULL DEFAULT 'PERSONAL',
    plan VARCHAR(20) NOT NULL DEFAULT 'FREE',
    owner_id VARCHAR(36) NOT NULL,
    subscription_status VARCHAR(20) DEFAULT 'TRIAL',
    subscription_started_at TIMESTAMP NULL,
    subscription_expires_at TIMESTAMP NULL,
    max_members INT,
    max_accounts INT,
    max_budgets INT,
    logo_url VARCHAR(500),
    primary_color VARCHAR(7),
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_tenants_owner FOREIGN KEY (owner_id) 
        REFERENCES users(id) ON DELETE RESTRICT,
    
    INDEX idx_tenants_slug (slug),
    INDEX idx_tenants_owner (owner_id),
    INDEX idx_tenants_plan (plan),
    INDEX idx_tenants_type (type),
    INDEX idx_tenants_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
