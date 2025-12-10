"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { dummyClients } from "@/lib/dummy-data"
import { CheckCircle2, RefreshCw, AlertCircle, ExternalLink } from "lucide-react"

export default function AccountantClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClients = dummyClients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.ondernemingsnummer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'actief':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'sync':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
      case 'fout':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const formatKPI = (value: number | null, suffix: string = '') => {
    if (value === null) return '-'
    return `${value.toFixed(1)}${suffix}`
  }

  return (
    <PageLayout breadcrumbItems={[{ label: "Clients" }]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Klantenbeheer</h1>
            <p className="text-muted-foreground">
              Beheer van alle klantdossiers
            </p>
          </div>
          <Button>Nieuwe klant toevoegen</Button>
        </div>

        <div className="mb-4">
          <Input
            placeholder="Zoeken op naam of ondernemingsnummer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <Card key={client.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  {getStatusIcon(client.status)}
                </div>
                <CardDescription>
                  {client.sector} • {client.ondernemingsnummer}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Sync status</p>
                    <p className="text-sm">{client.lastSync || 'Niet gesynchroniseerd'}</p>
                  </div>
                  {client.kpis && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Meest recente KPIs</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Winstmarge:</span>
                          <span className="ml-1 font-medium">{formatKPI(client.kpis.winstmarge, '%')}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Liquiditeit:</span>
                          <span className="ml-1 font-medium">{formatKPI(client.kpis.liquiditeit)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Solvabiliteit:</span>
                          <span className="ml-1 font-medium">{formatKPI(client.kpis.solvabiliteit, '%')}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Kostenratio:</span>
                          <span className="ml-1 font-medium">{formatKPI(client.kpis.kostenratio, '%')}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {client.tags && client.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {client.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Bekijk dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}

