import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dany Diniz | Cabeleireira e Salão de Beleza em Barueri - Agendamento Online",
  description: "Dany Diniz - Salão de beleza e cabeleireira em Barueri, SP. Corte feminino, coloração, escova, manicure, pedicure e hidratação. Agende online agora! Atendemos Barueri, Alphaville, Jardim Barueri e região.",
  keywords: [
    "cabeleireira Barueri",
    "salão de beleza Barueri",
    "Dany Diniz",
    "Dany Diniz cabeleireira",
    "cabelereira Barueri SP",
    "manicure Barueri",
    "corte feminino Barueri",
    "coloração cabelo Barueri",
    "escova modelada Barueri",
    "salão Alphaville",
    "salão Jardim Barueri",
    "cabeleireira Jardim Barueri",
    "agendamento online salão Barueri",
    "hidratação capilar Barueri",
    "pedicure Barueri",
    "melhor salão de beleza Barueri",
    "cabeleireira perto de mim",
    "salão de beleza perto de mim Barueri",
    "salão de beleza Jandira",
    "cabeleireira Osasco",
    "salão Carapicuíba",
    "corte e coloração Barueri",
    "unha gel Barueri",
  ],
  manifest: "/manifest.json",
  openGraph: {
    title: "Dany Diniz | Cabeleireira e Salão de Beleza em Barueri",
    description: "Salão de beleza premium em Barueri. Corte, coloração, manicure e mais. Agende online!",
    url: "https://danydiniz.com.br",
    siteName: "Dany Diniz",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  alternates: { canonical: "https://danydiniz.com.br" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": "https://danydiniz.com.br/#salon",
  name: "Dany Diniz",
  alternateName: "Dany Diniz Cabeleireira",
  description: "Salão de beleza e cabeleireira em Barueri, SP. Corte feminino, coloração, escova, manicure, pedicure e hidratação capilar. Agendamento online.",
  image: "https://danydiniz.com.br/images/hero-salon.jpg",
  logo: "https://danydiniz.com.br/icon.svg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Fernanda, 19",
    addressLocality: "Barueri",
    addressRegion: "SP",
    postalCode: "06411-350",
    addressCountry: "BR",
    neighborhood: "Jardim Barueri",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -23.5100,
    longitude: -46.8760,
  },
  url: "https://danydiniz.com.br",
  telephone: "+5511976666767",
  sameAs: [
    "https://www.google.com/maps/place/Dany+Diniz",
    "https://www.instagram.com/danydiniz",
  ],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "18:00" },
  ],
  priceRange: "$$",
  currenciesAccepted: "BRL",
  paymentAccepted: "Cash, PIX, Credit Card",
  areaServed: [
    { "@type": "City", name: "Barueri", "@id": "https://www.wikidata.org/wiki/Q327793" },
    { "@type": "Place", name: "Alphaville" },
    { "@type": "Place", name: "Jardim Barueri" },
    { "@type": "Place", name: "Jandira" },
    { "@type": "Place", name: "Osasco" },
    { "@type": "Place", name: "Carapicuíba" },
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
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://danydiniz.com.br/agendar",
      actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
    },
    result: { "@type": "Reservation", name: "Agendamento Online" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <meta name="theme-color" content="#b76e79" />
        <meta name="geo.region" content="BR-SP" />
        <meta name="geo.placename" content="Barueri" />
        <meta name="geo.position" content="-23.5100;-46.8760" />
        <meta name="ICBM" content="-23.5100, -46.8760" />
        <meta name="google-site-verification" content="" />
        <link rel="canonical" href="https://danydiniz.com.br" />
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
