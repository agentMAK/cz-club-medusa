const MAILCHIMP_JSONP_URL =
  "https://theczclub.us2.list-manage.com/subscribe/post-json"

export const MAILCHIMP_FORM_IDS = {
  u: "ef63203cb7a256dc5cf907dc4",
  id: "76a1060c0b",
  f_id: "00cadbe3f0",
} as const

const DEFAULT_SUCCESS_MSG =
  "Thank you! You've been added to our mailing list."

const TIMEOUT_MS = 5000

const TIMEOUT_ERROR_MSG =
  "No response from Mailchimp. The form might have submitted successfully - please check your email."

type MailchimpJsonpResponse = {
  result: string
  msg?: string
}

/**
 * Client-only: Mailchimp list subscribe via JSONP (same flow as legacy embedded forms).
 */
export async function subscribeToNewsletter(
  email: string
): Promise<{ ok: boolean; message: string }> {
  if (typeof window === "undefined") {
    return { ok: false, message: "This action is only available in the browser." }
  }

  return new Promise((resolve) => {
    const script = document.createElement("script")
    const callbackName = `mailchimpCallback${Date.now()}`
    const win = window as unknown as Record<string, unknown>

    let settled = false
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const cleanup = () => {
      delete win[callbackName]
      if (script.parentNode) {
        document.head.removeChild(script)
      }
    }

    const finish = (ok: boolean, message: string) => {
      if (settled) return
      settled = true
      if (timeoutId !== undefined) clearTimeout(timeoutId)
      cleanup()
      resolve({ ok, message })
    }

    win[callbackName] = (data: MailchimpJsonpResponse) => {
      if (data.result === "success") {
        finish(true, data.msg || DEFAULT_SUCCESS_MSG)
        return
      }
      if (data.msg?.includes("already subscribed")) {
        finish(false, "This email is already subscribed.")
        return
      }
      finish(false, data.msg || "Something went wrong. Please try again.")
    }

    const params = new URLSearchParams({
      u: MAILCHIMP_FORM_IDS.u,
      id: MAILCHIMP_FORM_IDS.id,
      f_id: MAILCHIMP_FORM_IDS.f_id,
      EMAIL: email,
      c: callbackName,
    })

    script.src = `${MAILCHIMP_JSONP_URL}?${params.toString()}`
    document.head.appendChild(script)

    timeoutId = setTimeout(() => {
      if (settled) return
      if (win[callbackName]) {
        finish(false, TIMEOUT_ERROR_MSG)
      }
    }, TIMEOUT_MS)
  })
}
