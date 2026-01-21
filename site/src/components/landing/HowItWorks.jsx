import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, CreditCard, BarChart3, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Crie sua conta',
    description: 'Cadastro rápido e gratuito em menos de 2 minutos',
    color: 'emerald'
  },
  {
    icon: CreditCard,
    title: 'Adicione suas transações',
    description: 'Registre receitas e despesas de forma simples e rápida',
    color: 'purple'
  },
  {
    icon: BarChart3,
    title: 'Acompanhe seus gastos',
    description: 'Visualize gráficos e relatórios em tempo real',
    color: 'blue'
  },
  {
    icon: CheckCircle,
    title: 'Atinja seus objetivos',
    description: 'Economize mais e realize seus sonhos financeiros',
    color: 'green'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Como funciona?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comece a organizar suas finanças em 4 passos simples
            </p>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            {/* Connection line - desktop only */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-purple-200 to-green-200" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const colors = {
                  emerald: 'from-emerald-500 to-emerald-600',
                  purple: 'from-purple-500 to-purple-600',
                  blue: 'from-blue-500 to-blue-600',
                  green: 'from-green-500 to-green-600'
                };

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative"
                  >
                    <div className="text-center">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className={`w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${colors[step.color]} flex items-center justify-center shadow-xl relative z-10`}
                      >
                        <Icon className="w-16 h-16 text-white" />
                      </motion.div>

                      {/* Step number */}
                      <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-3 w-10 h-10 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center font-bold text-gray-600 text-sm shadow-md z-20">
                        {index + 1}
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}