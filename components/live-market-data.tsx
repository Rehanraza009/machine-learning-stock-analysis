"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Volume2, DollarSign, BarChart3, Zap } from "lucide-react"
import { useState, useEffect } from "react"

interface Stock {
  symbol: string
  name: string
  sector: string
  price: number
  change: number
  changePercent: number
  volume: number
  trend: string
  high: number
  low: number
  open: number
  broker: string
  dataQuality: string
  latency: number
}

interface LiveMarketDataProps {
  stocks: Stock[]
  onStockSelect: (symbol: string) => void
  exchange: string
  broker: string
  exchangeInfo: any
}

export default function LiveMarketData({ stocks, onStockSelect, exchange, broker, exchangeInfo }: LiveMarketDataProps) {
  const [marketStats, setMarketStats] = useState({
    totalVolume: 0,
    advancers: 0,
    decliners: 0,
    unchanged: 0,
    topGainer: null,
    topLoser: null,
  })

  useEffect(() => {
    if (stocks.length > 0) {
      const totalVolume = stocks.reduce((sum, stock) => sum + (stock.volume || 0), 0)
      const advancers = stocks.filter((stock) => stock.change > 0).length
      const decliners = stocks.filter((stock) => stock.change < 0).length
      const unchanged = stocks.filter((stock) => stock.change === 0).length

      const topGainer = stocks.reduce(
        (max, stock) => (stock.changePercent > (max?.changePercent || Number.NEGATIVE_INFINITY) ? stock : max),
        null,
      )
      const topLoser = stocks.reduce(
        (min, stock) => (stock.changePercent < (min?.changePercent || Number.POSITIVE_INFINITY) ? stock : min),
        null,
      )

      setMarketStats({
        totalVolume,
        advancers,
        decliners,
        unchanged,
        topGainer,
        topLoser,
      })
    }
  }, [stocks])

  const getSectorPerformance = () => {
    const sectorMap = {}
    stocks.forEach((stock) => {
      if (!sectorMap[stock.sector]) {
        sectorMap[stock.sector] = { total: 0, count: 0, stocks: [] }
      }
      sectorMap[stock.sector].total += stock.changePercent || 0
      sectorMap[stock.sector].count += 1
      sectorMap[stock.sector].stocks.push(stock)
    })

    return Object.entries(sectorMap)
      .map(([sector, data]) => ({
        sector,
        avgChange: data.total / data.count,
        stockCount: data.count,
        stocks: data.stocks,
      }))
      .sort((a, b) => b.avgChange - a.avgChange)
  }

  const sectorPerformance = getSectorPerformance()

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Activity className="h-10 w-10 mr-4 text-emerald-500" />
            Live Market Data
          </h2>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Real-time {exchange} data via {broker} • Updated every second
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <Badge variant="outline" className="text-emerald-600 border-emerald-300 bg-emerald-50">
              {broker} Connected
            </Badge>
            <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">
              {stocks[0]?.dataQuality || "Premium"} Data
            </Badge>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Zap className="h-4 w-4 text-emerald-500" />
              <span>{stocks[0]?.latency || 25}ms latency</span>
            </div>
          </div>
        </motion.div>

        {/* Market Statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 backdrop-blur-xl border-emerald-200 shadow-lg">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{marketStats.advancers}</div>
              <div className="text-sm text-emerald-600 font-medium">Advancers</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 backdrop-blur-xl border-red-200 shadow-lg">
            <CardContent className="p-4 text-center">
              <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{marketStats.decliners}</div>
              <div className="text-sm text-red-600 font-medium">Decliners</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 backdrop-blur-xl border-blue-200 shadow-lg">
            <CardContent className="p-4 text-center">
              <Volume2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {(marketStats.totalVolume / 10000000).toFixed(1)}Cr
              </div>
              <div className="text-sm text-blue-600 font-medium">Total Volume</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 backdrop-blur-xl border-purple-200 shadow-lg">
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stocks.length}</div>
              <div className="text-sm text-purple-600 font-medium">Stocks</div>
            </CardContent>
          </Card>

          {marketStats.topGainer && (
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-100 backdrop-blur-xl border-emerald-200 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-gray-900">{marketStats.topGainer.symbol}</div>
                <div className="text-sm text-emerald-600 font-medium">
                  +{marketStats.topGainer.changePercent?.toFixed(2)}%
                </div>
                <div className="text-xs text-emerald-500">Top Gainer</div>
              </CardContent>
            </Card>
          )}

          {marketStats.topLoser && (
            <Card className="bg-gradient-to-br from-red-50 to-rose-100 backdrop-blur-xl border-red-200 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-gray-900">{marketStats.topLoser.symbol}</div>
                <div className="text-sm text-red-600 font-medium">
                  {marketStats.topLoser.changePercent?.toFixed(2)}%
                </div>
                <div className="text-xs text-red-500">Top Loser</div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Broker Performance Indicator */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{broker} Live Feed</h3>
                    <p className="text-gray-700">Real-time data from {exchangeInfo?.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{stocks[0]?.latency || 25}ms</div>
                      <div className="text-sm text-gray-600">Latency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{stocks[0]?.dataQuality || "Premium"}</div>
                      <div className="text-sm text-gray-600">Data Quality</div>
                    </div>
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sector Performance */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Sector Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sectorPerformance.slice(0, 8).map((sector, index) => (
              <motion.div
                key={sector.sector}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              >
                <Card className="bg-white/70 backdrop-blur-xl border-slate-200 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{sector.sector}</h4>
                      <Badge
                        variant={sector.avgChange >= 0 ? "default" : "destructive"}
                        className={`text-xs ${
                          sector.avgChange >= 0
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }`}
                      >
                        {sector.avgChange >= 0 ? "+" : ""}
                        {sector.avgChange.toFixed(2)}%
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600">{sector.stockCount} stocks</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live Stock Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, staggerChildren: 0.05 }}
        >
          {stocks.map((stock, index) => (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              onClick={() => onStockSelect(stock.symbol)}
            >
              <Card className="bg-gradient-to-br from-white/90 to-slate-50/90 backdrop-blur-xl border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl h-full">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xs">{stock.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{stock.symbol}</h3>
                        <p className="text-xs text-blue-600 font-medium">{stock.sector}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{
                        rotate: stock.trend === "up" ? 0 : 180,
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        rotate: { duration: 0.3 },
                        scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      {stock.trend === "up" ? (
                        <TrendingUp className="h-6 w-6 text-emerald-500" />
                      ) : (
                        <TrendingDown className="h-6 w-6 text-red-500" />
                      )}
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-blue-500" />
                        <span className="text-xl font-bold text-gray-900">₹{stock.price?.toFixed(2)}</span>
                      </div>
                      <Badge
                        variant={stock.trend === "up" ? "default" : "destructive"}
                        className={`text-sm px-3 py-1 ${
                          stock.trend === "up"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }`}
                      >
                        {stock.changePercent >= 0 ? "+" : ""}
                        {stock.changePercent?.toFixed(2)}%
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-gray-700">
                        <span className="text-gray-600">High:</span> ₹{stock.high?.toFixed(2)}
                      </div>
                      <div className="text-gray-700">
                        <span className="text-gray-600">Low:</span> ₹{stock.low?.toFixed(2)}
                      </div>
                      <div className="text-gray-700">
                        <span className="text-gray-600">Open:</span> ₹{stock.open?.toFixed(2)}
                      </div>
                      <div className="text-gray-700">
                        <span className="text-gray-600">Vol:</span> {(stock.volume / 100000)?.toFixed(1)}L
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1 text-gray-700">
                        <motion.div
                          className="w-2 h-2 bg-emerald-400 rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <span>Live via {stock.broker}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {stock.latency}ms
                      </Badge>
                    </div>
                  </div>

                  {/* Mini Chart Simulation */}
                  <div className="mt-4 h-12 flex items-end space-x-1">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-1 bg-gradient-to-t rounded-t ${
                          stock.trend === "up" ? "from-emerald-200 to-emerald-500" : "from-red-200 to-red-500"
                        }`}
                        style={{ height: `${Math.random() * 100 + 20}%` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.random() * 100 + 20}%` }}
                        transition={{
                          delay: i * 0.05,
                          duration: 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 3,
                        }}
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
