"use client"
import { Bebas_Neue } from "next/font/google"
import { useState, FormEvent } from "react"
import { Mail } from "lucide-react"

import { subscribeToNewsletter } from "@lib/mailchimp-subscribe-jsonp"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export default function SignUpPage() {
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
    <div className="content-container">
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 py-12">
        <h1 className={`${bebas.className} text-6xl md:text-8xl font-bold tracking-wider`}>
          SIGN UP
        </h1>
        
        <div className="text-center max-w-2xl space-y-8">
          <div>
            <p className="text-lg text-gray-600 mb-6">
              Join our mailing list to stay updated on new releases, exclusive offers, and events!
            </p>
          </div>

          {message?.type === "success" ? (
            <div className="bg-green-50 p-8 rounded-lg">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600 leading-snug">
                {message.text}
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Mail className="w-6 h-6 text-gray-700" />
                <h3 className={`${bebas.className} text-2xl`}>Email Newsletter</h3>
              </div>
              
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mx-auto"
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address"
                    className="flex-1 w-full px-4 py-3 rounded-md border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                    disabled={isSubmitting}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isSubmitting ? "..." : "SUBSCRIBE"}
                  </button>
                </div>

                {message && message.type === "error" && (
                  <p className="text-sm text-red-600 text-center">{message.text}</p>
                )}
              </form>

              <p className="mt-6 text-sm text-gray-500">
                We respect your privacy and will never share your email address.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
