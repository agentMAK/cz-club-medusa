import { Bebas_Neue, Inter } from "next/font/google"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
})

const COLLAB_EMAIL = "team@theczclub.com"
const mailtoHref = `mailto:${COLLAB_EMAIL}?subject=${encodeURIComponent(
  "Work with us — collaboration"
)}`

const WorkWithUs = () => {
  return (
    <section
      className="relative z-10 w-full border-t border-gray-200 bg-white py-14 px-6"
      aria-labelledby="work-with-us-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="work-with-us-heading"
          className={`${bebas.className} mb-3 text-4xl tracking-wide text-black md:text-5xl`}
        >
          WORK WITH US
        </h2>
        <p
          className={`${inter.className} mb-6 text-xs font-light leading-relaxed text-black md:text-sm`}
        >
          Interested in collaborating or pitching a proposal? Email us — tell us
          who you are, what you do, and what you have in mind.
        </p>
        <a
          href={mailtoHref}
          className={`${bebas.className} inline-block max-w-full break-words rounded-md border-2 border-black bg-black px-6 py-3 text-center text-base tracking-wide text-white transition-colors hover:bg-white hover:text-black md:px-8 md:text-lg`}
        >
          {COLLAB_EMAIL}
        </a>
      </div>
    </section>
  )
}

export default WorkWithUs
