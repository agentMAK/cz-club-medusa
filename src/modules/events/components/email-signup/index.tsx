"use client"

import { Bebas_Neue } from "next/font/google"
import { useState, FormEvent } from "react"

import { subscribeToNewsletter } from "@lib/mailchimp-subscribe-jsonp"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

const EmailSignup = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

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
    <div className="w-full bg-white py-8 px-6">
      <div className="max-w-4xl mx-auto text-center">

        {message?.type === "success" ? (
          <div className="max-w-md mx-auto">
            <p className={`${bebas.className} text-2xl text-green-600 tracking-wide`}>{message.text}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL ADDRESS"
              aria-label="Email address"
              className={`${bebas.className} flex-1 w-full px-4 py-3 rounded-md border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50 tracking-wide text-lg`}
              required
              disabled={isSubmitting}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${bebas.className} w-full sm:w-auto px-6 py-3 rounded-md bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 tracking-wide text-lg`}
            >
              {isSubmitting ? "..." : "SUBSCRIBE"}
            </button>
          </form>
        )}

        {message && message.type === "error" && (
          <p className={`${bebas.className} text-base text-red-600 mt-3 tracking-wide`}>{message.text}</p>
        )}
      </div>
    </div>
  )
}

export default EmailSignup
