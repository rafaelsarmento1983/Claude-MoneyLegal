import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Smartphone, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

export default function HeroMain() {
  return (
    <section id="inicio" className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 relative overflow-hidden">
      {/* Animated background elements */}
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
        <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
        />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
              Seu dinheiro sob controle,{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent animate-pulse">sem esforço</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Tudo o que você precisa para organizar suas finanças sem perder tempo.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-700 hover:via-cyan-600 hover:to-blue-800 text-white rounded-full px-10 py-7 text-xl font-bold group shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all"
                onClick={() => base44.auth.redirectToLogin()}
              >
                Começar agora
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </motion.div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap gap-8">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    Segurança dos seus dados
                  </div>
                  <div className="text-sm text-gray-600">em primeiro lugar</div>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    Acesse quando quiser
                  </div>
                  <div className="text-sm text-gray-600">no celular ou computador</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main dashboard card */}
            <motion.div 
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20 relative overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5" />
              {/* Header */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                  <div className="text-sm text-gray-500">Boa tarde,</div>
                  <div className="text-xl font-bold text-gray-900">Felipe! 👋</div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full"></div>
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full"></div>
                </div>
              </div>

              {/* Balance cards */}
              <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                <motion.div 
                  className="bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 rounded-2xl p-4 text-white shadow-xl shadow-blue-500/30"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-xs text-white/80 mb-1">Saldo previsto</div>
                  <div className="text-2xl font-bold">R$ 13.883,00</div>
                  <motion.div 
                    className="mt-2 flex items-center gap-1 text-xs"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendingUp className="w-3 h-3" />
                    <span>+12%</span>
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="bg-white border-2 border-blue-200 rounded-2xl p-4"
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-xs text-gray-500 mb-1">Despesas</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">R$ 12.602,36</div>
                </motion.div>
              </div>

              {/* Transactions */}
              <div className="space-y-3 relative z-10">
                {[
                  { name: 'Conta Santander', value: 'R$ 1.486,45', icon: '🔵', color: 'bg-blue-100' },
                  { name: 'Conta Caixa Econômica', value: 'R$ 5.468,99', icon: '🔷', color: 'bg-blue-100' },
                  { name: 'Conta Inter', value: 'R$ 3.645,00', icon: '🟠', color: 'bg-orange-100' },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center justify-between p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-blue-200"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center text-lg`}>
                        {item.icon}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </div>
                    <div className="font-semibold text-gray-900">{item.value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 3 }}
              className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-5 border border-white/20"
            >
              <div className="text-sm text-gray-500 mb-1">Cartões</div>
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 rounded-xl shadow-lg"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div>
                  <div className="font-bold text-gray-900">Nubank</div>
                  <div className="text-sm bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-semibold">R$ 2.607,36</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Media mentions */}
      <div className="mt-20 border-t border-gray-200 bg-white/80 backdrop-blur-xl py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 mb-8">
            Na mídia, por quem confia no nosso trabalho:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            <span className="text-2xl font-bold text-gray-600">tecmundo</span>
            <span className="text-2xl font-bold text-gray-600">techtudo</span>
            <span className="text-2xl font-bold text-gray-600">exame.</span>
            <span className="text-2xl font-bold text-gray-600">tecnoblog</span>
            <span className="text-2xl font-bold text-gray-600">Canaltech</span>
          </div>
        </div>
      </div>
    </section>
  );
}