"use client"

import { useState, useEffect, useMemo } from "react"
import { PageLayout } from "@/components/page-layout"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { FiscalDeadlinesCard } from "@/components/fiscal-deadlines-card"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { getUpcomingDeadlines, getMessagesForClient } from "@/lib/dummy-data"
import { createClient } from "@/lib/supabase/client"

export default function ClientDashboardPage() {
  const [userName, setUserName] = useState<string>("Arnaud")
  const supabase = useMemo(() => createClient(), [])

  // Fetch user data
  useEffect(() => {
    async function fetchUserData() {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          setUserName("Arnaud")
          return
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name")
          .eq("id", authUser.id)
          .single()

        const firstName = profile?.first_name || authUser.user_metadata?.first_name || "Arnaud"

        setUserName(firstName)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setUserName("Arnaud")
      }
    }

    fetchUserData()
  }, [supabase])

  // Using first client as demo data
  const clientId = '1'
  const upcomingDeadlines = getUpcomingDeadlines(90)
  const messages = getMessagesForClient(clientId)

  // Transform deadlines and messages into table data format
  const tableData = [
    ...upcomingDeadlines.slice(0, 5).map((deadline, index) => ({
      id: index + 1,
      header: deadline.title,
      type: deadline.type === 'belgie' ? 'België' : 'Kantoor',
      status: new Date(deadline.date) > new Date() ? 'Actief' : 'Verlopen',
      target: new Date(deadline.date).toLocaleDateString('nl-BE', { day: '2-digit', month: '2-digit' }),
      limit: new Date(deadline.date).toLocaleDateString('nl-BE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      reviewer: deadline.type === 'belgie' ? 'Fiscus' : 'Kantoor'
    })),
    ...messages.slice(0, 5).map((message, index) => ({
      id: index + 6,
      header: message.subject,
      type: 'Bericht',
      status: message.read ? 'Gelezen' : 'Nieuw',
      target: message.timestamp,
      limit: '-',
      reviewer: 'Accountant'
    }))
  ]

  return (
    <PageLayout breadcrumbItems={[{ label: "Dashboard" }]}>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-3 py-3 md:gap-4 md:py-4">
          {/* Welcome Banner - Notion style: minimal and clean */}
          <div className="px-4 lg:px-6 pt-4 pb-2">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-4xl font-semibold text-foreground tracking-tight">
                Hey {userName}, welkom terug 👋
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Overzicht van je financiële cijfers en belangrijke deadlines
            </p>
          </div>
          <SectionCards />
          <div className="grid gap-4 px-4 lg:grid-cols-[2fr_1fr] lg:px-6 lg:items-stretch">
            <ChartAreaInteractive />
            <FiscalDeadlinesCard />
          </div>
          <DataTable data={tableData} />
        </div>
      </div>
    </PageLayout>
  )
}

