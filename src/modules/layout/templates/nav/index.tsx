import { Suspense } from "react"
import Image from "next/image"
import { Bebas_Neue } from "next/font/google"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto duration-200" style={{ backgroundColor: '#F1EEEB' }}>
        <nav className="txt-xsmall-plus px-10 text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="hover:text-ui-fg-base"
              data-testid="nav-store-link"
            >
              <Image
                src="/images/cz-logo-black.avif"
                alt="CZ Club"
                width={50}
                height={30}
                className="h-[30px] w-auto"
              />
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className={`text-black hover:text-gray-300 text-base ${bebas.className}`}
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className={`text-black hover:text-gray-300 flex gap-2 text-base ${bebas.className}`}
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
