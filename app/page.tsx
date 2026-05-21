import Link from 'next/link'
import AnimatedHero from '@/components/ui/AnimatedHero'
import { NailArtIllustration, SpaIllustration, MirrorIllustration } from '@/components/ui/Illustrations'

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-rosegold-200/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-rose-200/20 blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left z-10">
            <p className="text-rosegold-500 font-semibold text-sm tracking-[0.2em] uppercase mb-4">✦ Salão de Beleza em Barueri ✦</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
              Sua beleza merece{' '}
              <span className="shimmer">luxo e cuidado</span>
            </h1>
            <p className="text-gray-600 mb-8 text-lg max-w-lg">
              Transforme seu visual com profissionais dedicadas ao seu bem-estar. Experiência premium no coração de Barueri.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/agendar"
                aria-label="Agendar horário no salão"
                className="gradient-rosegold text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg shadow-rosegold-300/30 text-center tracking-wide"
              >
                Agendar Horário
              </Link>
              <Link
                href="/precos"
                aria-label="Ver tabela de preços"
                className="bg-white text-rosegold-600 px-8 py-4 rounded-full font-semibold border-2 border-rosegold-200 hover:border-rosegold-400 hover:shadow-lg transition-all text-center"
              >
                Ver Preços
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <AnimatedHero className="w-64 h-64 md:w-80 md:h-80" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Serviços destaque */}
      <section className="px-4 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-rosegold-500 font-semibold text-sm tracking-[0.15em] uppercase mb-2">Nossos Serviços</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Cuidados Exclusivos</h2>
          <div className="divider-rosegold w-16 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-hover bg-white rounded-3xl p-8 border border-rosegold-100 shadow-sm text-center rosegold-glow">
            <NailArtIllustration className="w-28 h-28 mx-auto mb-5" />
            <h3 className="font-bold text-gray-800 text-lg mb-2">Unhas</h3>
            <p className="text-gray-500 text-sm">Manicure, pedicure e nail art com acabamento perfeito</p>
          </div>

          <div className="card-hover bg-white rounded-3xl p-8 border border-rosegold-100 shadow-sm text-center rosegold-glow">
            <SpaIllustration className="w-28 h-28 mx-auto mb-5" />
            <h3 className="font-bold text-gray-800 text-lg mb-2">Cabelo</h3>
            <p className="text-gray-500 text-sm">Corte, coloração, hidratação e escova modelada</p>
          </div>

          <div className="card-hover bg-white rounded-3xl p-8 border border-rosegold-100 shadow-sm text-center rosegold-glow">
            <MirrorIllustration className="w-28 h-28 mx-auto mb-5" />
            <h3 className="font-bold text-gray-800 text-lg mb-2">Estética</h3>
            <p className="text-gray-500 text-sm">Maquiagem, design de sobrancelhas e tratamentos faciais</p>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="px-4 py-20 bg-gradient-to-b from-rosegold-50/30 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-rosegold-500 font-semibold text-sm tracking-[0.15em] uppercase mb-2">Diferenciais</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Por que nos escolher?</h2>
            <div className="divider-rosegold w-16 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '✨', title: 'Profissionais Expert', desc: 'Equipe qualificada e atualizada' },
              { icon: '📱', title: 'Agendamento Fácil', desc: 'Marque online em segundos' },
              { icon: '💎', title: 'Ambiente Premium', desc: 'Espaço pensado para seu conforto' },
              { icon: '🎯', title: 'Pontualidade', desc: 'Respeito ao seu tempo' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-2xl gradient-rosegold flex items-center justify-center mx-auto mb-4 shadow-md shadow-rosegold-200/50">
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-rosegold-500 font-semibold text-sm tracking-[0.15em] uppercase mb-2">FAQ</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Dúvidas Frequentes</h2>
          <div className="divider-rosegold w-16 mx-auto mt-4" />
        </div>

        <div className="space-y-3">
          {[
            { q: 'Como faço para agendar?', a: 'Clique em "Agendar Horário", escolha o serviço, profissional e o melhor horário disponível. É rápido e fácil!' },
            { q: 'Posso cancelar meu agendamento?', a: 'Sim! Você pode cancelar com até 24 horas de antecedência pela sua área "Meus Agendamentos".' },
            { q: 'Quais formas de pagamento?', a: 'Aceitamos PIX, dinheiro e cartão. O QR Code do PIX está disponível na página de Preços.' },
            { q: 'Preciso criar conta para agendar?', a: 'Sim, mas é super rápido! Basta nome, e-mail, telefone e uma senha. Leva menos de 1 minuto.' },
            { q: 'Onde fica o salão?', a: 'Estamos na Rua Fernanda, 40 — Jardim Barueri, SP. Fácil acesso para quem vem de Alphaville e região.' },
          ].map((item, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-rosegold-100 shadow-sm overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none hover:bg-rosegold-50/50 transition-colors">
                <span className="font-medium text-gray-800 text-sm">{item.q}</span>
                <svg className="w-5 h-5 text-rosegold-500 shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
      <section id="localizacao" className="px-4 py-20 bg-gradient-to-b from-white to-rosegold-50/20 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-rosegold-500 font-semibold text-sm tracking-[0.15em] uppercase mb-2">Localização</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Onde Estamos</h2>
            <p className="text-gray-500">Barueri, SP — Fácil acesso de Alphaville e região</p>
            <div className="divider-rosegold w-16 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="rounded-3xl overflow-hidden shadow-md border border-rosegold-100 h-72 md:h-auto">
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

            <div className="flex flex-col justify-center space-y-5">
              <div className="bg-white rounded-3xl p-8 border border-rosegold-100 shadow-sm space-y-5 rosegold-glow">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl gradient-rosegold flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-white text-lg" aria-hidden="true">📍</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Endereço</p>
                    <p className="text-sm text-gray-500">Rua Fernanda, 40 — Jardim Barueri, SP</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl gradient-rosegold flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-white text-lg" aria-hidden="true">🕐</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Horário de Funcionamento</p>
                    <p className="text-sm text-gray-500">Segunda a Sábado: 08h às 18h</p>
                    <p className="text-sm text-gray-400">Domingo: Fechado</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl gradient-rosegold flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-white text-lg" aria-hidden="true">📱</span>
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
                className="block text-center gradient-rosegold text-white px-6 py-3.5 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg shadow-rosegold-300/30"
              >
                Abrir no Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="max-w-2xl mx-auto text-center gradient-luxury rounded-3xl p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 gradient-rosegold" />
          <p className="text-rosegold-300 text-sm font-semibold tracking-[0.2em] uppercase mb-3">✦ Experiência Premium ✦</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Pronta para se transformar?</h2>
          <p className="text-gray-400 mb-8">Agende agora e garanta seu horário preferido</p>
          <Link
            href="/agendar"
            aria-label="Agendar horário agora"
            className="inline-block gradient-rosegold text-white px-10 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-rosegold-400/30 transition-all tracking-wide"
          >
            Agendar Agora →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 px-4 py-14 text-gray-300">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-bold text-xl mb-3">
              <span className="shimmer">DaniCoiffer</span>
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">Salão de Beleza premium em Barueri, SP. Cuidando da sua beleza com carinho, profissionalismo e sofisticação.</p>
          </div>
          <div>
            <p className="font-semibold text-rosegold-300 text-sm mb-4 tracking-wide uppercase">Contato</p>
            <p className="text-sm text-gray-400">Rua Fernanda, 40 — Jardim Barueri, SP</p>
            <p className="text-sm text-gray-400 mt-1">(11) 99999-9999</p>
            <p className="text-sm text-gray-400 mt-1">Seg a Sáb: 08h às 18h</p>
          </div>
          <div>
            <p className="font-semibold text-rosegold-300 text-sm mb-4 tracking-wide uppercase">Navegação</p>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link href="/agendar" className="text-gray-400 hover:text-rosegold-300 transition-colors">Agendar Horário</Link>
              <Link href="/precos" className="text-gray-400 hover:text-rosegold-300 transition-colors">Tabela de Preços</Link>
              <Link href="/galeria" className="text-gray-400 hover:text-rosegold-300 transition-colors">Galeria</Link>
              <Link href="/#localizacao" className="text-gray-400 hover:text-rosegold-300 transition-colors">Como Chegar</Link>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} DaniCoiffer — Salão de Beleza em Barueri, SP. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
