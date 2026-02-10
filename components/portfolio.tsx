"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Wallet, PieChart, Target, Zap } from "lucide-react"

interface PortfolioProps {
  portfolio: any[]
  liveData: any
  balance: number
  broker: string
}

export default function Portfolio({ portfolio, liveData, balance, broker }: PortfolioProps) {
  const calculatePortfolioValue = () => {
    return portfolio.reduce((total, stock) => {
      const currentPrice = liveData[stock.symbol]?.price || stock.avgPrice
      return total + stock.quantity * currentPrice
    }, 0)
  }

  const calculateTotalPnL = () => {
    return portfolio.reduce((total, stock) => {
      const currentPrice = liveData[stock.symbol]?.price || stock.avgPrice
      const pnl = (currentPrice - stock.avgPrice) * stock.quantity
      return total + pnl
    }, 0)
  }

  const portfolioValue = calculatePortfolioValue()
  const totalPnL = calculateTotalPnL()
  const totalValue = balance + portfolioValue
  const pnlPercentage = portfolioValue > 0 ? (totalPnL / (portfolioValue - totalPnL)) * 100 : 0

  if (portfolio.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-white/95 to-emerald-50/95 backdrop-blur-xl border-emerald-200 shadow-xl">
        <CardContent className="text-center py-12">
          <Wallet className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Portfolio is Empty</h3>
          <p className="text-gray-700 mb-4">Start trading to build your investment portfolio</p>
          <Badge variant="outline" className="text-emerald-600 border-emerald-300 bg-emerald-50">
            Available Balance: ₹{balance.toLocaleString()}
          </Badge>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="bg-gradient-to-br from-white/95 to-emerald-50/95 backdrop-blur-xl border-emerald-200 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center">
            <PieChart className="h-6 w-6 mr-2 text-emerald-600" />
            Portfolio Overview
          </CardTitle>
          <CardDescription className="text-gray-700">
            Your investments via {broker} • Real-time P&L tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Portfolio Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center space-x-2 mb-2">
                <Wallet className="h-4 w-4 text-emerald-600" />
                <span className="text-sm text-gray-700">Total Value</span>
              </div>
              <div className="text-xl font-bold text-gray-900">₹{totalValue.toLocaleString()}</div>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-700">Invested</span>
              </div>
              <div className="text-xl font-bold text-gray-900">₹{portfolioValue.toLocaleString()}</div>
            </div>

            <div
              className={`p-4 rounded-xl border ${totalPnL >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}
            >
              <div className="flex items-center space-x-2 mb-2">
                {totalPnL >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className="text-sm text-gray-700">P&L</span>
              </div>
              <div className={`text-xl font-bold ${totalPnL >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                {totalPnL >= 0 ? "+" : ""}₹{totalPnL.toFixed(2)}
              </div>
              <div className={`text-sm ${totalPnL >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                {pnlPercentage >= 0 ? "+" : ""}
                {pnlPercentage.toFixed(2)}%
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Available</span>
              </div>
              <div className="text-xl font-bold text-gray-900">₹{balance.toLocaleString()}</div>
            </div>
          </div>

          {/* Holdings List */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4">Current Holdings</h4>
            {portfolio.map((stock, index) => {
              const currentPrice = liveData[stock.symbol]?.price || stock.avgPrice
              const pnl = (currentPrice - stock.avgPrice) * stock.quantity
              const pnlPercentage = ((currentPrice - stock.avgPrice) / stock.avgPrice) * 100
              const currentValue = stock.quantity * currentPrice

              return (
                <motion.div
                  key={stock.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/80 rounded-xl border border-gray-200 hover:bg-white/95 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{stock.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{stock.symbol}</h5>
                        <p className="text-xs text-gray-600">
                          {stock.exchange} • {stock.broker}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">₹{currentPrice.toFixed(2)}</div>
                      <div className={`text-sm flex items-center ${pnl >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {pnl >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {pnlPercentage >= 0 ? "+" : ""}
                        {pnlPercentage.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Quantity:</span>
                      <div className="font-bold text-gray-900">{stock.quantity}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Avg Price:</span>
                      <div className="font-bold text-gray-900">₹{stock.avgPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Current Value:</span>
                      <div className="font-bold text-gray-900">₹{currentValue.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">P&L:</span>
                      <div className={`font-bold ${pnl >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {pnl >= 0 ? "+" : ""}₹{pnl.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Live indicator */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <motion.div
                        className="w-2 h-2 bg-emerald-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <span>Live Price via {stock.broker}</span>
                    </div>
                    <Badge
                      variant={pnl >= 0 ? "default" : "destructive"}
                      className={`text-xs ${pnl >= 0 ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-red-100 text-red-700 border-red-200"}`}
                    >
                      {pnl >= 0 ? "Profit" : "Loss"}
                    </Badge>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
