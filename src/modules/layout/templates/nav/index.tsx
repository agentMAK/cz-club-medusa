import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import { Bebas_Neue } from "next/font/google"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

import NavClient from "./nav-client"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export default async function Nav() {
  const regions = await listRegions()
    .then((regions: StoreRegion[]) => regions)
    .catch(() => [] as StoreRegion[])

  return (
    <NavClient regions={regions}>
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
    </NavClient>
  )
}
