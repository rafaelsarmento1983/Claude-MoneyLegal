import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Zap, Star, Crown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

const plans = [
  {
    name: 'Gratuito',
    icon: Sparkles,
    price: 0,
    period: 'para sempre',
    description: 'Perfeito para começar a organizar suas finanças',
    gradient: 'from-gray-600 to-gray-700',
    features: [
      { text: 'Até 10 transações por mês', included: true },
      { text: '1 conta bancária', included: true },
      { text: 'Relatórios básicos', included: true },
      { text: 'Categorias padrão', included: true },
      { text: 'Suporte por email', included: true },
      { text: 'Conexão bancária', included: false },
      { text: 'Contas ilimitadas', included: false },
      { text: 'Relatórios avançados', included: false },
    ],
    cta: 'Começar grátis',
    popular: false,
    testimonial: {
      text: 'Ótimo para começar! Consegui organizar minhas despesas básicas.',
      author: 'Maria S.'
    }
  },
  {
    name: 'Conectado',
    icon: Zap,
    price: 19.90,
    period: '/mês',
    description: 'Ideal para quem quer automatizar o controle financeiro',
    gradient: 'from-blue-600 via-cyan-500 to-blue-700',
    features: [
      { text: 'Transações ilimitadas', included: true },
      { text: 'Até 3 contas bancárias', included: true },
      { text: 'Conexão bancária automática', included: true },
      { text: 'Histórico de 90 dias', included: true },
      { text: 'Relatórios avançados', included: true },
      { text: 'Categorias personalizadas', included: true },
      { text: 'Alertas inteligentes', included: true },
      { text: 'Suporte prioritário', included: false },
    ],
    cta: 'Assinar agora',
    popular: true,
    testimonial: {
      text: 'A conexão bancária economiza muito tempo! Vale cada centavo.',
      author: 'João P.'
    }
  },
  {
    name: 'Conectado Plus',
    icon: Crown,
    price: 39.90,
    period: '/mês',
    description: 'Solução completa para gestão financeira profissional',
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
    features: [
      { text: 'Tudo do plano Conectado', included: true },
      { text: 'Contas ilimitadas', included: true },
      { text: 'Contas PF e PJ', included: true },
      { text: 'Histórico completo', included: true },
      { text: 'Relatórios personalizados', included: true },
      { text: 'Metas e planejamento', included: true },
      { text: 'Suporte prioritário 24/7', included: true },
      { text: 'Consultoria financeira mensal', included: true },
    ],
    cta: 'Quero o Plus',
    popular: false,
    testimonial: {
      text: 'Essencial para gerenciar minha empresa e finanças pessoais.',
      author: 'Carlos E.'
    }
  }
];

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Link to="/" className="inline-block mb-6">
            <Button variant="ghost" className="hover:bg-white/50">
              ← Voltar
            </Button>
          </Link>

          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Escolha seu{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
              plano ideal
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transforme sua relação com o dinheiro. Todos os planos incluem 7 dias grátis.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={billingPeriod === 'monthly' ? 'font-semibold text-gray-900' : 'text-gray-600'}>
              Mensal
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full transition-all"
            >
              <motion.div
                animate={{ x: billingPeriod === 'monthly' ? 2 : 26 }}
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
              />
            </button>
            <span className={billingPeriod === 'yearly' ? 'font-semibold text-gray-900' : 'text-gray-600'}>
              Anual
              <Badge className="ml-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                -20%
              </Badge>
            </span>
          </div>
        </motion.div>

        {/* Plans grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const finalPrice = billingPeriod === 'yearly' ? plan.price * 12 * 0.8 : plan.price;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border-2 shadow-xl transition-all ${
                  plan.popular ? 'border-blue-500 shadow-blue-500/30' : 'border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white px-4 py-1 text-sm shadow-lg">
                      ⭐ MAIS POPULAR
                    </Badge>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Plan name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      {finalPrice === 0 ? 'Grátis' : `R$ ${finalPrice.toFixed(2).replace('.', ',')}`}
                    </span>
                    {finalPrice > 0 && (
                      <span className="text-gray-600">{billingPeriod === 'yearly' ? '/ano' : plan.period}</span>
                    )}
                  </div>
                  {billingPeriod === 'yearly' && finalPrice > 0 && (
                    <p className="text-sm text-green-600 font-semibold mt-1">
                      Economize R$ {(plan.price * 12 * 0.2).toFixed(2).replace('.', ',')} por ano
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Button
                  onClick={() => base44.auth.redirectToLogin()}
                  className={`w-full py-6 text-lg font-semibold rounded-xl mb-6 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-700 hover:via-cyan-600 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {plan.cta}
                </Button>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Testimonial */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 italic mb-2">"{plan.testimonial.text}"</p>
                  <p className="text-sm font-semibold text-gray-900">— {plan.testimonial.author}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Compare todos os recursos</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4">Recurso</th>
                  {plans.map(plan => (
                    <th key={plan.name} className="text-center py-4 px-4 font-bold">{plan.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  'Transações por mês',
                  'Contas bancárias',
                  'Conexão automática',
                  'Histórico',
                  'Relatórios',
                  'Categorias',
                  'Suporte'
                ].map((feature, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">{feature}</td>
                    <td className="py-4 px-4 text-center text-sm text-gray-600">
                      {feature === 'Transações por mês' && '10'}
                      {feature === 'Contas bancárias' && '1'}
                      {feature === 'Conexão automática' && '—'}
                      {feature === 'Histórico' && 'Limitado'}
                      {feature === 'Relatórios' && 'Básicos'}
                      {feature === 'Categorias' && 'Padrão'}
                      {feature === 'Suporte' && 'Email'}
                    </td>
                    <td className="py-4 px-4 text-center text-sm text-gray-600">
                      {feature === 'Transações por mês' && '∞'}
                      {feature === 'Contas bancárias' && '3'}
                      {feature === 'Conexão automática' && '✓'}
                      {feature === 'Histórico' && '90 dias'}
                      {feature === 'Relatórios' && 'Avançados'}
                      {feature === 'Categorias' && 'Personalizadas'}
                      {feature === 'Suporte' && 'Chat'}
                    </td>
                    <td className="py-4 px-4 text-center text-sm text-gray-600">
                      {feature === 'Transações por mês' && '∞'}
                      {feature === 'Contas bancárias' && '∞'}
                      {feature === 'Conexão automática' && '✓'}
                      {feature === 'Histórico' && 'Completo'}
                      {feature === 'Relatórios' && 'Personalizados'}
                      {feature === 'Categorias' && 'Ilimitadas'}
                      {feature === 'Suporte' && '24/7'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ainda tem dúvidas?</h2>
          <p className="text-gray-600 mb-6">
            Entre em contato com nossa equipe para encontrar o plano perfeito para você
          </p>
          <Button 
            className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white px-8 py-6 rounded-full text-lg shadow-lg"
            onClick={() => base44.auth.redirectToLogin()}
          >
            Falar com especialista
          </Button>
        </motion.div>
      </div>
    </div>
  );
}