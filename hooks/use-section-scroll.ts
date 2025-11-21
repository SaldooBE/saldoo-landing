"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseSectionScrollOptions {
  totalSections: number;
  containerRef: React.RefObject<HTMLElement>;
  debounceMs?: number;
  swipeThreshold?: number;
  enabled?: boolean;
}

export function useSectionScroll({
  totalSections,
  containerRef,
  debounceMs = 100,
  swipeThreshold = 50,
  enabled = true,
}: UseSectionScrollOptions) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number | null>(null);
  
  // Scroll accumulation refs for multi-section scrolling
  const accumulatedDeltaRef = useRef<number>(0);
  const scrollStartTimeRef = useRef<number | null>(null);
  const scrollAccumulationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use refs to access latest values in callbacks
  const currentSectionRef = useRef(currentSection);
  const isAnimatingRef = useRef(isAnimating);

  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  const goToSection = useCallback(
    (index: number, animationDuration: number = 300) => {
      if (index < 0 || index >= totalSections || isAnimatingRef.current) return;
      
      setIsAnimating(true);
      setCurrentSection(index);
      
      // Unlock scrolling after animation completes
      setTimeout(() => {
        setIsAnimating(false);
      }, animationDuration);
    },
    [totalSections]
  );

  // Animate through multiple sections sequentially
  const animateThroughSections = useCallback(
    async (startIndex: number, targetIndex: number) => {
      if (startIndex === targetIndex) return;
      
      const direction = targetIndex > startIndex ? 1 : -1;
      const sectionsToTraverse = Math.abs(targetIndex - startIndex);
      const isMultiSection = sectionsToTraverse > 1;
      
      // Use faster animation for multi-section scrolling
      const animationDuration = isMultiSection ? 30 : 300;
      
      // For single section, use regular goToSection
      if (!isMultiSection) {
        goToSection(targetIndex, animationDuration);
        return;
      }
      
      // Set animating state for the entire sequence
      setIsAnimating(true);
      
      // For multiple sections, animate through intermediate sections very quickly
      // Use minimal delays between sections for smoother flow
      for (let i = 1; i <= sectionsToTraverse; i++) {
        const nextIndex = startIndex + (direction * i);
        
        // Wait for previous animation to complete (except for first)
        if (i > 1) {
          await new Promise(resolve => setTimeout(resolve, animationDuration * 0.3));
        }
        
        setCurrentSection(nextIndex);
      }
      
      // Unlock scrolling after all animations complete
      setTimeout(() => {
        setIsAnimating(false);
      }, animationDuration);
    },
    [goToSection]
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // Only handle if event is within the container
      const container = containerRef.current;
      if (!container) return;
      
      const target = e.target as Node;
      if (!container.contains(target) && target !== container) return;
      
      e.preventDefault();
      
      if (isAnimatingRef.current) {
        return;
      }

      const now = Date.now();
      const deltaY = e.deltaY;
      
      // Initialize or reset accumulation window if needed
      if (scrollStartTimeRef.current === null || now - scrollStartTimeRef.current > 30) {
        accumulatedDeltaRef.current = 0;
        scrollStartTimeRef.current = now;
      }
      
      // Accumulate scroll delta
      accumulatedDeltaRef.current += deltaY;
      
      // Clear existing accumulation timeout
      if (scrollAccumulationTimeoutRef.current) {
        clearTimeout(scrollAccumulationTimeoutRef.current);
      }
      
      // Process scroll after accumulation window (30ms) or immediately if large scroll
      const accumulationWindow = Math.abs(deltaY) > 100 ? 10 : 30; // Process large scrolls almost immediately
      
      scrollAccumulationTimeoutRef.current = setTimeout(() => {
        const accumulatedDelta = accumulatedDeltaRef.current;
        const current = currentSectionRef.current;
        
        // Reset accumulation
        accumulatedDeltaRef.current = 0;
        scrollStartTimeRef.current = null;
        
        // Calculate sections to advance based on accumulated delta
        // Threshold: 30px per section (reduced sensitivity for smoother scrolling)
        const sectionsToAdvance = Math.floor(Math.abs(accumulatedDelta) / 30);
        
        if (sectionsToAdvance === 0) {
          // Not enough scroll, treat as single section
          if (accumulatedDelta > 0 && current < totalSections - 1) {
            goToSection(current + 1);
          } else if (accumulatedDelta < 0 && current > 0) {
            goToSection(current - 1);
          }
        } else {
          // Calculate target section
          const direction = accumulatedDelta > 0 ? 1 : -1;
          const targetSection = Math.max(
            0,
            Math.min(totalSections - 1, current + (direction * sectionsToAdvance))
          );
          
          // Animate through sections
          if (targetSection !== current) {
            animateThroughSections(current, targetSection);
          }
        }
      }, accumulationWindow);
    },
    [totalSections, containerRef, goToSection, animateThroughSections]
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;
    
    const target = e.target as Node;
    if (!container.contains(target) && target !== container) return;
    
    if (isAnimatingRef.current) return;
    touchStartYRef.current = e.touches[0].clientY;
    touchStartTimeRef.current = Date.now();
  }, [containerRef]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;
    
    const target = e.target as Node;
    if (!container.contains(target) && target !== container) return;
    
    if (isAnimatingRef.current || touchStartYRef.current === null) return;
    e.preventDefault(); // Prevent default scroll
  }, [containerRef]);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      const target = e.target as Node;
      if (!container.contains(target) && target !== container) {
        touchStartYRef.current = null;
        touchStartTimeRef.current = null;
        return;
      }
      
      if (isAnimatingRef.current || touchStartYRef.current === null || touchStartTimeRef.current === null) {
        touchStartYRef.current = null;
        touchStartTimeRef.current = null;
        return;
      }

      const touchEndY = e.changedTouches[0].clientY;
      const touchStartY = touchStartYRef.current;
      const touchDuration = Date.now() - touchStartTimeRef.current;
      const deltaY = touchStartY - touchEndY; // Positive = swipe up, Negative = swipe down

      // Reset touch refs
      touchStartYRef.current = null;
      touchStartTimeRef.current = null;

      // Check if swipe is significant enough and fast enough
      if (Math.abs(deltaY) > swipeThreshold && touchDuration < 500) {
        const current = currentSectionRef.current;
        if (deltaY > 0 && current < totalSections - 1) {
          // Swipe up - next section
          goToSection(current + 1);
        } else if (deltaY < 0 && current > 0) {
          // Swipe down - previous section
          goToSection(current - 1);
        }
      }
    },
    [totalSections, swipeThreshold, goToSection, containerRef]
  );

  useEffect(() => {
    // Don't attach listeners if disabled (e.g., on mobile)
    if (!enabled) return;
    
    // Attach event listeners to window but filter by container
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      if (scrollAccumulationTimeoutRef.current) {
        clearTimeout(scrollAccumulationTimeoutRef.current);
      }
    };
  }, [enabled, handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    currentSection,
    goToSection,
    isAnimating,
  };
}

