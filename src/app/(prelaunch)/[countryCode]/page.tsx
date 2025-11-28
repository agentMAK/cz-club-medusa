"use client"

import Image from "next/image"
import Link from "next/link"
import { Bebas_Neue } from "next/font/google"
import { FaInstagram, FaTiktok } from "react-icons/fa"
import { useState, FormEvent } from "react"
import { verifyPasscode, isPasscodeRequired, isPasscodeVerified } from "@lib/data/passcode"
import { useParams, useRouter } from "next/navigation"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export default function LandingPage() {
  const params = useParams()
  const router = useRouter()
  const countryCode = (params?.countryCode as string) || "gb"

  const [showPasscode, setShowPasscode] = useState(false)
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAccess, setIsCheckingAccess] = useState(false)

  const handleEnterClick = async () => {
    setIsCheckingAccess(true)
    try {
      const required = await isPasscodeRequired()
      if (required) {
        // Check if already verified
        const verified = await isPasscodeVerified()
        if (verified) {
          // Already verified, go directly to store
          router.push(`/${countryCode}/store`)
        } else {
          // Not verified, show passcode input
          setShowPasscode(true)
        }
      } else {
        // No passcode required, go directly to store
        router.push(`/${countryCode}/store`)
      }
    } catch (err) {
      // If check fails, try going to store (middleware will handle protection)
      router.push(`/${countryCode}/store`)
    } finally {
      setIsCheckingAccess(false)
    }
  }

  const handlePasscodeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await verifyPasscode(passcode)

      if (result.success) {
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
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
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

          {!showPasscode ? (
            <div className="flex flex-col items-center gap-4 mt-6">
              <button
                onClick={handleEnterClick}
                disabled={isCheckingAccess}
                className="text-xl hover:text-gray-500 transition-colors disabled:text-gray-600"
              >
                {isCheckingAccess ? "..." : "ENTER"}
              </button>
              <Link
                href={`/${countryCode}/signup`}
                className="text-xl hover:text-gray-500 transition-colors"
              >
                SIGN UP
              </Link>
              <Link
                href={`/${countryCode}/contact`}
                className="text-xl hover:text-gray-500 transition-colors"
              >
                CONTACT
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handlePasscodeSubmit}
              className="flex flex-col items-center gap-4 mt-6"
            >
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="ACCESS CODE"
                className="bg-black border border-white/30 text-white text-center px-6 py-3 text-xl focus:outline-none focus:border-white transition-colors placeholder:text-white/40"
                autoFocus
                disabled={isLoading}
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={isLoading || !passcode}
                className="text-xl hover:text-gray-500 transition-colors disabled:text-gray-600 disabled:cursor-not-allowed"
              >
                {isLoading ? "VERIFYING..." : "ENTER"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowPasscode(false)
                  setError("")
                  setPasscode("")
                }}
                className="text-sm text-white/60 hover:text-white/80 transition-colors"
              >
                BACK
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mb-16 flex items-center justify-center gap-6 text-white/80">
        <a
          href="https://www.instagram.com/theczclub_/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="CZ Club on Instagram"
          className="hover:text-white transition-colors"
        >
          <FaInstagram className="h-6 w-6" />
        </a>
        <a
          href="https://www.tiktok.com/@theczclub"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="CZ Club on TikTok"
          className="hover:text-white transition-colors"
        >
          <FaTiktok className="h-6 w-6" />
        </a>
      </div>
    </main>
  )
}
