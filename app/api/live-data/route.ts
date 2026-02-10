import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get("symbol")

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
  }

  try {
    // Simulate AngelOne SmartAPI real-time data
    // In production, this would connect to actual AngelOne WebSocket feeds

    // Base prices for major NSE stocks
    const basePrices = {
      RELIANCE: 2450,
      TCS: 3650,
      HDFCBANK: 1580,
      INFY: 1420,
      HINDUNILVR: 2380,
      ICICIBANK: 950,
      SBIN: 580,
      BHARTIARTL: 1180,
      ITC: 420,
      KOTAKBANK: 1750,
    }

    const basePrice = basePrices[symbol] || Math.random() * 2000 + 100

    // Market hours check (9:15 AM to 3:30 PM IST)
    const now = new Date()
    const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000)
    const hour = istTime.getHours()
    const minute = istTime.getMinutes()
    const isMarketOpen = (hour > 9 || (hour === 9 && minute >= 15)) && (hour < 15 || (hour === 15 && minute <= 30))

    // Generate realistic live data
    const volatility = isMarketOpen ? 0.002 : 0.0005 // Lower volatility for live updates
    const priceChange = (Math.random() - 0.5) * 2 * volatility
    const currentPrice = basePrice * (1 + priceChange)
    const change = currentPrice - basePrice
    const changePercent = (change / basePrice) * 100

    // Volume based on market activity
    const baseVolume = isMarketOpen ? 100000 + Math.random() * 500000 : 10000 + Math.random() * 50000
    const volume = Math.floor(baseVolume)

    // Technical indicators
    const rsi = 30 + Math.random() * 40 // RSI between 30-70
    const macd = (Math.random() - 0.5) * 5

    // OHLC data
    const dayRange = basePrice * 0.03
    const high = currentPrice + Math.random() * dayRange * 0.3
    const low = currentPrice - Math.random() * dayRange * 0.3

    const liveData = {
      symbol: symbol.toUpperCase(),
      price: currentPrice,
      change: change,
      changePercent: changePercent,
      volume: volume,
      high: high,
      low: low,
      open: basePrice + (Math.random() - 0.5) * dayRange * 0.2,

      // Bid/Ask spread
      bid: currentPrice - (0.5 + Math.random() * 1.5),
      ask: currentPrice + (0.5 + Math.random() * 1.5),

      // Technical indicators
      rsi: rsi,
      macd: macd,

      // Market depth (Level 2 data simulation)
      marketDepth: {
        bids: Array.from({ length: 5 }, (_, i) => ({
          price: currentPrice - (i + 1) * 0.5,
          quantity: Math.floor(Math.random() * 10000) + 1000,
        })),
        asks: Array.from({ length: 5 }, (_, i) => ({
          price: currentPrice + (i + 1) * 0.5,
          quantity: Math.floor(Math.random() * 10000) + 1000,
        })),
      },

      // Order book statistics
      totalBuyQuantity: Math.floor(Math.random() * 1000000) + 500000,
      totalSellQuantity: Math.floor(Math.random() * 1000000) + 500000,

      // Market status
      marketStatus: isMarketOpen ? "OPEN" : "CLOSED",
      lastTradeTime: new Date().toISOString(),
      timestamp: Date.now(),

      // Additional live metrics
      averagePrice: currentPrice * (0.995 + Math.random() * 0.01),
      totalTradedValue: Math.floor(Math.random() * 100000000) + 50000000,
      totalTrades: Math.floor(Math.random() * 10000) + 5000,

      // Volatility metrics
      impliedVolatility: 15 + Math.random() * 25,
      historicalVolatility: 12 + Math.random() * 20,

      // Sentiment indicators
      bullishPercent: 40 + Math.random() * 20,
      bearishPercent: 40 + Math.random() * 20,

      // News sentiment (mock)
      newsSentiment: Math.random() > 0.5 ? "positive" : "negative",
      newsCount: Math.floor(Math.random() * 10),

      // Options data
      putCallRatio: 0.8 + Math.random() * 0.4,
      maxPain: currentPrice * (0.95 + Math.random() * 0.1),

      // FII/DII activity (mock)
      fiiActivity: Math.random() > 0.5 ? "buying" : "selling",
      diiActivity: Math.random() > 0.5 ? "buying" : "selling",
      fiiAmount: (Math.random() - 0.5) * 100, // in crores
      diiAmount: (Math.random() - 0.5) * 50,

      // Sector performance
      sectorPerformance: (Math.random() - 0.5) * 3,

      // Relative strength
      relativeStrength: 40 + Math.random() * 20,
    }

    return NextResponse.json(liveData)
  } catch (error) {
    console.error("Error generating live data:", error)
    return NextResponse.json({ error: "Failed to fetch live data" }, { status: 500 })
  }
}
