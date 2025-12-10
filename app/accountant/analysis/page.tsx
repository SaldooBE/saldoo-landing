"use client"

import { useState, useMemo } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { dummyClients, dummyAIQuestions } from "@/lib/dummy-data"
import { CheckCircle2, RefreshCw, AlertCircle, Search, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AccountantAnalysisPage() {
  const [selectedClientId, setSelectedClientId] = useState<string>(dummyClients[0]?.id || "")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter clients based on search query
  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return dummyClients
    const query = searchQuery.toLowerCase()
    return dummyClients.filter(
      (client) =>
        client.name.toLowerCase().includes(query) ||
        client.ondernemingsnummer.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Get selected client data
  const selectedClient = useMemo(() => {
    return dummyClients.find((c) => c.id === selectedClientId) || null
  }, [selectedClientId])

  // Get ALL AI questions for selected client
  const clientAIQuestions = useMemo(() => {
    if (!selectedClientId) return []
    return dummyAIQuestions.filter((q) => q.clientId === selectedClientId)
  }, [selectedClientId])

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "actief":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "sync":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
      case "fout":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  // Check if question has upsell opportunity
  const hasUpsellOpportunity = (question: typeof dummyAIQuestions[0]) => {
    // Upsell opportunities: high urgency unanswered questions or complex topics
    const complexTopics = ['vennootschap', 'investeringen', 'btw'];
    return (
      (question.urgency === 'hoog' && !question.answered) ||
      complexTopics.includes(question.theme)
    );
  }

  return (
    <PageLayout breadcrumbItems={[{ label: "Analyse" }]}>
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Analyse</h1>
          <p className="text-muted-foreground">
            Inzicht in wat ondernemers willen weten
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-4 lg:h-[calc(100vh-12rem)] overflow-hidden">
          {/* Left Column: Customer List */}
          <Card className="w-full lg:w-[320px] shrink-0 flex flex-col border border-border/50 lg:h-full h-[300px]">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">Klanten</CardTitle>
              <div className="relative mt-3">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Zoeken..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-9"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full">
                <div className="p-2">
                  {filteredClients.length === 0 ? (
                    <div className="text-sm text-muted-foreground py-8 text-center">
                      Geen klanten gevonden
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {filteredClients.map((client) => (
                        <div
                          key={client.id}
                          onClick={() => setSelectedClientId(client.id)}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-md cursor-pointer transition-colors",
                            "hover:bg-accent/50",
                            selectedClientId === client.id && "bg-accent border border-border"
                          )}
                        >
                          <div className="mt-0.5">{getStatusIcon(client.status)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{client.name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {client.sector}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Right Column: All AI Questions */}
          <Card className="flex-1 flex flex-col border border-border/50 lg:h-full min-w-0">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">
                AI-vragen van {selectedClient?.name || "klant"}
              </CardTitle>
              {clientAIQuestions.length > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  {clientAIQuestions.length} {clientAIQuestions.length === 1 ? "vraag" : "vragen"} gesteld
                </p>
              )}
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  {selectedClient ? (
                    clientAIQuestions.length > 0 ? (
                      <div className="space-y-4">
                        {clientAIQuestions.map((question) => (
                          <div
                            key={question.id}
                            className="p-4 rounded-md border border-border/50 bg-card hover:bg-accent/30 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex items-center gap-2 flex-wrap">
                                {hasUpsellOpportunity(question) && (
                                  <Badge variant="outline" className="text-xs border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30">
                                    <Sparkles className="size-3 mr-1" />
                                    Upsell kans
                                  </Badge>
                                )}
                                {question.theme && (
                                  <Badge variant="outline" className="text-xs">
                                    {question.theme}
                                  </Badge>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground shrink-0">
                                {question.timestamp}
                              </span>
                            </div>
                            <p className="text-sm leading-relaxed text-foreground">
                              {question.question}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <div className="text-center">
                          <p className="text-lg">Geen vragen gesteld</p>
                          <p className="text-sm mt-2">
                            Deze klant heeft nog geen vragen aan de AI gesteld
                          </p>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <div className="text-center">
                        <p className="text-lg">Selecteer een klant</p>
                        <p className="text-sm mt-2">
                          Kies een klant uit de lijst om hun AI-vragen te bekijken
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
