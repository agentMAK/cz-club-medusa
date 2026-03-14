"use server"

import { sdk } from "@lib/config"

export type FrontendSettings = {
  waitlist_enabled: boolean
  passcode: string | null
}

// Default settings when API fails or settings don't exist yet
const DEFAULT_SETTINGS: FrontendSettings = {
  waitlist_enabled: false,
  passcode: null,
}

/**
 * Fetches frontend settings from Medusa Store API
 * Uses no-store to always read latest backend passcode/waitlist settings
 */
export async function getFrontendSettings(): Promise<FrontendSettings> {
  try {
    const response = await sdk.client.fetch<{ settings: FrontendSettings }>(
      `/store/frontend-settings`,
      {
        method: "GET",
        cache: "no-store",
      }
    )

    return response ?? DEFAULT_SETTINGS
  } catch (error) {
    console.error("Failed to fetch frontend settings from Medusa:", error)
    // Return defaults if API fails (e.g., module not yet deployed)
    return DEFAULT_SETTINGS
  }
}

