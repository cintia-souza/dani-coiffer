import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DaniCoiffer - Salão de Beleza em Barueri | Agendamento Online",
  description: "Salão de beleza em Barueri. Manicure, cabelo, maquiagem e mais. Agende online com facilidade!",
  keywords: ["Salão de Beleza em Barueri", "Manicure Barueri", "DaniCoiffer", "Cabelereira Barueri", "Agendamento Online Barueri"],
  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "DaniCoiffer",
  description: "Salão de beleza em Barueri com agendamento online",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barueri",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  url: "https://danicoiffer.com.br",
  telephone: "+5511999999999",
  openingHours: "Mo-Sa 08:00-18:00",
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <meta name="theme-color" content="#db2777" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-pink-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:z-[100]">
          Pular para conteúdo principal
        </a>
        <Header />
        <div id="main-content">
          {children}
        </div>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
