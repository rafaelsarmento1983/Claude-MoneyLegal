export interface Tenant {
  id: string;
  name: string;
  slug: string;
  type: 'PERSONAL' | 'FAMILY' | 'BUSINESS';
  plan: 'FREE' | 'PREMIUM' | 'ENTERPRISE';
  ownerId: string;
  subscriptionStatus: string;
  subscriptionExpiresAt?: string;
  maxMembers?: number;
  maxAccounts?: number;
  maxBudgets?: number;
  logoUrl?: string;
  primaryColor?: string;
  isActive: boolean;
  createdAt: string;
  currentMemberCount?: number;
  currentAccountCount?: number;
  currentBudgetCount?: number;
  userRole?: string;
}

export interface CreateTenantRequest {
  name: string;
  type: 'PERSONAL' | 'FAMILY' | 'BUSINESS';
  plan?: 'FREE' | 'PREMIUM' | 'ENTERPRISE';
  logoUrl?: string;
  primaryColor?: string;
}

export interface UpdateTenantRequest {
  name?: string;
  logoUrl?: string;
  primaryColor?: string;
}

export interface TenantMember {
  id: string;
  tenantId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatarUrl?: string;
  role: 'VIEWER' | 'MEMBER' | 'MANAGER' | 'ADMIN' | 'OWNER';
  invitedBy?: string;
  invitedByName?: string;
  joinedAt: string;
  isActive: boolean;
}

export interface InviteMemberRequest {
  email: string;
  role: 'VIEWER' | 'MEMBER' | 'MANAGER' | 'ADMIN';
  message?: string;
}

export interface Invitation {
  id: string;
  tenantId: string;
  tenantName: string;
  email: string;
  code: string;
  role: string;
  invitedBy: string;
  invitedByName?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  createdAt: string;
  expiresAt: string;
  isExpired: boolean;
}
