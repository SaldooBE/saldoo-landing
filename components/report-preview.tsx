"use client"

import Image from "next/image"
import { Home, Upload, BarChart3, HelpCircle, TrendingUp, TrendingDown, DollarSign, FileText, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ReportPreview() {
  // Mock KPI data
  const mockKPIs = {
    winstmarge: 12.5,
    kostenratio: 78.3,
    liquiditeit: 1.8,
    solvabiliteit: 45.2,
  }

  // Report content
  const reportContent = {
    intro: "Dit rapport geeft je in enkele minuten een volledig beeld van hoe je zaak er vandaag écht voor staat. Geen boekhoudjargon, geen moeilijke tabellen, maar duidelijke inzichten waarmee je betere beslissingen kunt nemen.",
    discoveries: [
      "Hoeveel winst je zaak momenteel écht maakt, en waar die winst precies vandaan komt.",
      "Waar je geld naartoe gaat, inclusief de kosten die zwaar doorwegen en de posten waar je waarschijnlijk te veel voor betaalt.",
      "Hoe sterk je cashflow is, en of je voldoende ruimte hebt om jezelf uit te betalen, te investeren of onverwachte kosten op te vangen.",
      "De gezondheid van je onderneming, aan de hand van begrijpelijke ratio's zoals liquiditeit, solvabiliteit en rendabiliteit — vertaald naar gewone mensentaal.",
      "Concrete actiepunten, exact opgesomd, die je vandaag al kunt toepassen om winst, marge of cashpositie te verbeteren.",
    ],
    closing: "Gebruik dit rapport als je kompas. Het vertelt je niet alleen wat de cijfers tonen, maar vooral wat jij ermee kunt doen. Hiermee begrijp je je onderneming beter dan 90% van alle zelfstandigen.",
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      {/* Platform Preview Container */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-white">
          {/* Logo */}
          <div className="border-b border-gray-200 p-4">
            <Image
              src="/logo-blauw.svg"
              alt="Saldoo Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          {/* Menu */}
          <div className="p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Menu
            </p>
            <nav className="space-y-1">
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
              >
                <Home className="h-4 w-4" />
                <span>Start hier</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
              >
                <Upload className="h-4 w-4" />
                <span>Upload & context</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg bg-[#02377C]/10 px-3 py-2 text-sm font-medium text-[#02377C] transition-colors"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analyse & rapport</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Veelgestelde vragen/uitleg</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden bg-white p-6 flex flex-col">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="text-xl font-semibold text-[#02377C]">Analyse & Rapport</h2>
              <p className="text-sm text-gray-600 mt-1">
                Overzicht van je financiële kerncijfers en aanbevelingen
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
          </div>

          {/* KPI Cards */}
          <div className="mb-4 grid gap-3 grid-cols-4 flex-shrink-0">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Winstmarge
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockKPIs.winstmarge.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  Percentage van omzet
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Kostenratio
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockKPIs.kostenratio.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  Percentage van omzet
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Liquiditeit
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockKPIs.liquiditeit.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">
                  Current ratio
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Solvabiliteit
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockKPIs.solvabiliteit.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  Eigen vermogen / Totaal activa
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Report Content - Compact Preview */}
          <Card className="border-gray-200 shadow-sm flex-1 flex flex-col min-h-0">
            <CardHeader className="flex-shrink-0">
              <CardTitle>Financieel Rapport</CardTitle>
              <CardDescription>
                Analyse van je financiële situatie
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 overflow-hidden flex flex-col">
              {/* Intro */}
              <div className="prose prose-sm max-w-none flex-shrink-0">
                <p className="text-sm leading-relaxed">{reportContent.intro}</p>
              </div>

              {/* Discoveries Section */}
              <div className="space-y-3 flex-shrink-0">
                <h3 className="text-base font-semibold text-[#02377C]">Je ontdekt meteen:</h3>
                <ul className="space-y-2">
                  {reportContent.discoveries.map((discovery, index) => (
                    <li key={index} className="text-sm leading-relaxed flex items-start gap-2">
                      <span className="text-[#02377C] mt-1 flex-shrink-0">•</span>
                      <span>{discovery}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Closing */}
              <div className="mt-auto pt-4 border-t flex-shrink-0">
                <p className="text-sm leading-relaxed text-gray-700 italic">
                  {reportContent.closing}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

