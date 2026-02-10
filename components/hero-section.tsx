"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { IndianRupee, Zap, ArrowRight, Sparkles, TrendingUp, Target } from "lucide-react"

interface HeroSectionProps {
  onGetStarted: () => void
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Premium Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-emerald-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -120, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full blur-2xl opacity-40"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
              <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 p-8 rounded-full shadow-2xl">
                <IndianRupee className="h-20 w-20 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-7xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-emerald-900 to-teal-900 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            StockBazaar
            <br />
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Pro Trading
            </span>
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl text-gray-800 mb-8 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            India's most advanced AI-powered trading platform. Trade on{" "}
            <span className="text-teal-600 font-bold">NSE, BSE, MCX & NCDEX</span> with real-time data and intelligent
            insights.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-10 py-6 text-xl font-semibold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 rounded-2xl"
            >
              <Zap className="h-6 w-6 mr-3" />
              Start Trading Now
              <ArrowRight className="h-6 w-6 ml-3" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-10 py-6 text-xl backdrop-blur-sm bg-white/60 rounded-2xl"
            >
              <Target className="h-6 w-6 mr-3" />
              View Live Markets
            </Button>
          </motion.div>

          {/* Enhanced Feature Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[
              {
                icon: IndianRupee,
                title: "Zero Brokerage*",
                description: "Trade with minimal fees and maximum profits",
                color: "from-emerald-500 to-teal-500",
                accent: "emerald",
              },
              {
                icon: TrendingUp,
                title: "Real-time Data",
                description: "Live NSE, BSE, MCX & NCDEX market data",
                color: "from-teal-500 to-cyan-500",
                accent: "teal",
              },
              {
                icon: Target,
                title: "AI Insights",
                description: "Smart trading recommendations powered by ML",
                color: "from-cyan-500 to-blue-500",
                accent: "cyan",
              },
              {
                icon: Sparkles,
                title: "Portfolio Tracking",
                description: "Advanced P&L tracking and analytics",
                color: "from-blue-500 to-indigo-500",
                accent: "blue",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-emerald-200 hover:bg-white/95 transition-all duration-300 shadow-xl hover:shadow-2xl"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-800 text-lg leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Indian Market Stats */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[
              { label: "Indian Exchanges", value: "4", suffix: "" },
              { label: "Live Stocks", value: "100", suffix: "+" },
              { label: "Commodities", value: "20", suffix: "+" },
              { label: "Market Cap", value: "₹280", suffix: "L Cr" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-emerald-200"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                  <span className="text-teal-600">{stat.suffix}</span>
                </div>
                <div className="text-gray-800 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
