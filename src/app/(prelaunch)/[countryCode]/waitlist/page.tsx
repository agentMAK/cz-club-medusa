"use client"
import Image from "next/image"
import { Bebas_Neue } from "next/font/google"
import { useState, FormEvent } from "react"
import { useParams } from "next/navigation"
import { verifyPasscode } from "@lib/data/passcode"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export default function WaitlistPage() {
  const params = useParams()
  const countryCode = (params?.countryCode as string) || "gb"

  const [showForm, setShowForm] = useState(false)
  const [showAccessCode, setShowAccessCode] = useState(false)
  const [email, setEmail] = useState("")
  const [passcode, setPasscode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)
  const [accessCodeError, setAccessCodeError] = useState("")
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  const [debugMode, setDebugMode] = useState(false) // Toggle this to see iframe response

  const handleAccessCodeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAccessCodeError("")
    setIsVerifyingCode(true)

    try {
      const result = await verifyPasscode(passcode)

      if (result.success) {
        window.location.href = `/${countryCode}/store`
      } else {
        setAccessCodeError("Invalid access code. Please try again.")
        setPasscode("")
      }
    } catch {
      setAccessCodeError("An error occurred. Please try again.")
      setPasscode("")
    } finally {
      setIsVerifyingCode(false)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent default form submission
    setIsSubmitting(true)
    setMessage(null)

    // Also try JSONP approach for better error handling
    const script = document.createElement("script")
    const callbackName = `mailchimpCallback${Date.now()}`

    // Create global callback function
    ;(window as any)[callbackName] = (data: any) => {
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

    document.head.appendChild(script)

    // Fallback timeout in case JSONP doesn't respond
    setTimeout(() => {
      if ((window as any)[callbackName]) {
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
        src="/images/cz-logo.png"
        alt="CZ Club Logo"
        height={70}
        width={119}
      />
      <div
        className={`${bebas.className} flex flex-col items-center justify-center gap-1`}
      >
        <p className="text-5xl font-bold">MEMBERS ONLY</p>
        {showAccessCode ? (
          <form
            onSubmit={handleAccessCodeSubmit}
            className="flex flex-col items-center gap-4 mt-6"
          >
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="ACCESS CODE"
              className="bg-black border border-white/30 text-white text-center px-6 py-3 text-xl focus:outline-none focus:border-white transition-colors placeholder:text-white/40"
              autoFocus
              disabled={isVerifyingCode}
            />

            {accessCodeError && (
              <p className="text-sm text-red-400">{accessCodeError}</p>
            )}

            <button
              type="submit"
              disabled={isVerifyingCode || !passcode}
              className="text-xl hover:text-gray-200 transition-colors disabled:text-gray-600 disabled:cursor-not-allowed"
            >
              {isVerifyingCode ? "VERIFYING..." : "ENTER"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowAccessCode(false)
                setAccessCodeError("")
                setPasscode("")
              }}
              className="text-sm text-white/60 hover:text-white/80 transition-colors"
            >
              BACK
            </button>
          </form>
        ) : !showForm ? (
          <div className="flex flex-col items-center gap-4 mt-2">
            <button
              type="button"
              className="px-6 py-3 rounded-md text-lg hover:text-gray-200 transition-colors"
              onClick={() => setShowForm(true)}
            >
              WAITLIST
            </button>
            <button
              type="button"
              className="text-lg hover:text-gray-200 transition-colors"
              onClick={() => setShowAccessCode(true)}
            >
              ACCESS CODE
            </button>
          </div>
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

