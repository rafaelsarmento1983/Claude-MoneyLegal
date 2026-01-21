import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  TrendingUp, 
  Bell, 
  BarChart3, 
  FolderOpen, 
  CreditCard,
  Smartphone,
  RefreshCw 
} from 'lucide-react';
import { motion } from 'framer-motion';

const resources = [
  {
    icon: RefreshCw,
    title: 'Conexão Bancária',
    description: 'Conecte contas e cartões para importar lançamentos direto do banco.',
    badge: 'NOVO',
    color: 'emerald'
  },
  {
    icon: Wallet,
    title: 'Controle de contas',
    description: 'Conta corrente, digital ou PJ? Gerencie todas no ALP Financeiro!',
    color: 'blue'
  },
  {
    icon: TrendingUp,
    title: 'Limite de gastos',
    description: 'Defina o quanto gastar em cada categoria e economize sem esforço.',
    color: 'purple'
  },
  {
    icon: Bell,
    title: 'Alertas',
    description: 'Receba alertas de todas as suas contas a pagar e dê adeus aos juros!',
    color: 'orange'
  },
  {
    icon: BarChart3,
    title: 'Relatórios',
    description: 'Resumos incríveis, com gráficos simples e completos.',
    color: 'pink'
  },
  {
    icon: FolderOpen,
    title: 'Criação de categorias',
    description: 'Crie suas próprias categorias de acordo com a sua necessidade.',
    color: 'yellow'
  },
  {
    icon: CreditCard,
    title: 'Controle de cartões',
    description: 'Controle todos seus cartões em um único lugar.',
    color: 'red'
  },
  {
    icon: Smartphone,
    title: 'Multiplataforma',
    description: 'Acesse seu controle financeiro de onde estiver, do celular ou computador.',
    color: 'green'
  }
];

const colorClasses = {
  emerald: { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'text-blue-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'text-blue-600' },
  purple: { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'text-blue-600' },
  orange: { bg: 'bg-cyan-100', text: 'text-cyan-600', icon: 'text-cyan-600' },
  pink: { bg: 'bg-sky-100', text: 'text-sky-600', icon: 'text-sky-600' },
  yellow: { bg: 'bg-cyan-100', text: 'text-cyan-600', icon: 'text-cyan-600' },
  red: { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'text-blue-600' },
  green: { bg: 'bg-cyan-100', text: 'text-cyan-600', icon: 'text-cyan-600' }
};

export default function ResourcesSection() {
  return (
    <section id="recursos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Nossos principais recursos
          </h2>
          <p className="text-xl text-gray-600">
            Conheça os recursos que vão revolucionar seu controle financeiro.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            const colors = colorClasses[resource.color];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow relative overflow-hidden group"
              >
                {resource.badge && (
                  <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                    {resource.badge}
                  </Badge>
                )}
                
                <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${colors.icon}`} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {resource.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* App preview image placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl p-12 overflow-hidden"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Veja como é fácil controlar suas finanças
              </h3>
              <p className="text-gray-600 mb-8">
                Interface intuitiva e poderosa para você ter o controle total do seu dinheiro
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl h-40"></div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl h-40"></div>
                <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl h-40"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}