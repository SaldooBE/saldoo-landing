"use client";

import Link from "next/link";
import { Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialProofAvatars } from "@/components/social-proof-avatars";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onMeerInfoClick?: () => void;
}

export function HeroSection({ onMeerInfoClick }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen w-full flex-col bg-white md:h-screen">
      {/* Header spacer to account for fixed nav */}
      <div className="h-[80px] flex-shrink-0"></div>
      
      {/* Hero Content */}
      <div className="flex flex-1 flex-col px-6 pt-6 pb-8 md:px-8 md:pt-8 md:pb-16 lg:px-12 lg:pt-12 lg:pb-20">
        <div className="mx-auto w-full max-w-2xl">
        {/* Wachtlijst Button and Text */}
        <div className="mb-6 flex items-center gap-3 md:mb-7 md:gap-4">
          <Button
            variant="outline"
            className="h-9 flex-shrink-0 rounded-lg border-0 bg-[#E8EFF5] text-[#02377C] hover:bg-[#D0E0EB] flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span>Nieuw!</span>
          </Button>
          <p className="text-sm font-semibold text-[#191919] md:text-base">
            Voor startende ondernemers.
          </p>
        </div>

        {/* Main Headline */}
        <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-[#191919] md:mb-7 md:text-5xl md:leading-[1.1] lg:text-6xl lg:leading-[1.1]">
          Analyseer je KMO zoals een boekhouder het <span className="whitespace-nowrap">zou doen</span>.
        </h1>

        {/* Subtext */}
        <p className="mb-8 text-lg leading-relaxed text-gray-600 md:mb-9 md:text-xl md:leading-relaxed">
          Upload je cijfers van vorig jaar en krijg meteen een analyse én persoonlijk advies of je beter overschakelt naar een vennootschap.
        </p>

        {/* CTA Buttons */}
        <div className="mb-8 flex flex-col gap-4 md:mb-9 md:flex-row">
          <Button
            asChild
            className="h-14 rounded-full bg-gradient-to-b from-[#7AADF0] to-[#4B7FC0] px-8 text-base font-semibold text-white shadow-sm transition-all hover:from-[#6B9EE0] hover:to-[#3C6FB0]"
          >
            <Link href="/login?signup=true">
               Start je analyse hier
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
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <SocialProofAvatars images={["/1.avif", "/2.avif", "/3.avif"]} />
          <p className="text-sm font-semibold leading-relaxed text-[#191919] md:text-base">
            Een aantal andere slimme ondernemers gingen jou reeds voor.
          </p>
        </div>
      </div>
      </div>
      
      {/* Scroll Indicator - Desktop only */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10">
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

