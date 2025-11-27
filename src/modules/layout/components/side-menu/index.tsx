"use client"

import { useState } from "react"
import { XMark } from "@medusajs/icons"
import { Bebas_Neue } from "next/font/google"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openMenu = () => setIsOpen(true)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        {/* Menu Button */}
        <button
          data-testid="nav-menu-button"
          onClick={openMenu}
          className={`relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none text-black hover:text-gray-600 text-base ${bebas.className}`}
        >
          Menu
        </button>

        {/* Full-Screen Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity duration-300 ease-in-out"
            style={{ animation: 'fadeIn 0.3s ease-in-out' }}
          >
            {/* Close Button - Top Left */}
            <button
              data-testid="close-menu-button"
              onClick={closeMenu}
              className="absolute top-8 left-8 text-white hover:text-gray-300 transition-colors duration-200 z-50"
              aria-label="Close menu"
            >
              <XMark className="w-8 h-8" />
            </button>

            {/* Centered Navigation Links */}
            <div
              data-testid="nav-menu-popup"
              className="flex items-center justify-center h-full w-full"
            >
              <nav>
                <ul className="flex flex-col gap-8 items-center">
                  {Object.entries(SideMenuItems).map(([name, href]) => {
                    return (
                      <li key={name}>
                        <LocalizedClientLink
                          href={href}
                          className={`text-white hover:text-gray-300 text-5xl md:text-6xl lg:text-7xl transition-colors duration-200 uppercase tracking-wide ${bebas.className}`}
                          onClick={closeMenu}
                          data-testid={`${name.toLowerCase()}-link`}
                        >
                          {name}
                        </LocalizedClientLink>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SideMenu
