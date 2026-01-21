package com.moneylegal.tenant.repository;

import com.moneylegal.tenant.entity.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repository para Tenant
 */
@Repository
public interface TenantRepository extends JpaRepository<Tenant, String> {

    /**
     * Buscar tenant por slug
     */
    Optional<Tenant> findBySlug(String slug);

    /**
     * Verificar se slug existe
     */
    boolean existsBySlug(String slug);

    /**
     * Buscar tenants do owner
     */
    List<Tenant> findByOwnerId(String ownerId);

    /**
     * Buscar tenants ativos
     */
    List<Tenant> findByIsActiveTrue();

    /**
     * Buscar tenants por tipo
     */
    List<Tenant> findByType(Tenant.TenantType type);

    /**
     * Buscar tenants por plano
     */
    List<Tenant> findByPlan(Tenant.TenantPlan plan);

    /**
     * Buscar tenants com assinatura ativa
     */
    @Query("SELECT t FROM Tenant t WHERE t.subscriptionStatus = 'ACTIVE' AND (t.subscriptionExpiresAt IS NULL OR t.subscriptionExpiresAt > :now)")
    List<Tenant> findWithActiveSubscription(@Param("now") LocalDateTime now);

    /**
     * Buscar tenants com assinatura expirada
     */
    @Query("SELECT t FROM Tenant t WHERE t.subscriptionStatus = 'ACTIVE' AND t.subscriptionExpiresAt < :now")
    List<Tenant> findWithExpiredSubscription(@Param("now") LocalDateTime now);

    /**
     * Buscar tenants por nome (like)
     */
    @Query("SELECT t FROM Tenant t WHERE LOWER(t.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Tenant> searchByName(@Param("name") String name);

    /**
     * Contar tenants por tipo
     */
    long countByType(Tenant.TenantType type);

    /**
     * Contar tenants por plano
     */
    long countByPlan(Tenant.TenantPlan plan);

    /**
     * Buscar tenants criados recentemente
     */
    @Query("SELECT t FROM Tenant t WHERE t.createdAt >= :since ORDER BY t.createdAt DESC")
    List<Tenant> findRecentlyCreated(@Param("since") LocalDateTime since);
}
