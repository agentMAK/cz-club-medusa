import { Bebas_Neue, Inter } from "next/font/google"
import EmailSignup from "@modules/events/components/email-signup"
import MasonryLayout from "@modules/events/components/masonry-layout"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
})

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1
            className={`${bebas.className} text-5xl md:text-6xl text-black mb-8 text-center md:text-left tracking-wide`}
          >
            EVENTS
          </h1>

          <div
            className={`${inter.className} space-y-4 text-black leading-relaxed text-sm md:text-base font-light text-center md:text-left`}
          >
            <p>
              At CZ The Club, our underground fashion shows were built for the
              underdogs — the people who are underestimated, overlooked, or told
              to stay in their lane.
            </p>

            <p>We create these events to flip that narrative.</p>

            <p>
              Our slogan, &quot;All About the Dos and Doers,&quot; is more than
              a tagline — it&apos;s the reason these shows exist. We gather
              brands, creatives, and performers who share the same energy:
              people who don&apos;t just talk, but execute. People who build
              from nothing, who create from passion, who turn pressure into
              power.
            </p>

            <p>
              These shows aren&apos;t just to shine a light on our own brand —
              they&apos;re built to bring visibility to others pushing in the
              same direction.
            </p>

            <p>
              We curate a community of rising designers, artists, and builders
              who deserve a space where their work is felt, respected, and
              remembered.
            </p>

            <p>Underground isn&apos;t a style — it&apos;s a statement.</p>

            <p>
              It&apos;s where real culture grows before it hits the surface.
            </p>

            <p className="font-medium">
              Our mission is to give the underdogs a stage big enough for their
              voice, their vision, and their future.
            </p>
          </div>
        </div>
      </div>
      <MasonryLayout />
    </main>
  )
}
