"use client";

import Link from "next/link";
import { Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialProofAvatars } from "@/components/social-proof-avatars";
import { MobileUploadPreview } from "@/components/mobile-upload-preview";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onMeerInfoClick?: () => void;
}

export function HeroSection({ onMeerInfoClick }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen w-full flex-col bg-white md:h-screen md:overflow-hidden">
      {/* Header spacer to account for fixed nav */}
      <div className="h-[80px] flex-shrink-0"></div>
      
      {/* Hero Content */}
      <div className="flex flex-1 flex-col justify-center px-6 pt-4 pb-6 md:px-8 md:pt-4 md:pb-20 lg:px-12 lg:pt-5 lg:pb-24">
        <div className="mx-auto w-full max-w-2xl md:scale-[0.9] md:origin-center">
        {/* Wachtlijst Button and Text */}
        <div className="mb-4 flex items-center gap-3 md:mb-5 md:gap-4">
          <Button
            variant="outline"
            className="h-9 flex-shrink-0 rounded-lg border-0 bg-[#E8EFF5] text-[#02377C] hover:bg-[#D0E0EB] flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span>Nieuw</span>
          </Button>
          <p className="text-sm font-semibold text-[#191919] md:text-base">
            Voor boekhoudkantoren!
          </p>
        </div>

        {/* Main Headline */}
        <h1 className="mb-4 text-4xl font-bold leading-[1.1] tracking-tight text-[#191919] md:mb-5 md:text-5xl md:leading-[1.1] lg:text-[3.25rem] lg:leading-[1.1]">
          White-label copiloot voor Accountants.
        </h1>

        {/* Subtext */}
        <p className="mb-6 text-lg leading-relaxed text-gray-600 md:mb-7 md:text-xl md:leading-relaxed">
        Maak financiële cijfers begrijpelijk voor elke klant en ontdek welke vragen écht spelen. Volledig in de look & feel van jouw kantoor.
        </p>

        {/* CTA Buttons */}
        <div className="mb-6 flex flex-col gap-4 md:mb-7 md:flex-row">
          <Button
            asChild
            className="h-14 rounded-full bg-gradient-to-b from-[#7AADF0] to-[#4B7FC0] px-8 text-base font-semibold text-white shadow-sm transition-all hover:from-[#6B9EE0] hover:to-[#3C6FB0]"
          >
            <Link href="https://app.saldoo.be/accountant/login">
               Start vandaag
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-14 rounded-full border-gray-300 bg-white px-8 text-base font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
            onClick={onMeerInfoClick}
          >
            Meer info
          </Button>
        </div>

        {/* Social Proof Section */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 md:mb-24">
          <SocialProofAvatars images={["/1.avif", "/2.avif", "/3.avif"]} />
          <p className="text-sm font-semibold leading-relaxed text-[#191919] md:text-base">
            Een aantal andere slimme ondernemers gingen jou reeds voor.
          </p>
        </div>

        {/* Mobile Upload Preview - Mobile only */}
        <div className="md:hidden mt-8">
          <MobileUploadPreview />
        </div>
      </div>
      </div>
      
      {/* Scroll Indicator - Desktop only */}
      <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10 pointer-events-none">
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-1"
        >
          <p className="text-xs font-medium text-gray-500 md:text-sm">
            Scroll voor meer
          </p>
          <ChevronDown className="h-6 w-6 text-gray-400 md:h-7 md:w-7" />
        </motion.div>
      </div>
      
      {/* Bottom Fade Gradient - Desktop only */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}

