"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionScroll } from "@/hooks/use-section-scroll";
import { HomeNav } from "@/components/home-nav";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { AboutSection } from "@/components/about-section";
import { FaqSection } from "@/components/faq-section";
import { PlatformPreview } from "@/components/platform-preview";
import { ReportPreview } from "@/components/report-preview";
import { FAQPreview } from "@/components/faq-preview";

const sections = [
  { id: "hero", component: HeroSection },
  { id: "features", component: FeaturesSection },
  { id: "about", component: AboutSection },
  { id: "faq", component: FaqSection },
];

export default function Home() {
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Only use section scroll on desktop (disabled on mobile for natural scrolling)
  const { currentSection, goToSection, isAnimating } = useSectionScroll({
    totalSections: sections.length,
    containerRef: leftContainerRef,
    enabled: !isMobile,
  });

  const handleFeaturesClick = useCallback(() => {
    if (isMobile) {
      // On mobile, scroll to features section
      const featuresElement = document.getElementById("features-section");
      if (featuresElement) {
        featuresElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      goToSection(1);
    }
  }, [goToSection, isMobile]);

  const handleHeroClick = useCallback(() => {
    if (isMobile) {
      // On mobile, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      goToSection(0);
    }
  }, [goToSection, isMobile]);

  const sectionVariants = {
    enter: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  // Determine which preview to show:
  // Section 0 = analyse preview (hero)
  // Section 1 = report preview (features)
  // Section 2 = report preview (about) - same as section 1, no reload
  // Section 3 = FAQ preview (faq)
  const getPreviewState = () => {
    if (currentSection === 0) return { component: PlatformPreview, key: "analyse" };
    if (currentSection === 1 || currentSection === 2) return { component: ReportPreview, key: "report" };
    return { component: FAQPreview, key: "faq" };
  };
  
  const previewState = getPreviewState();
  const PreviewComponent = previewState.component;

  return (
    <div className="flex min-h-screen flex-col overflow-y-auto md:flex-row md:overflow-hidden">
      {/* Left Side - Scrollable Sections */}
      <div 
        ref={leftContainerRef}
        className="relative flex w-full flex-col md:w-1/2 md:overflow-hidden"
      >
        {/* Navigation - Fixed at top of left side */}
        <div className="fixed top-0 left-0 z-50 w-full md:w-1/2 bg-white">
          <HomeNav 
            currentSection={currentSection} 
            onFeaturesClick={handleFeaturesClick}
            onHeroClick={handleHeroClick}
          />
        </div>

        {/* Sections Container */}
        {/* Mobile: Stack all sections for natural scrolling */}
        <div className="relative w-full md:h-screen">
          {/* Mobile Layout - All sections stacked */}
          <div className="flex flex-col md:hidden">
            {sections.map((section, index) => {
              const SectionComponent = section.component;
              return (
                <div 
                  key={section.id} 
                  id={`${section.id}-section`}
                  className="relative w-full min-h-[85vh] -mb-8 last:mb-0"
                >
                  <SectionComponent 
                    {...(section.id === "hero" && { onMeerInfoClick: handleFeaturesClick })}
                  />
                </div>
              );
            })}
          </div>
          
          {/* Desktop Layout - Section switching with animation */}
          <div className="hidden md:block relative h-screen w-full">
            <AnimatePresence mode="wait" initial={false}>
              {sections.map((section, index) => {
                if (index !== currentSection) return null;
                
                const SectionComponent = section.component;
                return (
                  <motion.div
                    key={`${section.id}-${currentSection}`}
                    variants={sectionVariants}
                    initial="exit"
                    animate="enter"
                    exit="exit"
                    className="absolute inset-0 h-full w-full"
                    style={{ willChange: "opacity, transform" }}
                  >
                    <SectionComponent 
                      {...(section.id === "hero" && { onMeerInfoClick: handleFeaturesClick })}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {/* Section Progress Indicator - Desktop only */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSection(index)}
                  className="group relative flex items-center justify-center"
                  aria-label={`Ga naar sectie ${index + 1}`}
                >
                  <div
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentSection
                        ? "h-3 w-3 bg-[#4B7FC0]"
                        : "bg-gray-300 group-hover:bg-gray-400"
                    }`}
                  />
                  {index === currentSection && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 rounded-full border-2 border-[#4B7FC0]"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Platform Preview - Synchronized Scrolling */}
      <div className="hidden md:flex w-full flex-col bg-gradient-to-b from-[#8EBDFA] to-[#5C8FD0] md:w-1/2 md:overflow-hidden md:rounded-tl-3xl md:rounded-bl-3xl">
        {/* Platform Preview Content - Full Height */}
        <div className="flex min-h-screen flex-col md:h-screen">
          {/* Header spacer to match left side */}
          <div className="h-[80px] flex-shrink-0"></div>
          
          {/* Preview Container with Animation */}
          <div className="relative flex-1 overflow-hidden">
            {/* Desktop Preview */}
            <div className="hidden h-full w-full origin-top-right scale-[0.85] transform-gpu -rotate-[2deg] rounded-l-3xl shadow-2xl md:block">
              <div className="relative h-full w-full overflow-hidden rounded-l-3xl border border-gray-200/50 pointer-events-none">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={previewState.key}
                    variants={sectionVariants}
                    initial="exit"
                    animate="enter"
                    exit="exit"
                    className="absolute inset-0 h-full w-full pointer-events-none"
                    style={{ willChange: "opacity, transform" }}
                  >
                    <PreviewComponent />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
