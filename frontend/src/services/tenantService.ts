import api from './api';
import type {
  Tenant,
  CreateTenantRequest,
  UpdateTenantRequest,
  TenantMember,
  InviteMemberRequest,
  Invitation,
} from '@/types/tenant.types';

export const tenantService = {
  async create(data: CreateTenantRequest): Promise<Tenant> {
    const response = await api.post('/tenants', data);
    return response.data;
  },

  async getAll(): Promise<Tenant[]> {
    const response = await api.get('/tenants');
    return response.data;
  },

  async getById(id: string): Promise<Tenant> {
    const response = await api.get(`/tenants/${id}`);
    return response.data;
  },

  async update(id: string, data: UpdateTenantRequest): Promise<Tenant> {
    const response = await api.put(`/tenants/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/tenants/${id}`);
  },

  async getMembers(tenantId: string): Promise<TenantMember[]> {
    const response = await api.get(`/tenants/${tenantId}/members`);
    return response.data;
  },

  async inviteMember(tenantId: string, data: InviteMemberRequest): Promise<Invitation> {
    const response = await api.post(`/tenants/${tenantId}/members/invite`, data);
    return response.data;
  },

  async acceptInvitation(tenantId: string, code: string): Promise<TenantMember> {
    const response = await api.post(`/tenants/${tenantId}/members/accept`, { code });
    return response.data;
  },

  async removeMember(tenantId: string, memberId: string): Promise<void> {
    await api.delete(`/tenants/${tenantId}/members/${memberId}`);
  },

  async updateRole(tenantId: string, memberId: string, role: string): Promise<TenantMember> {
    const response = await api.put(`/tenants/${tenantId}/members/${memberId}/role`, null, {
      params: { role },
    });
    return response.data;
  },
};
