<<<<<<< HEAD
# Claude-MoneyLegal
=======
# 💰 Money Legal - Sprint 1: Autenticação & Multi-Tenancy

![Status](https://img.shields.io/badge/status-completed-success)
![Sprint](https://img.shields.io/badge/sprint-1%2F15-blue)
![Backend](https://img.shields.io/badge/backend-Java%2017%20%7C%20Spring%20Boot-green)
![Frontend](https://img.shields.io/badge/frontend-React%2018%20%7C%20TypeScript-blue)
![Database](https://img.shields.io/badge/database-MySQL%208.0-orange)

> **Sistema completo de gestão financeira com Multi-Tenancy e IA**

---

## 📋 Índice Rápido

- [🎯 Visão Geral](#-visão-geral)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [📋 Requisitos](#-requisitos)
- [🚀 Instalação Rápida](#-instalação-rápida)
- [🧭 Fluxo de Navegação](#-fluxo-de-navegação)
- [📡 API Endpoints](#-api-endpoints)
- [🧪 Como Testar](#-como-testar)
- [💡 Exemplos de Uso](#-exemplos-de-uso)
- [🔧 Troubleshooting](#-troubleshooting)

---

## 🎯 Visão Geral

O **Sprint 1** estabelece a fundação completa do Money Legal com sistema de **Autenticação JWT** e **Multi-Tenancy** robusto.

### O que foi implementado?

✅ **Autenticação Completa**
- Registro com validações
- Login JWT (15min) + Refresh Token (7 dias)
- Auto-refresh transparente
- Logout com revogação

✅ **Multi-Tenancy Completo**
- Tenant pessoal automático
- 3 tipos (PERSONAL, FAMILY, BUSINESS)
- 3 planos (FREE, PREMIUM, ENTERPRISE)
- Roles hierárquicas (5 níveis)
- Sistema de convites

✅ **Backend REST API**
- 20 endpoints documentados
- Spring Security configurado
- Exception handling
- Validações robustas

✅ **Frontend Moderno**
- React 18 + TypeScript
- TailwindCSS + Components UI
- State management (Zustand)
- Form validation (Zod)

---

## ✨ Funcionalidades

| Categoria | Funcionalidade | Status |
|-----------|----------------|--------|
| **Auth** | Registro de usuários | ✅ |
| | Login email/senha | ✅ |
| | JWT + Refresh automático | ✅ |
| | Logout com revogação | ✅ |
| | Forgot Password* | 🟡 |
| | Email Verification* | 🟡 |
| **Tenant** | Criação automática (PERSONAL) | ✅ |
| | Criar tenant (FAMILY/BUSINESS) | ✅ |
| | Listar/Editar/Deletar | ✅ |
| | Sistema de convites | ✅ |
| | Gerenciar membros | ✅ |
| | Roles hierárquicas | ✅ |
| **Frontend** | Login Page | ✅ |
| | Register Page | ✅ |
| | Dashboard | ✅ |
| | Tenant Selection | ✅ |
| | Protected Routes | ✅ |

*🟡 = Endpoint pronto, email service não implementado

---

## 🛠️ Tecnologias

### Backend
- Java 17 + Spring Boot 3.2
- Spring Security + JWT
- MySQL 8.0 + Flyway
- Lombok + Validation

### Frontend
- React 18 + TypeScript
- Vite + TailwindCSS
- Zustand + TanStack Query
- React Hook Form + Zod

---

## 📋 Requisitos

```bash
✅ Java 17+
✅ Node.js 18+
✅ MySQL 8.0
✅ Maven 3.8+
```

---

## 🚀 Instalação Rápida

### 1. Banco de Dados

```bash
# Docker (Recomendado)
docker run -d --name moneylegal-mysql \
  -e MYSQL_ROOT_PASSWORD=moneylegal_2026 \
  -e MYSQL_DATABASE=moneylegal_dev \
  -p 3306:3306 mysql:8.0
```

### 2. Backend

```bash
cd backend
./mvnw spring-boot:run
# Roda em http://localhost:8080
```

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# Roda em http://localhost:3000
```

### 4. Testar

Acesse: `http://localhost:3000`
- Crie uma conta
- Faça login
- Explore o dashboard!

---

## 🧭 Fluxo de Navegação

### Novo Usuário

```
1. http://localhost:3000 → Redireciona para /login
2. Clica "Criar conta grátis" → /register
3. Preenche formulário:
   - Nome: João Silva
   - Email: joao@email.com
   - Senha: Senha123!
4. Clica "Criar Conta"
   ✅ Backend cria User + Tenant PERSONAL + Tokens
5. Redireciona para /dashboard
   ✅ "Bem-vindo, João!"
```

### Login Existente

```
1. Acessa /login
2. Preenche email + senha
3. Clica "Entrar"
   ✅ Gera novos tokens
4. Redireciona para /dashboard
```

### Token Expira (após 15min)

```
1. Faz requisição → 401 Unauthorized
2. Frontend AUTOMATICAMENTE:
   - Chama /auth/refresh
   - Obtém novos tokens
   - Refaz requisição original
3. Usuário nem percebe! ✨
```

### Criar Tenant

```
1. /tenant-selection
2. Preenche:
   - Nome: Família Silva
   - Tipo: FAMILY
   - Plano: FREE
3. Clica "Criar"
   ✅ Tenant criado + Role OWNER
```

### Convidar Membro

```
1. Dono convida: maria@email.com (MEMBER)
2. Backend gera código: AB12CD34
3. Maria:
   - Faz login
   - Vai em /tenant-selection
   - Cola código AB12CD34
   - Aceita convite
4. Maria agora é MEMBER do tenant!
```

---

## 📡 API Endpoints

### Autenticação (8 endpoints)

#### POST /api/v1/auth/register
```json
Request:
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "Senha123!"
}

Response: 201 Created
{
  "accessToken": "jwt...",
  "refreshToken": "uuid...",
  "user": { "id": "...", "name": "João Silva", ... },
  "defaultTenant": { "name": "Pessoal de João", "role": "OWNER" }
}
```

#### POST /api/v1/auth/login
```json
Request:
{
  "email": "joao@email.com",
  "password": "Senha123!"
}

Response: 200 OK (mesmo formato de /register)
```

#### POST /api/v1/auth/refresh
```json
Request:
{
  "refreshToken": "uuid..."
}

Response: 200 OK
{
  "accessToken": "novo-jwt...",
  "refreshToken": "novo-uuid..."
}
```

#### POST /api/v1/auth/logout
```json
Request:
{
  "refreshToken": "uuid..."
}

Response: 200 OK
```

### Tenants (7 endpoints)

#### POST /api/v1/tenants
```json
Headers: Authorization: Bearer {token}

Request:
{
  "name": "Família Silva",
  "type": "FAMILY",
  "plan": "FREE"
}

Response: 201 Created
{
  "id": "uuid",
  "name": "Família Silva",
  "slug": "familia-silva",
  "type": "FAMILY",
  "plan": "FREE",
  "userRole": "OWNER",
  "maxMembers": 5,
  "maxAccounts": 10,
  ...
}
```

#### GET /api/v1/tenants
Lista todos os tenants do usuário

#### GET /api/v1/tenants/{id}
Busca tenant específico

#### PUT /api/v1/tenants/{id}
Atualiza tenant (requer ADMIN+)

#### DELETE /api/v1/tenants/{id}
Deleta tenant (requer OWNER)

### Membros (5 endpoints)

#### POST /api/v1/tenants/{id}/members/invite
```json
Request:
{
  "email": "maria@email.com",
  "role": "MEMBER"
}

Response: 201 Created
{
  "code": "AB12CD34",
  "expiresAt": "2026-01-28T..."
}
```

#### POST /api/v1/tenants/{id}/members/accept
```json
Request:
{
  "code": "AB12CD34"
}

Response: 200 OK (retorna TenantMember)
```

#### GET /api/v1/tenants/{id}/members
Lista membros do tenant

#### DELETE /api/v1/tenants/{id}/members/{memberId}
Remove membro (requer ADMIN+)

#### PUT /api/v1/tenants/{id}/members/{memberId}/role?role=ADMIN
Altera role (requer OWNER)

---

## 🧪 Como Testar

### Teste 1: Registro Completo

```
1. Acesse http://localhost:3000
2. Clique "Criar conta grátis"
3. Preencha TODOS os campos
4. Clique "Criar Conta"

✅ Esperado:
   - Toast verde de sucesso
   - Redireciona para /dashboard
   - LocalStorage tem tokens
   - Dashboard mostra nome do usuário
   
❌ Se falhar:
   - "Email já cadastrado" → Use outro email
   - "500 Error" → Backend não está rodando
```

### Teste 2: Login

```
1. Faça logout
2. Volte para /login
3. Entre com mesmas credenciais

✅ Esperado:
   - Login bem-sucedido
   - Volta para /dashboard
```

### Teste 3: Auto-Refresh (Avançado)

```
1. Faça login
2. Abra DevTools → Network
3. Espere 16 minutos
4. Faça qualquer ação

✅ Esperado no Network:
   1. Request → 401
   2. POST /auth/refresh → 200
   3. Retry original → 200
   - Usuário não percebe nada!
```

### Teste 4: Criar Tenant

```
1. Login
2. /tenant-selection
3. Preencha: "Minha Empresa", BUSINESS, FREE
4. Criar

✅ Esperado:
   - Tenant criado
   - Slug: "minha-empresa"
   - Você é OWNER
```

### Teste 5: Sistema de Convites

```
PARTE 1 (Dono):
1. Login no tenant
2. Convide: amigo@email.com (MEMBER)
3. Copie código: AB12CD34

PARTE 2 (Convidado):
1. Crie conta: amigo@email.com
2. /tenant-selection
3. Cole código: AB12CD34
4. Aceitar convite

✅ Esperado:
   - Convite aceito
   - Tenant aparece na lista
   - Role: MEMBER
```

### Teste 6: Validações

```
Tente registrar com:
- Email inválido: "nao-eh-email" → Erro
- Senha fraca: "123" → Erro
- Senhas diferentes → Erro
- Campos vazios → Erro

✅ Todas devem mostrar mensagem apropriada
```

---

## 💡 Exemplos de Uso

### Frontend - Hook de Login

```typescript
import { useLogin } from '@/hooks/useLogin';

function LoginPage() {
  const login = useLogin();
  
  const handleSubmit = (data) => {
    login.mutate(data);
    // Auto: salva tokens, navega, mostra toast
  };
  
  return (
    <button disabled={login.isPending}>
      {login.isPending ? 'Entrando...' : 'Entrar'}
    </button>
  );
}
```

### Frontend - Verificar Permissões

```typescript
import { useAuth } from '@/hooks/useAuth';

function Settings() {
  const { isAdmin, isOwner, tenant } = useAuth();
  
  return (
    <>
      {isAdmin && <button>Convidar</button>}
      {isOwner && <button>Deletar Tenant</button>}
      <p>Tenant: {tenant?.name}</p>
      <p>Role: {tenant?.role}</p>
    </>
  );
}
```

### Backend - Endpoint com Validação

```java
@PostMapping("/{tenantId}/members/invite")
public ResponseEntity<InvitationDTO> invite(
    @PathVariable String tenantId,
    @Valid @RequestBody InviteMemberDTO request,
    Authentication auth
) {
    String userId = auth.getName();
    
    // Service valida se user é ADMIN+
    InvitationDTO invitation = memberService.inviteMember(
        tenantId, request, userId
    );
    
    return ResponseEntity.status(201).body(invitation);
}
```

---

## 🔧 Troubleshooting

### ❌ Backend não inicia

**"Cannot connect to database"**
```bash
# Verificar MySQL
docker ps

# Iniciar
docker start moneylegal-mysql
```

**"Port 8080 in use"**
```yaml
# application.yml
server:
  port: 8081  # Alterar porta
```

### ❌ Frontend não inicia

**"Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**"Cannot connect to backend"**
```bash
# Verificar .env
VITE_API_URL=http://localhost:8080/api/v1

# Testar backend
curl http://localhost:8080/actuator/health
```

### ❌ Migrations falham

```sql
-- Resetar banco
DROP DATABASE moneylegal_dev;
CREATE DATABASE moneylegal_dev CHARACTER SET utf8mb4;

-- Reiniciar backend (aplica migrations)
```

### ❌ 401 em toda requisição

```javascript
// Verificar localStorage
console.log(localStorage.getItem('accessToken'));

// Se vazio, fazer login
```

### ❌ 403 Forbidden

```
Causa: Permissões insuficientes

Verificar:
- Role do usuário
- Endpoint requer ADMIN/OWNER?
- Usar conta com permissão adequada
```

---

## 📊 Estatísticas do Sprint 1

```
📁 Arquivos:       70 arquivos
📝 Linhas:         ~7.500 linhas
🔌 Endpoints:      20 endpoints
🗃️ Tabelas:        5 tabelas
⚙️ Components UI:  5 componentes
🪝 Hooks:          4 hooks
📦 Tamanho ZIP:    79 KB
```

---

## 🎯 Próximos Passos

### Sprint 2: Accounts & Categories

```
📅 Duração: 2 semanas
📊 Entregas:
   - Módulo de Contas Bancárias
   - Sistema de Categorias (hierárquicas)
   - Histórico de saldos
   - ~15 novos endpoints
   - 35 arquivos
```

### Roadmap Completo

```
✅ Sprint 1:  Auth + Multi-Tenancy (COMPLETO)
⏳ Sprint 2:  Accounts + Categories
⏳ Sprint 3:  Transactions
⏳ Sprint 4:  Budgets
⏳ Sprint 5:  Goals & Investments
⏳ Sprint 6:  Reports
⏳ Sprint 7:  AI Semantic Categorization
⏳ Sprint 8:  AI Coach
⏳ Sprint 9:  Notifications
⏳ Sprint 10: Open Finance
⏳ Sprint 11: Gamification
⏳ Sprint 12: Mobile App
⏳ Sprint 13: Advanced Features
⏳ Sprint 14: Performance & Security
⏳ Sprint 15: Production Deploy
```

---

## ⚠️ Notas Importantes

### Não implementado no Sprint 1

```
🟡 Email Service (verificação/reset)
🟡 OAuth (Google/Facebook/Apple)
🟡 2FA
🟡 Rate Limiting
🟡 Account Lockout
🟡 Audit Logs
🟡 Soft Delete
```

### Para Produção

```
⚠️ CRÍTICO:
   - Alterar jwt.secret
   - Alterar senhas do banco
   - Usar HTTPS
   - Configurar CORS
   - Habilitar rate limiting
   - Adicionar 2FA
   - SSL no banco
```

### Limites dos Planos

```
FREE:
   - 5 membros
   - 10 contas
   - 5 orçamentos
   
PREMIUM:
   - 20 membros
   - 50 contas
   - 20 orçamentos
   - AI Coach básico
   
ENTERPRISE:
   - Ilimitado
   - AI completo
   - API access
```

---

## 📄 Licença

**Copyright © 2026 Money Legal. Todos os direitos reservados.**

---

## 📞 Suporte

Documentação completa:
- `SPRINT_1_RESUMO_COMPLETO.md`
- `GUIA_INSTALACAO.md`
- `VERIFICACAO_SPRINT_1_COMPLETA.md`

---

**Versão:** 1.0.0 | **Sprint:** 1/15 | **Status:** ✅ Completo  
**Data:** 21/01/2026

**🚀 Pronto para o Sprint 2? Vamos nessa!**
>>>>>>> d119f9c (sprint-1)
