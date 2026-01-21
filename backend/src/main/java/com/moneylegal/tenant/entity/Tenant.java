package com.moneylegal.tenant.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

/**
 * Entidade Tenant - Representa um workspace (família, empresa, pessoal)
 * 
 * Um tenant pode ser:
 * - PERSONAL: Uso individual
 * - FAMILY: Gestão familiar
 * - BUSINESS: Gestão empresarial
 * 
 * Planos:
 * - FREE: Até 3 membros, recursos básicos
 * - PREMIUM: Membros ilimitados, recursos avançados
 * - ENTERPRISE: Customização completa
 */
@Entity
@Table(name = "tenants", indexes = {
    @Index(name = "idx_tenants_slug", columnList = "slug", unique = true),
    @Index(name = "idx_tenants_owner", columnList = "owner_id"),
    @Index(name = "idx_tenants_plan", columnList = "plan"),
    @Index(name = "idx_tenants_is_active", columnList = "is_active")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tenant {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(length = 36, nullable = false, updatable = false)
    private String id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private TenantType type = TenantType.PERSONAL;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private TenantPlan plan = TenantPlan.FREE;

    @Column(name = "owner_id", nullable = false, length = 36)
    private String ownerId;

    @Enumerated(EnumType.STRING)
    @Column(name = "subscription_status", length = 20)
    @Builder.Default
    private SubscriptionStatus subscriptionStatus = SubscriptionStatus.TRIAL;

    @Column(name = "subscription_started_at")
    private LocalDateTime subscriptionStartedAt;

    @Column(name = "subscription_expires_at")
    private LocalDateTime subscriptionExpiresAt;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    /**
     * Tenant configuration
     */
    @Column(name = "max_members")
    private Integer maxMembers;

    @Column(name = "max_accounts")
    private Integer maxAccounts;

    @Column(name = "max_budgets")
    private Integer maxBudgets;

    /**
     * Branding
     */
    @Column(name = "logo_url", length = 500)
    private String logoUrl;

    @Column(name = "primary_color", length = 7)
    private String primaryColor;

    /**
     * Lifecycle hooks
     */
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Business methods
     */
    public void activate() {
        this.isActive = true;
    }

    public void deactivate() {
        this.isActive = false;
    }

    public void startSubscription(TenantPlan plan, int durationDays) {
        this.plan = plan;
        this.subscriptionStartedAt = LocalDateTime.now();
        this.subscriptionExpiresAt = LocalDateTime.now().plusDays(durationDays);
        this.subscriptionStatus = SubscriptionStatus.ACTIVE;
        
        // Define limites baseado no plano
        switch (plan) {
            case FREE -> {
                this.maxMembers = 3;
                this.maxAccounts = 5;
                this.maxBudgets = 3;
            }
            case PREMIUM -> {
                this.maxMembers = null; // ilimitado
                this.maxAccounts = null;
                this.maxBudgets = null;
            }
            case ENTERPRISE -> {
                this.maxMembers = null;
                this.maxAccounts = null;
                this.maxBudgets = null;
            }
        }
    }

    public void cancelSubscription() {
        this.subscriptionStatus = SubscriptionStatus.CANCELLED;
    }

    public void expireSubscription() {
        this.subscriptionStatus = SubscriptionStatus.EXPIRED;
        this.plan = TenantPlan.FREE;
    }

    public boolean isSubscriptionActive() {
        return subscriptionStatus == SubscriptionStatus.ACTIVE 
            && (subscriptionExpiresAt == null || subscriptionExpiresAt.isAfter(LocalDateTime.now()));
    }

    public boolean canAddMember(int currentMemberCount) {
        return maxMembers == null || currentMemberCount < maxMembers;
    }

    public boolean canAddAccount(int currentAccountCount) {
        return maxAccounts == null || currentAccountCount < maxAccounts;
    }

    public boolean canAddBudget(int currentBudgetCount) {
        return maxBudgets == null || currentBudgetCount < maxBudgets;
    }

    /**
     * Enums
     */
    public enum TenantType {
        PERSONAL,
        FAMILY,
        BUSINESS
    }

    public enum TenantPlan {
        FREE,
        PREMIUM,
        ENTERPRISE
    }

    public enum SubscriptionStatus {
        TRIAL,
        ACTIVE,
        CANCELLED,
        EXPIRED,
        SUSPENDED
    }
}
