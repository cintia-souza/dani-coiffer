import Image from 'next/image'

export function NailArtIllustration({ className }: { className?: string }) {
  return (
    <div className={`${className} relative rounded-2xl overflow-hidden`}>
      <Image
        src="/images/nails.jpg"
        alt="Manicure e nail art profissional em Barueri"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 300px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent" />
    </div>
  )
}

export function SpaIllustration({ className }: { className?: string }) {
  return (
    <div className={`${className} relative rounded-2xl overflow-hidden`}>
      <Image
        src="/images/hair.jpg"
        alt="Corte e tratamento capilar em Barueri"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 300px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent" />
    </div>
  )
}

export function MirrorIllustration({ className }: { className?: string }) {
  return (
    <div className={`${className} relative rounded-2xl overflow-hidden`}>
      <Image
        src="/images/makeup.jpg"
        alt="Maquiagem e estética profissional em Barueri"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 300px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent" />
    </div>
  )
}

export function HeroIllustration({ className }: { className?: string }) {
  return (
    <div className={`${className} relative rounded-3xl overflow-hidden`}>
      <Image
        src="/images/hero-salon.jpg"
        alt="DaniCoiffer salão de beleza em Barueri"
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 500px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/10 to-transparent" />
    </div>
  )
}

export function HeartFlowerIllustration({ className }: { className?: string }) {
  return (
    <div className={`${className} relative rounded-2xl overflow-hidden`}>
      <Image
        src="/images/hair.jpg"
        alt="Tratamento de beleza premium em Barueri"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 300px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent" />
    </div>
  )
}

export function BrushIllustration({ className }: { className?: string }) {
  return (
    <div className={`${className} relative rounded-2xl overflow-hidden`}>
      <Image
        src="/images/makeup.jpg"
        alt="Maquiagem profissional em Barueri"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 300px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent" />
    </div>
  )
}
