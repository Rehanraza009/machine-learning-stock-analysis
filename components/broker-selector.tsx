"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"

interface BrokerSelectorProps {
  selectedBroker: string
  onBrokerChange: (broker: string) => void
}

const brokers = [
  {
    code: "ANGELONE",
    name: "Angel One",
    logo: "🔥",
    features: ["SmartAPI", "Real-time Data", "Options Chain"],
    latency: "25ms",
    color: "from-red-500 to-orange-500",
  },
  {
    code: "DHAN",
    name: "Dhan",
    logo: "⚡",
    features: ["DhanHQ API", "Advanced Charts", "Algo Trading"],
    latency: "30ms",
    color: "from-blue-500 to-indigo-500",
  },
  {
    code: "UPSTOX",
    name: "Upstox",
    logo: "🚀",
    features: ["Upstox Pro API", "Market Depth", "Portfolio Analytics"],
    latency: "35ms",
    color: "from-purple-500 to-violet-500",
  },
  {
    code: "GROWW",
    name: "Groww",
    logo: "🌱",
    features: ["Groww API", "Mutual Funds", "SIP Automation"],
    latency: "40ms",
    color: "from-green-500 to-emerald-500",
  },
]

export default function BrokerSelector({ selectedBroker, onBrokerChange }: BrokerSelectorProps) {
  const currentBroker = brokers.find((broker) => broker.code === selectedBroker)

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <Zap className="h-4 w-4 text-emerald-600" />
        <span className="text-sm font-medium text-gray-900">Broker:</span>
      </div>
      <Select value={selectedBroker} onValueChange={onBrokerChange}>
        <SelectTrigger className="w-52 bg-white/80 border-emerald-200 text-gray-900">
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{currentBroker?.logo}</span>
              <span className="font-medium">{currentBroker?.name}</span>
              <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700">
                {currentBroker?.latency}
              </Badge>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-xl border-emerald-200">
          {brokers.map((broker) => (
            <SelectItem key={broker.code} value={broker.code} className="hover:bg-emerald-50">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{broker.logo}</span>
                  <div>
                    <div className="font-medium text-gray-900">{broker.name}</div>
                    <div className="text-xs text-gray-700">{broker.features.join(" • ")}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700">
                    {broker.latency}
                  </Badge>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
