// ============================================================

import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/hooks/useLogout';
import { Button } from '@/components/ui/button';

export const DashboardPage = () => {
  const { user, tenant } = useAuth();
  const { mutate: logout } = useLogout();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-600">Bem-vindo, {user?.name}!</p>
            </div>
            <Button variant="outline" onClick={() => logout()}>
              Sair
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 rounded-xl">
              <p className="text-sm opacity-90">Saldo Total</p>
              <p className="text-3xl font-bold mt-2">R$ 0,00</p>
            </div>

            <div className="bg-green-100 p-6 rounded-xl">
              <p className="text-sm text-green-700">Receitas</p>
              <p className="text-3xl font-bold text-green-700 mt-2">R$ 0,00</p>
            </div>

            <div className="bg-red-100 p-6 rounded-xl">
              <p className="text-sm text-red-700">Despesas</p>
              <p className="text-3xl font-bold text-red-700 mt-2">R$ 0,00</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Tenant Atual</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Nome:</strong> {tenant?.name}</p>
              <p><strong>Tipo:</strong> {tenant?.type}</p>
              <p><strong>Plano:</strong> {tenant?.plan}</p>
              <p><strong>Sua Role:</strong> {tenant?.role}</p>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-500">
            <p>🎉 Sprint 1 completo! Autenticação funcionando!</p>
            <p className="mt-2">Próximo: Sprint 2 - Transações</p>
          </div>
        </div>
      </div>
    </div>
  );
};