"use client"
import { Metadata } from "next"
import { Bebas_Neue } from "next/font/google"
import { useState, FormEvent } from "react"
import { Mail } from "lucide-react"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Submitting email:", email)
    setIsSubmitting(true)
    setMessage(null)

    // JSONP approach for better error handling
    const script = document.createElement("script")
    const callbackName = `mailchimpCallback${Date.now()}`

    // Create global callback function
    ;(window as any)[callbackName] = (data: any) => {
      console.log("Mailchimp response:", data)

      if (data.result === "success") {
        setMessage({
          type: "success",
          text: data.msg || "Thank you! You've been added to our mailing list.",
        })
        setEmail("")
      } else {
        // Check for specific error types
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
    console.log("JSONP URL:", script.src)

    document.head.appendChild(script)

    // Fallback timeout in case JSONP doesn't respond
    setTimeout(() => {
      if ((window as any)[callbackName]) {
        console.log("JSONP timeout - no response from Mailchimp")
        setMessage({
          type: "error",
          text: "No response from Mailchimp. The form might have submitted successfully - please check your email.",
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

