"use client"
import React from 'react'
import { SimilarItemCardData } from '../../../lib/types'
import { Info } from 'lucide-react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

interface SimilarItemsSectionProps {
  items: SimilarItemCardData[]
  title?: string
  basePath?: string
}

export const SimilarItemsSection: React.FC<SimilarItemsSectionProps> = ({ items, title = 'Sản phẩm tương tự', basePath = '/bat-dong-san' }) => {
  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center gap-2">
        <Info className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      </div>
      {items.length === 0 ? (
        <div className="text-sm text-gray-500">Chưa có dữ liệu tương tự.</div>
      ) : (
        <div className="similar-items-slider">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="w-full"
          >
            {items.map((it) => (
              <SwiperSlide key={it.id}>
                <Link
                  href={`${basePath}/${it.slug}`}
                  className="block group rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:shadow-md h-full"
                >
                  <div className="mb-3 aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                    {it.thumbnail_url ? (
                      <img src={it.thumbnail_url} alt={it.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">No image</div>
                    )}
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-snug">{it.name}</h3>
                  <div className="space-y-1 text-xs text-gray-600">
                    {it.area && <div>Diện tích: {it.area} m²</div>}
                    {it.total_area && <div>Tổng diện tích: {it.total_area} ha</div>}
                    {it.price && <div>Giá: {it.price.toLocaleString('vi-VN')}₫</div>}
                    {it.rental_price_min && (
                      <div>
                        Giá thuê: {it.rental_price_min.toLocaleString('vi-VN')} -
                        {it.rental_price_max?.toLocaleString('vi-VN')}₫/m²/tháng
                      </div>
                    )}
                    {it.province && <div>{it.province}</div>}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <style jsx global>{`
        .similar-items-slider .swiper-button-next,
        .similar-items-slider .swiper-button-prev {
          color: #358b4e;
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .similar-items-slider .swiper-button-next:after,
        .similar-items-slider .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
      `}</style>
    </section>
  )
}

export default SimilarItemsSection
