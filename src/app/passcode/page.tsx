"use client"

import Image from "next/image"
import { Bebas_Neue } from "next/font/google"
import { useState, FormEvent, useEffect } from "react"
import { verifyPasscode } from "@lib/data/passcode"
import { useRouter, useParams } from "next/navigation"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export default function PasscodePage() {
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const params = useParams()

  // Set body background to black when component mounts
  useEffect(() => {
    const originalBgColor = document.body.style.backgroundColor
    document.body.style.backgroundColor = '#000000'
    
    return () => {
      document.body.style.backgroundColor = originalBgColor
    }
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await verifyPasscode(passcode)
      
      if (result.success) {
        // Get country code from URL or use default
        const countryCode = params?.countryCode || 'gb'
        // Redirect to store page with country code to avoid middleware redirect
        window.location.href = `/${countryCode}/store`
      } else {
        setError("Invalid passcode. Please try again.")
        setPasscode("")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      setPasscode("")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4">
        <Image
          src="/images/cz-logo.png"
          alt="CZ Club Logo"
          height={70}
          width={119}
        />
        <div
          className={`${bebas.className} flex flex-col items-center justify-center gap-6`}
        >
          <p className="text-5xl font-bold">MEMBERS ONLY</p>
          <p className="text-xl text-white/80">ENTER ACCESS CODE</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-4">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="ACCESS CODE"
              className="bg-black border border-white/30 text-white text-center px-6 py-3 text-xl focus:outline-none focus:border-white transition-colors placeholder:text-white/40"
              autoFocus
              disabled={isLoading}
            />
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            
            <button
              type="submit"
              disabled={isLoading || !passcode}
              className="text-xl hover:text-gray-500 transition-colors disabled:text-gray-600 disabled:cursor-not-allowed"
            >
              {isLoading ? "VERIFYING..." : "ENTER"}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

