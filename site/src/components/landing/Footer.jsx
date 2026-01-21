import React from 'react';
import { Wallet, Facebook, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-purple-600 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ALP Financeiro</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Sua plataforma completa para gestão financeira inteligente e segura.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Produto */}
            <div>
              <h4 className="text-white font-bold mb-4">Produto</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Segurança</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Atualizações</a></li>
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h4 className="text-white font-bold mb-4">Empresa</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contato</a></li>
              </ul>
            </div>

            {/* Suporte */}
            <div>
              <h4 className="text-white font-bold mb-4">Suporte</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Central de ajuda</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Tutoriais</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
                <li>
                  <a href="mailto:contato@alpfinanceiro.com.br" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                    <Mail className="w-4 h-4" />
                    contato@alpfinanceiro.com.br
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 ALP Controle Financeiro. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">
                Termos de uso
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">
                Política de privacidade
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}