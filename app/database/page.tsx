'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Database, Play, CheckCircle, AlertCircle, Clock, RefreshCw } from 'lucide-react'

export default function DatabasePage() {
  const [scripts, setScripts] = useState([])
  const [executionResults, setExecutionResults] = useState({})
  const [loading, setLoading] = useState({})

  const databaseScripts = [
    {
      id: 'create-database',
      name: 'Create Database Schema',
      description: 'Creates the main database and all required tables',
      file: 'create-database.sql',
      status: 'ready'
    },
    {
      id: 'seed-data',
      name: 'Seed Sample Data',
      description: 'Populates tables with sample stock and financial data',
      file: 'seed-sample-data.sql',
      status: 'ready',
      dependsOn: ['create-database']
    }
  ]

  const executeScript = async (scriptId: string) => {
    setLoading(prev => ({ ...prev, [scriptId]: true }))
    
    try {
      // Simulate script execution
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResult = {
        success: true,
        message: `Successfully executed ${scriptId}`,
        rowsAffected: Math.floor(Math.random() * 1000) + 100,
        executionTime: Math.floor(Math.random() * 500) + 100
      }
      
      setExecutionResults(prev => ({
        ...prev,
        [scriptId]: mockResult
      }))
      
    } catch (error) {
      setExecutionResults(prev => ({
        ...prev,
        [scriptId]: {
          success: false,
          message: `Error executing ${scriptId}: ${error.message}`,
          executionTime: 0
        }
      }))
    } finally {
      setLoading(prev => ({ ...prev, [scriptId]: false }))
    }
  }

  const getStatusIcon = (scriptId: string) => {
    if (loading[scriptId]) {
      return <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
    }
    
    const result = executionResults[scriptId]
    if (result?.success) {
      return <CheckCircle className="h-4 w-4 text-green-600" />
    } else if (result?.success === false) {
      return <AlertCircle className="h-4 w-4 text-red-600" />
    }
    
    return <Clock className="h-4 w-4 text-gray-400" />
  }

  const getStatusBadge = (scriptId: string) => {
    if (loading[scriptId]) {
      return <Badge variant="secondary">Running...</Badge>
    }
    
    const result = executionResults[scriptId]
    if (result?.success) {
      return <Badge variant="default">Completed</Badge>
    } else if (result?.success === false) {
      return <Badge variant="destructive">Failed</Badge>
    }
    
    return <Badge variant="outline">Ready</Badge>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Database Management</h1>
              <p className="text-gray-600">Initialize and manage the ML Stock Analysis database</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="scripts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="scripts">Database Scripts</TabsTrigger>
            <TabsTrigger value="schema">Schema Overview</TabsTrigger>
            <TabsTrigger value="status">System Status</TabsTrigger>
          </TabsList>

          <TabsContent value="scripts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Database Initialization Scripts</CardTitle>
                <CardDescription>
                  Execute these scripts in order to set up your ML Stock Analysis database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {databaseScripts.map((script) => (
                    <div key={script.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(script.id)}
                        <div>
                          <h3 className="font-semibold text-gray-900">{script.name}</h3>
                          <p className="text-sm text-gray-600">{script.description}</p>
                          <p className="text-xs text-gray-500 mt-1">File: {script.file}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(script.id)}
                        <Button
                          onClick={() => executeScript(script.id)}
                          disabled={loading[script.id]}
                          size="sm"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Execute
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Execution Results */}
            {Object.keys(executionResults).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Execution Results</CardTitle>
                  <CardDescription>Results from database script executions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(executionResults).map(([scriptId, result]) => (
                      <div key={scriptId} className={`p-3 rounded-lg border ${
                        result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {result.success ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-600" />
                            )}
                            <span className="font-medium">{scriptId}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {result.executionTime}ms
                          </div>
                        </div>
                        <p className={`text-sm mt-1 ${
                          result.success ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {result.message}
                        </p>
                        {result.rowsAffected && (
                          <p className="text-xs text-gray-600 mt-1">
                            Rows affected: {result.rowsAffected}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="schema" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Core Tables</CardTitle>
                  <CardDescription>Main data storage tables</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">companies</h4>
                      <p className="text-sm text-gray-600">Stock symbols and company information</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">stock_prices</h4>
                      <p className="text-sm text-gray-600">Historical price data (OHLCV)</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">financial_statements</h4>
                      <p className="text-sm text-gray-600">Balance sheet, income, cash flow data</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analysis Tables</CardTitle>
                  <CardDescription>ML analysis and user data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">ml_analysis</h4>
                      <p className="text-sm text-gray-600">ML scores, recommendations, predictions</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">real_time_alerts</h4>
                      <p className="text-sm text-gray-600">System-generated trading alerts</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">user_watchlists</h4>
                      <p className="text-sm text-gray-600">User-specific stock watchlists</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Database Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-700 font-medium">Connected</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">MySQL 8.0.33</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Companies</span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Price Records</span>
                      <span className="text-sm font-medium">240</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">ML Analyses</span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Avg Query Time</span>
                      <span className="text-sm font-medium">45ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Cache Hit Rate</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Uptime</span>
                      <span className="text-sm font-medium">99.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
