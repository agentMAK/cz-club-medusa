"use client"

import Image from "next/image"
import { Bebas_Neue } from "next/font/google"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8">
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
        <LocalizedClientLink href="/store">
          <button
            type="button"
            className="px-6 py-3 rounded-md text-lg hover:text-gray-500 transition-colors"
          >
            ENTER
          </button>
        </LocalizedClientLink>
      </div>
    </main>
  )
}


