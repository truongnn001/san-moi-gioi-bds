'use client'

import { motion } from 'framer-motion'
import { BarChart3, Factory, TrendingUp, Clock } from 'lucide-react'

export default function CaseStudiesSection() {
  const cases = [
    {
      icon: Factory,
      name: 'Nhà máy linh kiện điện tử',
      result: 'Rút ngắn 25% thời gian set-up',
      metrics: ['Diện tích 12,000 m²', 'Layout tối ưu dòng nguyên liệu', 'Không phát sinh chỉnh sửa kết cấu']
    },
    {
      icon: BarChart3,
      name: 'Kho logistics tự động',
      result: 'Tăng 18% hiệu suất lưu chuyển',
      metrics: ['Giải pháp giá kệ thông minh', 'Luồng xuất nhập liền mạch', 'Tích hợp theo dõi nhiệt độ & PCCC']
    },
    {
      icon: TrendingUp,
      name: 'Mở rộng xưởng chế tạo',
      result: 'Giảm 30% chi phí tái cấu trúc',
      metrics: ['Tận dụng kết cấu cũ', 'Bổ sung MEP đồng bộ', 'Không gián đoạn sản xuất']
    }
  ]

  return (
    <section className="relative h-screen w-full isolate flex items-start justify-start overflow-hidden bg-white">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-8 md:pr-20 lg:pr-28 pt-8 md:pt-12 pb-8 h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-5 md:mb-6"
        >
          <div className="inline-block px-4 py-2 bg-goldLight/10 rounded-full mb-3">
            <span className="text-goldDark text-sm font-semibold tracking-wide uppercase">
              Case Study
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">
            Dự Án <span className="text-goldDark">Tiêu Biểu</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Một số ví dụ điển hình thể hiện khả năng tối ưu thời gian triển khai & chi phí vận hành cho khách hàng FDI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {cases.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-goldLight/25 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-goldDark" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm md:text-base">{c.name}</div>
                    <div className="text-xs text-goldDark font-semibold">{c.result}</div>
                  </div>
                </div>
                <ul className="space-y-2 mb-4 flex-1">
                  {c.metrics.map((m, j) => (
                    <li key={j} className="flex gap-2 text-xs text-gray-600">
                      <Clock className="w-4 h-4 text-goldDark flex-shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-[11px] text-gray-500">* Số liệu minh hoạ nội bộ</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
