"use client"

import { useState, useEffect, useMemo } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import {
  FileText,
  Zap,
  Settings,
  Plus,
  ArrowRight,
  MoreVertical,
  Calendar,
  Clock,
} from "lucide-react"

export default function ClientAnalysisPage() {
  const [userName, setUserName] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const supabase = useMemo(() => createClient(), [])

  // Fetch user data
  useEffect(() => {
    async function fetchUserData() {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          setUserName("Gebruiker")
          return
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name")
          .eq("id", authUser.id)
          .single()

        const firstName = profile?.first_name || authUser.user_metadata?.first_name || "Gebruiker"

        setUserName(firstName)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setUserName("Gebruiker")
      }
    }

    fetchUserData()
  }, [supabase])

  // Mock data for recent interactions
  const recentInteractions = [
    {
      id: "1",
      name: "Wat is mijn winstmarge dit jaar?",
      icon: "💬",
      type: "question",
    },
    {
      id: "2",
      name: "Zijn er trends in mijn kosten?",
      icon: "💬",
      type: "question",
    },
    {
      id: "3",
      name: "Hoe staat mijn liquiditeit ervoor?",
      icon: "💬",
      type: "question",
    },
  ]

  // Mock data for real-time analysis
  const realTimeAnalysis = {
    title: "Antwoorden op basis van meest recente data",
    date: "Vandaag",
    time: "Live",
    avatar: "⚡",
  }

  // Mock data for suggested tasks
  const suggestedTasks = [
    {
      id: "1",
      task: "Vraag AI over fiscale topics, je eigen cijfers en de context van je bedrijf",
    },
    {
      id: "2",
      task: "Laat AI aandachtspunten detecteren (bv. dalende marge)",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search submission
    setSearchQuery("")
  }

  return (
    <PageLayout breadcrumbItems={[{ label: "Analysis" }]}>
      <div className="max-w-6xl mx-auto space-y-8 pb-24">
        {/* Welcome Banner - Notion style: minimal and clean */}
        <div className="pt-8 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-4xl font-semibold text-foreground tracking-tight">
              Welkom, {userName}!
            </h1>
            <span className="text-2xl">👋</span>
          </div>
          <p className="text-lg text-muted-foreground">Stel vragen over je cijfers in gewone taal. AI analyseert al je financiële data en geeft contextuele antwoorden.</p>
        </div>

        {/* Two-Column Layout Cards - Notion style: subtle borders, minimal shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recent Interactions Card */}
          <div className="border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-foreground">Historiek van gestelde vragen</h3>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
            <div className="space-y-1">
              {recentInteractions.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2.5 px-2 py-1.5 rounded hover:bg-accent cursor-pointer transition-colors group"
                >
                  <span className="text-base shrink-0">{item.icon}</span>
                  <span className="text-sm text-foreground flex-1 truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Analysis Card */}
          <div className="border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors p-4">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-foreground">
                Real-time analyse
              </h3>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm shrink-0">
                {realTimeAnalysis.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 shrink-0"></div>
                  <span className="font-medium text-sm text-foreground truncate">
                    {realTimeAnalysis.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 shrink-0" />
                  <span>{realTimeAnalysis.date}</span>
                  <Clock className="h-3 w-3 ml-1 shrink-0" />
                  <span>{realTimeAnalysis.time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Task Cards - Notion style: minimal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedTasks.map((suggestedTask) => (
            <div
              key={suggestedTask.id}
              className="border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">Voorgestelde Taak</h3>
              </div>
              <p className="text-sm font-medium text-foreground">{suggestedTask.task}</p>
            </div>
          ))}
        </div>

        {/* Bottom Search/Input Bar - Notion style: minimal and clean */}
        <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 mt-8">
          <div className="relative">
            <Plus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Stel een vraag over je cijfers in gewone taal. AI gebruikt al je financiële data (geüpload + Supabase) voor contextuele antwoorden."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-11 bg-background border-border text-sm rounded-lg"
            />
            <ArrowRight className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
