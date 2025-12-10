"use client"

import { useState } from "react"
import Link from "next/link"
import { IconTrendingUp, IconUsers, IconMessageCircle } from "@tabler/icons-react"
import { Sparkles, ArrowRight } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter,
  CardAction
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dummyClients, getTopClients, getRecentAIQuestions } from "@/lib/dummy-data"

export default function AccountantDashboardPage() {
  const [sortBy, setSortBy] = useState<'omzet' | 'kosten' | 'winst'>('omzet')
  const topClients = getTopClients(sortBy, 10)
  const recentQuestions = getRecentAIQuestions(5)
  const activeClientsCount = dummyClients.filter(c => c.status === 'actief').length

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'actief':
        return <Badge variant="default" className="bg-green-500">Actief</Badge>
      case 'sync':
        return <Badge variant="secondary">Sync</Badge>
      case 'fout':
        return <Badge variant="destructive">Fout</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'hoog':
        return <Badge variant="destructive" className="text-xs">Hoog</Badge>
      case 'gemiddeld':
        return <Badge variant="secondary" className="text-xs">Gemiddeld</Badge>
      case 'laag':
        return <Badge variant="outline" className="text-xs">Laag</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{urgency}</Badge>
    }
  }

  const hasUpsellOpportunity = (question: typeof recentQuestions[0]) => {
    // Upsell opportunities: high urgency unanswered questions or complex topics
    const complexTopics = ['vennootschap', 'investeringen', 'btw'];
    return (
      (question.urgency === 'hoog' && !question.answered) ||
      complexTopics.includes(question.theme)
    );
  }

  return (
    <PageLayout breadcrumbItems={[{ label: "Dashboard" }]}>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-3 py-3 md:gap-4 md:py-4">
          <div className="px-4 lg:px-6">
            <h1 className="text-2xl font-semibold md:text-3xl">
              Hey Arnaud, welkom terug 👋
            </h1>
            <p className="text-muted-foreground mt-1.5">
              Overzicht van actieve klanten en recente activiteit
            </p>
          </div>

          {/* Stats Cards with light blue gradient */}
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-3">
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Actieve klanten</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {activeClientsCount}
                </CardTitle>
                <CardAction>
                  <Badge variant="outline">
                    <IconUsers className="size-3" />
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  van {dummyClients.length} totaal klanten
                </div>
                <div className="text-muted-foreground">
                  Aantal aangesloten klanten
                </div>
              </CardFooter>
            </Card>

            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Top 10 klanten</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {topClients.length}
                </CardTitle>
                <CardAction>
                  <Badge variant="outline">
                    <IconTrendingUp className="size-3" />
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Gesorteerd op {sortBy === 'omzet' ? 'omzet' : sortBy === 'kosten' ? 'kosten' : 'voorlopig resultaat'}
                </div>
                <div className="text-muted-foreground">
                  Grootste klanten (omzet/kosten/resultaat)
                </div>
              </CardFooter>
            </Card>

            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Recente AI-vragen</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {recentQuestions.length}
                </CardTitle>
                <CardAction>
                  <Badge variant="outline">
                    <IconMessageCircle className="size-3" />
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  nieuwe vragen vandaag
                </div>
                <div className="text-muted-foreground">
                  Laatste vragen van ondernemers
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Top Clients Table - Notion-like design */}
          <div className="px-4 lg:px-6">
            <Card className="border-border bg-card shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold">Top 10 klanten</CardTitle>
                    <CardDescription className="mt-1 text-sm">
                      Overzicht van de grootste klanten
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tabs value={sortBy} onValueChange={(value) => setSortBy(value as 'omzet' | 'kosten' | 'winst')}>
                      <TabsList className="h-9">
                        <TabsTrigger value="omzet" className="text-xs px-3">Omzet</TabsTrigger>
                        <TabsTrigger value="kosten" className="text-xs px-3">Kosten</TabsTrigger>
                        <TabsTrigger value="winst" className="text-xs px-3">Voorlopig resultaat</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/accountant/clients">
                        Alle klanten
                        <ArrowRight className="ml-2 size-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {topClients.length > 0 ? (
                  <div className="overflow-hidden rounded-md border border-border">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="font-medium text-muted-foreground">Klant</TableHead>
                          <TableHead className="text-right font-medium text-muted-foreground">Omzet</TableHead>
                          <TableHead className="text-right font-medium text-muted-foreground">Kosten</TableHead>
                          <TableHead className="text-right font-medium text-muted-foreground">Voorlopig resultaat</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topClients.map((client) => {
                          const kosten = client.financials ? client.financials.omzet - client.financials.winst : 0;
                          return (
                            <TableRow key={client.id} className="hover:bg-muted/50 transition-colors">
                              <TableCell className="font-medium">{client.name}</TableCell>
                              <TableCell className="text-right tabular-nums">
                                {client.financials ? formatCurrency(client.financials.omzet) : '-'}
                              </TableCell>
                              <TableCell className="text-right tabular-nums">
                                {client.financials ? formatCurrency(kosten) : '-'}
                              </TableCell>
                              <TableCell className="text-right tabular-nums">
                                {client.financials ? formatCurrency(client.financials.winst) : '-'}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <Empty>
                    <EmptyTitle>Geen klanten gevonden</EmptyTitle>
                    <EmptyDescription>Er zijn momenteel geen klanten beschikbaar.</EmptyDescription>
                  </Empty>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent AI Questions - Notion-like design with upsell opportunities */}
          <div className="px-4 lg:px-6">
            <Card className="border-border bg-card shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold">Recente AI-vragen</CardTitle>
                    <CardDescription className="mt-1 text-sm">
                      Laatste vragen van ondernemers die mogelijk uw aandacht vereisen
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/accountant/analysis">
                      Bekijk volledige analyse
                      <ArrowRight className="ml-2 size-3" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {recentQuestions.length > 0 ? (
                  <div className="space-y-0">
                    {recentQuestions.map((question, index) => {
                      const isUpsell = hasUpsellOpportunity(question);
                      return (
                        <div key={question.id} className="py-3 first:pt-0 last:pb-0">
                          <div className="flex items-start justify-between gap-4 group">
                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-medium text-sm">{question.clientName}</p>
                                {isUpsell && (
                                  <Badge variant="outline" className="text-xs border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30">
                                    <Sparkles className="size-3 mr-1" />
                                    Upsell kans
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-foreground leading-relaxed">{question.question}</p>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="outline" className="text-xs font-normal">
                                  {question.theme}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {question.timestamp}
                                </span>
                              </div>
                            </div>
                          </div>
                          {index < recentQuestions.length - 1 && (
                            <Separator className="mt-3" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <Empty>
                    <EmptyTitle>Geen vragen</EmptyTitle>
                    <EmptyDescription>Er zijn momenteel geen nieuwe AI-vragen.</EmptyDescription>
                  </Empty>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

