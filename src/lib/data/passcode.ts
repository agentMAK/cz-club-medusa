"use server"

import { cookies } from "next/headers"
import { getFrontendSettings } from "./frontend-settings"

/**
 * Verifies the submitted passcode against `SITE_ACCESS_PASSCODE`
 * and sets a verification cookie if correct
 */
export async function verifyPasscode(
  submittedPasscode: string
): Promise<{ success: boolean }> {
  const settings = await getFrontendSettings()
  const correctPasscode = settings.passcode

  // If no passcode is configured, allow access
  if (!correctPasscode) {
    return { success: true }
  }

  // Check if the submitted passcode matches
  if (submittedPasscode === correctPasscode) {
    // Set the verification cookie
    const cookieStore = await cookies()
    cookieStore.set("_site_access_verified", "true", {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })

    return { success: true }
  }

  return { success: false }
}

/**
 * Checks if the user has verified their passcode
 */
export async function isPasscodeVerified(): Promise<boolean> {
  const settings = await getFrontendSettings()
  const correctPasscode = settings.passcode

  // If no passcode is configured, allow access
  if (!correctPasscode) {
    return true
  }

  const cookieStore = await cookies()
  const verificationCookie = cookieStore.get("_site_access_verified")

  return verificationCookie?.value === "true"
}

/**
 * Checks if a passcode is required to access the store
 */
export async function isPasscodeRequired(): Promise<boolean> {
  const settings = await getFrontendSettings()
  return !!settings.passcode
}

/**
 * Returns passcode gate status with a single settings fetch.
 */
export async function getPasscodeGateStatus(): Promise<{
  required: boolean
  verified: boolean
}> {
  const settings = await getFrontendSettings()
  const required = !!settings.passcode

  if (!required) {
    return {
      required: false,
      verified: true,
    }
  }

  const cookieStore = await cookies()
  const verificationCookie = cookieStore.get("_site_access_verified")

  return {
    required: true,
    verified: verificationCookie?.value === "true",
  }
}
