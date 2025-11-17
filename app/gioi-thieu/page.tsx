import type { Metadata } from 'next'
import { Target, Award, Users, TrendingUp, Shield, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Giới thiệu - Inland Real Estate',
  description: 'Tìm hiểu về Inland Real Estate - Sàn giao dịch bất động sản uy tín với hơn 15 năm kinh nghiệm',
}

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Tầm Nhìn',
      description: 'Trở thành sàn giao dịch bất động sản hàng đầu Việt Nam, mang đến những giá trị bền vững cho cộng đồng và xã hội.',
    },
    {
      icon: Award,
      title: 'Sứ Mệnh',
      description: 'Cung cấp dịch vụ tư vấn chuyên nghiệp, minh bạch và tận tâm. Đồng hành cùng khách hàng trong mọi quyết định đầu tư.',
    },
    {
      icon: Shield,
      title: 'Giá Trị Cốt Lõi',
      description: 'Uy tín - Chuyên nghiệp - Tận tâm - Minh bạch - Đổi mới sáng tạo trong mọi hoạt động kinh doanh.',
    },
    {
      icon: Users,
      title: 'Đội Ngũ',
      description: 'Hơn 200 chuyên viên tư vấn giàu kinh nghiệm, được đào tạo bài bản và am hiểu sâu sắc về thị trường BĐS.',
    },
    {
      icon: TrendingUp,
      title: 'Lợi Thế',
      description: 'Kết nối đa dạng dự án, thủ tục nhanh chóng, hỗ trợ tài chính tối ưu, chăm sóc khách hàng chu đáo.',
    },
    {
      icon: Heart,
      title: 'Trách Nhiệm Xã Hội',
      description: 'Cam kết đóng góp vào sự phát triển bền vững của cộng đồng và xã hội thông qua các hoạt động thiện nguyện.',
    },
  ]

  const milestones = [
    { year: '2009', title: 'Thành lập', description: 'Công ty được thành lập với đội ngũ 10 người' },
    { year: '2012', title: 'Mở rộng', description: 'Mở chi nhánh tại 3 tỉnh thành lớn' },
    { year: '2015', title: 'Phát triển', description: 'Đạt mốc 1000 giao dịch thành công' },
    { year: '2018', title: 'Đột phá', description: 'Trở thành Top 10 sàn BĐS uy tín nhất' },
    { year: '2021', title: 'Chuyển đổi số', description: 'Ứng dụng công nghệ vào quản lý và giao dịch' },
    { year: '2024', title: 'Hiện tại', description: 'Hơn 5000 khách hàng tin tưởng và đồng hành' },
  ]

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Về Inland Real Estate
            </h1>
            <p className="text-xl text-primary-100">
              Với hơn 15 năm kinh nghiệm, chúng tôi tự hào là đối tác đáng tin cậy của hàng nghìn
              khách hàng trên khắp cả nước. Sự hài lòng của bạn chính là thành công của chúng tôi.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '15+', label: 'Năm Kinh Nghiệm' },
              { value: '200+', label: 'Dự Án' },
              { value: '5000+', label: 'Khách Hàng' },
              { value: '50+', label: 'Đối Tác' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những giá trị định hướng mọi hoạt động của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hành Trình Phát Triển
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những cột mốc quan trọng trong lịch sử của Inland Real Estate
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-8 mb-12 last:mb-0">
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    {milestone.year}
                  </div>
                </div>
                <div className="relative flex-grow pb-12 border-l-2 border-gray-200 pl-8 last:border-0">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-primary-600 rounded-full -translate-x-[9px]" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bắt đầu hành trình cùng chúng tôi
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Hãy để Inland Real Estate đồng hành cùng bạn trong mọi quyết định đầu tư bất động sản
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/mua-ban" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Xem dự án
            </a>
            <a href="/lien-he" className="px-6 py-3 border-2 border-white text-white rounded-md hover:bg-white hover:text-primary-600 transition-colors">
              Liên hệ ngay
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
