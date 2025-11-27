 "use client"
 
import Image from "next/image"
import Link from "next/link"
import { Bebas_Neue } from "next/font/google"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { FaInstagram, FaTiktok } from "react-icons/fa"
 
 const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })
 
 export default function Home() {
   const { countryCode } = useParams()
 
   // Set body background to black when component mounts
   useEffect(() => {
     // Store original background color
     const originalBgColor = document.body.style.backgroundColor
 
     // Set body background to black
     document.body.style.backgroundColor = '#000000'
 
     // Cleanup: restore original background when component unmounts
     return () => {
       document.body.style.backgroundColor = originalBgColor
     }
   }, [])
 
   return (
     <main className="min-h-screen bg-black text-white flex flex-col">
       <div className="flex-1 flex flex-col items-center justify-center gap-8">
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
          <div className="flex flex-col items-center gap-4 mt-6">
            <Link
              href={`/${countryCode}/store`}
              className="text-xl hover:text-gray-500 transition-colors"
            >
              ENTER
            </Link>
            <Link
              href={`/${countryCode}/events`}
              className="text-xl hover:text-gray-500 transition-colors"
            >
              EVENTS
            </Link>
          </div>
        </div>
       </div>
 
      <div className="mb-16 flex items-center justify-center gap-6 text-white/80">
        <a
          href="https://www.instagram.com/theczclub_/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="CZ Club on Instagram"
          className="hover:text-white transition-colors"
        >
          <FaInstagram className="h-6 w-6" />
        </a>
        <a
          href="https://www.tiktok.com/@theczclub"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="CZ Club on TikTok"
          className="hover:text-white transition-colors"
        >
          <FaTiktok className="h-6 w-6" />
        </a>
      </div>
     </main>
   )
 }


