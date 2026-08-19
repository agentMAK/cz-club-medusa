"use client"

import Image from "next/image"
import { Bebas_Neue } from "next/font/google"
import { useState, FormEvent } from "react"

import { subscribeToNewsletter } from "@lib/mailchimp-subscribe-jsonp"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export default function WaitlistPage() {
  const [showForm, setShowForm] = useState(false)
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8">
      <Image
        src="/images/cz-logo.png"
        alt="CZ Club Logo"
        height={70}
        width={119}
      />
      <div
        className={`${bebas.className} flex flex-col items-center justify-center gap-1`}
      >
        <p className="text-5xl font-bold">MEMBERS ONLY</p>
        {!showForm ? (
          <button
            type="button"
            className="px-6 py-3 rounded-md text-lg hover:text-gray-200 transition-colors"
            onClick={() => setShowForm(true)}
          >
            WAITLIST
          </button>
        ) : (
          <>
            {message?.type === "success" ? (
              <div className="w-full max-w-2xl mt-10 flex items-center justify-center text-center px-6">
                <p className="text-2xl font-bold text-green-400 leading-snug">
                  {message.text}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-2 w-full max-w-sm mt-4"
              >
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="email"
                    name="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    aria-label="Email address"
                    className="flex-1 px-3 py-2 rounded-md text-black placeholder:text-gray-500 disabled:opacity-50"
                    required
                    disabled={isSubmitting}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-md bg-white text-black text-sm font-semibold disabled:opacity-50"
                  >
                    {isSubmitting ? "..." : "SUBSCRIBE"}
                  </button>
                </div>

                {message?.type === "error" && (
                  <p className="text-sm text-red-400">{message.text}</p>
                )}
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}
