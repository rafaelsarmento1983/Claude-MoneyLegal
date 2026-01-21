// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

const createTenantSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  type: z.enum(['PERSONAL', 'FAMILY', 'BUSINESS']),
  plan: z.enum(['FREE', 'PREMIUM']),
});

type CreateTenantFormData = z.infer<typeof createTenantSchema>;

export const TenantSelectionPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'create' | 'join'>('create');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTenantFormData>({
    resolver: zodResolver(createTenantSchema),
    defaultValues: {
      type: 'PERSONAL',
      plan: 'FREE',
    },
  });

  const onCreateTenant = (data: CreateTenantFormData) => {
    console.log('Creating tenant:', data);
    // TODO: Call API
    navigate('/dashboard');
  };

  const onJoinTenant = () => {
    console.log('Joining tenant');
    // TODO: Call API
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
            💰 Money Legal
          </h1>
          <p className="text-gray-600">Quase lá! Escolha como deseja começar</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Criar Novo Tenant */}
          <Card className="p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Criar Novo Workspace</h2>
              <p className="text-gray-600">Comece do zero e convide sua equipe ou família</p>
            </div>

            <form onSubmit={handleSubmit(onCreateTenant)} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Workspace</Label>
                <Input
                  id="name"
                  placeholder="Família Silva"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="type">Tipo</Label>
                <select
                  id="type"
                  {...register('type')}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:outline-none"
                >
                  <option value="PERSONAL">Pessoal</option>
                  <option value="FAMILY">Familiar</option>
                  <option value="BUSINESS">Empresarial</option>
                </select>
              </div>

              <div>
                <Label>Plano</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-purple-600">
                    <input type="radio" value="FREE" {...register('plan')} />
                    <div className="flex-1">
                      <p className="font-semibold">Free</p>
                      <p className="text-sm text-gray-600">Até 3 membros, recursos básicos</p>
                    </div>
                    <p className="font-bold text-purple-600">R$ 0/mês</p>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-purple-600 bg-purple-50 rounded-xl cursor-pointer">
                    <input type="radio" value="PREMIUM" {...register('plan')} />
                    <div className="flex-1">
                      <p className="font-semibold">Premium</p>
                      <p className="text-sm text-gray-600">Membros ilimitados, IA avançada</p>
                    </div>
                    <p className="font-bold text-purple-600">R$ 29/mês</p>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500"
              >
                Criar Workspace
              </Button>
            </form>
          </Card>

          {/* Ingressar em Tenant */}
          <Card className="p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Ingressar em Workspace</h2>
              <p className="text-gray-600">Foi convidado? Use o código de convite aqui</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Código de Convite</Label>
                <Input
                  id="code"
                  placeholder="ABC123XYZ"
                  className="text-center text-lg font-mono tracking-wider"
                />
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onJoinTenant}
              >
                Ingressar no Workspace
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t">
              <h3 className="font-semibold mb-3">Ou procure por nome:</h3>
              <Input placeholder="Buscar workspace..." className="mb-4" />

              <div className="space-y-2">
                <Card className="p-3 hover:border-purple-600 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                      FS
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Família Silva</p>
                      <p className="text-sm text-gray-500">5 membros</p>
                    </div>
                    <Button size="sm" variant="ghost">Solicitar</Button>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>

        {/* Pular */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-600 hover:text-gray-900"
          >
            Pular por enquanto, usar modo pessoal
          </button>
        </div>
      </div>
    </div>
  );
};