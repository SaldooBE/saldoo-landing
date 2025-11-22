"use client"

import Image from "next/image"
import { Home, Upload, BarChart3, HelpCircle, TrendingUp, TrendingDown, DollarSign, FileText, CheckCircle2, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function MobileUploadPreview() {
  return (
    <div className="mt-8 w-full pointer-events-none">
      {/* Mobile app preview container - fits screen width, no scrolling */}
      <div className="w-full border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
        {/* Header with Logo */}
        <div className="border-b border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
          <Image
            src="/logo-blauw.svg"
            alt="Saldoo Logo"
            width={100}
            height={32}
            className="h-6 w-auto"
          />
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#02377C]"></div>
            <span className="text-xs text-gray-600">Actief</span>
          </div>
        </div>

        {/* Main Content - App Overview */}
        <div className="bg-white p-4">
          {/* Navigation Tabs Preview */}
          <div className="flex gap-2 mb-4 border-b border-gray-200 pb-2">
            <div className="px-3 py-1.5 rounded-lg bg-[#02377C]/10 text-[#02377C] text-xs font-medium">
              Upload
            </div>
            <div className="px-3 py-1.5 rounded-lg text-gray-600 text-xs">
              Analyse
            </div>
            <div className="px-3 py-1.5 rounded-lg text-gray-600 text-xs">
              FAQ
            </div>
          </div>

          {/* Upload Progress Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-[#02377C]">Upload & context</h3>
              <span className="text-xs text-gray-500">Stap 4 van 8</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-200 mb-2">
              <div className="h-1.5 w-1/2 rounded-full bg-[#7AADF0]"></div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div
                  key={num}
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                    num <= 3
                      ? "bg-white border-2 border-[#7AADF0]"
                      : num === 4
                      ? "bg-[#02377C] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {num <= 3 ? (
                    <CheckCircle2 className="h-3 w-3 text-[#7AADF0]" />
                  ) : (
                    num
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Card */}
          <Card className="mb-4 border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-sm font-semibold">
                    Stap 4: Activiteit & margestructuur
                  </CardTitle>
                  <CardDescription className="mt-1 text-xs">
                    Vul de vragenlijst in
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="ml-2 flex shrink-0 items-center gap-1 text-xs">
                  <Clock className="h-2.5 w-2.5" />
                  ~5 min
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2">
                <div className="h-6 w-full rounded border border-gray-200 bg-gray-50"></div>
                <div className="h-6 w-full rounded border border-gray-200 bg-gray-50"></div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Preview Section */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-[#02377C] mb-3">Analyse & Rapport</h3>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2 rounded-lg border border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Winstmarge</span>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                </div>
                <p className="text-base font-bold text-[#02377C]">12.5%</p>
              </div>
              <div className="p-2 rounded-lg border border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Liquiditeit</span>
                  <DollarSign className="h-3 w-3 text-blue-500" />
                </div>
                <p className="text-base font-bold text-[#02377C]">1.8</p>
              </div>
            </div>
            <div className="p-2 rounded-lg border border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-600 line-clamp-2">
                Je ontdekt meteen hoeveel winst je zaak écht maakt, waar je geld naartoe gaat, en concrete actiepunten om je financiële positie te verbeteren.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

