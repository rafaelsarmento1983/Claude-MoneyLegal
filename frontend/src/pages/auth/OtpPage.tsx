import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";

import { Button } from "@/components/ui/Button";
import { authService } from "@/services/authService";
import logo from "@/assets/logo.png";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeSlide = {
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease } },
};

const OTP_LENGTH = 6;
const RESEND_TIMEOUT_SEC = 60;

function onlyDigits(s: string) {
  return s.replace(/\D/g, "");
}

function formatMMSS(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export const OtpPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = (location.state as any)?.email as string | undefined;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT_SEC);

  // Erro mostrado inline (abaixo dos campos)
  const [error, setError] = useState<string | null>(null);

  // refs dos inputs segmentados
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Se caiu aqui sem email, volta pro início do fluxo
  useEffect(() => {
    if (!email) navigate("/forgot-password", { replace: true });
  }, [email, navigate]);

  // Countdown para liberar "Reenviar"
  useEffect(() => {
    if (timeLeft <= 0) return;

    const t = window.setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => window.clearTimeout(t);
  }, [timeLeft]);

  const canResend = timeLeft <= 0 && !resendLoading && !loading;

  const otpComplete = useMemo(() => otp.length === OTP_LENGTH, [otp]);

  const resetTimer = () => setTimeLeft(RESEND_TIMEOUT_SEC);

  const focusIndex = (i: number) => {
    const el = inputsRef.current[i];
    if (el) el.focus();
  };

  const setOtpAt = (index: number, digit: string) => {
    const chars = otp.split("");
    while (chars.length < OTP_LENGTH) chars.push("");
    chars[index] = digit;
    const next = chars.join("").slice(0, OTP_LENGTH);
    setOtp(next);
  };

  const handleChangeDigit = (index: number, raw: string) => {
    setError(null);

    const d = onlyDigits(raw);
    if (!d) {
      setOtpAt(index, "");
      return;
    }

    // Se o usuário digitou mais de 1 char (alguns teclados fazem isso),
    // tratamos como paste começando do index.
    if (d.length > 1) {
      const chars = otp.split("");
      while (chars.length < OTP_LENGTH) chars.push("");

      for (let k = 0; k < d.length && index + k < OTP_LENGTH; k++) {
        chars[index + k] = d[k];
      }

      const next = chars.join("").slice(0, OTP_LENGTH);
      setOtp(next);

      const nextFocus = Math.min(index + d.length, OTP_LENGTH - 1);
      focusIndex(nextFocus);
      return;
    }

    setOtpAt(index, d[0]);

    // auto-avanço
    if (index < OTP_LENGTH - 1) focusIndex(index + 1);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);

    if (e.key === "Backspace") {
      // se o campo atual está vazio, volta foco e apaga anterior
      if (!otp[index] && index > 0) {
        e.preventDefault();
        setOtpAt(index - 1, "");
        focusIndex(index - 1);
      } else {
        // apaga o atual
        setOtpAt(index, "");
      }
    }

    // setas para navegar
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusIndex(index - 1);
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      e.preventDefault();
      focusIndex(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text");
    const d = onlyDigits(text).slice(0, OTP_LENGTH);

    if (!d) return;

    e.preventDefault();
    setOtp(d.padEnd(OTP_LENGTH, "").slice(0, OTP_LENGTH));

    // foca último preenchido
    const last = Math.min(d.length - 1, OTP_LENGTH - 1);
    focusIndex(Math.max(last, 0));
  };

  const handleSubmit = async () => {
    if (!email || !otpComplete || loading) return;

    setLoading(true);
    setError(null);

    try {
      // ✅ Compatível com OTP single-use:
      // se já tiver sido usado, o backend deve retornar erro e cai no catch.
      await authService.validatePasswordResetOtp({
        email,
        otp,
      });

      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });

      // segue para reset passando email+otp
      setTimeout(() => {
        navigate("/reset-password", {
          state: { email, otp, forceLogout: true }, // (4) usado no ResetPasswordPage
          replace: true,
        });
      }, 450);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Código inválido ou expirado.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email || !canResend) return;

    setResendLoading(true);
    setError(null);

    try {
      // ✅ Reenvia usando o mesmo endpoint que /forgot-password
      await authService.requestPasswordReset({ email });

      // limpa otp e reinicia timer
      setOtp("");
      resetTimer();

      // foca primeiro campo
      setTimeout(() => focusIndex(0), 0);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Não foi possível reenviar o código.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[var(--color-secondary-blue-10)] to-white" />

      <div className="relative z-10 w-full max-w-[520px] rounded-[28px] bg-white shadow-2xl border border-neutral-200/70 px-8 pb-10">
        <div className="flex justify-center mt-8">
          <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
        </div>

        <h1 className="mt-4 text-center text-3xl font-extrabold text-neutral-900">
          Código de verificação
        </h1>

        <p className="mt-2 text-center text-sm text-neutral-500">
          Digite o código de {OTP_LENGTH} dígitos enviado para seu e-mail.
        </p>

        <motion.div {...fadeSlide} className="mt-6 space-y-4">
          {/* OTP segmentado */}
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: OTP_LENGTH }).map((_, i) => {
              const hasError = !!error;
              const base =
                "w-12 h-14 text-center text-xl font-bold rounded-xl border outline-none transition";
              const border = hasError
                ? "border-danger-300 focus:border-danger-400 focus:ring-2 focus:ring-danger-400/20"
                : "border-neutral-300 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/20";

              return (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  value={otp[i] || ""}
                  onChange={(e) => handleChangeDigit(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  inputMode="numeric"
                  autoComplete={i === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  className={`${base} ${border}`}
                  aria-label={`Dígito ${i + 1}`}
                />
              );
            })}
          </div>

          {/* erro inline */}
          {error && (
            <div className="text-center text-sm text-danger-700">
              {error}
            </div>
          )}

          {/* feedback do timer */}
          <div className="text-center text-sm text-neutral-500">
            {timeLeft > 0
              ? `Você pode reenviar o código em ${formatMMSS(timeLeft)}`
              : "Não recebeu o código?"}
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleSubmit}
              disabled={!otpComplete || loading || resendLoading}
              loading={loading}
              rightIcon={
                loading ? <Loader2 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />
              }
            >
              Verificar código
            </Button>

            <Button
              variant="outline"
              tone="plain"
              onClick={handleResend}
              disabled={!canResend}
              loading={resendLoading}
            >
              Reenviar código
            </Button>

            <Button
              variant="outline"
              tone="plain"
              onClick={() => navigate("/forgot-password", { replace: true })}
              disabled={loading || resendLoading}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Voltar
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OtpPage;
