import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import logo from "@/assets/logo.png";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeSlide = {
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease },
  },
};

interface LocationState {
  email?: string;
  otp?: string;
  forceLogout?: boolean;
}

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearAuth } = useAuthStore();

  const { email, otp, forceLogout } = (location.state || {}) as LocationState;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 🔒 Proteção de rota:
   * não permite acesso direto ao reset sem OTP
   */
  useEffect(() => {
    if (!email || !otp) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, otp, navigate]);

  /**
   * 🔐 Requisitos de senha
   */
  const passwordRules = useMemo(
    () => [
      { label: "Mínimo de 8 caracteres", ok: password.length >= 8 },
      { label: "Uma letra maiúscula", ok: /[A-Z]/.test(password) },
      { label: "Uma letra minúscula", ok: /[a-z]/.test(password) },
      { label: "Um número", ok: /[0-9]/.test(password) },
      {
        label: "As senhas coincidem",
        ok: password === confirmPassword && !!password,
      },
    ],
    [password, confirmPassword]
  );

  const allRulesOk = passwordRules.every((r) => r.ok);

  /**
   * 🔁 Submit final
   */
  const handleSubmit = async () => {
    if (!email || !otp || !allRulesOk || loading) return;

    setLoading(true);
    setError(null);

    try {
      await authService.confirmPasswordReset({
        email,
        otp,
        password,
      });

      /**
       * 🔐 Força logout global no front
       * (mesmo que o backend já tenha invalidado tokens)
       */
      if (forceLogout) {
        clearAuth();
      }

      confetti({
        particleCount: 160,
        spread: 80,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 900);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Não foi possível redefinir a senha."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[var(--color-secondary-blue-10)] to-white" />

      <div className="relative z-10 w-full max-w-[520px] rounded-[28px] bg-white shadow-2xl border border-neutral-200/70 px-8 pb-10">
        <div className="flex justify-center mt-8">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 object-contain"
          />
        </div>

        <h1 className="mt-4 text-center text-3xl font-extrabold text-neutral-900">
          Criar nova senha
        </h1>

        <p className="mt-2 text-center text-sm text-neutral-500">
          Defina uma nova senha para sua conta.
        </p>

        <motion.div {...fadeSlide} className="mt-6 space-y-4">
          {/* Nova senha */}
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Nova senha"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            leftIcon={<Lock className="w-5 h-5" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-neutral-400 hover:text-neutral-600"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            }
          />

          {/* Confirmar senha */}
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar nova senha"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError(null);
            }}
            leftIcon={<Lock className="w-5 h-5" />}
            rightIcon={
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((v) => !v)
                }
                className="text-neutral-400 hover:text-neutral-600"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            }
          />

          {/* Regras de senha */}
          <div className="rounded-xl border border-neutral-200/70 bg-neutral-50 p-3">
            {passwordRules.map((rule) => (
              <div
                key={rule.label}
                className="flex items-center gap-2 text-xs"
              >
                {rule.ok ? (
                  <CheckCircle className="w-4 h-4 text-success-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-neutral-400" />
                )}
                <span
                  className={
                    rule.ok
                      ? "text-success-600 font-medium"
                      : "text-neutral-500"
                  }
                >
                  {rule.label}
                </span>
              </div>
            ))}
          </div>

          {/* Erro */}
          {error && (
            <div className="rounded-xl border border-danger-200 bg-danger-50 p-3 text-sm text-danger-700">
              {error}
            </div>
          )}

          {/* Ação */}
          <Button
            onClick={handleSubmit}
            disabled={!allRulesOk || loading}
            loading={loading}
            rightIcon={
              loading ? (
                <Loader2 className="w-4 h-4" />
              ) : undefined
            }
          >
            Redefinir senha
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
