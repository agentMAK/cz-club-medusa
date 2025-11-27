"use server"

import { cookies } from "next/headers"

/**
 * Verifies the submitted passcode against the environment variable
 * and sets a verification cookie if correct
 */
export async function verifyPasscode(submittedPasscode: string): Promise<{ success: boolean }> {
  const correctPasscode = process.env.SITE_ACCESS_CODE

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
  const correctPasscode = process.env.SITE_ACCESS_CODE

  // If no passcode is configured, allow access
  if (!correctPasscode) {
    return true
  }

  const cookieStore = await cookies()
  const verificationCookie = cookieStore.get("_site_access_verified")

  return verificationCookie?.value === "true"
}

