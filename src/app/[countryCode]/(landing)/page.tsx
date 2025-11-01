"use client"

import Image from "next/image"
import { Bebas_Neue } from "next/font/google"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useParams } from "next/navigation"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export default function Home() {
  const router = useRouter()
  const { countryCode } = useParams()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleEnter = () => {
    setIsTransitioning(true)
    // Wait for fade-out animation to complete (500ms) before navigating
    setTimeout(() => {
      router.push(`/${countryCode}/store`)
    }, 500)
  }

  return (
    <main 
      className={`min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8 transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src="/images/cz-logo.png"
        alt="CZ Club Logo"
        height={70}
        width={119}
      />
      <div
        className={`${bebas.className} flex flex-col items-center justify-center gap-1`}
      >
        <p className="text-5xl font-bold">MEMBERS ONLY</p>
        <button
          type="button"
          onClick={handleEnter}
          className="px-6 py-3 rounded-md text-lg hover:text-gray-500 transition-colors"
        >
          ENTER
        </button>
      </div>
    </main>
  )
}


