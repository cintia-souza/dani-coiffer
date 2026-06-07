'use client'

import { motion } from 'framer-motion'
import { Sparkles, Star } from 'lucide-react'
import Image from 'next/image'

export default function AnimatedHero({ className, image }: { className?: string; image?: string }) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-rosegold-100 to-rose-50"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-[85%] h-[85%] rounded-full overflow-hidden border-4 border-rosegold-200 shadow-xl shadow-rosegold-200/30 relative">
          <Image
            src={image || '/images/hero-salon.jpg'}
            alt="Salão de beleza DaniCoiffer em Barueri"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 256px, 320px"
          />
        </div>

        <motion.div
          className="absolute top-[10%] left-[10%]"
          animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="w-7 h-7 text-rosegold-500" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          className="absolute top-[15%] right-[12%]"
          animate={{ y: [5, -5, 5], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <Star className="w-5 h-5 text-rosegold-400 fill-rosegold-200" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          className="absolute bottom-[15%] left-[12%]"
          animate={{ y: [3, -6, 3], rotate: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <Star className="w-6 h-6 text-rosegold-500 fill-rosegold-100" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] right-[10%]"
          animate={{ y: [-4, 4, -4], rotate: [0, 20, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <Sparkles className="w-5 h-5 text-rose-400" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          className="absolute w-3 h-3 rounded-full bg-rosegold-400"
          animate={{
            x: [0, 60, 0, -60, 0],
            y: [-60, 0, 60, 0, -60],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ top: '50%', left: '50%', marginTop: -6, marginLeft: -6 }}
        />

        <motion.div
          className="absolute inset-[5%] rounded-full border border-rosegold-200/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  )
}
