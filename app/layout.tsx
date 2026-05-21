import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DaniCoiffer | Cabeleireira e Salão de Beleza em Barueri - Agendamento Online",
  description: "DaniCoiffer - Salão de beleza e cabeleireira em Barueri, SP. Corte feminino, coloração, escova, manicure, pedicure e hidratação. Agende online agora! Atendemos Barueri, Alphaville, Jardim Barueri e região.",
  keywords: [
    "cabeleireira Barueri",
    "salão de beleza Barueri",
    "DaniCoiffer",
    "cabelereira Barueri SP",
    "manicure Barueri",
    "corte feminino Barueri",
    "coloração cabelo Barueri",
    "escova modelada Barueri",
    "salão Alphaville",
    "salão Jardim Barueri",
    "agendamento online salão Barueri",
    "hidratação capilar Barueri",
    "pedicure Barueri",
    "melhor salão de beleza Barueri",
    "cabeleireira perto de mim Barueri",
  ],
  manifest: "/manifest.json",
  openGraph: {
    title: "DaniCoiffer | Cabeleireira e Salão de Beleza em Barueri",
    description: "Salão de beleza premium em Barueri. Corte, coloração, manicure e mais. Agende online!",
    url: "https://danicoiffer.com.br",
    siteName: "DaniCoiffer",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  alternates: { canonical: "https://danicoiffer.com.br" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "DaniCoiffer",
  description: "Salão de beleza e cabeleireira em Barueri, SP. Corte feminino, coloração, escova, manicure, pedicure e hidratação capilar. Agendamento online.",
  image: "https://danicoiffer.com.br/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Fernanda, 40",
    addressLocality: "Barueri",
    addressRegion: "SP",
    postalCode: "06440-000",
    addressCountry: "BR",
    neighborhood: "Jardim Barueri",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -23.51,
    longitude: -46.876,
  },
  url: "https://danicoiffer.com.br",
  telephone: "+5511999999999",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "18:00" },
  ],
  priceRange: "$$",
  areaServed: [
    { "@type": "City", name: "Barueri" },
    { "@type": "Place", name: "Alphaville" },
    { "@type": "Place", name: "Jardim Barueri" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços de Beleza",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corte Feminino", description: "Corte com lavagem e finalização" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Coloração", description: "Tintura completa" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Escova Modelada" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Manicure e Pedicure" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hidratação Capilar" } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <meta name="theme-color" content="#b76e79" />
        <meta name="geo.region" content="BR-SP" />
        <meta name="geo.placename" content="Barueri" />
        <meta name="geo.position" content="-23.51;-46.876" />
        <meta name="ICBM" content="-23.51, -46.876" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-rosegold-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:z-[100]">
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
