"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Brain,
  Search,
  Sparkles,
  Zap,
  Activity,
  Wallet,
  Target,
  IndianRupee,
} from "lucide-react"
import StockChart from "@/components/stock-chart"
import FinancialMetrics from "@/components/financial-metrics"
import MLInsights from "@/components/ml-insights"
import RealTimeAnalysis from "@/components/real-time-analysis"
import HeroSection from "@/components/hero-section"
import MarketOverview from "@/components/market-overview"
import AnimatedBackground from "@/components/animated-background"
import LiveMarketData from "@/components/live-market-data"
import ExchangeSelector from "@/components/exchange-selector"
import TradingPanel from "@/components/trading-panel"
import Portfolio from "@/components/portfolio"
import BrokerSelector from "@/components/broker-selector"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
}

export default function HomePage() {
  const [selectedStock, setSelectedStock] = useState("RELIANCE")
  const [selectedExchange, setSelectedExchange] = useState("NSE")
  const [selectedBroker, setSelectedBroker] = useState("ANGELONE")
  const [stockData, setStockData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [liveData, setLiveData] = useState({})
  const [marketStatus, setMarketStatus] = useState("OPEN")
  const [exchangeData, setExchangeData] = useState({})
  const [portfolio, setPortfolio] = useState([])
  const [balance, setBalance] = useState(100000) // Starting balance ₹1,00,000
  const [brokerConnection, setBrokerConnection] = useState({ status: "connected", latency: 45 })

  // Fetch live data from selected broker
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const response = await fetch(`/api/live-market-data?exchange=${selectedExchange}&broker=${selectedBroker}`)
        const data = await response.json()
        setLiveData(data.stocks)
        setMarketStatus(data.marketStatus)
        setExchangeData(data.exchangeInfo)
        setBrokerConnection(data.brokerConnection)
      } catch (error) {
        console.error("Error fetching live data:", error)
      }
    }

    fetchLiveData()
    const interval = setInterval(fetchLiveData, 1000) // Update every 1 second for real-time data

    return () => clearInterval(interval)
  }, [selectedExchange, selectedBroker])

  const fetchStockData = async (symbol: string) => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/stock-data?symbol=${symbol}&exchange=${selectedExchange}&broker=${selectedBroker}`,
      )
      const data = await response.json()
      setStockData(data)
      setShowAnalysis(true)
    } catch (error) {
      console.error("Error fetching stock data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedStock) {
      fetchStockData(selectedStock)
    }
  }, [selectedStock, selectedExchange, selectedBroker])

  const handleStockSelect = (symbol: string) => {
    setSelectedStock(symbol)
    setShowAnalysis(false)
  }

  const handleExchangeChange = (exchange: string) => {
    setSelectedExchange(exchange)
    setShowAnalysis(false)
    const defaultStocks = {
      NSE: "RELIANCE",
      BSE: "500325",
      MCX: "GOLD",
      NCDEX: "WHEAT",
    }
    setSelectedStock(defaultStocks[exchange] || "RELIANCE")
  }

  const handleBrokerChange = (broker: string) => {
    setSelectedBroker(broker)
    setShowAnalysis(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      setSelectedStock(searchTerm.toUpperCase())
      setSearchTerm("")
      setShowAnalysis(false)
    }
  }

  const handleTrade = (type: "BUY" | "SELL", symbol: string, quantity: number, price: number) => {
    const totalAmount = quantity * price
    const brokerage = totalAmount * 0.0005 // 0.05% brokerage

    if (type === "BUY") {
      if (balance >= totalAmount + brokerage) {
        setBalance(balance - totalAmount - brokerage)
        const existingStock = portfolio.find((stock) => stock.symbol === symbol)
        if (existingStock) {
          const newAvgPrice =
            (existingStock.avgPrice * existingStock.quantity + totalAmount) / (existingStock.quantity + quantity)
          setPortfolio(
            portfolio.map((stock) =>
              stock.symbol === symbol
                ? { ...stock, quantity: stock.quantity + quantity, avgPrice: newAvgPrice }
                : stock,
            ),
          )
        } else {
          setPortfolio([
            ...portfolio,
            { symbol, quantity, avgPrice: price, exchange: selectedExchange, broker: selectedBroker },
          ])
        }
      }
    } else {
      const existingStock = portfolio.find((stock) => stock.symbol === symbol)
      if (existingStock && existingStock.quantity >= quantity) {
        setBalance(balance + totalAmount - brokerage)
        if (existingStock.quantity === quantity) {
          setPortfolio(portfolio.filter((stock) => stock.symbol !== symbol))
        } else {
          setPortfolio(
            portfolio.map((stock) =>
              stock.symbol === symbol ? { ...stock, quantity: stock.quantity - quantity } : stock,
            ),
          )
        }
      }
    }
  }

  // Get stocks with live data
  const getStocksWithLiveData = () => {
    return Object.values(liveData).map((stock: any) => ({
      ...stock,
      trend: stock.change >= 0 ? "up" : "down",
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      <AnimatedBackground />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 bg-white/95 backdrop-blur-xl border-b border-emerald-200/50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-2xl shadow-xl">
                <IndianRupee className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text text-transparent">
                  StockBazaar Pro
                </h1>
                <p className="text-sm text-gray-800 flex items-center font-medium">
                  <Activity className="h-3 w-3 mr-1" />
                  {selectedExchange} • {selectedBroker} • {marketStatus}
                </p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-6">
              <BrokerSelector selectedBroker={selectedBroker} onBrokerChange={handleBrokerChange} />
              <ExchangeSelector selectedExchange={selectedExchange} onExchangeChange={handleExchangeChange} />

              <div className="flex items-center space-x-4 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
                <Wallet className="h-4 w-4 text-emerald-600" />
                <div className="text-sm">
                  <span className="text-gray-700 font-medium">Balance: </span>
                  <span className="text-gray-900 font-bold">₹{balance.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm bg-white/80 px-3 py-2 rounded-lg">
                <div
                  className={`w-2 h-2 rounded-full ${brokerConnection.status === "connected" ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`}
                />
                <span className="text-gray-800 font-medium">{brokerConnection.status}</span>
                <span className="text-gray-600">({brokerConnection.latency}ms)</span>
              </div>

              <motion.form
                onSubmit={handleSearch}
                className="flex space-x-3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-400" />
                  <Input
                    type="text"
                    placeholder={`Search ${selectedExchange} stocks...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 bg-white/80 border-emerald-200 text-gray-900 placeholder-gray-600 backdrop-blur-sm focus:bg-white focus:border-emerald-400"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg text-white"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Analyze
                </Button>
              </motion.form>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="relative z-10">
        {!showAnalysis ? (
          <>
            <HeroSection onGetStarted={() => setShowAnalysis(true)} />
            <LiveMarketData
              stocks={getStocksWithLiveData()}
              onStockSelect={handleStockSelect}
              exchange={selectedExchange}
              broker={selectedBroker}
              exchangeInfo={exchangeData}
            />
            <MarketOverview
              stocks={getStocksWithLiveData().slice(0, 6)}
              onStockSelect={handleStockSelect}
              exchange={selectedExchange}
              broker={selectedBroker}
            />
          </>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back to Overview */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setShowAnalysis(false)}
                className="text-emerald-600 hover:bg-emerald-100"
              >
                ← Back to Market Overview
              </Button>
            </motion.div>

            {/* Portfolio Summary */}
            <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Portfolio portfolio={portfolio} liveData={liveData} balance={balance} broker={selectedBroker} />
            </motion.div>

            {/* Popular Stocks Grid */}
            <motion.div className="mb-8" variants={containerVariants} initial="hidden" animate="visible">
              <motion.h2 variants={itemVariants} className="text-2xl font-bold text-emerald-800 mb-6 flex items-center">
                <Target className="h-6 w-6 mr-2 text-amber-500" />
                {selectedExchange} Live Stocks via {selectedBroker} - Real-time Trading
              </motion.h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-96 overflow-y-auto">
                {getStocksWithLiveData().map((stock, index) => (
                  <motion.div
                    key={stock.symbol}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-300 hover:shadow-xl backdrop-blur-sm ${
                        selectedStock === stock.symbol
                          ? "bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-300 shadow-emerald-200/50"
                          : "bg-white/80 border-emerald-200 hover:bg-white/95"
                      }`}
                      onClick={() => handleStockSelect(stock.symbol)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-gray-900 text-sm">{stock.symbol}</span>
                          <motion.div
                            animate={{ rotate: stock.trend === "up" ? 0 : 180 }}
                            transition={{ duration: 0.3 }}
                          >
                            {stock.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                          </motion.div>
                        </div>
                        <p className="text-xs text-gray-700 mb-2 truncate">{stock.name}</p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-900 font-semibold text-sm">₹{stock.price?.toFixed(2)}</span>
                            <Badge
                              variant={stock.trend === "up" ? "default" : "destructive"}
                              className={`text-xs ${stock.trend === "up" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-red-100 text-red-700 border-red-200"}`}
                            >
                              {stock.changePercent?.toFixed(2)}%
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-600">Vol: {stock.volumeDisplay}</div>
                          <div className="text-xs text-gray-800 font-medium">{stock.sector}</div>
                          <div className="text-xs text-emerald-600 font-medium">via {stock.broker}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Main Analysis Dashboard */}
            <AnimatePresence mode="wait">
              {stockData && (
                <motion.div
                  key={selectedStock}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-8"
                >
                  {/* Stock Overview with Trading Panel */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <Card className="bg-gradient-to-r from-white/95 to-emerald-50/95 backdrop-blur-xl border-emerald-200 shadow-2xl">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-3xl text-gray-900 flex items-center">
                                  {stockData.symbol}
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                    className="ml-3"
                                  >
                                    <Sparkles className="h-6 w-6 text-amber-500" />
                                  </motion.div>
                                </CardTitle>
                                <CardDescription className="text-gray-800 text-lg">{stockData.name}</CardDescription>
                                <div className="flex items-center space-x-4 mt-2">
                                  <Badge
                                    variant="outline"
                                    className="text-emerald-600 border-emerald-300 bg-emerald-50"
                                  >
                                    {stockData.sector}
                                  </Badge>
                                  <Badge variant="outline" className="text-teal-600 border-teal-300 bg-teal-50">
                                    {stockData.exchange}
                                  </Badge>
                                  <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">
                                    {stockData.broker}
                                  </Badge>
                                  <div className="flex items-center text-sm text-emerald-500">
                                    <Activity className="h-3 w-3 mr-1" />
                                    Live Data
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <motion.div
                                  className="text-4xl font-bold text-emerald-800"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                                >
                                  ₹{stockData.price?.toFixed(2)}
                                </motion.div>
                                <motion.div
                                  className={`flex items-center justify-end text-lg ${
                                    stockData.change >= 0 ? "text-emerald-600" : "text-red-600"
                                  }`}
                                  initial={{ x: 50, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.4 }}
                                >
                                  {stockData.change >= 0 ? (
                                    <TrendingUp className="h-5 w-5 mr-2" />
                                  ) : (
                                    <TrendingDown className="h-5 w-5 mr-2" />
                                  )}
                                  {stockData.change >= 0 ? "+" : ""}
                                  {stockData.changePercent?.toFixed(2)}%
                                </motion.div>
                                <div className="text-sm text-emerald-500 mt-1">Vol: {stockData.volumeDisplay}</div>
                                <div className="text-xs text-gray-600 mt-1">Last updated: {stockData.lastUpdated}</div>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      </motion.div>
                    </div>

                    {/* Trading Panel */}
                    <div className="lg:col-span-1">
                      <TradingPanel
                        stockData={stockData}
                        onTrade={handleTrade}
                        balance={balance}
                        portfolio={portfolio}
                        broker={selectedBroker}
                      />
                    </div>
                  </div>

                  {/* Analysis Tabs */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <Tabs defaultValue="overview" className="space-y-8">
                      <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border-emerald-200">
                        <TabsTrigger
                          value="overview"
                          className="flex items-center space-x-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 text-emerald-600"
                        >
                          <BarChart3 className="h-4 w-4" />
                          <span>Overview</span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="financials"
                          className="flex items-center space-x-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 text-emerald-600"
                        >
                          <DollarSign className="h-4 w-4" />
                          <span>Financials</span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="ml-insights"
                          className="flex items-center space-x-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 text-emerald-600"
                        >
                          <Brain className="h-4 w-4" />
                          <span>AI Insights</span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="real-time"
                          className="flex items-center space-x-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 text-emerald-600"
                        >
                          <Zap className="h-4 w-4" />
                          <span>Live Data</span>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <StockChart symbol={stockData.symbol} broker={selectedBroker} />
                          <FinancialMetrics data={stockData} />
                        </div>
                      </TabsContent>

                      <TabsContent value="financials" className="space-y-6">
                        <FinancialMetrics data={stockData} detailed={true} />
                      </TabsContent>

                      <TabsContent value="ml-insights" className="space-y-6">
                        <MLInsights symbol={stockData.symbol} data={stockData} broker={selectedBroker} />
                      </TabsContent>

                      <TabsContent value="real-time" className="space-y-6">
                        <RealTimeAnalysis symbol={stockData.symbol} broker={selectedBroker} />
                      </TabsContent>
                    </Tabs>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center py-20"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="inline-block"
                  >
                    <Brain className="h-12 w-12 text-emerald-500 mb-4" />
                  </motion.div>
                  <motion.p
                    className="text-gray-900 text-xl"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    AI is analyzing {selectedStock}...
                  </motion.p>
                  <p className="text-gray-800 mt-2">
                    Fetching live data from {selectedBroker} via {selectedExchange}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
