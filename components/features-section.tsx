"use client";

import { RefreshCw, Brain, MousePointer, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: RefreshCw,
    title: "Smart Upload",
  },
  {
    icon: Brain,
    title: "Contextueel inzicht",
  },
  {
    icon: MousePointer,
    title: "Één overzicht",
  },
  {
    icon: Clock,
    title: "Direct resultaat",
  },
  {
    icon: TrendingUp,
    title: "Persoonlijk advies",
  },
];

export function FeaturesSection() {
  return (
    <section className="flex min-h-screen w-full flex-col bg-white md:h-screen md:overflow-hidden">
      {/* Header spacer to account for fixed nav */}
      <div className="h-[80px] flex-shrink-0"></div>
      
      {/* Features Content */}
      <div className="flex flex-1 flex-col justify-center px-6 pt-4 pb-6 md:px-8 md:pt-4 md:pb-20 lg:px-12 lg:pt-5 lg:pb-24">
        <div className="mx-auto w-full max-w-2xl md:scale-[0.9] md:origin-center">
        {/* Kenmerken Button */}
        <div className="mb-5">
          <Button
            variant="outline"
            className="h-9 rounded-lg border-0 bg-gray-100 text-[#02377C] hover:bg-gray-200"
          >
            Kenmerken
          </Button>
        </div>

        {/* Main Text */}
        <p className="mb-5 text-lg leading-relaxed text-gray-600 md:text-xl md:leading-relaxed">
          Saldoo helpt accountants hun klanten <span className="font-bold">duidelijker en proactiever begeleiden</span>.
        </p>

        {/* Description Paragraphs */}
        <div className="mb-6 space-y-3 md:mb-7 md:space-y-4">
          <p className="text-lg leading-relaxed text-gray-600 md:text-xl md:leading-relaxed">
          Eén omgeving waar ondernemers hun cijfers begrijpen en vragen kunnen stellen via AI. Jullie kantoor krijgt inzicht in wat er precies bij klanten speelt.
          </p>
          <p className="text-lg leading-relaxed text-gray-600 md:text-xl md:leading-relaxed">
            <span className="font-bold">Geen technisch jargon en geen extra werk</span>. Wel een branded portaal dat ondernemers geruststelt, tijd bespaart en jullie adviesrol versterkt.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="space-y-5 md:space-y-6">
          {/* Mobile: All cards in single column */}
          <div className="flex flex-col gap-6 md:hidden">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-lg border border-gray-300 bg-gray-100 p-4 text-center"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center">
                    <Icon className="h-5 w-5 text-black stroke-[1.5]" />
                  </div>
                  <h3 className="text-sm font-semibold text-black">
                    {feature.title}
                  </h3>
                </div>
              );
            })}
          </div>
          
          {/* Desktop: Original grid layout */}
          <div className="hidden md:block space-y-6">
            {/* Top row: 3 cards */}
            <div className="grid grid-cols-3 gap-6">
              {features.slice(0, 3).map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center rounded-lg border border-gray-300 bg-gray-100 p-4 text-center"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center">
                      <Icon className="h-5 w-5 text-black stroke-[1.5]" />
                    </div>
                    <h3 className="text-sm font-semibold text-black md:text-base">
                      {feature.title}
                    </h3>
                  </div>
                );
              })}
            </div>
            {/* Bottom row: 2 cards left-aligned, right card extends to right edge */}
            <div className="grid grid-cols-3 gap-6">
              {features.slice(3, 5).map((feature, index) => {
                const Icon = feature.icon;
                // First card: normal width, second card: spans 2 columns to align with right edge
                const colSpanClass = index === 1 ? "col-span-2" : "";
                return (
                  <div
                    key={index + 3}
                    className={`flex flex-col items-center rounded-lg border border-gray-300 bg-gray-100 p-4 text-center ${colSpanClass}`}
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center">
                      <Icon className="h-5 w-5 text-black stroke-[1.5]" />
                    </div>
                    <h3 className="text-sm font-semibold text-black md:text-base">
                      {feature.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

