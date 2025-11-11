"use client"

import { useEffect } from "react"

export default function BlackBackground() {
  useEffect(() => {
    // Set body and html background to black
    document.documentElement.style.backgroundColor = "black"
    document.body.style.backgroundColor = "black"

    // Cleanup: restore original background when component unmounts
    return () => {
      document.documentElement.style.backgroundColor = ""
      document.body.style.backgroundColor = ""
    }
  }, [])

  return null
}

