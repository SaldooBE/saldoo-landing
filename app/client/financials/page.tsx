"use client"

import { useState, useMemo } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { getClientFinancials, getPreviousYearFinancials, getBE_GAAPBalanceSheet, getBE_GAAPIncomeStatement } from "@/lib/dummy-data"
import { calculateKPIs } from "@/lib/kpis/calculator"
import { Car, Wrench, Zap, Megaphone, ShoppingCart, ArrowRight, Sparkles } from "lucide-react"
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"
import { Area, AreaChart, CartesianGrid, XAxis, PieChart, Pie, Cell } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import Link from "next/link"
import { SectionCards } from "@/components/section-cards"

export default function ClientFinancialsPage() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const clientId = '1'
  const currentFinancials = getClientFinancials(clientId, parseInt(selectedYear))
  const previousFinancials = getPreviousYearFinancials(clientId)

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '-'
    return new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount)
  }

  // Calculate KPIs
  const currentKPIs = currentFinancials ? calculateKPIs(currentFinancials) : null
  const previousKPIs = previousFinancials ? calculateKPIs(previousFinancials) : null

  // Calculate percentage change
  const calculateChange = (current: number | null, previous: number | null) => {
    if (!current || !previous || previous === 0) return null
    return ((current - previous) / previous) * 100
  }

  // Top 5 costs breakdown (simplified)
  const topCosts = [
    { name: 'Loonkosten', amount: currentFinancials?.pnl.opex ? currentFinancials.pnl.opex * 0.4 : 0, icon: <Wrench className="h-5 w-5" /> },
    { name: 'Huur & Energie', amount: currentFinancials?.pnl.opex ? currentFinancials.pnl.opex * 0.25 : 0, icon: <Zap className="h-5 w-5" /> },
    { name: 'Marketing', amount: currentFinancials?.pnl.opex ? currentFinancials.pnl.opex * 0.15 : 0, icon: <Megaphone className="h-5 w-5" /> },
    { name: 'Auto & Vervoer', amount: currentFinancials?.pnl.opex ? currentFinancials.pnl.opex * 0.12 : 0, icon: <Car className="h-5 w-5" /> },
    { name: 'Materialen & Leveranciers', amount: currentFinancials?.pnl.direct_costs ? currentFinancials.pnl.direct_costs * 0.3 : 0, icon: <ShoppingCart className="h-5 w-5" /> }
  ].sort((a, b) => b.amount - a.amount).slice(0, 5)

  const totalCosts = topCosts.reduce((sum, cost) => sum + cost.amount, 0)

  // Generate monthly data for revenue vs expenses chart
  const monthlyData = useMemo(() => {
    if (!currentFinancials) return []
    const months = [
      "Jan", "Feb", "Mrt", "Apr", "Mei", "Jun",
      "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"
    ]
    const revenue = currentFinancials.pnl.revenue || 0
    const expenses = (currentFinancials.pnl.direct_costs || 0) + (currentFinancials.pnl.opex || 0)
    
    return months.map((month, index) => {
      const variation = Math.sin((index / 6) * Math.PI) * 0.15
      const randomFactor = (index % 3) * 0.05
      const revenueMultiplier = 1 + variation + randomFactor
      const expenseMultiplier = 0.65 + (index % 10) * 0.01
      
      return {
        month,
        omzet: Math.round((revenue / 12) * revenueMultiplier),
        kosten: Math.round((expenses / 12) * expenseMultiplier)
      }
    })
  }, [currentFinancials])

  // Chart configs
  const revenueExpensesConfig = {
    omzet: {
      label: "Omzet",
      color: "var(--chart-1)",
    },
    kosten: {
      label: "Kosten",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig

  const costBreakdownConfig = {
    loonkosten: { label: "Loonkosten", color: "var(--chart-1)" },
    huur: { label: "Huur & Energie", color: "var(--chart-2)" },
    marketing: { label: "Marketing", color: "var(--chart-3)" },
    auto: { label: "Auto & Vervoer", color: "var(--chart-4)" },
    materialen: { label: "Materialen & Leveranciers", color: "var(--chart-5)" },
  } satisfies ChartConfig

  // Pastel colors for pie chart sections
  const pieColors = [
    "oklch(0.85 0.08 145)",   // pastel green
    "oklch(0.80 0.10 25)",    // pastel orange/peach
    "oklch(0.80 0.10 230)",   // pastel blue
    "oklch(0.85 0.08 250)",   // pastel purple
    "oklch(0.82 0.08 235)",   // pastel blue-purple
  ]

  // Cost breakdown data for pie chart with distinct colors
  const costBreakdownData = topCosts.map((cost, index) => ({
    name: cost.name,
    value: cost.amount,
    color: pieColors[index] || pieColors[0]
  }))


  return (
    <PageLayout breadcrumbItems={[{ label: "Financials" }]}>
      <div className="space-y-12 pb-12">
        {/* Header Section - Notion-inspired */}
        <div className="space-y-3 pt-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight text-foreground">Mijn boekhouding</h1>
              <p className="text-lg text-muted-foreground">
                Overzicht van je financiële situatie en belangrijke inzichten
              </p>
            </div>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[140px] border-border">
                <SelectValue placeholder="Selecteer jaar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <SectionCards />

        {/* Existing Balance Sheet & Income Statement - UNTOUCHED */}

        <Card className="border">
          <CardHeader className="border-b">
            <CardTitle>BE GAAP Balans & Resultatenrekening</CardTitle>
            <CardDescription>Uitgebreide weergave volgens MAR (Minimumindeling van het algemeen rekeningenstelsel)</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="balans" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="balans">Balans</TabsTrigger>
                <TabsTrigger value="resultatenrekening">Resultatenrekening</TabsTrigger>
              </TabsList>
              
              <TabsContent value="balans" className="space-y-4">
                <Accordion type="multiple" className="w-full">
                  {getBE_GAAPBalanceSheet().map((group) => (
                    <AccordionItem key={group.code} value={group.code} className="border rounded-lg mb-3">
                      <AccordionTrigger className="hover:bg-muted/50 px-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-medium text-muted-foreground border px-2 py-1 rounded bg-muted/50">{group.code}</span>
                          <span className="font-medium">{group.name}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="border-b bg-muted/30">
                                <TableHead className="font-mono font-semibold">Rekening</TableHead>
                                <TableHead className="font-semibold">Omschrijving</TableHead>
                                <TableHead className="text-right font-semibold">Bedrag</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {group.accounts.map((account) => {
                                const indentClass = account.level === 0 ? '' : 
                                                  account.level === 1 ? 'pl-4' : 
                                                  account.level === 2 ? 'pl-8' : 'pl-12';
                                const isMainClass = account.level === 0;
                                
                                return (
                                  <TableRow 
                                    key={account.code} 
                                    className={isMainClass ? 'font-semibold border-t bg-muted/10' : 'hover:bg-muted/20'}
                                  >
                                    <TableCell className={`font-mono ${indentClass}`}>
                                      {account.code}
                                    </TableCell>
                                    <TableCell className={indentClass}>
                                      {account.name}
                                    </TableCell>
                                    <TableCell className="text-right font-mono">
                                      {formatCurrency(account.amount)}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                              <TableRow className="border-t bg-muted/20 font-bold">
                                <TableCell colSpan={2} className="text-right">
                                  Totaal {group.name}
                                </TableCell>
                                <TableCell className="text-right font-mono">
                                  {formatCurrency(group.total)}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              
              <TabsContent value="resultatenrekening" className="space-y-4">
                <Accordion type="multiple" className="w-full">
                  {getBE_GAAPIncomeStatement().map((group) => (
                    <AccordionItem key={group.code} value={group.code} className="border rounded-lg mb-3">
                      <AccordionTrigger className="hover:bg-muted/50 px-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-medium text-muted-foreground border px-2 py-1 rounded bg-muted/50">{group.code}</span>
                          <span className="font-medium">{group.name}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="border-b bg-muted/30">
                                <TableHead className="font-mono font-semibold">Rekening</TableHead>
                                <TableHead className="font-semibold">Omschrijving</TableHead>
                                <TableHead className="text-right font-semibold">Bedrag</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {group.accounts.map((account) => {
                                const indentClass = account.level === 0 ? '' : 
                                                  account.level === 1 ? 'pl-4' : 
                                                  account.level === 2 ? 'pl-8' : 'pl-12';
                                const isMainClass = account.level === 0;
                                
                                return (
                                  <TableRow 
                                    key={account.code} 
                                    className={isMainClass ? 'font-semibold border-t bg-muted/10' : 'hover:bg-muted/20'}
                                  >
                                    <TableCell className={`font-mono ${indentClass}`}>
                                      {account.code}
                                    </TableCell>
                                    <TableCell className={indentClass}>
                                      {account.name}
                                    </TableCell>
                                    <TableCell className="text-right font-mono">
                                      {formatCurrency(account.amount)}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                              <TableRow className="border-t bg-muted/20 font-bold">
                                <TableCell colSpan={2} className="text-right">
                                  Totaal {group.name}
                                </TableCell>
                                <TableCell className="text-right font-mono">
                                  {formatCurrency(group.total)}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Chart Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue vs Expenses Chart */}
          <Card className="border-border hover:bg-accent/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg">Maandelijkse Omzet vs Kosten</CardTitle>
              <CardDescription>Overzicht per maand voor {selectedYear}</CardDescription>
            </CardHeader>
            <CardContent>
              {monthlyData.length > 0 ? (
                <ChartContainer config={revenueExpensesConfig} className="h-[280px] w-full">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      className="text-xs"
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => formatCurrency(Number(value))}
                        />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="kosten"
                      fill="var(--color-kosten)"
                      fillOpacity={0.2}
                      stroke="var(--color-kosten)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="omzet"
                      fill="var(--color-omzet)"
                      fillOpacity={0.2}
                      stroke="var(--color-omzet)"
                      strokeWidth={2}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </AreaChart>
                </ChartContainer>
              ) : (
                <p className="text-sm text-muted-foreground">Geen data beschikbaar</p>
              )}
            </CardContent>
          </Card>

          {/* Cost Breakdown Chart */}
          <Card className="border-border hover:bg-accent/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg">Kostenverdeling</CardTitle>
              <CardDescription>Top 5 kostenposten</CardDescription>
            </CardHeader>
            <CardContent>
              {costBreakdownData.length > 0 ? (
                <div className="space-y-4">
                  <ChartContainer config={costBreakdownConfig} className="h-[200px] w-full">
                    <PieChart>
                      <Pie
                        data={costBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {costBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(value) => formatCurrency(Number(value))}
                          />
                        }
                      />
                    </PieChart>
                  </ChartContainer>
                  <div className="space-y-2 pt-4 border-t border-border">
                    {topCosts.map((cost, index) => {
                      const percentage = (cost.amount / totalCosts) * 100
                      return (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="text-muted-foreground">{cost.icon}</div>
                            <span>{cost.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{formatCurrency(cost.amount)}</span>
                            <span className="text-muted-foreground text-xs w-12 text-right">{percentage.toFixed(1)}%</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Geen data beschikbaar</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Explanation Block */}
        <Card className="border-border bg-gradient-to-br from-card to-accent/20 hover:bg-accent/30 transition-colors">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Vragen over je cijfers?</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Stel vragen in gewone taal over je financiële situatie. Onze AI analyseert je cijfers en geeft duidelijke, begrijpelijke antwoorden zonder technisch jargon.
                </p>
              </div>
              <Link href="/client/analysis">
                <Button className="gap-2" variant="default">
                  Stel een vraag
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}

