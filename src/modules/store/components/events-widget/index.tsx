"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Bebas_Neue } from "next/font/google"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

const EventsWidget = () => {
  return (
    <div className="w-full px-6 my-6">
      <LocalizedClientLink href="/events" className="block w-full">
        <div className="relative h-[50vh] w-full overflow-hidden bg-gray-800 group cursor-pointer rounded-2xl">
          {/* Background image */}
          <div 
            className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundImage: "url('/images/1F6EABB4-8D8B-4440-94E4-60FA36D62FE6.JPG')",
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
            }}
          >
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
          </div>

          {/* Content - Title positioned in top right */}
          <div className="absolute inset-0 flex items-start justify-end p-8 z-10">
            <h2 
              className={`${bebas.className} text-7xl md:text-8xl text-white font-bold tracking-wider group-hover:scale-110 transition-transform duration-300`}
            >
              EVENTS
            </h2>
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}

export default EventsWidget

