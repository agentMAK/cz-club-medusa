"use client"

import { Bebas_Neue } from "next/font/google"
import { useState, FormEvent } from "react"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

const EmailSignup = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const script = document.createElement("script")
    const callbackName = `mailchimpCallback${Date.now()}`

    // Create global callback function
    ;(window as any)[callbackName] = (data: any) => {
      if (data.result === "success") {
        setMessage({
          type: "success",
          text: data.msg || "Thank you! You've been added to our mailing list.",
        })
        setEmail("")
      } else {
        if (data.msg?.includes("already subscribed")) {
          setMessage({
            type: "error",
            text: "This email is already subscribed.",
          })
        } else {
          setMessage({
            type: "error",
            text: data.msg || "Something went wrong. Please try again.",
          })
        }
      }

      setIsSubmitting(false)

      // Cleanup
      delete (window as any)[callbackName]
      document.head.removeChild(script)
    }

    // Build JSONP URL
    const params = new URLSearchParams({
      u: "ef63203cb7a256dc5cf907dc4",
      id: "76a1060c0b",
      f_id: "00cadbe3f0",
      EMAIL: email,
      c: callbackName,
    })

    script.src = `https://theczclub.us2.list-manage.com/subscribe/post-json?${params.toString()}`
    document.head.appendChild(script)

    // Fallback timeout
    setTimeout(() => {
      if ((window as any)[callbackName]) {
        setMessage({
          type: "error",
          text: "No response. The form might have submitted successfully - please check your email.",
        })
        setIsSubmitting(false)
        delete (window as any)[callbackName]
        if (script.parentNode) {
          document.head.removeChild(script)
        }
      }
    }, 5000)
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
              {isSubmitting ? "..." : "SUBCRIBE"}
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

