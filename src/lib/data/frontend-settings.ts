"use server"

import { getFrontendSettingsFromEnv } from "@lib/frontend-gates-env"
import type { FrontendSettings } from "@lib/frontend-gates-env"

/**
 * Waitlist and passcode gates from environment variables (see {@link getFrontendSettingsFromEnv}).
 */
export async function getFrontendSettings(): Promise<FrontendSettings> {
  return getFrontendSettingsFromEnv()
}
