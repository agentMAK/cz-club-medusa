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
          <div className="space-y-3">
            <div>
              <p className="text-lg">
                <span className="font-semibold">UK Standard Delivery:</span> £8.00
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Delivered within 3-5 business days. You will receive an email confirmation once your item has shipped with a tracking number.
              </p>
            </div>
            <div>
              <p className="text-lg">
                <span className="font-semibold">International Delivery:</span> £13.99
              </p>
              <p className="text-gray-600 text-sm mt-1">
                International shipping with tracking. Delivery times vary by location.
              </p>
            </div>
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
              Items offered on a pre-order basis are crafted in small batches to ensure precision craftsmanship and the highest production quality.
            </p>
            <div>
              <p className="font-semibold mb-2">Estimated Dispatch:</p>
              <p>
                Production takes 2–3 weeks to perfect the fit, fabric, and finish to our standards. Once completed, your order is shipped immediately and typically arrives by the 4th week, depending on your location.
              </p>
            </div>
            <p>
              You'll receive email updates at every stage—from production to dispatch to delivery—along with full tracking once your item ships.
            </p>
            <p className="text-sm italic">
              We appreciate your patience—pre-orders allow us to create intentionally, reduce waste, and keep quality at the core of everything we do.
            </p>
          </div>
        </div>

        {/* When Will You Charge */}
        <div className="w-full bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-gray-700" />
            <h3 className={`${bebas.className} text-2xl`}>WHEN WILL YOU CHARGE ME?</h3>
          </div>
          <p className="text-gray-700">
            Payment is taken at the time you place your order, securing your piece in the production queue.
          </p>
        </div>

        {/* Cancellations */}
        <div className="w-full bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="w-6 h-6 text-amber-700" />
            <h3 className={`${bebas.className} text-2xl text-amber-900`}>Can I cancel items that I have pre-ordered?</h3>
          </div>
          <div className="space-y-3 text-gray-800">
            <p className="font-semibold">
              Pre-orders cannot be cancelled once placed.
            </p>
            <p>
              If you have any concerns about your order, please contact us at{" "}
              <a 
                href="mailto:Team@theczclub.com"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Team@theczclub.com
              </a>
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
                href="mailto:Team@theczclub.com"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Team@theczclub.com
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

