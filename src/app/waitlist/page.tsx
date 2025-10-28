"use client"
import Image from "next/image"
import { Bebas_Neue } from "next/font/google"
import { useState, FormEvent } from "react"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export default function WaitlistPage() {
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  const [debugMode, setDebugMode] = useState(false) // Toggle this to see iframe response

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent default form submission
    console.log("Submitting email:", email)
    setIsSubmitting(true)
    setMessage(null)

    // Log form data for debugging
    const formData = new FormData(e.currentTarget)
    console.log("Form data being sent:")
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`)
    })

    // Also try JSONP approach for better error handling
    const script = document.createElement("script")
    const callbackName = `mailchimpCallback${Date.now()}`

    // Create global callback function
    ;(window as any)[callbackName] = (data: any) => {
      console.log("Mailchimp response:", data)

      if (data.result === "success") {
        setMessage({
          type: "success",
          text: data.msg || "Thank you! You've been added to the waitlist.",
        })
        setEmail("")
        // Don't auto-hide the message - let user see it
        // Optionally uncomment the line below to go back to "JOIN WAITLIST" button after 10 seconds
        // setTimeout(() => { setShowForm(false); setMessage(null) }, 10000)
      } else {
        // Check for specific error types
        if (data.msg?.includes("already subscribed")) {
          setMessage({
            type: "error",
            text: "This email is already on the waitlist.",
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
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8">
      <Image
        src="images/cz-logo.png"
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
            JOIN WAITLIST
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
              <>
                {/* Debug toggle - remove in production */}
                <button
                  type="button"
                  onClick={() => setDebugMode(!debugMode)}
                  className="text-xs text-gray-500 mb-2"
                >
                  {debugMode ? "Hide" : "Show"} Debug
                </button>

                {/* Hidden iframe to handle form submission */}
                <iframe
                  name="mailchimp-iframe"
                  style={
                    debugMode
                      ? {
                          width: "100%",
                          height: "200px",
                          border: "1px solid white",
                          marginBottom: "10px",
                        }
                      : { display: "none" }
                  }
                  title="Mailchimp Submission"
                />

                <form
                  action="https://theczclub.us2.list-manage.com/subscribe/post"
                  method="post"
                  target="mailchimp-iframe"
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center gap-2 w-full max-w-sm mt-4"
                >
                  <input type="hidden" name="u" value="ef63203cb7a256dc5cf907dc4" />
                  <input type="hidden" name="id" value="76a1060c0b" />
                  <input type="hidden" name="f_id" value="00cadbe3f0" />

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

                  {/* Mailchimp honeypot field */}
                  <div
                    style={{ position: "absolute", left: "-5000px" }}
                    aria-hidden="true"
                  >
                    <input
                      type="text"
                      name="b_ef63203cb7a256dc5cf907dc4_76a1060c0b"
                      tabIndex={-1}
                      defaultValue=""
                    />
                  </div>

                  {message && message.type === "error" && (
                    <p className="text-sm text-red-400">{message.text}</p>
                  )}
                </form>
              </>
            )}
          </>
        )}
      </div>
    </main>
  )
}
