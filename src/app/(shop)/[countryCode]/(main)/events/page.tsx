import { Metadata } from "next"
import { Bebas_Neue, Inter } from "next/font/google"
import EventsMailingCta from "@modules/events/components/events-mailing-cta"
import WorkWithUs from "@modules/events/components/work-with-us"

export const metadata: Metadata = {
  title: "Events | CZ CLUB",
  description: "CZ Club underground fashion shows and events.",
}

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
})

export default async function EventsPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params

  return (
    <main className="relative min-h-screen bg-white">
      <div
        className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full bg-black"
        aria-hidden
      >
        <video
          className="h-full w-full object-cover"
          src="/videos/events-hero.mov"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
      <div className="relative z-10 min-h-[100dvh] w-full" aria-hidden />
      <div className="relative z-10 w-full bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1
            className={`${bebas.className} text-5xl md:text-6xl text-black mb-8 text-center tracking-wide`}
          >
            EVENTS
          </h1>

          <div
            className={`${inter.className} max-w-[800px] mx-auto space-y-4 text-black leading-relaxed text-xs md:text-sm font-light text-center`}
          >
            <p>
              At CZ The Club, our underground fashion shows were built for the
              underdogs — the people who are underestimated, overlooked, or told
              to stay in their lane.
            </p>

            <p>
              Our slogan, &quot;All About the Dos and Doers,&quot; is more than
              a tagline — it&apos;s the reason these shows exist. We gather
              brands, creatives, and performers who share the same energy:
              people who don&apos;t just talk, but execute. People who build
              from nothing, who create from passion, who turn pressure into
              power.
            </p>

            <p className="font-semibold">
              We curate a community of rising designers, artists, and builders
              who deserve a space where their work is felt, respected, and
              remembered.
            </p>

            <div className="pt-6">
              <EventsMailingCta countryCode={countryCode} />
            </div>
          </div>
        </div>
      </div>
      <WorkWithUs />
    </main>
  )
}
