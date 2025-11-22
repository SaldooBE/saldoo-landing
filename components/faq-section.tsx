"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Is mijn data veilig als ik mijn cijfers upload?",
    answer:
      "Absoluut. Alle bestanden worden versleuteld verwerkt en niet gedeeld met derden. We gebruiken je cijfers enkel om de analyse te genereren. Niets wordt publiek opgeslagen of hergebruikt.",
  },
  {
    question: "Welke cijfers moet ik uploaden?",
    answer:
      "Je hoeft geen ingewikkelde boekhouding te bezorgen. Een eenvoudige jaarrekening, fiscale aangifte of overzicht van inkomsten en uitgaven in excel of pdf vorm volstaat. Saldoo haalt daar automatisch de nodige data uit voor je analyse.",
  },
  {
    question: "Hoe betrouwbaar is het advies?",
    answer:
      "Het advies is gebaseerd op actuele fiscale regels en dezelfde redenering die een boekhouder zou volgen. Het blijft een simulatie, maar geeft je een realistisch beeld van wat jouw cijfers nu precies betekenen.",
  },
  {
    question: "Wat doet Saldoo precies met mijn cijfers?",
    answer:
      "Saldoo analyseert de kerncijfers van je boekjaar zoals omzet, winst, kosten en belastingen, en zet die om in een heldere financiële samenvatting. Je krijgt meteen inzicht in hoe je zaak ervoor staat en of je beter af zou zijn met een vennootschap.",
  },
  {
    question: "Kost het iets om de analyse te laten uitvoeren?",
    answer:
      "Ja, éénmalig €14,99 (Op factuur, 100% aftrekbaar). Genoeg om onze koffiemachine draaiende te houden, niet genoeg om op pensioen te gaan. Wel meer dan voldoende om jou een slimme financiële analyse te bezorgen.",
  },
];

export function FaqSection() {
  return (
    <section className="flex min-h-screen w-full flex-col bg-white md:h-screen md:overflow-hidden">
      {/* Header spacer to account for fixed nav */}
      <div className="h-[80px] flex-shrink-0"></div>

      {/* FAQ Content */}
      <div className="flex flex-1 flex-col justify-center px-6 pt-4 pb-6 md:px-8 md:pt-4 md:pb-20 lg:px-12 lg:pt-5 lg:pb-24">
        <div className="mx-auto w-full max-w-2xl md:scale-[0.9] md:origin-center">
          {/* FAQs Button */}
          <div className="mb-4">
            <Button
              variant="outline"
              className="h-9 rounded-lg border-0 bg-gray-100 text-[#02377C] hover:bg-gray-200"
            >
              FAQs
            </Button>
          </div>

          {/* Title */}
          <h2 className="mb-1 text-lg font-bold text-black md:text-xl">
            Alles wat je moet weten!
          </h2>

          {/* Subtitle */}
          <p className="mb-1 text-lg leading-relaxed text-gray-600 md:text-xl md:leading-relaxed">
            Enkele antwoorden op de meest gestelde vragen over ons platform.
          </p>

          {/* Contact Text */}
          <p className="mb-3 text-lg leading-relaxed text-gray-600 md:text-xl md:leading-relaxed">
            Zie je niet direct hetgeen je zoekt?{" "}
            <span className="font-bold">Neem gerust contact op</span> en we
            helpen je graag verder!
          </p>

          {/* Horizontal Divider */}
          <div className="mb-3 border-t border-gray-300"></div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-0">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-300 last:border-b-0"
              >
                <AccordionTrigger className="group py-3 text-left hover:no-underline [&>svg]:text-gray-400 [&>svg]:size-5 [&>svg]:rounded-full [&>svg]:bg-gray-100 [&>svg]:p-1 [&>svg]:transition-transform [&[data-state=open]>svg]:rotate-180">
                  <div className="flex items-start gap-3 pr-4">
                    <span className="text-gray-400">Q.</span>
                    <span className="flex-1 text-lg font-normal text-black md:text-xl">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-3 pt-0">
                  <div className="ml-8 text-lg leading-relaxed text-gray-600 md:text-xl md:leading-relaxed">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

