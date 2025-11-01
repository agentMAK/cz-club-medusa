"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useMemo, useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const validImages = useMemo(() => (images || []).filter((i) => i?.url), [images])
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!validImages.length) {
    return null
  }

  const selected = validImages[Math.min(selectedIndex, validImages.length - 1)]

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="relative aspect-[29/34] w-full overflow-hidden bg-transparent">
        <Image
          src={selected.url as string}
          priority
          className="absolute inset-0"
          alt={`Product image ${selectedIndex + 1}`}
          fill
          sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
          style={{ objectFit: "contain" }}
        />
      </div>

      {validImages.length > 1 && (
        <ul className="flex items-center gap-3">
          {validImages.map((img, idx) => (
            <li key={img.id || idx}>
              <button
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative h-16 w-16 overflow-hidden rounded-md border ${
                  idx === selectedIndex ? "border-ui-fg-base" : "border-transparent"
                } focus:outline-none focus:ring-2 focus:ring-ui-fg-base`}
                aria-label={`Show image ${idx + 1}`}
              >
                <Image
                  src={img.url as string}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="64px"
                  style={{ objectFit: "cover" }}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ImageGallery
