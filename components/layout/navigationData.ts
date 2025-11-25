// Navigation tree structure matching provided sitemap
// Each item can have children; route paths are placeholders where not specified

export interface NavItem {
  title: string
  href?: string
  children?: NavItem[]
}

export const navigationTree: NavItem[] = [
  { title: 'Trang chủ', href: '/' },
  {
    title: 'Về Chúng Tôi',
    href: '/gioi-thieu',
    children: [
      { title: 'Câu chuyện INLANDV (Xuất phát)', href: '/gioi-thieu#xuat-phat' },
      { title: 'Sứ mệnh & Tầm nhìn', href: '/gioi-thieu#tam-nhin' },
      { title: 'Giới thiệu CEO', href: '/gioi-thieu#gioi-thieu' },
      { title: 'Đội ngũ (Key Team)', href: '/gioi-thieu#doi-ngu' },
      { title: 'Cơ cấu tổ chức', href: '/gioi-thieu#to-chuc' },
      { title: 'Khách hàng & Đối tác tiêu biểu', href: '/gioi-thieu#khach-hang' },
    ],
  },
  {
    title: 'Dịch vụ',
    href: '/dich-vu',
    children: [
      { title: 'Môi giới BĐS Công nghiệp', href: '/dich-vu#moi-gioi' },
      { title: 'Tư vấn Pháp lý & Đầu tư', href: '/dich-vu#phap-ly' },
      { title: 'Dịch vụ Hỗ trợ FDI', href: '/dich-vu#fdi' },
      { title: 'Thiết kế & Thi công', href: '/dich-vu#thiet-ke-thi-cong' },
    ],
  },
  {
    title: 'Bất động sản',
    href: '/bat-dong-san',
  },
  {
    title: 'Khu công nghiệp',
    href: '/kcn',
  },
  {
    title: 'Góc nhìn chuyên gia',
    href: '/goc-nhin-chuyen-gia',
    children: [
      { title: 'Phân tích thị trường', href: '/goc-nhin-chuyen-gia/phan-tich-thi-truong' },
      { title: 'Cẩm nang đầu tư', href: '/goc-nhin-chuyen-gia/cam-nang-dau-tu' },
      { title: 'Tin tức FDI', href: '/goc-nhin-chuyen-gia/tin-tuc-fdi' },
    ],
  },
  {
    title: 'Tin tức & Hoạt động',
    href: '/tin-tuc-hoat-dong',
    children: [
      { title: 'Tin tức Thị trường BĐS Công nghiệp', href: '/tin-tuc-hoat-dong/thi-truong-bds-cong-nghiep' },
      { title: 'Tin tức FDI', href: '/tin-tuc-hoat-dong/tin-tuc-fdi' },
      { title: 'Sự kiện đã tham gia', href: '/tin-tuc-hoat-dong/su-kien-tham-gia' },
      { title: 'Dự án mới triển khai', href: '/tin-tuc-hoat-dong/du-an-moi' },
      { title: 'Hoạt động CSR', href: '/tin-tuc-hoat-dong/hoat-dong-csr' },
    ],
  },
  { title: 'Tuyển dụng', href: '/tuyen-dung' },
  { title: 'Case Studies', href: '/case-studies' },
  { title: 'Liên hệ', href: '/lien-he' },
]
