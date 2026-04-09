"use client"

import Image from "next/image"
import { Bebas_Neue } from "next/font/google"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { EventsNavOverlayContext } from "@modules/layout/components/events-nav-overlay-context"
import SideMenu from "@modules/layout/components/side-menu"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

/** Only the events landing page (video hero); /events/shows uses the normal static header. */
function isEventsPath(pathname: string | null): boolean {
  if (!pathname) return false
  const parts = pathname.split("/").filter(Boolean)
  return parts.length === 2 && parts[1] === "events"
}

const linkBase = `text-base ${bebas.className}`

export default function NavClient({
  regions,
  children,
}: {
  regions: StoreRegion[]
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const onEvents = isEventsPath(pathname)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    setPastHero(false)
  }, [pathname])

  useEffect(() => {
    if (!onEvents) return
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.65)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [onEvents])

  const overlay = onEvents && !pastHero

  return (
    <EventsNavOverlayContext.Provider value={overlay}>
      <div
        className={`inset-x-0 z-50 group ${
          onEvents ? "fixed top-0 left-0 right-0" : ""
        }`}
      >
        <header
          className="relative mx-auto h-20 duration-200"
          style={{
            backgroundColor: overlay ? "transparent" : "#F1EEEB",
          }}
        >
          <nav className="txt-xsmall-plus px-5 md:px-10 text-ui-fg-subtle flex h-full w-full items-center justify-between text-small-regular">
            <div className="flex h-full flex-1 basis-0 items-center">
              <div className="small:hidden block h-full">
                <SideMenu lightNav={overlay} regions={regions} />
              </div>

              <div className="small:flex hidden h-full items-center gap-x-6">
                <LocalizedClientLink
                className={`${linkBase} ${
                  overlay
                    ? "text-white hover:text-white/80"
                    : "text-black hover:text-gray-600"
                }`}
                href="/store"
                data-testid="nav-shop-link"
              >
                Shop
              </LocalizedClientLink>
              <LocalizedClientLink
                className={`${linkBase} ${
                  overlay
                    ? "text-white hover:text-white/80"
                    : "text-black hover:text-gray-600"
                }`}
                href="/events"
                data-testid="nav-events-link"
              >
                Events
              </LocalizedClientLink>
              <LocalizedClientLink
                className={`${linkBase} ${
                  overlay
                    ? "text-white hover:text-white/80"
                    : "text-black hover:text-gray-600"
                }`}
                href="/contact"
                data-testid="nav-contact-link"
              >
                Contact
              </LocalizedClientLink>
            </div>
          </div>

          <div className="flex h-full items-center">
            <LocalizedClientLink
              href="/"
              className={
                overlay ? "hover:text-white/90" : "hover:text-ui-fg-base"
              }
              data-testid="nav-logo-link"
            >
              <Image
                src="/images/cz-logo-black.avif"
                alt="CZ Club"
                width={50}
                height={30}
                className={`h-[30px] w-auto ${
                  overlay ? "brightness-0 invert" : ""
                }`}
              />
            </LocalizedClientLink>
          </div>

          <div className="flex h-full flex-1 basis-0 items-center justify-end gap-x-6">
            <div className="small:flex hidden h-full items-center gap-x-6">
              <LocalizedClientLink
                className={`${linkBase} ${
                  overlay
                    ? "text-white hover:text-white/80"
                    : "text-black hover:text-gray-300"
                }`}
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            {children}
          </div>
        </nav>
      </header>
      </div>
    </EventsNavOverlayContext.Provider>
  )
}
