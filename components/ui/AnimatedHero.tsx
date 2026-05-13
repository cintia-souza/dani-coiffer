'use client'

import { motion } from 'framer-motion'
import { Scissors, Sparkles, Heart, Droplets, Star } from 'lucide-react'

export default function AnimatedHero({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Background blob */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-100 to-rose-50"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Center scissors - animated open/close */}
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Scissors className="w-20 h-20 text-pink-600" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Floating icons around */}
        <motion.div
          className="absolute top-[15%] left-[15%]"
          animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="w-8 h-8 text-pink-400" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          className="absolute top-[20%] right-[18%]"
          animate={{ y: [5, -5, 5], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <Heart className="w-6 h-6 text-pink-300 fill-pink-200" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] left-[20%]"
          animate={{ y: [3, -6, 3], rotate: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <Droplets className="w-7 h-7 text-pink-400" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          className="absolute bottom-[25%] right-[15%]"
          animate={{ y: [-4, 4, -4], rotate: [0, 20, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <Star className="w-6 h-6 text-pink-300 fill-pink-100" strokeWidth={1.5} />
        </motion.div>

        {/* Orbiting dots */}
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-pink-300"
          animate={{
            x: [0, 60, 0, -60, 0],
            y: [-60, 0, 60, 0, -60],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ top: '50%', left: '50%', marginTop: -6, marginLeft: -6 }}
        />
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-pink-200"
          animate={{
            x: [0, -45, 0, 45, 0],
            y: [45, 0, -45, 0, 45],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{ top: '50%', left: '50%', marginTop: -4, marginLeft: -4 }}
        />

        {/* Decorative rings */}
        <motion.div
          className="absolute inset-[15%] rounded-full border border-pink-200 opacity-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-[25%] rounded-full border border-dashed border-pink-100 opacity-30"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  )
}
