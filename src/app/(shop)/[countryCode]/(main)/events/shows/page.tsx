import { Metadata } from "next"
import Link from "next/link"
import { Bebas_Neue, Inter } from "next/font/google"
import MasonryLayout from "@modules/events/components/masonry-layout"

export const metadata: Metadata = {
  title: "Gallery | CZ CLUB",
  description: "Photo gallery from CZ Club underground fashion shows and events.",
}

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
})

export default async function EventsShowsPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params

  return (
    <main className="relative min-h-screen bg-white">
      <div className="relative z-10 w-full bg-white px-6 pt-12 pb-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
          <Link
            href={`/${countryCode}/events`}
            className={`${inter.className} text-xs font-light text-black underline decoration-gray-400 underline-offset-4 transition-colors hover:text-gray-600`}
          >
            ← Back to events
          </Link>
          <h1
            className={`${bebas.className} text-5xl tracking-wide text-black md:text-6xl`}
          >
            GALLERY
          </h1>
          <p
            className={`${inter.className} max-w-xl text-xs font-light leading-relaxed text-black md:text-sm`}
          >
            Moments from our underground shows — full gallery below.
          </p>
        </div>
      </div>
      <MasonryLayout />
    </main>
  )
}
