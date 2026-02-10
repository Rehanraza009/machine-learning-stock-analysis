"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Users, Percent, BarChart } from "lucide-react"
import { motion } from "framer-motion"

interface FinancialMetricsProps {
  data: any
  detailed?: boolean
}

export default function FinancialMetrics({ data, detailed = false }: FinancialMetricsProps) {
  const metrics = [
    {
      label: "Market Cap",
      value: `₹${(data.marketCap / 1000000000).toFixed(1)}B`,
      icon: DollarSign,
      color: "text-emerald-600",
    },
    {
      label: "P/E Ratio",
      value: data.pe.toFixed(2),
      icon: BarChart,
      color: "text-blue-600",
    },
    {
      label: "EPS",
      value: `₹${data.eps.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      label: "Dividend Yield",
      value: `${data.dividend.toFixed(2)}%`,
      icon: Percent,
      color: "text-orange-600",
    },
    {
      label: "Beta",
      value: data.beta.toFixed(2),
      icon: BarChart,
      color: "text-red-600",
    },
    {
      label: "Volume",
      value: data.volume,
      icon: Users,
      color: "text-indigo-600",
    },
  ]

  const financialStatements = {
    balanceSheet: [
      { item: "Total Assets", value: 365000000000, change: 5.2 },
      { item: "Total Liabilities", value: 258000000000, change: 3.1 },
      { item: "Shareholders Equity", value: 107000000000, change: 8.7 },
      { item: "Cash and Equivalents", value: 48000000000, change: -2.3 },
    ],
    incomeStatement: [
      { item: "Revenue", value: 394000000000, change: 7.8 },
      { item: "Gross Profit", value: 170000000000, change: 9.2 },
      { item: "Operating Income", value: 114000000000, change: 12.1 },
      { item: "Net Income", value: 99000000000, change: 15.3 },
    ],
    cashFlow: [
      { item: "Operating Cash Flow", value: 122000000000, change: 6.4 },
      { item: "Investing Cash Flow", value: -23000000000, change: -15.2 },
      { item: "Financing Cash Flow", value: -110000000000, change: 8.9 },
      { item: "Free Cash Flow", value: 99000000000, change: 11.7 },
    ],
  }

  const formatValue = (value: number) => {
    if (Math.abs(value) >= 1000000000) {
      return `₹${(value / 1000000000).toFixed(1)}B`
    } else if (Math.abs(value) >= 1000000) {
      return `₹${(value / 1000000).toFixed(1)}M`
    }
    return `₹${value.toLocaleString()}`
  }

  if (detailed) {
    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-white/90 backdrop-blur-xl border-slate-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gray-900">Key Financial Metrics</CardTitle>
              <CardDescription className="text-gray-800">Current financial indicators and ratios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-slate-50/70 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                      <div>
                        <p className="text-sm text-gray-700">{metric.label}</p>
                        <p className="font-semibold text-gray-900 text-lg">{metric.value}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Financial Statements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Balance Sheet */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="bg-white/90 backdrop-blur-xl border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Balance Sheet</CardTitle>
                <CardDescription className="text-gray-800">Latest quarterly data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {financialStatements.balanceSheet.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center p-3 bg-slate-50/70 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.item}</p>
                      <p className="text-sm text-gray-700">{formatValue(item.value)}</p>
                    </div>
                    <Badge
                      variant={item.change >= 0 ? "default" : "destructive"}
                      className={`${item.change >= 0 ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-red-100 text-red-700 border-red-200"}`}
                    >
                      {item.change >= 0 ? "+" : ""}
                      {item.change}%
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Income Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="bg-white/90 backdrop-blur-xl border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">Income Statement</CardTitle>
                <CardDescription className="text-slate-600">Latest quarterly data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {financialStatements.incomeStatement.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center p-3 bg-slate-50/70 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div>
                      <p className="font-medium text-slate-800">{item.item}</p>
                      <p className="text-sm text-slate-600">{formatValue(item.value)}</p>
                    </div>
                    <Badge
                      variant={item.change >= 0 ? "default" : "destructive"}
                      className={`${item.change >= 0 ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-red-100 text-red-700 border-red-200"}`}
                    >
                      {item.change >= 0 ? "+" : ""}
                      {item.change}%
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Cash Flow */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card className="bg-white/90 backdrop-blur-xl border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">Cash Flow</CardTitle>
                <CardDescription className="text-slate-600">Latest quarterly data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {financialStatements.cashFlow.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center p-3 bg-slate-50/70 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div>
                      <p className="font-medium text-slate-800">{item.item}</p>
                      <p className="text-sm text-slate-600">{formatValue(item.value)}</p>
                    </div>
                    <Badge
                      variant={item.change >= 0 ? "default" : "destructive"}
                      className={`${item.change >= 0 ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-red-100 text-red-700 border-red-200"}`}
                    >
                      {item.change >= 0 ? "+" : ""}
                      {item.change}%
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="bg-white/90 backdrop-blur-xl border-slate-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-slate-800">Key Metrics</CardTitle>
          <CardDescription className="text-slate-600">Financial overview and ratios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-slate-50/70 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                  <div>
                    <p className="text-sm text-slate-600">{metric.label}</p>
                    <p className="font-semibold text-slate-800">{metric.value}</p>
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
