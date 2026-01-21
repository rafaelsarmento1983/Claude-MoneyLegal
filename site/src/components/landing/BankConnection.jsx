import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BankConnection() {
  const banks = [
    { name: 'Nubank', logo: '💜' },
    { name: 'Itaú', logo: '🟠' },
    { name: 'Bradesco', logo: '🔴' },
    { name: 'Caixa', logo: '🔵' },
    { name: 'Banco do Brasil', logo: '🟡' },
    { name: 'Inter', logo: '🟠' },
    { name: 'Santander', logo: '🔴' },
    { name: 'Sicredi', logo: '🟢' },
    { name: 'Mercado Pago', logo: '💙' },
    { name: 'Sicoob', logo: '🟢' },
    { name: 'BTG', logo: '⚫' },
    { name: 'PicPay', logo: '🟢' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white hover:from-blue-700 hover:via-cyan-600 hover:to-blue-800 shadow-lg shadow-blue-500/30">
              🔥 NOVO
            </Badge>
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Importe suas finanças
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">com um clique</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left content */}
          <div>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Conecte seus bancos e veja as suas movimentações bancárias centralizadas 
              no ALP Financeiro com a <strong>tecnologia do Open Finance.</strong>
            </p>

            <div className="space-y-6">
              <motion.div 
                className="flex gap-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Menos trabalho, mais tempo livre</h3>
                  <p className="text-gray-600">
                    Seus lançamentos chegam prontos direto do seu banco.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex gap-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Seus gastos sob controle desde o primeiro dia</h3>
                  <p className="text-gray-600">
                    Traga seu histórico de <strong>90 dias</strong> e não comece do zero.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex gap-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Conecte contas PF e PJ sem dor de cabeça</h3>
                  <p className="text-gray-600">
                    Finanças pessoais e do negócio organizadas no mesmo lugar.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex gap-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/30">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Segurança em primeiro lugar</h3>
                  <p className="text-gray-600">
                    Tecnologia do Banco Central para proteger seus dados e sua privacidade.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right - Bank connection visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200 rounded-3xl p-8 shadow-xl"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6">
              <div className="text-center mb-6">
                <h3 className="font-bold text-gray-900 mb-2">Conecte seu banco</h3>
                <p className="text-sm text-gray-600">Escolha sua instituição financeira</p>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {banks.map((bank, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-gradient-to-br from-gray-50 to-white hover:from-blue-50 hover:to-cyan-50 border-2 border-gray-200 hover:border-blue-600 rounded-xl p-4 flex items-center justify-center text-3xl cursor-pointer transition-all shadow-sm hover:shadow-lg"
                  >
                    {bank.logo}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Banks showcase */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Mais de <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">15 bancos</span> disponíveis
          </h3>
          <p className="text-gray-600 mb-8">Para Pessoa Física e Jurídica</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {banks.map((bank, i) => (
              <motion.div
                key={i}
                className="bg-white border border-blue-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xl">{bank.logo}</span>
                <span className="text-sm font-medium text-gray-700">{bank.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}