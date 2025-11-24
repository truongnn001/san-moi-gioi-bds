'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function ServicesHero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  return (
    <section ref={sectionRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-black/60 z-[5]" />
        <div
          className="absolute inset-0 w-full h-[120%]"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ opacity }}
          className="max-w-5xl mx-auto"
        >
          <div className="inline-block mb-6 px-6 py-2 bg-goldDark/30 backdrop-blur-sm border border-goldLight/30 rounded-full">
            <span className="text-goldLight text-sm md:text-base font-medium tracking-wider uppercase">
              Giải pháp toàn diện
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Giải Pháp Bất Động Sản Công Nghiệp
            <br />
            <span className="text-goldLight">Toàn Diện Cho Doanh Nghiệp FDI.</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-200 mb-6 max-w-3xl mx-auto leading-relaxed">
            Đồng hành trên mọi chặng đường, từ tìm kiếm đến xây dựng và phát triển.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
