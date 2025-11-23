"use client"

import { useEffect } from "react"
import type { ReactNode } from "react"

export default function LandingLayoutClient(props: { children: ReactNode }) {
  useEffect(() => {
    // Set body background to black
    document.body.style.backgroundColor = "black"
    document.documentElement.style.backgroundColor = "black"

    // Cleanup: restore original background when leaving this route
    return () => {
      document.body.style.backgroundColor = "#F1EEEB"
      document.documentElement.style.backgroundColor = ""
    }
  }, [])

  return props.children
}

