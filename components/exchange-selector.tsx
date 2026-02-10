"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Building2 } from "lucide-react"

interface ExchangeSelectorProps {
  selectedExchange: string
  onExchangeChange: (exchange: string) => void
}

const exchanges = [
  {
    code: "NSE",
    name: "National Stock Exchange",
    country: "India",
    flag: "🇮🇳",
    timezone: "IST",
    currency: "₹",
    color: "from-emerald-500 to-teal-500",
  },
  {
    code: "BSE",
    name: "Bombay Stock Exchange",
    country: "India",
    flag: "🇮🇳",
    timezone: "IST",
    currency: "₹",
    color: "from-blue-500 to-indigo-500",
  },
  {
    code: "MCX",
    name: "Multi Commodity Exchange",
    country: "India",
    flag: "🇮🇳",
    timezone: "IST",
    currency: "₹",
    color: "from-amber-500 to-orange-500",
  },
  {
    code: "NCDEX",
    name: "National Commodity Exchange",
    country: "India",
    flag: "🇮🇳",
    timezone: "IST",
    currency: "₹",
    color: "from-green-500 to-emerald-500",
  },
]

export default function ExchangeSelector({ selectedExchange, onExchangeChange }: ExchangeSelectorProps) {
  const currentExchange = exchanges.find((ex) => ex.code === selectedExchange)

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <Building2 className="h-4 w-4 text-emerald-600" />
        <span className="text-sm font-medium text-gray-900">Exchange:</span>
      </div>
      <Select value={selectedExchange} onValueChange={onExchangeChange}>
        <SelectTrigger className="w-48 bg-white/80 border-emerald-200 text-gray-900">
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{currentExchange?.flag}</span>
              <span className="font-medium">{currentExchange?.code}</span>
              <Badge variant="outline" className="text-xs">
                {currentExchange?.currency}
              </Badge>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-xl border-emerald-200">
          {exchanges.map((exchange) => (
            <SelectItem key={exchange.code} value={exchange.code} className="hover:bg-emerald-50">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{exchange.flag}</span>
                  <div>
                    <div className="font-medium text-gray-900">{exchange.code}</div>
                    <div className="text-xs text-gray-700">{exchange.name}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {exchange.currency}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {exchange.timezone}
                  </Badge>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
