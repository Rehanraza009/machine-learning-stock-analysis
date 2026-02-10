"use client"

import { motion } from "framer-motion"

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Emerald & Teal Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-300/20 to-teal-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-300/20 to-blue-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-teal-300/20 to-emerald-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-green-300/15 to-emerald-400/15 rounded-full blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 6,
        }}
      />

      {/* Indian-themed Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Premium Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        />
      ))}

      {/* Indian Rupee Symbol Accents */}
      <motion.div
        className="absolute top-20 right-20 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full opacity-20"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-32 left-32 w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rotate-45 opacity-15"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [45, 225, 405],
        }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <motion.div
        className="absolute top-1/2 left-20 w-4 h-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-sm opacity-25"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </div>
  )
}
