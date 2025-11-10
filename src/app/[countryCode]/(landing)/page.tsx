"use client"

import Image from "next/image"
import Link from "next/link"
import { Bebas_Neue } from "next/font/google"
import { useParams } from "next/navigation"
import { useEffect } from "react"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export default function Home() {
  const { countryCode } = useParams()

  // Set body background to black when component mounts
  useEffect(() => {
    // Store original background color
    const originalBgColor = document.body.style.backgroundColor
    
    // Set body background to black
    document.body.style.backgroundColor = '#000000'
    
    // Cleanup: restore original background when component unmounts
    return () => {
      document.body.style.backgroundColor = originalBgColor
    }
  }, [])

  return (
    <main 
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8"
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
        <Link
          href={`/${countryCode}/store`}
          className="px-6 py-3 rounded-md text-lg hover:text-gray-500 transition-colors"
        >
          ENTER
        </Link>
      </div>
    </main>
  )
}


