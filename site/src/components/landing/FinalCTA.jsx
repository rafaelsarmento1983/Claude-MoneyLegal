import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

export default function FinalCTA() {
  return (
    <section id="como-funciona" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Guide section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            O guia para o seu
            <br />
            <span className="text-blue-600">sucesso financeiro</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              number: '01',
              title: 'Suas contas e cartões num só lugar',
              description: 'Comece cadastrando suas contas e cartões para ter uma visão mais clara das suas finanças.'
            },
            {
              number: '02',
              title: 'Cadastre todos os seus gastos',
              description: 'Garanta uma previsibilidade financeira poderosa cadastrando suas despesas em tempo real.'
            },
            {
              number: '03',
              title: 'Saiba o destino de cada centavo',
              description: 'Mantenha tudo sob controle informando sua renda e ganhos extras para ter um ponto de partida.'
            },
            {
              number: '04',
              title: 'Transformando em hábito',
              description: 'Lance os gastos do dia a dia, acompanhe os relatórios e assuma o controle do seu dinheiro.'
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Tenha a gestão financeira
              <br />
              PF e PJ que sempre sonhou
            </h2>

            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8 text-left">
              {[
                'Sem anúncios dentro do app',
                'Registre e acompanhe seus gastos a qualquer momento',
                'Gerencie faturas de todos os seus cartões num único lugar',
                'Receba alertas de contas a pagar',
                'Conecte seu banco com o ALP Financeiro',
                'Nunca mais sofra com juros e multas'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100 px-10 py-6 text-lg rounded-lg shadow-xl group"
              onClick={() => base44.auth.redirectToLogin()}
            >
              Começar agora
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="mt-8 flex flex-wrap justify-center gap-8 text-blue-100">
              <div className="text-center">
                <div className="font-bold text-2xl text-white">4.9</div>
                <div className="text-sm">App Store</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-white">4.8</div>
                <div className="text-sm">Google Play</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-white">100k+</div>
                <div className="text-sm">Downloads</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}