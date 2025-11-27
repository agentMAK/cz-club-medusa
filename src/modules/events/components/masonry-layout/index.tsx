"use client"

import Image from "next/image"
import { eventImages } from "../../lib/event-images"

const MasonryLayout = () => {
  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="columns-1 md:columns-3 gap-4 md:gap-6">
          {eventImages.map((image, index) => (
            <div
              key={index}
              className="mb-4 md:mb-6 break-inside-avoid overflow-hidden rounded-lg group"
            >
              <div className="relative w-full">
                <Image
                  src={image}
                  alt={`Event ${index + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MasonryLayout

