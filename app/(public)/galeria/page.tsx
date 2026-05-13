'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Scissors, Sparkles, Heart, Droplets, Star, Flower2, Palette } from 'lucide-react'
import { getGalleryPhotos } from '@/lib/gallery-actions'

interface Photo {
  id: string
  imageUrl: string
  caption: string | null
  category: string | null
  professionalName: string
}

const galleryArt = [
  {
    id: 'art-1',
    title: 'Cuidados Capilares',
    subtitle: 'Transformação e estilo',
    icon: Scissors,
    color: 'from-pink-100 to-rose-50',
    iconColor: 'text-pink-600',
    orbitColor: 'bg-pink-300',
  },
  {
    id: 'art-2',
    title: 'Nail Art',
    subtitle: 'Detalhes que encantam',
    icon: Sparkles,
    color: 'from-fuchsia-50 to-pink-100',
    iconColor: 'text-fuchsia-500',
    orbitColor: 'bg-fuchsia-300',
  },
  {
    id: 'art-3',
    title: 'Bem-Estar',
    subtitle: 'Relaxe e renove',
    icon: Droplets,
    color: 'from-pink-50 to-rose-100',
    iconColor: 'text-pink-500',
    orbitColor: 'bg-rose-300',
  },
  {
    id: 'art-4',
    title: 'Beleza Natural',
    subtitle: 'Realce sua essência',
    icon: Flower2,
    color: 'from-rose-50 to-pink-50',
    iconColor: 'text-rose-500',
    orbitColor: 'bg-pink-200',
  },
  {
    id: 'art-5',
    title: 'Amor Próprio',
    subtitle: 'Você merece se cuidar',
    icon: Heart,
    color: 'from-pink-100 to-fuchsia-50',
    iconColor: 'text-pink-500',
    orbitColor: 'bg-pink-300',
  },
  {
    id: 'art-6',
    title: 'Maquiagem',
    subtitle: 'Arte e sofisticação',
    icon: Palette,
    color: 'from-rose-100 to-pink-50',
    iconColor: 'text-rose-600',
    orbitColor: 'bg-rose-200',
  },
]

function AnimatedCard({ item, index }: { item: typeof galleryArt[0]; index: number }) {
  const Icon = item.icon
  const delay = index * 0.15

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`card-hover rounded-2xl overflow-hidden bg-gradient-to-br ${item.color} p-8 flex flex-col items-center justify-center aspect-square relative`}
    >
      {/* Rotating ring */}
      <motion.div
        className="absolute inset-[20%] rounded-full border border-pink-200/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 12 + index * 2, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-[30%] rounded-full border border-dashed border-pink-100/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 10 + index * 2, repeat: Infinity, ease: 'linear' }}
      />

      {/* Orbiting dot */}
      <motion.div
        className={`absolute w-2.5 h-2.5 rounded-full ${item.orbitColor} opacity-60`}
        animate={{
          x: [0, 40, 0, -40, 0],
          y: [-40, 0, 40, 0, -40],
        }}
        transition={{ duration: 6 + index, repeat: Infinity, ease: 'linear' }}
        style={{ top: '50%', left: '50%', marginTop: -5, marginLeft: -5 }}
      />

      {/* Main icon */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, index % 2 === 0 ? 5 : -5, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        <Icon className={`w-16 h-16 ${item.iconColor}`} strokeWidth={1.3} />
      </motion.div>

      {/* Small floating sparkle */}
      <motion.div
        className="absolute top-[18%] right-[22%]"
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 }}
      >
        <Star className="w-4 h-4 text-pink-300 fill-pink-100" strokeWidth={1.5} />
      </motion.div>

      <div className="mt-6 text-center relative z-10">
        <h3 className="font-bold text-gray-800">{item.title}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{item.subtitle}</p>
      </div>
    </motion.div>
  )
}

export default function GaleriaPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [filter, setFilter] = useState<string>('todos')

  useEffect(() => {
    getGalleryPhotos().then((data) => setPhotos(data as Photo[]))
  }, [])

  const filtered = filter === 'todos' ? photos : photos.filter(p => p.category === filter)

  return (
    <main className="flex-1 px-4 py-8 max-w-5xl mx-auto w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Galeria</h1>
        <p className="text-gray-500">Inspirações de beleza e bem-estar</p>
      </div>

      {/* Animated icon cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {galleryArt.map((item, i) => (
          <AnimatedCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {/* Fotos dos profissionais */}
      {photos.length > 0 && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Nossos Trabalhos</h2>
            <p className="text-gray-500 text-sm mb-4">Resultados reais das nossas profissionais</p>

            {/* Filtro por categoria */}
            <div className="flex flex-wrap justify-center gap-2">
              {['todos', 'cabelo', 'unhas', 'maquiagem', 'estetica'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filter === cat
                      ? 'gradient-pink text-white shadow-md'
                      : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                  }`}
                >
                  {cat === 'todos' ? 'Todos' : cat === 'estetica' ? 'Estética' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="card-hover relative rounded-2xl overflow-hidden aspect-square group"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.caption || 'Trabalho do salão'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {photo.caption && <p className="text-white font-medium text-sm">{photo.caption}</p>}
                  <p className="text-white/70 text-xs mt-0.5">por {photo.professionalName}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {photos.length === 0 && (
        <p className="text-center text-gray-400 text-sm mt-4">Em breve mais fotos dos nossos trabalhos!</p>
      )}
    </main>
  )
}
