'use client'

import { useState, useEffect } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, MapPin, ArrowRight, SlidersHorizontal } from 'lucide-react'
import { api } from '@/lib/api'
import type { Project } from '@/lib/types'
import { formatPrice, getAreaRange } from '@/lib/utils'

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    price_min: '',
    price_max: '',
    status: '',
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [filters])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const response = await api.getProjects(filters as any, 1, 12)
      if (response.success && response.data) {
        setProjects(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      // Mock data
      setProjects([
        {
          id: '1',
          title: 'Vinhomes Grand Park',
          slug: 'vinhomes-grand-park',
          description: 'Đô thị thông minh đẳng cấp quốc tế với đầy đủ tiện ích',
          location: 'Quận 9, TP. HCM',
          price_min: 2000000000,
          price_max: 5000000000,
          area_min: 50,
          area_max: 120,
          status: 'dang-mo-ban',
          thumbnail_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800',
          gallery: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Dự Án Mua Bán</h1>
          <p className="text-xl text-primary-100">
            Khám phá các dự án bất động sản cao cấp, đáp ứng mọi nhu cầu an cư và đầu tư
          </p>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Bộ lọc</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khu vực
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Tất cả</option>
                    <option value="Quận 1">Quận 1</option>
                    <option value="Quận 2">Quận 2</option>
                    <option value="Quận 7">Quận 7</option>
                    <option value="Quận 9">Quận 9</option>
                  </select>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại hình
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Tất cả</option>
                    <option value="can-ho">Căn hộ</option>
                    <option value="nha-pho">Nhà phố</option>
                    <option value="biet-thu">Biệt thự</option>
                    <option value="dat-nen">Đất nền</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Tất cả</option>
                    <option value="dang-mo-ban">Đang mở bán</option>
                    <option value="sap-mo-ban">Sắp mở bán</option>
                  </select>
                </div>

                <button
                  onClick={() => setFilters({ location: '', type: '', price_min: '', price_max: '', status: '' })}
                  className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden w-full mb-6 px-4 py-3 bg-white rounded-lg shadow flex items-center justify-center gap-2 text-gray-700 font-medium"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Bộ lọc
            </button>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                <div className="mb-6 text-gray-600">
                  Tìm thấy <span className="font-semibold">{projects.length}</span> dự án
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/mua-ban/${project.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <div
                          className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                          style={{ backgroundImage: `url(${project.thumbnail_url})` }}
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`px-4 py-2 rounded-full text-xs font-medium ${
                            project.status === 'dang-mo-ban'
                              ? 'bg-green-500 text-white'
                              : 'bg-yellow-500 text-white'
                          }`}>
                            {project.status === 'dang-mo-ban' ? 'Đang mở bán' : 'Sắp mở bán'}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {project.title}
                        </h3>
                        
                        <div className="flex items-center text-gray-600 text-sm mb-3">
                          <MapPin className="w-4 h-4 mr-2" />
                          {project.location}
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Giá từ</div>
                            <div className="text-lg font-bold text-primary-600">
                              {formatPrice(project.price_min)}
                            </div>
                          </div>
                          <div className="flex items-center text-primary-600 text-sm font-medium">
                            Chi tiết
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
