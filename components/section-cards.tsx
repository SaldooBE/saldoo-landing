"use client"

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { getClientFinancials, getPreviousYearFinancials } from "@/lib/dummy-data"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  // Using first client as demo data
  const clientId = '1'
  const currentFinancials = getClientFinancials(clientId, 2024)
  const previousFinancials = getPreviousYearFinancials(clientId)

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '-'
    return new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount)
  }

  const calculateChange = (current: number | null, previous: number | null) => {
    if (!current || !previous || previous === 0) return null
    return ((current - previous) / previous) * 100
  }

  const omzetChange = currentFinancials?.pnl.revenue && previousFinancials?.pnl.revenue
    ? calculateChange(currentFinancials.pnl.revenue, previousFinancials.pnl.revenue)
    : null
  
  const totalKosten = currentFinancials?.pnl.opex && currentFinancials?.pnl.direct_costs
    ? currentFinancials.pnl.opex + currentFinancials.pnl.direct_costs
    : null
  const previousTotalKosten = previousFinancials?.pnl.opex && previousFinancials?.pnl.direct_costs
    ? previousFinancials.pnl.opex + previousFinancials.pnl.direct_costs
    : null
  const kostenChange = totalKosten && previousTotalKosten
    ? calculateChange(totalKosten, previousTotalKosten)
    : null

  const winstChange = currentFinancials?.pnl.net_profit && previousFinancials?.pnl.net_profit
    ? calculateChange(currentFinancials.pnl.net_profit, previousFinancials.pnl.net_profit)
    : null

  // Bereken winstmarge: (winst / omzet) * 100
  const winstmarge = currentFinancials?.pnl.revenue && currentFinancials?.pnl.net_profit && currentFinancials.pnl.revenue !== 0
    ? (currentFinancials.pnl.net_profit / currentFinancials.pnl.revenue) * 100
    : null
  const previousWinstmarge = previousFinancials?.pnl.revenue && previousFinancials?.pnl.net_profit && previousFinancials.pnl.revenue !== 0
    ? (previousFinancials.pnl.net_profit / previousFinancials.pnl.revenue) * 100
    : null
  const winstmargeChange = winstmarge !== null && previousWinstmarge !== null
    ? calculateChange(winstmarge, previousWinstmarge)
    : null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-6">
      {/* 1. Omzet */}
      <Card className="@container/card border border-border hover:bg-accent/50 transition-colors">
        <CardHeader>
          <CardDescription>Omzet</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(currentFinancials?.pnl.revenue || null)}
          </CardTitle>
          <CardAction>
            {omzetChange !== null && (
              <Badge variant="outline">
                {omzetChange > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
                {omzetChange > 0 ? '+' : ''}{omzetChange.toFixed(1)}%
              </Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {omzetChange !== null && omzetChange > 0 ? (
              <>Gestegen ten opzichte van vorig jaar <IconTrendingUp className="size-4" /></>
            ) : omzetChange !== null ? (
              <>Gedaald ten opzichte van vorig jaar <IconTrendingDown className="size-4" /></>
            ) : (
              <>Vergelijking met vorig jaar</>
            )}
          </div>
          <div className="text-muted-foreground">
            Totale inkomsten dit jaar
          </div>
        </CardFooter>
      </Card>

      {/* 2. Kosten */}
      <Card className="@container/card border border-border hover:bg-accent/50 transition-colors">
        <CardHeader>
          <CardDescription>Kosten</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(totalKosten)}
          </CardTitle>
          <CardAction>
            {kostenChange !== null && (
              <Badge variant="outline">
                {kostenChange > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
                {kostenChange > 0 ? '+' : ''}{kostenChange.toFixed(1)}%
              </Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {kostenChange !== null && kostenChange > 0 ? (
              <>Totale uitgaven dit jaar <IconTrendingUp className="size-4" /></>
            ) : kostenChange !== null ? (
              <>Lager dan vorig jaar <IconTrendingDown className="size-4" /></>
            ) : (
              <>Totale uitgaven dit jaar</>
            )}
          </div>
          <div className="text-muted-foreground">Alle kosten samen</div>
        </CardFooter>
      </Card>

      {/* 3. Resultaat */}
      <Card className="@container/card border border-border hover:bg-accent/50 transition-colors">
        <CardHeader>
          <CardDescription>Resultaat</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(currentFinancials?.pnl.net_profit || null)}
          </CardTitle>
          <CardAction>
            {winstChange !== null && (
              <Badge variant="outline">
                {winstChange > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
                {winstChange > 0 ? '+' : ''}{winstChange.toFixed(1)}%
              </Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {winstChange !== null && winstChange > 0 ? (
              <>Wat er overblijft na kosten <IconTrendingUp className="size-4" /></>
            ) : winstChange !== null ? (
              <>Lager dan vorig jaar <IconTrendingDown className="size-4" /></>
            ) : (
              <>Wat er overblijft na kosten</>
            )}
          </div>
          <div className="text-muted-foreground">
            Netto resultaat dit jaar
          </div>
        </CardFooter>
      </Card>

      {/* 4. Winstmarge */}
      <Card className="@container/card border border-border hover:bg-accent/50 transition-colors">
        <CardHeader>
          <CardDescription>Winstmarge</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {winstmarge !== null ? `${winstmarge.toFixed(1)}%` : '-'}
          </CardTitle>
          <CardAction>
            {winstmargeChange !== null && (
              <Badge variant="outline">
                {winstmargeChange > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
                {winstmargeChange > 0 ? '+' : ''}{winstmargeChange.toFixed(1)}%
              </Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {winstmargeChange !== null && winstmargeChange > 0 ? (
              <>Verbetering ten opzichte van vorig jaar <IconTrendingUp className="size-4" /></>
            ) : winstmargeChange !== null ? (
              <>Lager dan vorig jaar <IconTrendingDown className="size-4" /></>
            ) : (
              <>Percentage winst op omzet</>
            )}
          </div>
          <div className="text-muted-foreground">Winst als percentage van omzet</div>
        </CardFooter>
      </Card>
    </div>
  )
}

