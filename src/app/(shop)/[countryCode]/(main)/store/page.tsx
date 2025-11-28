import { Metadata } from "next"

import AllProductsGrid from "@modules/home/components/all-products-grid"
import EventsWidget from "@modules/store/components/events-widget"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "CZ CLUB",
  description: "Explore all of our products.",
}

export default async function StorePage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      <div>
        <AllProductsGrid region={region} />
      </div>
    </>
  )
}
