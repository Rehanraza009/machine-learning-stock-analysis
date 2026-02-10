"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface MLInsightsProps {
  symbol: string
  data: any
}

export default function MLInsights({ symbol, data }: MLInsightsProps) {
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateMLInsights = async () => {
      setLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockInsights = {
        overallScore: Math.floor(Math.random() * 40) + 60,
        recommendation: Math.random() > 0.5 ? "BUY" : Math.random() > 0.3 ? "HOLD" : "SELL",
        confidence: Math.floor(Math.random() * 30) + 70,
        priceTarget: data.price * (1 + (Math.random() - 0.3) * 0.4),
        riskLevel: Math.random() > 0.6 ? "Low" : Math.random() > 0.3 ? "Medium" : "High",
        factors: [
          {
            name: "Financial Health",
            score: Math.floor(Math.random() * 30) + 70,
            impact: "Positive",
            description: "Strong balance sheet with healthy cash flow",
          },
          {
            name: "Growth Potential",
            score: Math.floor(Math.random() * 40) + 60,
            impact: "Positive",
            description: "Revenue growth trending upward with market expansion",
          },
          {
            name: "Market Sentiment",
            score: Math.floor(Math.random() * 50) + 50,
            impact: Math.random() > 0.5 ? "Positive" : "Neutral",
            description: "Analyst coverage and social sentiment analysis",
          },
          {
            name: "Valuation",
            score: Math.floor(Math.random() * 40) + 50,
            impact: Math.random() > 0.4 ? "Neutral" : "Negative",
            description: "P/E ratio compared to industry average",
          },
          {
            name: "Technical Indicators",
            score: Math.floor(Math.random() * 50) + 50,
            impact: Math.random() > 0.5 ? "Positive" : "Neutral",
            description: "Moving averages and momentum indicators",
          },
        ],
        predictions: {
          oneWeek: data.price * (1 + (Math.random() - 0.5) * 0.1),
          oneMonth: data.price * (1 + (Math.random() - 0.5) * 0.2),
          threeMonths: data.price * (1 + (Math.random() - 0.5) * 0.3),
          sixMonths: data.price * (1 + (Math.random() - 0.5) * 0.4),
        },
        keyInsights: [
          "Strong quarterly earnings beat expectations by 12%",
          "Debt-to-equity ratio improved significantly over last year",
          "Market share expansion in key geographic regions",
          "New product launches showing promising early adoption",
          "Management guidance raised for next quarter",
        ],
      }

      setInsights(mockInsights)
      setLoading(false)
    }

    generateMLInsights()
  }, [symbol, data])

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardContent className="flex items-center justify-center py-20">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Brain className="h-16 w-16 text-blue-400" />
              </motion.div>
              <motion.p
                className="text-white text-xl mb-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                AI is analyzing {symbol}...
              </motion.p>
              <p className="text-blue-200">Processing financial data and market signals</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (!insights) return null

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "BUY":
        return "bg-green-500/20 text-green-300 border-green-400/30"
      case "SELL":
        return "bg-red-500/20 text-red-300 border-red-400/30"
      default:
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-400"
      case "High":
        return "text-red-400"
      default:
        return "text-yellow-400"
    }
  }

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      {/* Overall Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl border-blue-400/30 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-white">
                <Target className="h-5 w-5 mr-2 text-blue-400" />
                AI Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <motion.div
                  className="text-4xl font-bold text-white mb-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  {insights.overallScore}/100
                </motion.div>
                <Progress value={insights.overallScore} className="mb-4 bg-white/20" />
                <Badge className={getRecommendationColor(insights.recommendation)}>{insights.recommendation}</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-xl border-purple-400/30 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-white">
                <Zap className="h-5 w-5 mr-2 text-purple-400" />
                Price Target
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <motion.div
                  className="text-4xl font-bold text-white mb-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                >
                  ${insights.priceTarget.toFixed(2)}
                </motion.div>
                <div
                  className={`flex items-center justify-center ${
                    insights.priceTarget > data.price ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {insights.priceTarget > data.price ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {(((insights.priceTarget - data.price) / data.price) * 100).toFixed(1)}%
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-xl border-orange-400/30 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-white">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-400" />
                Risk Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <motion.div
                  className={`text-4xl font-bold mb-3 ${getRiskColor(insights.riskLevel)}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  {insights.riskLevel}
                </motion.div>
                <div className="text-sm text-blue-200">Confidence: {insights.confidence}%</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Analysis Factors */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Analysis Factors</CardTitle>
            <CardDescription className="text-blue-200">Key factors influencing the ML recommendation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.factors.map((factor, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{factor.name}</h4>
                      <Badge
                        variant={
                          factor.impact === "Positive"
                            ? "default"
                            : factor.impact === "Negative"
                              ? "destructive"
                              : "secondary"
                        }
                        className="bg-opacity-20"
                      >
                        {factor.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-200 mb-3">{factor.description}</p>
                    <div className="flex items-center space-x-3">
                      <Progress value={factor.score} className="flex-1 bg-white/20" />
                      <span className="text-sm font-medium text-white">{factor.score}/100</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Price Predictions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Price Predictions</CardTitle>
            <CardDescription className="text-blue-200">
              ML-generated price forecasts based on historical patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(insights.predictions).map(([period, price], index) => {
                const change = ((price - data.price) / data.price) * 100
                const periodLabels = {
                  oneWeek: "1 Week",
                  oneMonth: "1 Month",
                  threeMonths: "3 Months",
                  sixMonths: "6 Months",
                }

                return (
                  <motion.div
                    key={period}
                    className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-sm text-blue-200 mb-1">{periodLabels[period]}</p>
                    <p className="text-xl font-bold text-white">${price.toFixed(2)}</p>
                    <p className={`text-sm ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {change >= 0 ? "+" : ""}
                      {change.toFixed(1)}%
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Key Insights</CardTitle>
            <CardDescription className="text-blue-200">Important findings from the analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.keyInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                >
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-100">{insight}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
