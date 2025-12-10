"use client"

import { useEffect } from "react"

/**
 * Handles MetaMask connection errors gracefully.
 * Since this app doesn't use MetaMask, we suppress these errors
 * to prevent them from cluttering the console.
 */
export function MetaMaskErrorHandler() {
  useEffect(() => {
    // Handle unhandled promise rejections (common with MetaMask)
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorMessage = event.reason?.message || String(event.reason || "")
      
      // Check if it's a MetaMask-related error
      if (
        errorMessage.includes("Failed to connect to MetaMask") ||
        errorMessage.includes("MetaMask") ||
        event.reason?.stack?.includes("nkbihfbeogaeaoehlefnkodbefgpgknn") // MetaMask extension ID
      ) {
        // Suppress MetaMask errors since we don't use it
        event.preventDefault()
        console.debug("MetaMask connection error suppressed (not used in this app)")
        return
      }
      
      // Let other errors propagate normally
    }

    // Handle general errors
    const handleError = (event: ErrorEvent) => {
      const errorMessage = event.message || ""
      const errorStack = event.error?.stack || ""
      
      // Check if it's a MetaMask-related error
      if (
        errorMessage.includes("Failed to connect to MetaMask") ||
        errorMessage.includes("MetaMask") ||
        errorStack.includes("nkbihfbeogaeaoehlefnkodbefgpgknn") ||
        errorStack.includes("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn")
      ) {
        // Suppress MetaMask errors
        event.preventDefault()
        console.debug("MetaMask error suppressed (not used in this app)")
        return
      }
      
      // Let other errors propagate normally
    }

    // Add event listeners
    window.addEventListener("unhandledrejection", handleUnhandledRejection)
    window.addEventListener("error", handleError)

    // Cleanup
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
      window.removeEventListener("error", handleError)
    }
  }, [])

  return null
}












