import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Maria Silva',
    role: 'Empreendedora',
    avatar: 'MS',
    content: 'Finalmente consegui organizar minhas finanças! O app é super intuitivo e me ajudou a economizar R$ 2.000 em apenas 3 meses.',
    rating: 5,
    color: 'emerald'
  },
  {
    name: 'João Santos',
    role: 'Desenvolvedor',
    avatar: 'JS',
    content: 'A melhor ferramenta de controle financeiro que já usei. Os relatórios são incríveis e me dão uma visão clara de onde meu dinheiro está indo.',
    rating: 5,
    color: 'purple'
  },
  {
    name: 'Ana Costa',
    role: 'Designer',
    avatar: 'AC',
    content: 'Adorei a interface limpa e moderna. Uso todos os dias e já virou parte da minha rotina. Recomendo demais!',
    rating: 5,
    color: 'blue'
  }
];

const colorClasses = {
  emerald: 'from-emerald-500 to-emerald-600',
  purple: 'from-purple-500 to-purple-600',
  blue: 'from-blue-500 to-blue-600'
};

export default function Testimonials() {
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
              O que nossos usuários
              <span className="block bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
                estão dizendo
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Milhares de pessoas já transformaram suas vidas financeiras
            </p>
          </motion.div>

          {/* Testimonials grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transition-all relative"
              >
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-200" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colorClasses[testimonial.color]} flex items-center justify-center text-white font-bold shadow-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}