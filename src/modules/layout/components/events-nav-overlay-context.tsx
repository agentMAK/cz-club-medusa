"use client"

import { createContext, useContext } from "react"

export const EventsNavOverlayContext = createContext(false)

export function useEventsNavOverlay() {
  return useContext(EventsNavOverlayContext)
}
