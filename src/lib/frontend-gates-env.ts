/**
 * Waitlist and site passcode gates (read from env).
 *
 * Set on the host (e.g. Vercel) and redeploy to apply. Do not use NEXT_PUBLIC_ for
 * `SITE_ACCESS_PASSCODE` — it must stay server-only.
 *
 * - `WAITLIST_ENABLED` — `"true"` enables waitlist redirects; unset or other = off
 * - `SITE_ACCESS_PASSCODE` — optional; non-empty after trim = passcode gate on protected routes
 */

export type FrontendSettings = {
  waitlist_enabled: boolean
  passcode: string | null
}

export function getFrontendSettingsFromEnv(): FrontendSettings {
  const passcodeRaw = process.env.SITE_ACCESS_PASSCODE?.trim()
  return {
    waitlist_enabled: process.env.WAITLIST_ENABLED === "true",
    passcode: passcodeRaw ? passcodeRaw : null,
  }
}
