"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "Een interactieve grafiek die omzet en kosten vergelijkt"

// Generate data for multiple fiscal years (2023, 2024, 2025)
// We'll aggregate by month for better visualization
const generateMonthlyData = (year: number) => {
  const months = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "December"
  ]
  
  // Use a seed based on year for consistent data
  const seed = year * 1000
  
  return months.map((month, index) => {
    // Generate realistic monthly totals with consistent variation based on month and year
    const variation = Math.sin((index + seed) / 2) * 100000
    const randomFactor = ((index * 7 + year * 13) % 50) * 1000 // Pseudo-random but consistent
    const baseOmzet = 400000 + variation + randomFactor
    const kostenRatio = 0.65 + ((index + year) % 10) * 0.01 // Vary between 0.65 and 0.74
    const baseKosten = baseOmzet * kostenRatio
    
    return {
      month,
      date: `${year}-${String(index + 1).padStart(2, '0')}-15`, // Middle of month for aggregation
      omzet: Math.round(baseOmzet),
      kosten: Math.round(baseKosten),
    }
  })
}

// Combine data for all available years
const allChartData = [
  ...generateMonthlyData(2023),
  ...generateMonthlyData(2024),
  ...generateMonthlyData(2025),
]

const chartConfig = {
  omzet: {
    label: "Omzet",
    color: "var(--chart-1)",
  },
  kosten: {
    label: "Kosten",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = React.useState<string>(String(currentYear - 1)) // Default to previous year (2024)

  // Get available years from data
  const availableYears = React.useMemo(() => {
    const years = new Set(allChartData.map(item => {
      const date = new Date(item.date)
      return date.getFullYear()
    }))
    return Array.from(years).sort((a, b) => b - a) // Most recent first
  }, [])

  // Filter data for selected fiscal year
  const filteredData = React.useMemo(() => {
    const year = parseInt(selectedYear)
    return allChartData.filter((item) => {
    const date = new Date(item.date)
      return date.getFullYear() === year
    })
  }, [selectedYear])

  // Bereken gemiddelde groei
  const calculateGrowth = () => {
    if (filteredData.length < 2) return null
    const firstOmzet = filteredData[0]?.omzet || 0
    const lastOmzet = filteredData[filteredData.length - 1]?.omzet || 0
    if (firstOmzet === 0) return null
    return ((lastOmzet - firstOmzet) / firstOmzet) * 100
  }

  const growth = calculateGrowth()

  return (
    <Card className="flex h-full flex-col border border-border hover:bg-accent/50 transition-colors">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Omzet vs Kosten</CardTitle>
            <CardDescription>
              Fiscaal jaar {selectedYear}
            </CardDescription>
          </div>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full sm:w-32" size="sm">
              <SelectValue placeholder="Selecteer jaar" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer config={chartConfig} className="h-full min-h-[220px] w-full">
          <AreaChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => {
                    // value is the month name from dataKey="month"
                    return value || ""
                  }}
                  formatter={(value) => {
                    return new Intl.NumberFormat('nl-BE', { 
                      style: 'currency', 
                      currency: 'EUR',
                      maximumFractionDigits: 0 
                    }).format(Number(value))
                  }}
                />
              }
            />
            <Area
              dataKey="kosten"
              type="natural"
              fill="var(--color-kosten)"
              fillOpacity={0.2}
              stroke="var(--color-kosten)"
              stackId="a"
            />
            <Area
              dataKey="omzet"
              type="natural"
              fill="var(--color-omzet)"
              fillOpacity={0.2}
              stroke="var(--color-omzet)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            {growth !== null && (
              <div className="flex items-center gap-2 leading-none font-medium">
                {growth > 0 ? 'Gestegen' : 'Gedaald'} met {Math.abs(growth).toFixed(1)}% dit fiscaal jaar{" "}
                <TrendingUp className={`h-4 w-4 ${growth < 0 ? 'rotate-180' : ''}`} />
              </div>
            )}
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Januari - December {selectedYear}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
