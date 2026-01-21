CREATE TABLE tenant_members (
    id VARCHAR(36) PRIMARY KEY,
    tenant_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'MEMBER',
    invited_by VARCHAR(36),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    
    CONSTRAINT fk_tenant_members_tenant FOREIGN KEY (tenant_id) 
        REFERENCES tenants(id) ON DELETE CASCADE,
    CONSTRAINT fk_tenant_members_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_tenant_members_invited_by FOREIGN KEY (invited_by) 
        REFERENCES users(id) ON DELETE SET NULL,
    
    UNIQUE KEY uk_tenant_members (tenant_id, user_id),
    INDEX idx_tenant_members_tenant (tenant_id),
    INDEX idx_tenant_members_user (user_id),
    INDEX idx_tenant_members_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
