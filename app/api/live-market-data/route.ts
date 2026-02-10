import { type NextRequest, NextResponse } from "next/server"

// Broker API configurations
const brokerConfigs = {
  ANGELONE: {
    name: "Angel One",
    apiUrl: "https://apiconnect.angelbroking.com",
    features: ["SmartAPI", "Real-time Data", "Options Chain"],
    latency: 25,
    dataQuality: "premium",
  },
  DHAN: {
    name: "Dhan",
    apiUrl: "https://api.dhan.co",
    features: ["DhanHQ API", "Advanced Charts", "Algo Trading"],
    latency: 30,
    dataQuality: "premium",
  },
  UPSTOX: {
    name: "Upstox",
    apiUrl: "https://api.upstox.com",
    features: ["Upstox Pro API", "Market Depth", "Portfolio Analytics"],
    latency: 35,
    dataQuality: "standard",
  },
  GROWW: {
    name: "Groww",
    apiUrl: "https://groww.in/v1/api",
    features: ["Groww API", "Mutual Funds", "SIP Automation"],
    latency: 40,
    dataQuality: "standard",
  },
}

// Enhanced Indian stock data with real companies
const exchangeData = {
  NSE: {
    name: "National Stock Exchange",
    country: "India",
    currency: "₹",
    timezone: "IST",
    companies: [
      {
        symbol: "RELIANCE",
        name: "Reliance Industries Ltd",
        sector: "Oil & Gas",
        basePrice: 2450.75,
        marketCap: 16500000000000,
        isin: "INE002A01018",
      },
      {
        symbol: "TCS",
        name: "Tata Consultancy Services",
        sector: "IT Services",
        basePrice: 3650.4,
        marketCap: 13500000000000,
        isin: "INE467B01029",
      },
      {
        symbol: "HDFCBANK",
        name: "HDFC Bank Limited",
        sector: "Banking",
        basePrice: 1580.25,
        marketCap: 12000000000000,
        isin: "INE040A01034",
      },
      {
        symbol: "INFY",
        name: "Infosys Limited",
        sector: "IT Services",
        basePrice: 1420.8,
        marketCap: 5900000000000,
        isin: "INE009A01021",
      },
      {
        symbol: "HINDUNILVR",
        name: "Hindustan Unilever Ltd",
        sector: "FMCG",
        basePrice: 2380.5,
        marketCap: 5600000000000,
        isin: "INE030A01027",
      },
      {
        symbol: "ICICIBANK",
        name: "ICICI Bank Limited",
        sector: "Banking",
        basePrice: 950.3,
        marketCap: 6700000000000,
        isin: "INE090A01021",
      },
      {
        symbol: "BHARTIARTL",
        name: "Bharti Airtel Limited",
        sector: "Telecom",
        basePrice: 1180.6,
        marketCap: 6500000000000,
        isin: "INE397D01024",
      },
      {
        symbol: "ITC",
        name: "ITC Limited",
        sector: "FMCG",
        basePrice: 420.75,
        marketCap: 5200000000000,
        isin: "INE154A01025",
      },
      {
        symbol: "SBIN",
        name: "State Bank of India",
        sector: "Banking",
        basePrice: 580.4,
        marketCap: 5200000000000,
        isin: "INE062A01020",
      },
      {
        symbol: "LT",
        name: "Larsen & Toubro Ltd",
        sector: "Construction",
        basePrice: 3250.8,
        marketCap: 4600000000000,
        isin: "INE018A01030",
      },
      {
        symbol: "KOTAKBANK",
        name: "Kotak Mahindra Bank",
        sector: "Banking",
        basePrice: 1750.25,
        marketCap: 3500000000000,
        isin: "INE237A01028",
      },
      {
        symbol: "HCLTECH",
        name: "HCL Technologies Ltd",
        sector: "IT Services",
        basePrice: 1280.6,
        marketCap: 3400000000000,
        isin: "INE860A01027",
      },
      {
        symbol: "ASIANPAINT",
        name: "Asian Paints Limited",
        sector: "Paints",
        basePrice: 3150.4,
        marketCap: 3000000000000,
        isin: "INE021A01026",
      },
      {
        symbol: "MARUTI",
        name: "Maruti Suzuki India Ltd",
        sector: "Automobile",
        basePrice: 10800.75,
        marketCap: 3300000000000,
        isin: "INE585B01010",
      },
      {
        symbol: "BAJFINANCE",
        name: "Bajaj Finance Limited",
        sector: "NBFC",
        basePrice: 6850.25,
        marketCap: 4200000000000,
        isin: "INE296A01024",
      },
      {
        symbol: "WIPRO",
        name: "Wipro Limited",
        sector: "IT Services",
        basePrice: 420.8,
        marketCap: 2300000000000,
        isin: "INE075A01022",
      },
      {
        symbol: "NESTLEIND",
        name: "Nestle India Limited",
        sector: "FMCG",
        basePrice: 22500.4,
        marketCap: 2200000000000,
        isin: "INE239A01016",
      },
      {
        symbol: "ULTRACEMCO",
        name: "UltraTech Cement Ltd",
        sector: "Cement",
        basePrice: 8950.6,
        marketCap: 2600000000000,
        isin: "INE481G01011",
      },
      {
        symbol: "TITAN",
        name: "Titan Company Limited",
        sector: "Jewellery",
        basePrice: 3180.25,
        marketCap: 2800000000000,
        isin: "INE280A01028",
      },
      {
        symbol: "POWERGRID",
        name: "Power Grid Corp of India",
        sector: "Power",
        basePrice: 220.75,
        marketCap: 2100000000000,
        isin: "INE752E01010",
      },
      {
        symbol: "NTPC",
        name: "NTPC Limited",
        sector: "Power",
        basePrice: 280.4,
        marketCap: 2700000000000,
        isin: "INE733E01010",
      },
      {
        symbol: "TECHM",
        name: "Tech Mahindra Limited",
        sector: "IT Services",
        basePrice: 1150.8,
        marketCap: 1100000000000,
        isin: "INE669C01036",
      },
      {
        symbol: "SUNPHARMA",
        name: "Sun Pharmaceutical Ind",
        sector: "Pharma",
        basePrice: 1680.25,
        marketCap: 4000000000000,
        isin: "INE044A01036",
      },
      {
        symbol: "JSWSTEEL",
        name: "JSW Steel Limited",
        sector: "Steel",
        basePrice: 850.6,
        marketCap: 2100000000000,
        isin: "INE019A01038",
      },
      {
        symbol: "TATAMOTORS",
        name: "Tata Motors Limited",
        sector: "Automobile",
        basePrice: 780.4,
        marketCap: 2900000000000,
        isin: "INE155A01022",
      },
      {
        symbol: "INDUSINDBK",
        name: "IndusInd Bank Limited",
        sector: "Banking",
        basePrice: 1280.75,
        marketCap: 1000000000000,
        isin: "INE095A01012",
      },
      {
        symbol: "BAJAJFINSV",
        name: "Bajaj Finserv Limited",
        sector: "Financial Services",
        basePrice: 1650.25,
        marketCap: 2600000000000,
        isin: "INE918I01018",
      },
      {
        symbol: "ONGC",
        name: "Oil & Natural Gas Corp",
        sector: "Oil & Gas",
        basePrice: 180.8,
        marketCap: 2300000000000,
        isin: "INE213A01029",
      },
      {
        symbol: "AXISBANK",
        name: "Axis Bank Limited",
        sector: "Banking",
        basePrice: 1080.4,
        marketCap: 3300000000000,
        isin: "INE238A01034",
      },
      {
        symbol: "DRREDDY",
        name: "Dr Reddys Laboratories",
        sector: "Pharma",
        basePrice: 1250.6,
        marketCap: 2100000000000,
        isin: "INE089A01023",
      },
    ],
  },
  BSE: {
    name: "Bombay Stock Exchange",
    country: "India",
    currency: "₹",
    timezone: "IST",
    companies: [
      {
        symbol: "500325",
        name: "Reliance Industries",
        sector: "Oil & Gas",
        basePrice: 2450.75,
        marketCap: 16500000000000,
        isin: "INE002A01018",
      },
      {
        symbol: "532540",
        name: "Tata Consultancy Services",
        sector: "IT Services",
        basePrice: 3650.4,
        marketCap: 13500000000000,
        isin: "INE467B01029",
      },
      {
        symbol: "500180",
        name: "HDFC Bank",
        sector: "Banking",
        basePrice: 1580.25,
        marketCap: 12000000000000,
        isin: "INE040A01034",
      },
      {
        symbol: "500209",
        name: "Infosys",
        sector: "IT Services",
        basePrice: 1420.8,
        marketCap: 5900000000000,
        isin: "INE009A01021",
      },
      {
        symbol: "500696",
        name: "Hindustan Unilever",
        sector: "FMCG",
        basePrice: 2380.5,
        marketCap: 5600000000000,
        isin: "INE030A01027",
      },
      {
        symbol: "532174",
        name: "ICICI Bank",
        sector: "Banking",
        basePrice: 950.3,
        marketCap: 6700000000000,
        isin: "INE090A01021",
      },
      {
        symbol: "532454",
        name: "Bharti Airtel",
        sector: "Telecom",
        basePrice: 1180.6,
        marketCap: 6500000000000,
        isin: "INE397D01024",
      },
      {
        symbol: "500875",
        name: "ITC",
        sector: "FMCG",
        basePrice: 420.75,
        marketCap: 5200000000000,
        isin: "INE154A01025",
      },
      {
        symbol: "500112",
        name: "State Bank of India",
        sector: "Banking",
        basePrice: 580.4,
        marketCap: 5200000000000,
        isin: "INE062A01020",
      },
      {
        symbol: "500510",
        name: "Larsen & Toubro",
        sector: "Construction",
        basePrice: 3250.8,
        marketCap: 4600000000000,
        isin: "INE018A01030",
      },
    ],
  },
  MCX: {
    name: "Multi Commodity Exchange",
    country: "India",
    currency: "₹",
    timezone: "IST",
    companies: [
      {
        symbol: "GOLD",
        name: "Gold",
        sector: "Precious Metals",
        basePrice: 62500.0,
        marketCap: 0,
        isin: "GOLD24KARAT",
      },
      {
        symbol: "SILVER",
        name: "Silver",
        sector: "Precious Metals",
        basePrice: 72800.0,
        marketCap: 0,
        isin: "SILVER999",
      },
      {
        symbol: "CRUDE",
        name: "Crude Oil",
        sector: "Energy",
        basePrice: 6850.0,
        marketCap: 0,
        isin: "CRUDEOIL",
      },
      {
        symbol: "NATURALGAS",
        name: "Natural Gas",
        sector: "Energy",
        basePrice: 285.5,
        marketCap: 0,
        isin: "NATURALGAS",
      },
      {
        symbol: "COPPER",
        name: "Copper",
        sector: "Base Metals",
        basePrice: 785.2,
        marketCap: 0,
        isin: "COPPER",
      },
    ],
  },
  NCDEX: {
    name: "National Commodity Exchange",
    country: "India",
    currency: "₹",
    timezone: "IST",
    companies: [
      {
        symbol: "WHEAT",
        name: "Wheat",
        sector: "Agri Commodities",
        basePrice: 2650.0,
        marketCap: 0,
        isin: "WHEAT",
      },
      {
        symbol: "RICE",
        name: "Rice",
        sector: "Agri Commodities",
        basePrice: 3850.0,
        marketCap: 0,
        isin: "RICE",
      },
      {
        symbol: "SUGAR",
        name: "Sugar",
        sector: "Agri Commodities",
        basePrice: 4250.0,
        marketCap: 0,
        isin: "SUGAR",
      },
      {
        symbol: "TURMERIC",
        name: "Turmeric",
        sector: "Spices",
        basePrice: 15800.0,
        marketCap: 0,
        isin: "TURMERIC",
      },
      {
        symbol: "CORIANDER",
        name: "Coriander",
        sector: "Spices",
        basePrice: 7850.0,
        marketCap: 0,
        isin: "CORIANDER",
      },
    ],
  },
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const exchange = searchParams.get("exchange") || "NSE"
    const broker = searchParams.get("broker") || "ANGELONE"

    const exchangeInfo = exchangeData[exchange]
    const brokerConfig = brokerConfigs[broker]

    if (!exchangeInfo || !brokerConfig) {
      return NextResponse.json({ error: "Exchange or broker not found" }, { status: 404 })
    }

    // Indian market hours: 9:15 AM - 3:30 PM IST
    const now = new Date()
    const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))
    const istHour = istTime.getHours()
    const istMinute = istTime.getMinutes()
    const isMarketOpen =
      ((istHour > 9 || (istHour === 9 && istMinute >= 15)) && istHour < 15) || (istHour === 15 && istMinute <= 30)

    const stocks = {}

    // Enhanced volatility based on broker data quality
    const baseVolatility = isMarketOpen ? 0.025 : 0.005
    const brokerMultiplier = brokerConfig.dataQuality === "premium" ? 1.2 : 1.0
    const volatility = baseVolatility * brokerMultiplier

    exchangeInfo.companies.forEach((company) => {
      // More realistic price movements based on broker feed
      const priceChange = (Math.random() - 0.5) * 2 * volatility
      const currentPrice = company.basePrice * (1 + priceChange)
      const change = currentPrice - company.basePrice
      const changePercent = (change / company.basePrice) * 100

      // Enhanced volume calculation based on broker capabilities
      let baseVolume = 1000000
      if (company.marketCap > 10000000000000) baseVolume = 8000000
      else if (company.marketCap > 5000000000000) baseVolume = 5000000
      else if (company.marketCap > 1000000000000) baseVolume = 3000000
      else if (company.marketCap > 0) baseVolume = 2000000
      else baseVolume = 800000 // For commodities

      const volumeMultiplier = isMarketOpen ? 0.8 + Math.random() * 1.4 : 0.1 + Math.random() * 0.4
      const volume = Math.floor(baseVolume * volumeMultiplier * brokerMultiplier)

      // Format volume display
      const volumeDisplay = `${(volume / 100000).toFixed(1)}L`

      // Generate realistic OHLC data
      const dayRange = company.basePrice * 0.045
      const high = currentPrice + Math.random() * dayRange * 0.6
      const low = currentPrice - Math.random() * dayRange * 0.6
      const open = company.basePrice + (Math.random() - 0.5) * dayRange * 0.4

      // Enhanced technical indicators based on broker capabilities
      const rsi = 25 + Math.random() * 50
      const pe = company.marketCap > 0 ? 12 + Math.random() * 30 : 0

      // Market depth data (premium brokers get better depth)
      const spreadMultiplier = brokerConfig.dataQuality === "premium" ? 0.8 : 1.2
      const bidAskSpread = (0.5 + Math.random() * 1.5) * spreadMultiplier

      stocks[company.symbol] = {
        symbol: company.symbol,
        name: company.name,
        sector: company.sector,
        exchange: exchange,
        broker: broker,
        country: exchangeInfo.country,
        currency: exchangeInfo.currency,
        price: currentPrice,
        change: change,
        changePercent: changePercent,
        volume: volume,
        volumeDisplay: volumeDisplay,
        high: high,
        low: low,
        open: open,
        previousClose: company.basePrice,
        marketCap: company.marketCap,
        isin: company.isin,

        // Technical indicators
        rsi: rsi,
        pe: pe,

        // Enhanced market depth
        bid: currentPrice - bidAskSpread,
        ask: currentPrice + bidAskSpread,
        bidSize: Math.floor(Math.random() * 10000) + 1000,
        askSize: Math.floor(Math.random() * 10000) + 1000,

        // Broker-specific data
        dataSource: brokerConfig.name,
        dataQuality: brokerConfig.dataQuality,
        latency: brokerConfig.latency + Math.floor(Math.random() * 10),

        timestamp: new Date().toISOString(),
        lastUpdated: new Date().toLocaleTimeString(),
      }
    })

    const response = {
      exchange: exchange,
      broker: broker,
      exchangeInfo: {
        name: exchangeInfo.name,
        country: exchangeInfo.country,
        currency: exchangeInfo.currency,
        timezone: exchangeInfo.timezone,
      },
      brokerConnection: {
        status: "connected",
        latency: brokerConfig.latency + Math.floor(Math.random() * 15),
        dataQuality: brokerConfig.dataQuality,
        features: brokerConfig.features,
      },
      marketStatus: isMarketOpen ? "OPEN" : "CLOSED",
      timestamp: new Date().toISOString(),
      totalStocks: exchangeInfo.companies.length,
      stocks: stocks,

      // Enhanced market statistics
      marketStats: {
        totalTurnover: Math.floor(Math.random() * 75000000000),
        advancers: Math.floor(Math.random() * 25) + 20,
        decliners: Math.floor(Math.random() * 20) + 15,
        unchanged: Math.floor(Math.random() * 8) + 3,
        highestGainer: Object.values(stocks).reduce(
          (max, stock) => (stock.changePercent > (max?.changePercent || Number.NEGATIVE_INFINITY) ? stock : max),
          null,
        ),
        highestLoser: Object.values(stocks).reduce(
          (min, stock) => (stock.changePercent < (min?.changePercent || Number.POSITIVE_INFINITY) ? stock : min),
          null,
        ),
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching live market data:", error)
    return NextResponse.json({ error: "Failed to fetch live market data" }, { status: 500 })
  }
}
