import Link from 'next/link'
import AnimatedHero from '@/components/ui/AnimatedHero'
import { NailArtIllustration, SpaIllustration, MirrorIllustration } from '@/components/ui/Illustrations'

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left z-10">
            <p className="text-pink-600 font-medium text-sm tracking-widest uppercase mb-3">Salão de Beleza em Barueri</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Sua beleza merece<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-700">cuidado especial</span>
            </h1>
            <p className="text-gray-600 mb-8 text-lg max-w-md">
              Transforme seu visual com profissionais dedicadas ao seu bem-estar. Agende online em segundos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href="/agendar"
                aria-label="Agendar horário no salão"
                className="gradient-pink text-white px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-pink-200 text-center"
              >
                Agendar Horário
              </Link>
              <Link
                href="/precos"
                aria-label="Ver tabela de preços"
                className="bg-white text-pink-600 px-8 py-3.5 rounded-full font-semibold border border-pink-200 hover:border-pink-300 hover:shadow-md transition-all text-center"
              >
                Ver Preços
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <AnimatedHero className="w-64 h-64 md:w-80 md:h-80" />
          </div>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Serviços destaque */}
      <section className="px-4 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Nossos Serviços</h2>
          <p className="text-gray-500 max-w-md mx-auto">Cuidados completos para realçar sua beleza natural</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-hover bg-white rounded-2xl p-6 border border-pink-50 shadow-sm text-center">
            <NailArtIllustration className="w-32 h-32 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 text-lg mb-2">Unhas</h3>
            <p className="text-gray-500 text-sm">Manicure, pedicure e nail art com acabamento perfeito</p>
          </div>

          <div className="card-hover bg-white rounded-2xl p-6 border border-pink-50 shadow-sm text-center">
            <SpaIllustration className="w-32 h-32 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 text-lg mb-2">Cabelo</h3>
            <p className="text-gray-500 text-sm">Corte, coloração, hidratação e escova modelada</p>
          </div>

          <div className="card-hover bg-white rounded-2xl p-6 border border-pink-50 shadow-sm text-center">
            <MirrorIllustration className="w-32 h-32 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 text-lg mb-2">Estética</h3>
            <p className="text-gray-500 text-sm">Maquiagem, design de sobrancelhas e tratamentos faciais</p>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="bg-gradient-to-b from-pink-50/50 to-white px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Por que nos escolher?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '✨', title: 'Profissionais Expert', desc: 'Equipe qualificada e atualizada' },
              { icon: '📱', title: 'Agendamento Fácil', desc: 'Marque online em segundos' },
              { icon: '💝', title: 'Ambiente Acolhedor', desc: 'Espaço pensado para seu conforto' },
              { icon: '🎯', title: 'Pontualidade', desc: 'Respeito ao seu tempo' },
            ].map((item) => (
              <div key={item.title} className="text-center p-5">
                <div className="w-14 h-14 rounded-2xl gradient-pink flex items-center justify-center mx-auto mb-4 shadow-md shadow-pink-200">
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Dúvidas */}
      <section className="px-4 py-16 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Dúvidas Frequentes</h2>
          <p className="text-gray-500">Não encontrou sua resposta? Fale conosco pelo WhatsApp!</p>
        </div>

        <div className="space-y-3">
          {[
            { q: 'Como faço para agendar?', a: 'Clique em "Agendar Horário", escolha o serviço, profissional e o melhor horário disponível. É rápido e fácil!' },
            { q: 'Posso cancelar meu agendamento?', a: 'Sim! Você pode cancelar com até 24 horas de antecedência pela sua área "Meus Agendamentos".' },
            { q: 'Quais formas de pagamento?', a: 'Aceitamos PIX, dinheiro e cartão. O QR Code do PIX está disponível na página de Preços.' },
            { q: 'Preciso criar conta para agendar?', a: 'Sim, mas é super rápido! Basta nome, e-mail, telefone e uma senha. Leva menos de 1 minuto.' },
            { q: 'Como falo com a profissional?', a: 'Você pode enviar mensagem direta pelo WhatsApp clicando no botão verde no canto da tela.' },
          ].map((item, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-pink-50 shadow-sm overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none hover:bg-pink-50/50 transition-colors">
                <span className="font-medium text-gray-800 text-sm">{item.q}</span>
                <svg className="w-5 h-5 text-pink-400 shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4">
                <p className="text-sm text-gray-500">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Localização */}
      <section id="localizacao" className="px-4 py-16 bg-gradient-to-b from-white to-pink-50/30 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Onde Estamos</h2>
            <p className="text-gray-500">Venha nos visitar!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Mapa */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-pink-100 h-72 md:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.5!2d-46.876!3d-23.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMwJzM2LjAiUyA0NsKwNTInMzMuNiJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr&q=Rua+Fernanda+40+Jardim+Barueri+SP"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '288px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização DaniCoiffer - Rua Fernanda 40, Jardim Barueri"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center space-y-5">
              <div className="bg-white rounded-2xl p-6 border border-pink-50 shadow-sm space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-pink flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-white" aria-hidden="true">📍</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Endereço</p>
                    <p className="text-sm text-gray-500">Rua Fernanda, 40 — Jardim Barueri, SP</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-pink flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-white" aria-hidden="true">🕐</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Horário de Funcionamento</p>
                    <p className="text-sm text-gray-500">Segunda a Sábado: 08h às 18h</p>
                    <p className="text-sm text-gray-400">Domingo: Fechado</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-pink flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-white" aria-hidden="true">📱</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Contato</p>
                    <p className="text-sm text-gray-500">(11) 99999-9999</p>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/Rua+Fernanda+40+Jardim+Barueri+SP"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir no Google Maps"
                className="block text-center gradient-pink text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-pink-200/50"
              >
                Abrir no Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="max-w-2xl mx-auto text-center gradient-pink rounded-3xl p-10 shadow-xl shadow-pink-200/50">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Pronta para se transformar?</h2>
          <p className="text-pink-100 mb-6">Agende agora e garanta seu horário preferido</p>
          <Link
            href="/agendar"
            aria-label="Agendar horário agora"
            className="inline-block bg-white text-pink-600 px-8 py-3.5 rounded-full font-bold hover:shadow-lg transition-all"
          >
            Agendar Agora →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 py-12 text-gray-300">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-bold text-white text-lg mb-2">DaniCoiffer</p>
            <p className="text-sm text-gray-400">Salão de Beleza em Barueri. Cuidando da sua beleza com carinho e profissionalismo.</p>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-3">Contato</p>
            <p className="text-sm text-gray-400">Rua Fernanda, 40 — Jardim Barueri, SP</p>
            <p className="text-sm text-gray-400 mt-1">(11) 99999-9999</p>
            <p className="text-sm text-gray-400 mt-1">Seg a Sáb: 08h às 18h</p>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-3">Navegação</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/agendar" className="text-gray-400 hover:text-pink-400 transition-colors">Agendar Horário</Link>
              <Link href="/precos" className="text-gray-400 hover:text-pink-400 transition-colors">Tabela de Preços</Link>
              <Link href="/galeria" className="text-gray-400 hover:text-pink-400 transition-colors">Galeria</Link>
              <Link href="/#localizacao" className="text-gray-400 hover:text-pink-400 transition-colors">Como Chegar</Link>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} DaniCoiffer. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
