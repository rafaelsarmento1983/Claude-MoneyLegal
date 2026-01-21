import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, PieChart, Bell, Shield, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Wallet,
    title: 'Controle total',
    description: 'Acompanhe todas as suas receitas e despesas em tempo real com categorização inteligente.',
    color: 'emerald'
  },
  {
    icon: TrendingUp,
    title: 'Metas financeiras',
    description: 'Defina objetivos e acompanhe seu progresso rumo à realização dos seus sonhos.',
    color: 'purple'
  },
  {
    icon: PieChart,
    title: 'Relatórios detalhados',
    description: 'Visualize gráficos e análises completas para entender melhor seus hábitos financeiros.',
    color: 'blue'
  },
  {
    icon: Bell,
    title: 'Alertas inteligentes',
    description: 'Receba notificações sobre vencimentos, gastos altos e oportunidades de economia.',
    color: 'orange'
  },
  {
    icon: Shield,
    title: 'Segurança máxima',
    description: 'Seus dados protegidos com criptografia de ponta e servidores seguros.',
    color: 'red'
  },
  {
    icon: Smartphone,
    title: 'Acesso em qualquer lugar',
    description: 'Use em qualquer dispositivo, sincronize automaticamente e tenha tudo na palma da mão.',
    color: 'green'
  }
];

const colorClasses = {
  emerald: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-600',
    gradient: 'from-emerald-500 to-emerald-600'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    gradient: 'from-purple-500 to-purple-600'
  },
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600'
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    gradient: 'from-orange-500 to-orange-600'
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    gradient: 'from-red-500 to-red-600'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    gradient: 'from-green-500 to-green-600'
  }
};

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Tudo que você precisa para
              <span className="block bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
                cuidar do seu dinheiro
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ferramentas poderosas e intuitivas para transformar sua relação com o dinheiro
            </p>
          </motion.div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colors = colorClasses[feature.color];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transition-all"
                >
                  <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mb-6`}>
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}