import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, DollarSign } from 'lucide-react';
import { useLogin } from '@/hooks/useLogin';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-scale-in">
        {/* Logo e Título */}
        <div className="text-center space-y-2">
          <div className="logo justify-center">
            <div className="logo-icon">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="logo-text">Money Legal</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Entre na sua conta</h2>
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link 
              to="/register" 
              className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Criar conta grátis
            </Link>
          </p>
        </div>

        {/* Formulário */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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

          {/* Senha */}
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
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
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>

          {/* Lembrar-me e Esqueci senha */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <input
                id="rememberMe"
                type="checkbox"
                {...register('rememberMe')}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 
                         focus:ring-primary-500 focus:ring-offset-0 transition-colors"
              />
              <label htmlFor="rememberMe" className="text-gray-700 cursor-pointer select-none">
                Lembrar de mim
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Esqueceu a senha?
            </Link>
          </div>

          {/* Botão de Submit */}
          <button
            type="submit"
            disabled={login.isPending}
            className="btn btn-primary w-full btn-lg"
          >
            {login.isPending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 pt-4 border-t border-gray-100">
          Ao continuar, você concorda com nossos{' '}
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
