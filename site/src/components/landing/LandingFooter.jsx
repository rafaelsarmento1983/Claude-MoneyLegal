import React from 'react';
import { Wallet, Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Money Legal
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Organize suas finanças com simplicidade e tenha controle total do seu dinheiro.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-600 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Produto */}
          <div>
            <h4 className="text-white font-bold mb-6">Produto</h4>
            <ul className="space-y-3">
              <li><a href="#recursos" className="hover:text-blue-400 transition-colors">Recursos</a></li>
              <li><a href="#planos" className="hover:text-blue-400 transition-colors">Planos e preços</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Conexão Bancária</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Segurança</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Atualizações</a></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white font-bold mb-6">Empresa</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Quem somos</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Imprensa</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Parceiros</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-bold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                  <Mail className="w-5 h-5" />
                  contato@moneylegal.com.br
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                  <Phone className="w-5 h-5" />
                  (11) 99999-9999
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Central de ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Tutoriais
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 Money Legal. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                Termos de uso
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                Política de privacidade
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}