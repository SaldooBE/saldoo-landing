"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Search, FileQuestion } from "lucide-react"

const faqData = [
  {
    category: "Uploadbestanden",
    icon: "📄",
    questions: [
      {
        question: "Welke bestandsformaten kan ik uploaden?",
        answer: "Je kunt PDF en Excel (XLS/XLSX) bestanden uploaden. Voor PDF: jaarrekeningen, fiscale aangiften en andere financiële documenten. Voor Excel: grootboek-exporten, kosten- en opbrengstenoverzichten (COA) en andere gestructureerde financiële data."
      },
      {
        question: "Wat als mijn PDF niet werkt?",
        answer: "Als je PDF niet goed gelezen kan worden, probeer dan: 1) Check of het bestand niet versleuteld is (geen wachtwoord), 2) Exporteer een nieuwe PDF vanuit je boekhoudpakket, 3) Upload een Excel-bestand als alternatief. Neem contact met ons op als het probleem blijft bestaan."
      },
      {
        question: "Hoeveel bestanden kan ik uploaden?",
        answer: "Je kunt meerdere bestanden uploaden (bijvoorbeeld een jaarrekening plus een grootboek export). Dit helpt ons om een completer beeld te krijgen van je financiële situatie. Upload minimaal één bestand om een analyse te kunnen maken."
      },
      {
        question: "Kunnen jullie alle soorten jaarrekeningen lezen?",
        answer: "We kunnen de meeste jaarrekeningen lezen, maar complexe documenten met veel tabellen en grafieken kunnen soms uitdagingen opleveren. Als we velden niet betrouwbaar kunnen lezen, markeren we dat in het rapport."
      }
    ]
  },
  {
    category: "Dataveiligheid",
    icon: "🔒",
    questions: [
      {
        question: "Hoe wordt mijn data beschermd?",
        answer: "We gebruiken state-of-the-art encryptie voor data in transit en at rest. Je bestanden worden veilig opgeslagen en zijn alleen toegankelijk voor jou. We hanteren de hoogste veiligheidsstandaarden conform GDPR en ISO 27001."
      },
      {
        question: "Wie heeft toegang tot mijn cijfers?",
        answer: "Alleen jij hebt toegang tot je data. Onze systemen gebruiken geautomatiseerde processing zonder menselijke inmenging bij het lezen van je bestanden. We delen geen data met derden."
      },
      {
        question: "Hoe lang bewaren jullie mijn data?",
        answer: "Standaard bewaren we je data 30 dagen na de laatste analyse. Je kunt deze periode altijd aanpassen of je data direct verwijderen via de instellingen. Download het rapport altijd voordat je data verwijdert."
      },
      {
        question: "Wat gebeurt er met mijn bestanden na analyse?",
        answer: "Je bestanden worden gebruikt om de analyse te genereren en daarna automatisch verwijderd volgens je ingestelde retentie-periode. De geaggregeerde analyse-resultaten worden bewaard zolang je aangeeft."
      }
    ]
  },
  {
    category: "Interpretatie cijfers",
    icon: "📊",
    questions: [
      {
        question: "Wat betekent EBITDA?",
        answer: "EBITDA staat voor Earnings Before Interest, Taxes, Depreciation and Amortization. Het toont je operationele winst vóór rente, belastingen en afschrijvingen. Het is een belangrijke maatstaf voor je operationele prestaties zonder rekening te houden met belastingen en boekhoudkundige keuzes."
      },
      {
        question: "Hoe bereken je de brutomarge?",
        answer: "Brutomarge = (Omzet - Inkoopwaarde) / Omzet × 100%. Dit percentage laat zien hoeveel winst je overhoudt van elke euro omzet na het betalen van directe kosten. Een hoge brutomarge betekent meestal dat je product/dienst goed geprijsd is."
      },
      {
        question: "Wat zijn kernratio's?",
        answer: "Kernratio's zijn belangrijke indicatoren voor je financiële gezondheid: Current Ratio (liquiditeit), Solvabiliteit (eigen vermogen / totaal vermogen), Winstmarge (winst / omzet), en Personeelsratio (personeelskosten / omzet). Deze helpen je bedrijf snel te beoordelen."
      },
      {
        question: "Hoe interpreteer ik de liquiditeitsratio?",
        answer: "De Current Ratio (vlottende activa / kortlopende schulden) toont of je korte termijn verplichtingen kunt betalen. Een ratio boven 1 is goed, rond 1.5-2 is gezond. Boven 2 kan wijzen op te veel kapitaal dat niet werkt."
      }
    ]
  },
  {
    category: "Verschil vennootschap-eenmanszaak",
    icon: "⚖️",
    questions: [
      {
        question: "Wanneer moet ik overstappen naar een vennootschap?",
        answer: "Overweeg vennootschap als: je winst boven €100K groeit met plannen om te herinvesteren, je groot risico loopt op aansprakelijkheid, je personeel wilt aannemen met sociale lasten, of je belastingvoordelen kunt halen uit specifieke aftrekposten. Ons advies geeft je een indicatie op basis van je cijfers."
      },
      {
        question: "Wat zijn de voordelen van een eenmanszaak?",
        answer: "Eenmanszaak: simpel, weinig administratie, direct profijt van winst, gunstige sociale bijdragen bij lage winsten, geen vennootschapsbelasting. Ideaal voor starters, freelancers en bedrijven met stabiele, lage-middel winsten zonder complexe structuur."
      },
      {
        question: "Hoe beïnvloedt de rechtsvorm mijn belastingen?",
        answer: "Als eenmanszaak betaal je personenbelasting op je winst (schijven tot 49.5%). Vennootschap betaalt eerst 20% vennootschapsbelasting, daarna betaal je bij opname privé nog personenbelasting of dividendbelasting. Het verschil hangt af van je winstniveau en opname-patroon."
      },
      {
        question: "Wat is gevoeligheidsanalyse?",
        answer: "We testen het effect van variaties (±10% omzet/loonkosten) op het rechtsvorm-advies. Dit toont hoe robuust onze aanbeveling is. Als advies steeds hetzelfde blijft, is de aanbeveling erg stabiel en betrouwbaar."
      }
    ]
  }
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter FAQs based on search query
  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <PageLayout breadcrumbItems={[{ label: "Veelgestelde vragen" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Veelgestelde vragen</h1>
          <p className="text-muted-foreground">
            Alles wat je moet weten over Saldoo en het gebruiken van onze tool
          </p>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek in veelgestelde vragen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQs grouped by category */}
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, qIndex) => (
                    <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))
        ) : (
          /* No Results */
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Geen resultaten gevonden</h3>
              <p className="text-muted-foreground text-center">
                Probeer een andere zoekterm of stuur ons een bericht
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}

