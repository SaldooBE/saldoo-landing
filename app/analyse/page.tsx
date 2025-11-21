"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  Download,
  RefreshCw,
  Loader2,
  AlertCircle
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Report, KPIs, ReportData, NormalizedData } from "@/lib/types/report"
import { toast } from "sonner"
import ReactMarkdown from "react-markdown"

export default function AnalysePage() {
  const router = useRouter()
  const supabase = createClient()
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    fetchReport()
  }, [])

  const fetchReport = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        setError('Niet ingelogd')
        return
      }

      // Fetch latest report for user
      const { data, error: fetchError } = await supabase
        .from('reports')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          // No reports found
          setReport(null)
        } else {
          throw fetchError
        }
      } else {
        setReport(data as Report)
      }
    } catch (err) {
      console.error('Error fetching report:', err)
      setError('Fout bij ophalen rapport')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!report || !report.report_json) return

    setDownloading(true)
    try {
      // Create a simple text/JSON download
      const reportText = formatReportForDownload(report.report_json, report.kpis_json, report.normalized_json)
      const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `rapport-${new Date().toISOString().split('T')[0]}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success('Rapport gedownload')
    } catch (err) {
      console.error('Error downloading report:', err)
      toast.error('Fout bij downloaden')
    } finally {
      setDownloading(false)
    }
  }

  const formatReportForDownload = (
    reportData: ReportData,
    kpis: KPIs | null,
    normalizedData: NormalizedData | null
  ): string => {
    let text = `${reportData.intro}\n\n`

    reportData.cards.forEach(card => {
      text += `## ${card.title}\n\n`
      card.body.forEach(paragraph => {
        text += `${paragraph}\n\n`
      })
    })

    if (reportData.actions.length > 0) {
      text += `## Actiepunten\n\n`
      reportData.actions.forEach(action => {
        text += `- ${action}\n`
      })
      text += `\n`
    }

    if (kpis) {
      text += `## Kernindicatoren\n\n`
      if (kpis.winstmarge !== null) text += `Winstmarge: ${kpis.winstmarge.toFixed(2)}%\n`
      if (kpis.kostenratio !== null) text += `Kostenratio: ${kpis.kostenratio.toFixed(2)}%\n`
      if (kpis.liquiditeit !== null) text += `Liquiditeit: ${kpis.liquiditeit.toFixed(2)}\n`
      if (kpis.solvabiliteit !== null) text += `Solvabiliteit: ${kpis.solvabiliteit.toFixed(2)}%\n`
      text += `\n`
    }

    text += `${reportData.disclaimer}\n`
    return text
  }

  const formatMarkdown = (text: string): string => {
    // Convert markdown italic (*text*) to HTML
    return text.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  }

  if (loading) {
    return (
      <PageLayout breadcrumbItems={[{ label: "Analyse & rapport" }]}>
        <div className="space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-64 w-full" />
        </div>
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout breadcrumbItems={[{ label: "Analyse & rapport" }]}>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <AlertCircle className="h-16 w-16 text-destructive mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fout</h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={fetchReport}>Opnieuw proberen</Button>
          </CardContent>
        </Card>
      </PageLayout>
    )
  }

  if (!report || report.status !== 'generated' || !report.report_json) {
    return (
      <PageLayout breadcrumbItems={[{ label: "Analyse & rapport" }]}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Analyse & Rapport</h1>
              <p className="text-muted-foreground">
                Overzicht van je financiële kerncijfers en aanbevelingen
              </p>
            </div>
            <Link href="/upload">
              <Button>
                <RefreshCw className="mr-2 h-4 w-4" />
                Nieuwe analyse starten
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {report?.status === 'error' 
                  ? 'Analyse mislukt' 
                  : report?.status === 'parsed' || report?.status === 'uploaded'
                  ? 'Analyse wordt verwerkt...'
                  : 'Nog geen analyse beschikbaar'}
              </h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                {report?.status === 'error'
                  ? report.error_message || 'Er is een fout opgetreden bij het genereren van het rapport.'
                  : report?.status === 'parsed' || report?.status === 'uploaded'
                  ? 'Je analyse wordt momenteel verwerkt. Ververs de pagina over een paar momenten.'
                  : 'Start je eerste analyse door je jaarcijfers te uploaden. We maken dan een overzichtelijk rapport met kerncijfers en aanbevelingen.'}
              </p>
              {report?.status === 'parsed' || report?.status === 'uploaded' ? (
                <Button onClick={fetchReport}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Verversen
                </Button>
              ) : (
                <Link href="/upload">
                  <Button>
                    Eerste analyse starten
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    )
  }

  const reportData = report.report_json as ReportData
  const kpis = report.kpis_json as KPIs | null
  const normalizedData = report.normalized_json as NormalizedData | null

  return (
    <PageLayout breadcrumbItems={[{ label: "Analyse & rapport" }]}>
      <div className="space-y-6">
        {/* Header with actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analyse & Rapport</h1>
            <p className="text-muted-foreground">
              Overzicht van je financiële kerncijfers en aanbevelingen
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownload} disabled={downloading}>
              <Download className="mr-2 h-4 w-4" />
              {downloading ? 'Downloaden...' : 'Download rapport'}
            </Button>
            <Link href="/upload">
              <Button>
                <RefreshCw className="mr-2 h-4 w-4" />
                Nieuwe analyse starten
              </Button>
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        {kpis && (
          <div className="grid gap-4 md:grid-cols-4">
            {kpis.winstmarge !== null && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Winstmarge
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpis.winstmarge.toFixed(2)}%</div>
                  <p className="text-xs text-muted-foreground">
                    Percentage van omzet
                  </p>
                </CardContent>
              </Card>
            )}
            {kpis.kostenratio !== null && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Kostenratio
                  </CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpis.kostenratio.toFixed(2)}%</div>
                  <p className="text-xs text-muted-foreground">
                    Percentage van omzet
                  </p>
                </CardContent>
              </Card>
            )}
            {kpis.liquiditeit !== null && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Liquiditeit
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpis.liquiditeit.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    Current ratio
                  </p>
                </CardContent>
              </Card>
            )}
            {kpis.solvabiliteit !== null && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Solvabiliteit
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpis.solvabiliteit.toFixed(2)}%</div>
                  <p className="text-xs text-muted-foreground">
                    Eigen vermogen / Totaal activa
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Report Content */}
        <Card>
          <CardHeader>
            <CardTitle>Financieel Rapport</CardTitle>
            <CardDescription>
              Analyse van je financiële situatie
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Intro */}
            <div className="prose prose-sm max-w-none">
              <p className="text-base leading-relaxed">{reportData.intro}</p>
            </div>

            {/* Cards */}
            {reportData.cards.map((card, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <div className="prose prose-sm max-w-none">
                  {card.body.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-base leading-relaxed mb-3">
                      <ReactMarkdown
                        components={{
                          em: ({ children }) => <em className="italic">{children}</em>,
                        }}
                      >
                        {paragraph}
                      </ReactMarkdown>
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Actions */}
            {reportData.actions && reportData.actions.length > 0 && (
              <div className="space-y-3 border-t pt-6">
                <h3 className="text-xl font-semibold">Actiepunten</h3>
                <ul className="list-disc list-inside space-y-2">
                  {reportData.actions.map((action, index) => (
                    <li key={index} className="text-base">{action}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Disclaimer */}
            <div className="border-t pt-6">
              <p className="text-sm text-muted-foreground italic">
                {reportData.disclaimer}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
