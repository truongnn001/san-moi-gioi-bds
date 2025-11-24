'use client'

import { motion } from 'framer-motion'

export default function ServicesHero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-[5]" />
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1581091215367-59ab6f1b52d2?auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="inline-block mb-6 px-6 py-2 bg-goldDark/30 backdrop-blur-sm border border-goldLight/30 rounded-full">
            <span className="text-goldLight text-sm md:text-base font-medium tracking-wider uppercase">
              Giải pháp toàn diện
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Giải Pháp Bất Động Sản Công Nghiệp
            <br />
            <span className="text-goldLight">Toàn Diện Cho Doanh Nghiệp FDI.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Đồng hành trên mọi chặng đường, từ tìm kiếm đến xây dựng và phát triển.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
