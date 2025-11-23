import { Metadata } from "next"
import LandingLayoutClient from "./layout-client"

export const metadata: Metadata = {
  title: "CZ Club",
  description: "CZ Club - Members Only",
}

export default function LandingLayout(props: { children: React.ReactNode }) {
  return <LandingLayoutClient>{props.children}</LandingLayoutClient>
}


