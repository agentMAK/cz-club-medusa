import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import Accordion from "@modules/products/components/product-tabs/accordion"

export default function DeliveryInfo() {
  return (
    <Accordion type="single" collapsible>
      <Accordion.Item title="Delivery" value="Delivery" headingSize="medium">
        <div className="grid grid-cols-1 gap-y-6 py-2">
          <div className="flex items-start gap-x-3">
            <FastDelivery />
            <div>
              <p className="font-semibold">Fast delivery</p>
              <p className="text-ui-fg-subtle text-sm max-w-sm">
                Your package will arrive in 3–5 business days at your pickup
                location or at your home.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-x-3">
            <Refresh />
            <div>
              <p className="font-semibold">Simple exchanges</p>
              <p className="text-ui-fg-subtle text-sm max-w-sm">
                Is the fit not quite right? We’ll exchange your product for a new
                one.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-x-3">
            <Back />
            <div>
              <p className="font-semibold">Easy returns</p>
              <p className="text-ui-fg-subtle text-sm max-w-sm">
                Return your product and we’ll refund your money. No questions
                asked.
              </p>
            </div>
          </div>
        </div>
      </Accordion.Item>
    </Accordion>
  )
}


