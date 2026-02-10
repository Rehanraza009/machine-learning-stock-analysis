"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Volume2, DollarSign } from "lucide-react"

interface Stock {
  symbol: string
  name: string
  change: string
  trend: string
  price: number
  volume: string
}

interface MarketOverviewProps {
  stocks: Stock[]
  onStockSelect: (symbol: string) => void
}

export default function MarketOverview({ stocks, onStockSelect }: MarketOverviewProps) {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Market Overview</h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Real-time data from top performing stocks with AI-powered insights
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          {stocks.map((stock, index) => (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
              onClick={() => onStockSelect(stock.symbol)}
            >
              <Card className="bg-gradient-to-br from-white/90 to-slate-50/90 backdrop-blur-xl border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">{stock.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{stock.symbol}</h3>
                        <p className="text-sm text-gray-700">{stock.name}</p>
                      </div>
                    </div>
                    <motion.div animate={{ rotate: stock.trend === "up" ? 0 : 180 }} transition={{ duration: 0.3 }}>
                      {stock.trend === "up" ? (
                        <TrendingUp className="h-8 w-8 text-emerald-500" />
                      ) : (
                        <TrendingDown className="h-8 w-8 text-red-500" />
                      )}
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-blue-500" />
                        <span className="text-2xl font-bold text-gray-900">₹{stock.price}</span>
                      </div>
                      <Badge
                        variant={stock.trend === "up" ? "default" : "destructive"}
                        className={`text-sm px-3 py-1 ${
                          stock.trend === "up"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }`}
                      >
                        {stock.change}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Volume2 className="h-4 w-4" />
                        <span>Volume: {stock.volume}</span>
                      </div>
                      <motion.div
                        className="w-2 h-2 bg-emerald-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>
                  </div>

                  {/* Mini Chart Simulation */}
                  <div className="mt-4 h-16 flex items-end space-x-1">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-1 bg-gradient-to-t rounded-t ${
                          stock.trend === "up" ? "from-emerald-200 to-emerald-500" : "from-red-200 to-red-500"
                        }`}
                        style={{ height: `${Math.random() * 100 + 20}%` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.random() * 100 + 20}%` }}
                        transition={{ delay: i * 0.05, duration: 0.5 }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
