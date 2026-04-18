import { Metadata } from "next"
import { Bebas_Neue } from "next/font/google"
import { Mail, Instagram } from "lucide-react"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export const metadata: Metadata = {
  title: "Customer Service | CZ CLUB",
  description: "Need help? Contact CZ CLUB customer service.",
}

export default function ContactPage() {
  return (
    <div className="content-container">
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 py-12">
        <h1 className={`${bebas.className} text-6xl md:text-8xl font-bold tracking-wider text-center`}>
          CUSTOMER SERVICE
        </h1>
        <div className="text-center max-w-2xl space-y-8">
          <div>
            <p className="text-lg text-gray-600 mb-6">
              Have a question about your order, products, or need assistance? Our customer service team is here to help!
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Mail className="w-6 h-6 text-gray-700" />
                <h3 className={`${bebas.className} text-2xl`}>Email Support</h3>
              </div>
              <p className="text-gray-600 mb-3">
                For order inquiries, product questions, or general assistance
              </p>
              <a 
                href="mailto:Team@theczclub.com"
                className="text-lg text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                Team@theczclub.com
              </a>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Instagram className="w-6 h-6 text-gray-700" />
                <h3 className={`${bebas.className} text-2xl`}>Instagram DM</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Quick questions? Send us a direct message
              </p>
              <a 
                href="https://instagram.com/theczclub_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-blue-600 hover:text-blue-800 transition-colors font-medium inline-flex items-center gap-2"
              >
                @theczclub_
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              We typically respond within 24-48 hours during business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

