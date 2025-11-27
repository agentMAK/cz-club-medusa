import { Metadata } from "next"
import { Bebas_Neue } from "next/font/google"
import { Package, Clock, CreditCard, XCircle, RotateCcw } from "lucide-react"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export const metadata: Metadata = {
  title: "Shipping & Delivery | CZ CLUB",
  description: "Learn about our shipping, delivery, and returns policy.",
}

export default function ShippingPage() {
  return (
    <div className="content-container">
      <div className="flex flex-col items-center gap-8 py-12 max-w-4xl mx-auto">
        <h1 className={`${bebas.className} text-5xl md:text-7xl font-bold tracking-wider text-center`}>
          SHIPPING & DELIVERY
        </h1>

        {/* Delivery Costs */}
        <div className="w-full bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-6 h-6 text-gray-700" />
            <h2 className={`${bebas.className} text-3xl`}>Delivery Costs</h2>
          </div>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold">Standard Delivery:</span> £4.99
            </p>
            <p className="text-lg">
              <span className="font-semibold">Free Delivery:</span> Orders over £100
            </p>
          </div>
        </div>

        {/* Pre-Orders */}
        <div className="w-full bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-blue-700" />
            <h2 className={`${bebas.className} text-3xl text-blue-900`}>Pre-Orders</h2>
          </div>
          <div className="space-y-4 text-gray-800">
            <p>
              Items marked as pre-order will take approximately <strong>1 week to arrive</strong> with us after your purchase. Once received, we allow 1–2 days for quality check, packaging, and dispatch.
            </p>
            <p>
              You can expect your full order to be delivered within <strong>2 weeks from the date of purchase</strong>.
            </p>
            <p className="text-sm italic">
              We appreciate your patience — pre-orders allow us to produce intentionally, reduce waste, and keep quality at the core of what we do.
            </p>
          </div>
        </div>

        {/* How Long Will It Take */}
        <div className="w-full">
          <h3 className={`${bebas.className} text-2xl mb-3`}>How long will it take to arrive?</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              Once we receive the Pre-Ordered items we will ship them to you within <strong>1-3 business days</strong>. You will receive an email confirmation once your item has shipped with a tracking number.
            </p>
            <p>
              If you ordered numerous items in your Pre-order we will ship once your complete order is in stock. Please note that some items may arrive before others.
            </p>
          </div>
        </div>

        {/* When Will You Charge */}
        <div className="w-full bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-gray-700" />
            <h3 className={`${bebas.className} text-2xl`}>When will you charge me for my item?</h3>
          </div>
          <p className="text-gray-700">
            To secure your item, you will be <strong>charged at the time of purchase</strong>.
          </p>
        </div>

        {/* Cancellations */}
        <div className="w-full bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="w-6 h-6 text-amber-700" />
            <h3 className={`${bebas.className} text-2xl text-amber-900`}>Can I cancel items that I have pre-ordered?</h3>
          </div>
          <div className="space-y-3 text-gray-800">
            <p>
              Yes. Please contact us at{" "}
              <a 
                href="mailto:team.theczclub@gmail.com"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                team.theczclub@gmail.com
              </a>
            </p>
            <p className="text-sm font-semibold">
              Please note that cancelled Pre-Orders are subject to a 20% cancellation fee.
            </p>
          </div>
        </div>

        {/* Returns Policy */}
        <div className="w-full bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <RotateCcw className="w-6 h-6 text-gray-700" />
            <h3 className={`${bebas.className} text-2xl`}>Returns Policy (UK)</h3>
          </div>
          <div className="space-y-3 text-gray-700">
            <p>
              We want you to be completely satisfied with your purchase. If you need to return an item, please contact our team for assistance.
            </p>
            <p>
              Contact us at{" "}
              <a 
                href="mailto:team.theczclub@gmail.com"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                team.theczclub@gmail.com
              </a>
              {" "}with your order number and reason for return.
            </p>
            <p className="text-sm text-gray-600">
              Our team will guide you through the returns process and provide you with all necessary information.
            </p>
          </div>
        </div>

        {/* Contact Support */}
        <div className="w-full text-center pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-2">Need more help?</p>
          <a 
            href="/contact"
            className={`${bebas.className} text-xl text-blue-600 hover:text-blue-800 transition-colors`}
          >
            Contact Customer Service
          </a>
        </div>
      </div>
    </div>
  )
}

