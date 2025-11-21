"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

export function AboutSection() {
  return (
    <section className="flex min-h-screen w-full flex-col bg-white md:h-screen">
      {/* Header spacer to account for fixed nav */}
      <div className="h-[80px] flex-shrink-0"></div>
      
      {/* About Content */}
      <div className="flex flex-1 flex-col px-6 pt-6 pb-8 md:px-8 md:pt-8 md:pb-16 lg:px-12 lg:pt-12 lg:pb-20">
        <div className="mx-auto w-full max-w-2xl">
          {/* Over ons Button */}
          <div className="mb-8">
            <Button
              variant="outline"
              className="h-9 rounded-lg border-0 bg-gray-100 text-[#02377C] hover:bg-gray-200"
            >
              Over ons
            </Button>
          </div>

          {/* Three Description Paragraphs */}
          <div className="mb-8 space-y-4 md:mb-10">
            <p className="text-lg leading-relaxed text-gray-600 md:text-xl md:leading-relaxed">
              We bouwen een digitale tool die jouw boekhouder niet vervangt, maar <span className="font-bold">versterkt</span>.
            </p>
            <p className="text-lg leading-relaxed text-gray-600 md:text-xl md:leading-relaxed">
              Een <span className="font-bold">slimme sidekick</span> die antwoorden geeft op de vragen die je normaal niet durft te stellen, zonder dat daar meteen een factuur tegenover staat.
            </p>
            <p className="text-lg leading-relaxed text-gray-600 md:text-xl md:leading-relaxed">
              Laad je cijfers van vorig jaar op, geef kort wat context over je activiteit, en krijg in één klik een <span className="font-bold">heldere analyse</span> zoals je boekhouder het zou uitleggen.
            </p>
          </div>

          {/* Horizontal Divider */}
          <div className="mb-8 border-t border-gray-300 md:mb-10"></div>

          {/* Onze visie Section */}
          <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-start">
            <h2 className="text-lg font-semibold text-black md:text-xl md:min-w-[120px]">Onze visie</h2>
            <p className="flex-1 text-lg leading-relaxed text-gray-600 md:text-xl md:leading-relaxed">
              Om de kloof tussen cijfers en beslissingen te dichten, zodat ondernemers kunnen groeien met kennis, niet met gokwerk.
            </p>
          </div>

          {/* Horizontal Divider */}
          <div className="mb-8 border-t border-gray-300 md:mb-10"></div>

          {/* Het team Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <h2 className="text-lg font-semibold text-black md:text-xl md:min-w-[120px]">Het team</h2>
            <div className="flex gap-4">
              {/* Team Member 1 - Arnaud */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="relative h-14 w-14 overflow-hidden rounded-full cursor-pointer transition-transform hover:scale-105 md:h-16 md:w-16">
                    <Image
                      src="/Arnaud.jpg"
                      alt="Arnaud"
                      fill
                      className="object-cover object-[center_40%]"
                    />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64 p-0" side="top" align="start">
                  <div className="relative overflow-hidden rounded-lg">
                    {/* Larger Photo */}
                    <div className="relative h-64 w-full">
                      <Image
                        src="/Arnaud.jpg"
                        alt="Arnaud De Backer"
                        fill
                        className="object-cover object-[center_40%]"
                      />
                      {/* Dark overlay gradient at bottom for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      {/* Name overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="mb-3 text-xl font-semibold text-white">
                          Arnaud De Backer
                        </h3>
                        {/* LinkedIn Icon */}
                        <Link
                          href="#"
                          className="inline-flex items-center justify-center rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
                          onClick={(e) => {
                            e.preventDefault();
                            // Placeholder - user will set up link later
                          }}
                        >
                          <Linkedin className="h-5 w-5 text-white" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>

              {/* Team Member 2 - Jaron */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="relative h-14 w-14 overflow-hidden rounded-full cursor-pointer transition-transform hover:scale-105 md:h-16 md:w-16">
                    <Image
                      src="/Jaron.avif"
                      alt="Jaron"
                      fill
                      className="object-cover"
                    />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64 p-0" side="top" align="start">
                  <div className="relative overflow-hidden rounded-lg">
                    {/* Larger Photo */}
                    <div className="relative h-64 w-full">
                      <Image
                        src="/Jaron.avif"
                        alt="Jaron"
                        fill
                        className="object-cover"
                      />
                      {/* Dark overlay gradient at bottom for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      {/* Name overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="mb-3 text-xl font-semibold text-white">
                          Jaron Schaillee
                        </h3>
                        {/* LinkedIn Icon */}
                        <Link
                          href="#"
                          className="inline-flex items-center justify-center rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
                          onClick={(e) => {
                            e.preventDefault();
                            // Placeholder - user will set up link later
                          }}
                        >
                          <Linkedin className="h-5 w-5 text-white" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

