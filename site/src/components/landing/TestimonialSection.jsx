import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Rafael Silva',
    role: 'Empresário',
    content: 'Eficiente e prático! Conseguiu substituir minha planilha de excel! Há tempos testei diversos app, mas esse é excelente e funcional, e o atendimento da equipe é ótimo!',
    rating: 5,
    avatar: 'RS',
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Leonardo Pieta',
    role: 'Desenvolvedor',
    content: 'Estou usando o App há 1 ano e está sendo incrível. Minha vida toda eu não tinha controle dos meus gastos e do meu dinheiro, e com esse app eu consigo controlar tudo isso e ainda economizar.',
    rating: 5,
    avatar: 'LP',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    name: 'Mariana Costa',
    role: 'Designer',
    content: 'Mudou a minha vida! Uso há mais de 3 ANOS e posso dizer que transformou completamente minha relação com o dinheiro. Recomendo muito!',
    rating: 5,
    avatar: 'MC',
    color: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Carlos Eduardo',
    role: 'Advogado',
    content: 'App maravilhoso! Interface intuitiva e recursos completos. Consegui organizar todas as minhas contas e cartões em um só lugar.',
    rating: 5,
    avatar: 'CE',
    color: 'from-orange-500 to-orange-600'
  },
  {
    name: 'Juliana Santos',
    role: 'Professora',
    content: 'Excelente app! Muito fácil de usar e os relatórios são claros e objetivos. Me ajudou muito a entender meus gastos mensais.',
    rating: 5,
    avatar: 'JS',
    color: 'from-pink-500 to-pink-600'
  },
  {
    name: 'Pedro Oliveira',
    role: 'Empreendedor',
    content: 'Simplesmente perfeito! Uso tanto para controlar as finanças pessoais quanto da empresa. O suporte também é muito bom!',
    rating: 5,
    avatar: 'PO',
    color: 'from-cyan-500 to-cyan-600'
  }
];

export default function TestimonialSection() {
  return (
    <section id="depoimentos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            O que eles estão falando
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Veja porquê nossos clientes amam o ALP Financeiro
          </p>

          {/* App Store ratings */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="font-bold text-2xl text-gray-900">4.9</div>
              <div className="text-sm text-gray-600">App Store</div>
              <div className="text-xs text-gray-500">44 mil avaliações</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="font-bold text-2xl text-gray-900">4.8</div>
              <div className="text-sm text-gray-600">Google Play</div>
              <div className="text-xs text-gray-500">54 mil avaliações</div>
            </div>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Title */}
              <h4 className="font-bold text-gray-900 mb-3">
                {testimonial.name === 'Rafael Silva' && 'Eficiente e prático!'}
                {testimonial.name === 'Leonardo Pieta' && 'Recomendo a todos'}
                {testimonial.name === 'Mariana Costa' && 'Mudou a minha vida'}
                {testimonial.name === 'Carlos Eduardo' && 'App maravilhoso!'}
                {testimonial.name === 'Juliana Santos' && 'Excelente app!'}
                {testimonial.name === 'Pedro Oliveira' && 'Simplesmente perfeito!'}
              </h4>

              {/* Content */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {testimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">por {testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}