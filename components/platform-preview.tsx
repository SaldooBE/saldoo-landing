"use client"

import Image from "next/image"
import { Home, Upload, BarChart3, HelpCircle, Pencil, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function PlatformPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      {/* Platform Preview Container */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-white">
          {/* Logo */}
          <div className="border-b border-gray-200 p-4">
            <Image
              src="/Umain-logo.svg"
              alt="Umain Logo"
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
                className="flex items-center gap-3 rounded-lg bg-[#02377C]/10 px-3 py-2 text-sm font-medium text-[#02377C] transition-colors"
              >
                <Upload className="h-4 w-4" />
                <span>Upload & context</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
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
        <div className="flex-1 overflow-y-auto bg-white p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#02377C]">Upload & context</h2>
          </div>

          {/* Upload Section */}
          <Card className="mb-6 border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base font-semibold">Upload je jaarcijfers</CardTitle>
                  <CardDescription className="mt-1 text-sm">
                    Volg de stappen om je analyse te starten
                  </CardDescription>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <div className="h-1.5 w-24 rounded-full bg-gray-200">
                    <div className="h-1.5 w-12 rounded-full bg-[#02377C]"></div>
                  </div>
                  <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Step 1 Section */}
          <Card className="border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base font-semibold">Stap 1: Algemene bedrijfscontext</CardTitle>
                  <CardDescription className="mt-1 text-sm">Vul de vragenlijst in</CardDescription>
                </div>
                <Badge variant="secondary" className="ml-4 flex shrink-0 items-center gap-1 text-xs">
                  <Clock className="h-3 w-3" />
                  ~5-10 min
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="company-name" className="text-sm font-medium">
                  Naam of pseudoniem van de onderneming
                </Label>
                <Input
                  id="company-name"
                  placeholder="Bijv. Tech Solutions BV"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector" className="text-sm font-medium">
                  Sector / Activiteitstype
                </Label>
                <Input
                  id="sector"
                  placeholder="Selecteer een optie"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">BTW-stelsel</Label>
                <RadioGroup defaultValue="normaal" className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normaal" id="normaal" />
                    <Label htmlFor="normaal" className="font-normal cursor-pointer">
                      Normaal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="forfaitair" id="forfaitair" />
                    <Label htmlFor="forfaitair" className="font-normal cursor-pointer">
                      Forfaitair
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Scroll indicator */}
          <div className="mt-8 flex items-center justify-between text-xs text-gray-400">
            <span>Scroll naar beneden</span>
          </div>
        </div>
      </div>
    </div>
  )
}

