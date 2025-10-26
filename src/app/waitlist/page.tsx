"use client"
import Image from "next/image"
import { Bebas_Neue } from "next/font/google"
import { useState } from "react"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export default function WaitlistPage() {
  const [showForm, setShowForm] = useState(false)
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8">
      <Image
        src="images/cz-logo.png"
        alt="CZ Club Logo"
        height={70}
        width={119}
      />
      <div className={`${bebas.className} flex flex-col items-center justify-center gap-1`}>
        <p className="text-5xl font-bold">MEMBERS ONLY</p>
        {!showForm ? (
          <button
            type="button"
            className="px-6 py-3 rounded-md text-lg hover:text-gray-200 transition-colors"
            onClick={() => setShowForm(true)}
          >
            JOIN WAITLIST
          </button>
        ) : (
          <div className="flex items-center gap-2 w-full max-w-sm mt-4">
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              className="flex-1 px-3 py-2 rounded-md text-black placeholder:text-gray-500"
            />
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-white text-black text-sm font-semibold"
            >
              SUBCRIBE
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
