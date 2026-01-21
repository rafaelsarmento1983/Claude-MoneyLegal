import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, DollarSign, CheckCircle2 } from 'lucide-react';
import { useRegister } from '@/hooks/useRegister';

const registerSchema = z
  .object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(10, 'Telefone inválido').optional().or(z.literal('')),
    password: z
      .string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter ao menos uma letra maiúscula')
      .regex(/[0-9]/, 'Senha deve conter ao menos um número'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password', '');

  const passwordRequirements = [
    { met: password.length >= 8, text: 'Mínimo 8 caracteres' },
    { met: /[A-Z]/.test(password), text: 'Uma letra maiúscula' },
    { met: /[0-9]/.test(password), text: 'Um número' },
  ];

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate({
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      password: data.password,
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-scale-in" style={{ maxWidth: '520px' }}>
        {/* Logo e Título */}
        <div className="text-center space-y-2">
          <div className="logo justify-center">
            <div className="logo-icon">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="logo-text">Money Legal</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Criar conta grátis</h2>
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Entrar
            </Link>
          </p>
        </div>

        {/* Formulário */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Nome */}
          <div className="form-group">
            <label htmlFor="name">Nome completo</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="João Silva"
              {...register('name')}
              className={errors.name ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-100' : ''}
            />
            {errors.name && (
              <p className="form-error">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              {...register('email')}
              className={errors.email ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-100' : ''}
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>

          {/* Telefone */}
          <div className="form-group">
            <label htmlFor="phone">Telefone (opcional)</label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(11) 98765-4321"
              {...register('phone')}
              className={errors.phone ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-100' : ''}
            />
            {errors.phone && (
              <p className="form-error">{errors.phone.message}</p>
            )}
          </div>

          {/* Senha */}
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                {...register('password')}
                className={errors.password ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-100 pr-12' : 'pr-12'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Requisitos da senha */}
            {password && (
              <div className="mt-2 space-y-1">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        req.met ? 'text-success-600' : 'text-gray-300'
                      }`}
                    />
                    <span
                      className={req.met ? 'text-success-600' : 'text-gray-500'}
                    >
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>

          {/* Confirmar Senha */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                className={errors.confirmPassword ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-100 pr-12' : 'pr-12'}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="form-error">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Botão de Submit */}
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="btn btn-primary w-full btn-lg"
          >
            {registerMutation.isPending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Criando conta...
              </span>
            ) : (
              'Criar Conta'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 pt-4 border-t border-gray-100">
          Ao criar uma conta, você concorda com nossos{' '}
          <a href="#" className="text-primary-600 hover:text-primary-700">
            Termos de Serviço
          </a>{' '}
          e{' '}
          <a href="#" className="text-primary-600 hover:text-primary-700">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
}
