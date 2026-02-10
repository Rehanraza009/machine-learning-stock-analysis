import { type NextRequest, NextResponse } from "next/server"

// Enhanced company database with international stocks
const globalCompanyData = {
  // US NASDAQ
  AAPL: {
    name: "Apple Inc.",
    sector: "Technology",
    industry: "Consumer Electronics",
    country: "USA",
    exchange: "NASDAQ",
    currency: "$",
    marketCap: 2800000000000,
    basePrice: 175.5,
    pe: 28.5,
    eps: 6.16,
    dividend: 0.96,
    beta: 1.2,
  },
  MSFT: {
    name: "Microsoft Corporation",
    sector: "Technology",
    industry: "Software",
    country: "USA",
    exchange: "NASDAQ",
    currency: "$",
    marketCap: 2500000000000,
    basePrice: 338.25,
    pe: 32.1,
    eps: 10.55,
    dividend: 2.72,
    beta: 0.9,
  },
  GOOGL: {
    name: "Alphabet Inc.",
    sector: "Technology",
    industry: "Internet Services",
    country: "USA",
    exchange: "NASDAQ",
    currency: "$",
    marketCap: 1600000000000,
    basePrice: 125.8,
    pe: 24.8,
    eps: 5.07,
    dividend: 0,
    beta: 1.1,
  },

  // US NYSE
  JPM: {
    name: "JPMorgan Chase & Co.",
    sector: "Financial Services",
    industry: "Banking",
    country: "USA",
    exchange: "NYSE",
    currency: "$",
    marketCap: 460000000000,
    basePrice: 158.75,
    pe: 12.5,
    eps: 12.7,
    dividend: 4.0,
    beta: 1.1,
  },
  JNJ: {
    name: "Johnson & Johnson",
    sector: "Healthcare",
    industry: "Pharmaceuticals",
    country: "USA",
    exchange: "NYSE",
    currency: "$",
    marketCap: 420000000000,
    basePrice: 162.4,
    pe: 15.8,
    eps: 10.28,
    dividend: 4.68,
    beta: 0.7,
  },

  // India NSE
  RELIANCE: {
    name: "Reliance Industries Limited",
    sector: "Oil & Gas",
    industry: "Petroleum Refining",
    country: "India",
    exchange: "NSE",
    currency: "₹",
    marketCap: 16500000000000,
    basePrice: 2450.75,
    pe: 12.5,
    eps: 195.8,
    dividend: 8.0,
    beta: 1.1,
  },
  TCS: {
    name: "Tata Consultancy Services Limited",
    sector: "IT Services",
    industry: "Software Services",
    country: "India",
    exchange: "NSE",
    currency: "₹",
    marketCap: 13500000000000,
    basePrice: 3650.4,
    pe: 28.5,
    eps: 128.2,
    dividend: 24.0,
    beta: 0.8,
  },

  // UK LSE
  SHEL: {
    name: "Shell plc",
    sector: "Energy",
    industry: "Oil & Gas",
    country: "UK",
    exchange: "LSE",
    currency: "£",
    marketCap: 200000000000,
    basePrice: 28.45,
    pe: 11.2,
    eps: 2.54,
    dividend: 1.25,
    beta: 1.3,
  },
  AZN: {
    name: "AstraZeneca PLC",
    sector: "Healthcare",
    industry: "Pharmaceuticals",
    country: "UK",
    exchange: "LSE",
    currency: "£",
    marketCap: 195000000000,
    basePrice: 125.8,
    pe: 18.5,
    eps: 6.8,
    dividend: 2.9,
    beta: 0.8,
  },

  // Japan TSE
  "7203": {
    name: "Toyota Motor Corporation",
    sector: "Automobile",
    industry: "Auto Manufacturing",
    country: "Japan",
    exchange: "TSE",
    currency: "¥",
    marketCap: 42000000000000,
    basePrice: 2850.5,
    pe: 9.8,
    eps: 291.2,
    dividend: 92.0,
    beta: 0.9,
  },
  "6758": {
    name: "Sony Group Corporation",
    sector: "Technology",
    industry: "Consumer Electronics",
    country: "Japan",
    exchange: "TSE",
    currency: "¥",
    marketCap: 15000000000000,
    basePrice: 12450.75,
    pe: 15.2,
    eps: 819.5,
    dividend: 70.0,
    beta: 1.2,
  },

  // Hong Kong HKEX
  "0700": {
    name: "Tencent Holdings Limited",
    sector: "Technology",
    industry: "Internet Services",
    country: "Hong Kong",
    exchange: "HKEX",
    currency: "HK$",
    marketCap: 3700000000000,
    basePrice: 385.6,
    pe: 22.5,
    eps: 17.15,
    dividend: 3.2,
    beta: 1.1,
  },
  "0941": {
    name: "China Mobile Limited",
    sector: "Telecom",
    industry: "Telecommunications",
    country: "Hong Kong",
    exchange: "HKEX",
    currency: "HK$",
    marketCap: 1200000000000,
    basePrice: 58.45,
    pe: 8.5,
    eps: 6.88,
    dividend: 4.31,
    beta: 0.7,
  },

  // China SSE
  "600519": {
    name: "Kweichow Moutai Co., Ltd.",
    sector: "Consumer Staples",
    industry: "Beverages",
    country: "China",
    exchange: "SSE",
    currency: "¥",
    marketCap: 2100000000000,
    basePrice: 1685.5,
    pe: 35.8,
    eps: 47.08,
    dividend: 23.88,
    beta: 0.6,
  },
  "600036": {
    name: "China Merchants Bank Co., Ltd.",
    sector: "Financial Services",
    industry: "Banking",
    country: "China",
    exchange: "SSE",
    currency: "¥",
    marketCap: 950000000000,
    basePrice: 38.45,
    pe: 5.8,
    eps: 6.63,
    dividend: 1.54,
    beta: 1.0,
  },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get("symbol")
  const exchange = searchParams.get("exchange") || "NASDAQ"

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
  }

  try {
    // Get company info or use default
    const company = globalCompanyData[symbol] || {
      name: `${symbol} Corporation`,
      sector: "Diversified",
      industry: "Conglomerate",
      country: "Unknown",
      exchange: exchange,
      currency: "$",
      marketCap: Math.floor(Math.random() * 500000000000),
      basePrice: Math.random() * 2000 + 100,
      pe: Math.random() * 30 + 10,
      eps: Math.random() * 100 + 10,
      dividend: Math.random() * 5,
      beta: Math.random() * 2 + 0.5,
    }

    // Market hours logic for realistic pricing
    const now = new Date()
    let isMarketOpen = false

    switch (exchange) {
      case "NASDAQ":
      case "NYSE":
        const estTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }))
        const estHour = estTime.getHours()
        const estMinute = estTime.getMinutes()
        isMarketOpen = (estHour > 9 || (estHour === 9 && estMinute >= 30)) && estHour < 16
        break
      case "NSE":
      case "BSE":
        const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))
        const istHour = istTime.getHours()
        const istMinute = istTime.getMinutes()
        isMarketOpen =
          ((istHour > 9 || (istHour === 9 && istMinute >= 15)) && istHour < 15) || (istHour === 15 && istMinute <= 30)
        break
      case "LSE":
        const gmtTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }))
        const gmtHour = gmtTime.getHours()
        const gmtMinute = gmtTime.getMinutes()
        isMarketOpen = (gmtHour >= 8 && gmtHour < 16) || (gmtHour === 16 && gmtMinute <= 30)
        break
      case "TSE":
        const jstTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }))
        const jstHour = jstTime.getHours()
        isMarketOpen = jstHour >= 9 && jstHour < 15
        break
      case "HKEX":
        const hktTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }))
        const hktHour = hktTime.getHours()
        const hktMinute = hktTime.getMinutes()
        isMarketOpen = (hktHour > 9 || (hktHour === 9 && hktMinute >= 30)) && hktHour < 16
        break
      case "SSE":
        const cstTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Shanghai" }))
        const cstHour = cstTime.getHours()
        const cstMinute = cstTime.getMinutes()
        isMarketOpen = (cstHour > 9 || (cstHour === 9 && cstMinute >= 30)) && cstHour < 15
        break
    }

    const volatility = isMarketOpen ? 0.025 : 0.005
    const priceChange = (Math.random() - 0.5) * 2 * volatility
    const currentPrice = company.basePrice * (1 + priceChange)
    const change = currentPrice - company.basePrice
    const changePercent = (change / company.basePrice) * 100

    // Generate volume based on market cap and exchange
    const baseVolume =
      company.marketCap > 1000000000000
        ? 5000000
        : company.marketCap > 500000000000
          ? 3000000
          : company.marketCap > 100000000000
            ? 1500000
            : 800000

    const volumeMultiplier = isMarketOpen ? 0.7 + Math.random() * 1.3 : 0.1 + Math.random() * 0.3
    const volume = Math.floor(baseVolume * volumeMultiplier)

    // Format volume display based on exchange
    let volumeDisplay = ""
    if (exchange === "NSE" || exchange === "BSE") {
      volumeDisplay = `${(volume / 100000).toFixed(1)}L`
    } else if (exchange === "TSE" || exchange === "SSE") {
      volumeDisplay = `${(volume / 1000).toFixed(0)}K`
    } else {
      volumeDisplay = `${(volume / 1000000).toFixed(1)}M`
    }

    // Generate historical data for charts
    const historicalData = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      const dayChange = (Math.random() - 0.5) * 0.04 // 4% daily volatility
      const dayPrice = company.basePrice * (1 + dayChange)

      return {
        date: date.toISOString().split("T")[0],
        open: dayPrice * (0.98 + Math.random() * 0.04),
        high: dayPrice * (1.01 + Math.random() * 0.03),
        low: dayPrice * (0.97 + Math.random() * 0.02),
        close: dayPrice,
        volume: Math.floor(baseVolume * (0.5 + Math.random())),
      }
    })

    const stockData = {
      symbol: symbol.toUpperCase(),
      name: company.name,
      sector: company.sector,
      industry: company.industry,
      exchange: company.exchange,
      country: company.country,
      currency: company.currency,

      // Current price data
      price: currentPrice,
      change: change,
      changePercent: changePercent,
      volume: volume,
      volumeDisplay: volumeDisplay,

      // Market data
      marketCap: company.marketCap,
      pe: company.pe,
      eps: company.eps,
      dividend: company.dividend,
      beta: company.beta,

      // OHLC data
      high: currentPrice * (1.01 + Math.random() * 0.02),
      low: currentPrice * (0.98 - Math.random() * 0.02),
      open: company.basePrice * (0.99 + Math.random() * 0.02),
      previousClose: company.basePrice,

      // Additional metrics
      bookValue: currentPrice * (0.8 + Math.random() * 0.4),
      priceToBook: currentPrice / (currentPrice * (0.8 + Math.random() * 0.4)),
      dividendYield: (company.dividend / currentPrice) * 100,

      // Financial statements (mock data scaled by market cap)
      balanceSheet: {
        totalAssets: company.marketCap * 1.5,
        totalLiabilities: company.marketCap * 0.8,
        shareholdersEquity: company.marketCap * 0.7,
        cashAndEquivalents: company.marketCap * 0.15,
      },

      incomeStatement: {
        revenue: company.marketCap * 0.3,
        grossProfit: company.marketCap * 0.15,
        operatingIncome: company.marketCap * 0.12,
        netIncome: company.marketCap * 0.08,
      },

      cashFlow: {
        operatingCashFlow: company.marketCap * 0.1,
        investingCashFlow: -company.marketCap * 0.03,
        financingCashFlow: -company.marketCap * 0.05,
        freeCashFlow: company.marketCap * 0.07,
      },

      // Historical data
      historicalData: historicalData,

      // Technical indicators
      technicalIndicators: {
        rsi: 30 + Math.random() * 40,
        macd: (Math.random() - 0.5) * 10,
        movingAverage20: currentPrice * (0.95 + Math.random() * 0.1),
        movingAverage50: currentPrice * (0.9 + Math.random() * 0.2),
        movingAverage200: currentPrice * (0.8 + Math.random() * 0.4),
      },

      // Market status
      marketStatus: isMarketOpen ? "OPEN" : "CLOSED",
      lastUpdated: new Date().toISOString(),
      timestamp: Date.now(),
    }

    return NextResponse.json(stockData)
  } catch (error) {
    console.error("Error fetching stock data:", error)
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 })
  }
}
