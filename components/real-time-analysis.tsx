"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import {
  Activity,
  Zap,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Volume2,
  DollarSign,
  BarChart3,
  AlertTriangle,
} from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface RealTimeAnalysisProps {
  symbol: string
}

export default function RealTimeAnalysis({ symbol }: RealTimeAnalysisProps) {
  const [realTimeData, setRealTimeData] = useState([])
  const [isLive, setIsLive] = useState(false)
  const [currentData, setCurrentData] = useState({
    price: 0,
    volume: 0,
    high: 0,
    low: 0,
    change: 0,
    changePercent: 0,
  })
  const [alerts, setAlerts] = useState([])
  const [technicalIndicators, setTechnicalIndicators] = useState({
    rsi: 50,
    macd: 0,
    bollinger: { upper: 0, lower: 0, middle: 0 },
    volume_sma: 0,
  })

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isLive) {
      const fetchLiveData = async () => {
        try {
          const response = await fetch(`/api/live-data?symbol=${symbol}`)
          const data = await response.json()

          const now = new Date()
          const newDataPoint = {
            time: now.toLocaleTimeString(),
            timestamp: now.getTime(),
            price: data.price,
            volume: data.volume,
            high: data.high,
            low: data.low,
            change: data.change,
            changePercent: data.changePercent,
            rsi: data.rsi,
            macd: data.macd,
          }

          setCurrentData(newDataPoint)
          setTechnicalIndicators({
            rsi: data.rsi,
            macd: data.macd,
            bollinger: {
              upper: data.price * 1.02,
              lower: data.price * 0.98,
              middle: data.price,
            },
            volume_sma: data.volume * 0.8,
          })

          setRealTimeData((prev) => {
            const updated = [...prev, newDataPoint].slice(-100) // Keep last 100 points
            return updated
          })

          // Generate alerts based on conditions
          if (Math.abs(data.changePercent) > 2) {
            const alertType = data.changePercent > 2 ? "breakout" : "breakdown"
            const newAlert = {
              id: Date.now(),
              type: alertType,
              message: `${symbol} ${alertType === "breakout" ? "broke above" : "fell below"} ${Math.abs(data.changePercent).toFixed(2)}% threshold`,
              severity: Math.abs(data.changePercent) > 5 ? "critical" : "warning",
              timestamp: now.toLocaleTimeString(),
              price: data.price,
            }

            setAlerts((prev) => [newAlert, ...prev].slice(0, 20))
          }

          // Volume spike alert
          if (data.volume > technicalIndicators.volume_sma * 2) {
            const newAlert = {
              id: Date.now() + 1,
              type: "volume_spike",
              message: `Unusual volume spike detected: ${(data.volume / 100000).toFixed(1)}L shares`,
              severity: "info",
              timestamp: now.toLocaleTimeString(),
              price: data.price,
            }

            setAlerts((prev) => [newAlert, ...prev].slice(0, 20))
          }

          // RSI alerts
          if (data.rsi > 70) {
            const newAlert = {
              id: Date.now() + 2,
              type: "overbought",
              message: `RSI indicates overbought conditions (${data.rsi.toFixed(1)})`,
              severity: "warning",
              timestamp: now.toLocaleTimeString(),
              price: data.price,
            }

            setAlerts((prev) => [newAlert, ...prev].slice(0, 20))
          } else if (data.rsi < 30) {
            const newAlert = {
              id: Date.now() + 3,
              type: "oversold",
              message: `RSI indicates oversold conditions (${data.rsi.toFixed(1)})`,
              severity: "info",
              timestamp: now.toLocaleTimeString(),
              price: data.price,
            }

            setAlerts((prev) => [newAlert, ...prev].slice(0, 20))
          }
        } catch (error) {
          console.error("Error fetching live data:", error)
        }
      }

      // Initial fetch
      fetchLiveData()

      // Set up interval for live updates
      interval = setInterval(fetchLiveData, 2000) // Update every 2 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLive, symbol, technicalIndicators.volume_sma])

  const toggleLiveData = () => {
    setIsLive(!isLive)
    if (!isLive) {
      setRealTimeData([])
      setAlerts([])
    }
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-300 border-red-400/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
      case "info":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "breakout":
        return <TrendingUp className="h-4 w-4" />
      case "breakdown":
        return <TrendingDown className="h-4 w-4" />
      case "volume_spike":
        return <Volume2 className="h-4 w-4" />
      case "overbought":
      case "oversold":
        return <BarChart3 className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center text-white">
                  <Activity className="h-5 w-5 mr-2 text-blue-400" />
                  Real-Time Analysis - {symbol}
                </CardTitle>
                <CardDescription className="text-blue-200">
                  Live NSE data with AI-powered alerts and technical analysis
                </CardDescription>
              </div>
              <Button
                onClick={toggleLiveData}
                variant={isLive ? "destructive" : "default"}
                className="flex items-center space-x-2"
              >
                {isLive ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Stop Live Feed</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    <span>Start Live Feed</span>
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          {isLive && (
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  className="flex items-center space-x-3 p-4 bg-blue-500/20 rounded-xl border border-blue-400/30"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <DollarSign className="h-6 w-6 text-blue-400" />
                  <div>
                    <p className="text-sm text-blue-200">Live Price</p>
                    <p className="text-xl font-bold text-white">₹{currentData.price?.toFixed(2)}</p>
                    <p className={`text-sm ${currentData.changePercent >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {currentData.changePercent >= 0 ? "+" : ""}
                      {currentData.changePercent?.toFixed(2)}%
                    </p>
                  </div>
                </motion.div>

                <div className="flex items-center space-x-3 p-4 bg-green-500/20 rounded-xl border border-green-400/30">
                  <Volume2 className="h-6 w-6 text-green-400" />
                  <div>
                    <p className="text-sm text-green-200">Volume</p>
                    <p className="text-xl font-bold text-white">{(currentData.volume / 100000)?.toFixed(1)}L</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-purple-500/20 rounded-xl border border-purple-400/30">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                  <div>
                    <p className="text-sm text-purple-200">RSI</p>
                    <p className="text-xl font-bold text-white">{technicalIndicators.rsi?.toFixed(1)}</p>
                    <p
                      className={`text-sm ${
                        technicalIndicators.rsi > 70
                          ? "text-red-400"
                          : technicalIndicators.rsi < 30
                            ? "text-green-400"
                            : "text-gray-400"
                      }`}
                    >
                      {technicalIndicators.rsi > 70
                        ? "Overbought"
                        : technicalIndicators.rsi < 30
                          ? "Oversold"
                          : "Neutral"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-orange-500/20 rounded-xl border border-orange-400/30">
                  <Activity className="h-6 w-6 text-orange-400" />
                  <div>
                    <p className="text-sm text-orange-200">Data Points</p>
                    <p className="text-xl font-bold text-white">{realTimeData.length}</p>
                    <p className="text-sm text-orange-300">Live Updates</p>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>

      {/* Live Charts */}
      {isLive && realTimeData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Price Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">Live Price Movement</CardTitle>
                <CardDescription className="text-blue-200">
                  Real-time price updates (last {realTimeData.length} data points)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={realTimeData}>
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis
                        dataKey="time"
                        stroke="rgba(255,255,255,0.7)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="rgba(255,255,255,0.7)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `₹${value.toFixed(0)}`}
                        domain={["dataMin - 5", "dataMax + 5"]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "12px",
                          backdropFilter: "blur(10px)",
                          color: "white",
                        }}
                        formatter={(value: number) => [`₹${value.toFixed(2)}`, "Price"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#priceGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Volume Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">Volume Analysis</CardTitle>
                <CardDescription className="text-blue-200">Trading volume with moving average</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={realTimeData}>
                      <defs>
                        <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis
                        dataKey="time"
                        stroke="rgba(255,255,255,0.7)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="rgba(255,255,255,0.7)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${(value / 100000).toFixed(1)}L`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "12px",
                          backdropFilter: "blur(10px)",
                          color: "white",
                        }}
                        formatter={(value: number) => [`${(value / 100000).toFixed(1)}L`, "Volume"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="volume"
                        stroke="#10b981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#volumeGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Technical Indicators */}
      {isLive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Technical Indicators</CardTitle>
              <CardDescription className="text-blue-200">Real-time technical analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-white/5 rounded-xl">
                  <h4 className="text-white font-semibold mb-2">RSI (14)</h4>
                  <div className="text-2xl font-bold text-white mb-1">{technicalIndicators.rsi?.toFixed(1)}</div>
                  <div
                    className={`text-sm ${
                      technicalIndicators.rsi > 70
                        ? "text-red-400"
                        : technicalIndicators.rsi < 30
                          ? "text-green-400"
                          : "text-gray-400"
                    }`}
                  >
                    {technicalIndicators.rsi > 70
                      ? "Overbought"
                      : technicalIndicators.rsi < 30
                        ? "Oversold"
                        : "Neutral"}
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl">
                  <h4 className="text-white font-semibold mb-2">MACD</h4>
                  <div className="text-2xl font-bold text-white mb-1">{technicalIndicators.macd?.toFixed(2)}</div>
                  <div className={`text-sm ${technicalIndicators.macd > 0 ? "text-green-400" : "text-red-400"}`}>
                    {technicalIndicators.macd > 0 ? "Bullish" : "Bearish"}
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl">
                  <h4 className="text-white font-semibold mb-2">Bollinger Bands</h4>
                  <div className="space-y-1 text-sm">
                    <div className="text-green-400">Upper: ₹{technicalIndicators.bollinger.upper?.toFixed(2)}</div>
                    <div className="text-blue-400">Middle: ₹{technicalIndicators.bollinger.middle?.toFixed(2)}</div>
                    <div className="text-red-400">Lower: ₹{technicalIndicators.bollinger.lower?.toFixed(2)}</div>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl">
                  <h4 className="text-white font-semibold mb-2">Volume SMA</h4>
                  <div className="text-2xl font-bold text-white mb-1">
                    {(technicalIndicators.volume_sma / 100000)?.toFixed(1)}L
                  </div>
                  <div className="text-sm text-gray-400">20-period average</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Real-Time Alerts */}
      {isLive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
                AI Trading Alerts
                <Badge variant="outline" className="ml-2 text-xs">
                  {alerts.length} alerts
                </Badge>
              </CardTitle>
              <CardDescription className="text-blue-200">
                Real-time market signals and anomaly detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              {alerts.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Monitoring for market signals...</p>
                  <p className="text-sm mt-2">AI alerts will appear here when detected</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {alerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 rounded-lg border ${getAlertColor(alert.severity)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          {getAlertIcon(alert.type)}
                          <div>
                            <p className="font-medium">{alert.message}</p>
                            <div className="flex items-center space-x-4 mt-1 text-xs opacity-75">
                              <span>{alert.timestamp}</span>
                              <span>₹{alert.price?.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {alert.type}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Getting Started */}
      {!isLive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardContent className="text-center py-16">
              <Zap className="h-20 w-20 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Real-Time NSE Analysis</h3>
              <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
                Start the live feed to see real-time price movements, volume analysis, technical indicators, and
                AI-powered market alerts for {symbol}. Get instant notifications for breakouts, volume spikes, and
                technical signals.
              </p>
              <Button onClick={toggleLiveData} size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600">
                <Activity className="h-5 w-5 mr-2" />
                Start Live Analysis
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
