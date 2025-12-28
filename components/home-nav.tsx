"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HomeNavProps {
  currentSection: number;
  onFeaturesClick: () => void;
  onHeroClick?: () => void;
}

export function HomeNav({ currentSection, onFeaturesClick, onHeroClick }: HomeNavProps) {
  return (
    <header className="w-full">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-6 py-4 md:px-8 md:py-6 lg:px-12">
        {/* Logo */}
        <div className="flex items-center">
          {onHeroClick ? (
            <button onClick={onHeroClick} className="cursor-pointer">
              <Image
                src="/Vancoile_demo.png"
                alt="Vancoile Logo"
                width={120}
                height={36}
                className="h-10 w-auto"
                priority
              />
            </button>
          ) : (
            <Link href="/">
              <Image
                src="/Vancoile_demo.png"
                alt="Vancoile Logo"
                width={120}
                height={36}
                className="h-10 w-auto"
                priority
              />
            </Link>
          )}
        </div>
        
        {/* Inloggen Button */}
        <div className="flex items-center">
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full border-gray-300 bg-white px-6 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
          >
            <Link href="https://app.saldoo.be/accountant/login">Inloggen</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

