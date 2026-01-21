CREATE TABLE invitations (
    id VARCHAR(36) PRIMARY KEY,
    tenant_id VARCHAR(36) NOT NULL,
    email VARCHAR(255) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL DEFAULT 'MEMBER',
    invited_by VARCHAR(36) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    accepted_at TIMESTAMP NULL,
    rejected_at TIMESTAMP NULL,
    accepted_by VARCHAR(36),
    
    CONSTRAINT fk_invitations_tenant FOREIGN KEY (tenant_id) 
        REFERENCES tenants(id) ON DELETE CASCADE,
    CONSTRAINT fk_invitations_invited_by FOREIGN KEY (invited_by) 
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_invitations_accepted_by FOREIGN KEY (accepted_by) 
        REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_invitations_tenant (tenant_id),
    INDEX idx_invitations_email (email),
    INDEX idx_invitations_code (code),
    INDEX idx_invitations_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
