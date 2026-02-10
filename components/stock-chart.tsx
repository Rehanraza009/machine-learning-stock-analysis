"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface StockChartProps {
  symbol: string
}

export default function StockChart({ symbol }: StockChartProps) {
  const [chartData, setChartData] = useState([])
  const [timeframe, setTimeframe] = useState("1M")

  useEffect(() => {
    const generateData = () => {
      const data = []
      const basePrice = Math.random() * 200 + 50
      let currentPrice = basePrice

      for (let i = 30; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)

        const change = (Math.random() - 0.5) * 10
        currentPrice += change

        data.push({
          date: date.toLocaleDateString(),
          price: Math.max(currentPrice, 10),
          volume: Math.floor(Math.random() * 10000000),
        })
      }
      return data
    }

    setChartData(generateData())
  }, [symbol])

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="bg-white/90 backdrop-blur-xl border-slate-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-slate-800">Price Chart</CardTitle>
          <CardDescription className="text-slate-600">Historical price movement for {symbol}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                <XAxis dataKey="date" stroke="rgba(71,85,105,0.7)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="rgba(71,85,105,0.7)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value.toFixed(0)}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)",
                    color: "#334155",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value: number) => [`₹${value.toFixed(2)}`, "Price"]}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
