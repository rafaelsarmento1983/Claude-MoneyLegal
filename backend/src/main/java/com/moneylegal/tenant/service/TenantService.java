package com.moneylegal.tenant.service;

import com.moneylegal.tenant.dto.*;
import java.util.List;

/**
 * Interface TenantService
 */
public interface TenantService {
    TenantResponseDTO createTenant(CreateTenantDTO request, String userId);
    TenantResponseDTO getTenant(String tenantId, String userId);
    List<TenantResponseDTO> getUserTenants(String userId);
    TenantResponseDTO updateTenant(String tenantId, UpdateTenantDTO request, String userId);
    void deleteTenant(String tenantId, String userId);
    TenantSettingsDTO getSettings(String tenantId, String userId);
    TenantSettingsDTO updateSettings(String tenantId, TenantSettingsDTO request, String userId);
}
