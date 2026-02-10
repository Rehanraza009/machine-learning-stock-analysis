"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, TrendingDown, Calculator, Zap, AlertTriangle, CheckCircle } from "lucide-react"

interface TradingPanelProps {
  stockData: any
  onTrade: (type: "BUY" | "SELL", symbol: string, quantity: number, price: number) => void
  balance: number
  portfolio: any[]
  broker: string
}

export default function TradingPanel({ stockData, onTrade, balance, portfolio, broker }: TradingPanelProps) {
  const [quantity, setQuantity] = useState(1)
  const [orderType, setOrderType] = useState("MARKET")
  const [limitPrice, setLimitPrice] = useState(stockData?.price || 0)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [pendingOrder, setPendingOrder] = useState(null)

  const currentHolding = portfolio.find((stock) => stock.symbol === stockData?.symbol)
  const maxBuyQuantity = Math.floor(balance / (stockData?.price || 1))
  const maxSellQuantity = currentHolding?.quantity || 0

  const calculateBrokerage = (amount: number) => amount * 0.0005
  const calculateTotal = (qty: number, price: number, type: "BUY" | "SELL") => {
    const amount = qty * price
    const brokerage = calculateBrokerage(amount)
    return type === "BUY" ? amount + brokerage : amount - brokerage
  }

  const handleTrade = (type: "BUY" | "SELL") => {
    const price = orderType === "MARKET" ? stockData.price : limitPrice
    const total = calculateTotal(quantity, price, type)

    if (type === "BUY" && total > balance) {
      alert("Insufficient balance!")
      return
    }

    if (type === "SELL" && quantity > maxSellQuantity) {
      alert("Insufficient holdings!")
      return
    }

    setPendingOrder({ type, symbol: stockData.symbol, quantity, price, total })
    setShowConfirmation(true)
  }

  const confirmTrade = () => {
    if (pendingOrder) {
      onTrade(pendingOrder.type, pendingOrder.symbol, pendingOrder.quantity, pendingOrder.price)
      setShowConfirmation(false)
      setPendingOrder(null)
      setQuantity(1)
    }
  }

  if (!stockData) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-white/95 to-emerald-50/95 backdrop-blur-xl border-emerald-200 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-emerald-600" />
            Trading Panel
          </CardTitle>
          <CardDescription className="text-gray-700">
            Trade {stockData.symbol} via {broker} • Live Prices
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700">
              {broker} Connected
            </Badge>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Holdings */}
          {currentHolding && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-2">Current Holdings</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-700">
                  Quantity: <span className="font-bold text-gray-900">{currentHolding.quantity}</span>
                </div>
                <div className="text-gray-700">
                  Avg Price: <span className="font-bold text-gray-900">₹{currentHolding.avgPrice.toFixed(2)}</span>
                </div>
                <div className="text-gray-700">
                  Current Value:{" "}
                  <span className="font-bold text-gray-900">
                    ₹{(currentHolding.quantity * stockData.price).toFixed(2)}
                  </span>
                </div>
                <div
                  className={`${(stockData.price - currentHolding.avgPrice) >= 0 ? "text-emerald-600" : "text-red-600"}`}
                >
                  P&L:{" "}
                  <span className="font-bold">
                    {((stockData.price - currentHolding.avgPrice) * currentHolding.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Order Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Order Type</label>
            <Tabs value={orderType} onValueChange={setOrderType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="MARKET" className="text-xs">
                  Market
                </TabsTrigger>
                <TabsTrigger value="LIMIT" className="text-xs">
                  Limit
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Price Input for Limit Orders */}
          {orderType === "LIMIT" && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Limit Price</label>
              <Input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(Number.parseFloat(e.target.value))}
                className="text-gray-900"
                step="0.05"
              />
            </div>
          )}

          {/* Quantity Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Quantity</label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
              className="text-gray-900"
              min="1"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Max Buy: {maxBuyQuantity}</span>
              <span>Max Sell: {maxSellQuantity}</span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Calculator className="h-4 w-4 mr-2" />
              Order Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">Price per share:</span>
                <span className="font-bold text-gray-900">
                  ₹{(orderType === "MARKET" ? stockData.price : limitPrice).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Quantity:</span>
                <span className="font-bold text-gray-900">{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Gross Amount:</span>
                <span className="font-bold text-gray-900">
                  ₹{(quantity * (orderType === "MARKET" ? stockData.price : limitPrice)).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Brokerage (0.05%):</span>
                <span className="font-bold text-gray-900">
                  ₹{calculateBrokerage(quantity * (orderType === "MARKET" ? stockData.price : limitPrice)).toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="text-gray-900 font-semibold">Net Amount:</span>
                <span className="font-bold text-gray-900">
                  ₹{calculateTotal(quantity, orderType === "MARKET" ? stockData.price : limitPrice, "BUY").toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Trading Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleTrade("BUY")}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
              disabled={
                calculateTotal(quantity, orderType === "MARKET" ? stockData.price : limitPrice, "BUY") > balance
              }
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              BUY
            </Button>
            <Button onClick={() => handleTrade("SELL")} variant="destructive" disabled={quantity > maxSellQuantity}>
              <TrendingDown className="h-4 w-4 mr-2" />
              SELL
            </Button>
          </div>

          {/* Market Data */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Zap className="h-4 w-4 mr-2 text-emerald-600" />
              Live Market Data
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-700">
                Bid: <span className="font-bold text-gray-900">₹{stockData.bid?.toFixed(2)}</span>
              </div>
              <div className="text-gray-700">
                Ask: <span className="font-bold text-gray-900">₹{stockData.ask?.toFixed(2)}</span>
              </div>
              <div className="text-gray-700">
                High: <span className="font-bold text-gray-900">₹{stockData.high?.toFixed(2)}</span>
              </div>
              <div className="text-gray-700">
                Low: <span className="font-bold text-gray-900">₹{stockData.low?.toFixed(2)}</span>
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-2">Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
        </CardContent>
      </Card>

      {/* Order Confirmation Modal */}
      {showConfirmation && pendingOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
          >
            <div className="text-center mb-6">
              <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Order</h3>
              <p className="text-gray-700">Please review your order details</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-700">Action:</span>
                <Badge variant={pendingOrder.type === "BUY" ? "default" : "destructive"}>{pendingOrder.type}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Symbol:</span>
                <span className="font-bold text-gray-900">{pendingOrder.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Quantity:</span>
                <span className="font-bold text-gray-900">{pendingOrder.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Price:</span>
                <span className="font-bold text-gray-900">₹{pendingOrder.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-900 font-semibold">Total Amount:</span>
                <span className="font-bold text-gray-900">₹{pendingOrder.total.toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-600 text-center">Order will be executed via {broker}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => setShowConfirmation(false)} className="text-gray-700">
                Cancel
              </Button>
              <Button
                onClick={confirmTrade}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirm
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
