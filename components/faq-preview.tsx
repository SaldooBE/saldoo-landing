"use client"

import Image from "next/image"
import { Home, Upload, BarChart3, HelpCircle, FileText, Calculator, Receipt, TrendingUp, TrendingDown, DollarSign, BookOpen, Calendar, ArrowUpDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const faqQuestions = [
  {
    question: "Wat is het verschil tussen een balans en een resultatenrekening?",
    icon: BarChart3,
  },
  {
    question: "Wat betekent btw-technisch \"aftrekbaar\" precies?",
    icon: Receipt,
  },
  {
    question: "Waarom moet ik afschrijven op investeringen en hoe werkt dat?",
    icon: TrendingDown,
  },
  {
    question: "Wat is het verschil tussen kosten en investeringen?",
    icon: DollarSign,
  },
  {
    question: "Hoe werkt het principe van dubbel boekhouden?",
    icon: BookOpen,
  },
  {
    question: "Wat is het verschil tussen cashflow en winst?",
    icon: ArrowUpDown,
  },
  {
    question: "Wat betekent het als mijn eigen vermogen stijgt of daalt?",
    icon: TrendingUp,
  },
  {
    question: "Waarom moet ik periodieke afsluitingen doen?",
    icon: Calendar,
  },
  {
    question: "Wat is het nut van een grootboek en hoe lees ik dat?",
    icon: FileText,
  },
]

export function FAQPreview() {
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analyse & rapport</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg bg-[#02377C]/10 px-3 py-2 text-sm font-medium text-[#02377C] transition-colors"
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
            <h2 className="text-xl font-semibold text-[#02377C] mb-2">
              Veelgestelde vragen/uitleg
            </h2>
            <p className="text-sm text-gray-600">
              Vind hier antwoorden op al je fiscale vragen
            </p>
          </div>

          {/* FAQ Grid - 3x3 */}
          <div className="grid grid-cols-3 gap-4">
            {faqQuestions.map((faq, index) => {
              const IconComponent = faq.icon
              return (
                <Card
                  key={index}
                  className="border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:scale-[1.02] cursor-pointer"
                >
                  <CardContent className="p-4 flex flex-col items-start gap-3 h-full">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <IconComponent className="h-5 w-5 text-gray-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 leading-snug">
                      {faq.question}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Bottom message */}
          <div className="mt-8 p-4 bg-[#02377C]/5 rounded-lg border border-[#02377C]/10">
            <p className="text-sm text-[#02377C] font-medium text-center">
              Alle antwoorden op je fiscale vragen op één plek
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

