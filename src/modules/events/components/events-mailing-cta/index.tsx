"use client"

import Link from "next/link"
import { Bebas_Neue } from "next/font/google"
import { FormEvent, useState } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import { subscribeToNewsletter } from "@lib/mailchimp-subscribe-jsonp"
import Modal from "@modules/common/components/modal"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

const btnPrimary = `${bebas.className} inline-block rounded-md border-2 border-black bg-black px-8 py-3 text-lg tracking-wide text-white transition-colors hover:bg-white hover:text-black`

const btnOutline = `${bebas.className} inline-block rounded-md border-2 border-black bg-white px-8 py-3 text-lg tracking-wide text-black transition-colors hover:bg-black hover:text-white`

type Props = {
  countryCode: string
}

export default function EventsMailingCta({ countryCode }: Props) {
  const { state, open, close: closeModal } = useToggleState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const close = () => {
    setEmail("")
    setMessage(null)
    setIsSubmitting(false)
    closeModal()
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const { ok, message: text } = await subscribeToNewsletter(email)

    if (ok) {
      setMessage({ type: "success", text })
      setEmail("")
    } else {
      setMessage({ type: "error", text })
    }
    setIsSubmitting(false)
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href={`/${countryCode}/events/shows`} className={btnPrimary}>
          VIEW GALLERY
        </Link>
        <button
          type="button"
          onClick={open}
          className={btnOutline}
          aria-label="Sign up for the mailing list"
        >
          SIGN UP
        </button>
      </div>

      <Modal isOpen={state} close={close} size="small" data-testid="events-mailing-modal">
        <Modal.Title>
          <span className={`${bebas.className} text-2xl tracking-wide`}>SIGN UP</span>
        </Modal.Title>
        <Modal.Body>
          <div className="flex w-full max-w-md flex-col gap-4 px-1">
            {message?.type === "success" ? (
              <p className="text-center text-base font-medium text-green-600">{message.text}</p>
            ) : (
              <>
                <p className="text-center text-sm text-ui-fg-subtle">
                  Join our mailing list for new releases, exclusive offers, and events.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${bebas.className} w-full rounded-md bg-black px-6 py-3 tracking-wide text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    {isSubmitting ? "..." : "SUBSCRIBE"}
                  </button>
                  {message?.type === "error" && (
                    <p className="text-center text-sm text-red-600">{message.text}</p>
                  )}
                </form>
                <p className="text-center text-xs text-gray-500">
                  We respect your privacy and will never share your email address.
                </p>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
