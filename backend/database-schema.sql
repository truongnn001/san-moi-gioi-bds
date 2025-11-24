-- ===================================================
-- DATABASE SCHEMA FOR INLAND REAL ESTATE SYSTEM
-- PostgreSQL Schema for Properties (BĐS) and Industrial Parks (KCN)
-- ===================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================================================
-- TABLE: properties (Bất động sản)
-- ===================================================
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,                    -- Mã sản phẩm (INL-BDS-001)
    name VARCHAR(255) NOT NULL,                          -- Tên BĐS
    slug VARCHAR(255) UNIQUE NOT NULL,                   -- URL slug
    
    -- Location
    province VARCHAR(100) NOT NULL,                      -- Tỉnh/Thành phố
    district VARCHAR(100),                               -- Quận/Huyện
    ward VARCHAR(100),                                   -- Phường/Xã
    street VARCHAR(255),                                 -- Đường
    address TEXT,                                        -- Địa chỉ đầy đủ
    latitude DECIMAL(10, 8),                             -- Tọa độ GPS
    longitude DECIMAL(11, 8),
    
    -- Property details
    type VARCHAR(50) NOT NULL,                           -- Loại hình: nha-pho, can-ho, dat-nen, biet-thu, shophouse
    category VARCHAR(50),                                -- Phân loại phụ
    status VARCHAR(50) DEFAULT 'available',              -- Tình trạng: available, sold, reserved
    legal_status VARCHAR(100),                           -- Pháp lý: so-hong-rieng, so-do, dang-lam-so
    
    -- Dimensions
    area DECIMAL(10, 2) NOT NULL,                        -- Diện tích (m²)
    land_area DECIMAL(10, 2),                            -- Diện tích đất
    construction_area DECIMAL(10, 2),                    -- Diện tích xây dựng
    width DECIMAL(8, 2),                                 -- Mặt tiền (m)
    length DECIMAL(8, 2),                                -- Chiều dài (m)
    
    -- Structure
    bedrooms INTEGER,                                    -- Số phòng ngủ
    bathrooms INTEGER,                                   -- Số phòng tắm
    floors INTEGER,                                      -- Số tầng
    orientation VARCHAR(50),                             -- Hướng: dong, tay, nam, bac, dong-nam, etc.
    
    -- Pricing
    price DECIMAL(15, 2) NOT NULL,                       -- Giá (VND)
    price_per_sqm DECIMAL(15, 2),                        -- Giá/m²
    negotiable BOOLEAN DEFAULT false,                    -- Có thể thương lượng
    
    -- Features
    furniture VARCHAR(50),                               -- Nội thất: full, basic, empty
    description TEXT,                                    -- Mô tả ngắn
    description_full TEXT,                               -- Mô tả chi tiết
    
    -- Media
    thumbnail_url TEXT,                                  -- Ảnh đại diện
    video_url TEXT,                                      -- Link video YouTube/Vimeo
    
    -- Contact
    contact_name VARCHAR(255),                           -- Người liên hệ
    contact_phone VARCHAR(20),                           -- SĐT
    contact_email VARCHAR(255),                          -- Email
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP,
    
    -- Indexing for search
    search_vector TSVECTOR
);

-- Indexes for properties
CREATE INDEX idx_properties_province ON properties(province);
CREATE INDEX idx_properties_district ON properties(district);
CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_area ON properties(area);
CREATE INDEX idx_properties_slug ON properties(slug);
CREATE INDEX idx_properties_search ON properties USING GIN(search_vector);

-- ===================================================
-- TABLE: property_images (Hình ảnh BĐS)
-- ===================================================
CREATE TABLE property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    url TEXT NOT NULL,                                   -- URL ảnh
    caption VARCHAR(255),                                -- Chú thích
    display_order INTEGER DEFAULT 0,                     -- Thứ tự hiển thị
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_property_images_property_id ON property_images(property_id);

-- ===================================================
-- TABLE: property_amenities (Tiện ích BĐS)
-- ===================================================
CREATE TABLE property_amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    amenity VARCHAR(100) NOT NULL,                       -- Tiện ích: ho-boi, gym, cong-vien, cho-do-xe, an-ninh-24-7, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(property_id, amenity)
);

CREATE INDEX idx_property_amenities_property_id ON property_amenities(property_id);
CREATE INDEX idx_property_amenities_amenity ON property_amenities(amenity);

-- ===================================================
-- TABLE: property_documents (Tài liệu BĐS)
-- ===================================================
CREATE TABLE property_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,                          -- Tên tài liệu
    type VARCHAR(50),                                    -- Loại: pdf, doc, image
    url TEXT NOT NULL,                                   -- URL tài liệu
    file_size BIGINT,                                    -- Kích thước (bytes)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_property_documents_property_id ON property_documents(property_id);

-- ===================================================
-- TABLE: industrial_parks (Khu công nghiệp)
-- ===================================================
CREATE TABLE industrial_parks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,                    -- Mã KCN (INL-KCN-001)
    name VARCHAR(255) NOT NULL,                          -- Tên KCN
    slug VARCHAR(255) UNIQUE NOT NULL,                   -- URL slug
    
    -- Location
    province VARCHAR(100) NOT NULL,                      -- Tỉnh/Thành phố
    district VARCHAR(100),                               -- Quận/Huyện
    address TEXT,                                        -- Địa chỉ đầy đủ
    latitude DECIMAL(10, 8),                             -- Tọa độ GPS
    longitude DECIMAL(11, 8),
    
    -- Park details
    total_area DECIMAL(12, 2) NOT NULL,                  -- Tổng diện tích (ha)
    available_area DECIMAL(12, 2),                       -- Diện tích còn trống (ha)
    occupancy_rate DECIMAL(5, 2),                        -- Tỷ lệ lấp đầy (%)
    
    -- Infrastructure
    infrastructure_power BOOLEAN DEFAULT false,          -- Điện
    infrastructure_water BOOLEAN DEFAULT false,          -- Nước
    infrastructure_drainage BOOLEAN DEFAULT false,       -- Thoát nước
    infrastructure_waste BOOLEAN DEFAULT false,          -- Xử lý chất thải
    infrastructure_internet BOOLEAN DEFAULT false,       -- Internet
    infrastructure_road BOOLEAN DEFAULT false,           -- Đường nội bộ
    infrastructure_security BOOLEAN DEFAULT false,       -- An ninh 24/7
    
    -- Pricing
    rental_price_min DECIMAL(15, 2),                     -- Giá thuê từ (VND/m²/tháng)
    rental_price_max DECIMAL(15, 2),                     -- Giá thuê đến
    land_price DECIMAL(15, 2),                           -- Giá đất (nếu bán)
    
    -- Industries allowed
    allowed_industries TEXT[],                           -- Ngành nghề được phép: ['dien-tu', 'may-mac', 'co-khi']
    
    -- Features
    description TEXT,                                    -- Mô tả ngắn
    description_full TEXT,                               -- Mô tả chi tiết
    advantages TEXT,                                     -- Ưu điểm nổi bật
    
    -- Media
    thumbnail_url TEXT,                                  -- Ảnh đại diện
    video_url TEXT,                                      -- Link video
    
    -- Contact
    contact_name VARCHAR(255),                           -- Người liên hệ
    contact_phone VARCHAR(20),                           -- SĐT
    contact_email VARCHAR(255),                          -- Email
    website_url TEXT,                                    -- Website KCN
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP,
    
    -- Indexing
    search_vector TSVECTOR
);

-- Indexes for industrial_parks
CREATE INDEX idx_industrial_parks_province ON industrial_parks(province);
CREATE INDEX idx_industrial_parks_slug ON industrial_parks(slug);
CREATE INDEX idx_industrial_parks_search ON industrial_parks USING GIN(search_vector);
CREATE INDEX idx_industrial_parks_allowed_industries ON industrial_parks USING GIN(allowed_industries);

-- ===================================================
-- TABLE: industrial_park_images (Hình ảnh KCN)
-- ===================================================
CREATE TABLE industrial_park_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    park_id UUID NOT NULL REFERENCES industrial_parks(id) ON DELETE CASCADE,
    url TEXT NOT NULL,                                   -- URL ảnh
    caption VARCHAR(255),                                -- Chú thích
    display_order INTEGER DEFAULT 0,                     -- Thứ tự hiển thị
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_industrial_park_images_park_id ON industrial_park_images(park_id);

-- ===================================================
-- TABLE: industrial_park_tenants (Doanh nghiệp trong KCN)
-- ===================================================
CREATE TABLE industrial_park_tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    park_id UUID NOT NULL REFERENCES industrial_parks(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,                  -- Tên doanh nghiệp
    industry VARCHAR(100),                               -- Ngành nghề
    logo_url TEXT,                                       -- Logo
    website TEXT,                                        -- Website
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_industrial_park_tenants_park_id ON industrial_park_tenants(park_id);

-- ===================================================
-- TABLE: leads (Khách hàng tiềm năng)
-- ===================================================
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    message TEXT,
    source VARCHAR(50),                                  -- homepage, property, industrial_park, contact
    reference_id UUID,                                   -- ID của property hoặc park
    reference_type VARCHAR(50),                          -- property hoặc industrial_park
    status VARCHAR(50) DEFAULT 'new',                    -- new, contacted, qualified, closed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_reference ON leads(reference_type, reference_id);

-- ===================================================
-- FUNCTIONS: Auto-update timestamps
-- ===================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_industrial_parks_updated_at BEFORE UPDATE ON industrial_parks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===================================================
-- FUNCTIONS: Full-text search vector update
-- ===================================================
CREATE OR REPLACE FUNCTION update_property_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('simple', coalesce(NEW.name, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(NEW.code, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(NEW.province, '')), 'B') ||
        setweight(to_tsvector('simple', coalesce(NEW.district, '')), 'B') ||
        setweight(to_tsvector('simple', coalesce(NEW.description, '')), 'C');
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_search BEFORE INSERT OR UPDATE ON properties
    FOR EACH ROW EXECUTE FUNCTION update_property_search_vector();

CREATE OR REPLACE FUNCTION update_industrial_park_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('simple', coalesce(NEW.name, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(NEW.code, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(NEW.province, '')), 'B') ||
        setweight(to_tsvector('simple', coalesce(NEW.description, '')), 'C');
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_industrial_parks_search BEFORE INSERT OR UPDATE ON industrial_parks
    FOR EACH ROW EXECUTE FUNCTION update_industrial_park_search_vector();

-- ===================================================
-- SAMPLE DATA: Properties
-- ===================================================
INSERT INTO properties (code, name, slug, province, district, type, area, price, status, legal_status, bedrooms, bathrooms, floors, orientation, furniture, description, thumbnail_url)
VALUES
('INL-BDS-001', 'Nhà phố cao cấp Quận 7', 'nha-pho-cao-cap-quan-7', 'TP.HCM', 'Quận 7', 'nha-pho', 120.00, 4800000000, 'available', 'so-hong-rieng', 4, 3, 3, 'dong', 'full', 'Nhà phố 1 trệt 2 lầu, thiết kế hiện đại, nội thất cao cấp', 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200'),
('INL-BDS-002', 'Căn hộ Skyline Riverside', 'can-ho-skyline-riverside', 'TP.HCM', 'Bình Thạnh', 'can-ho', 72.00, 2200000000, 'available', 'so-hong-rieng', 2, 2, 1, 'nam', 'basic', 'Căn hộ 2PN view sông, tiện ích 5 sao', 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200'),
('INL-BDS-003', 'Biệt thự Phú Mỹ Hưng', 'biet-thu-phu-my-hung', 'TP.HCM', 'Quận 7', 'biet-thu', 250.00, 12500000000, 'available', 'so-hong-rieng', 5, 4, 2, 'dong-nam', 'full', 'Biệt thự đơn lập, sân vườn rộng, hồ bơi riêng', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200');

-- ===================================================
-- SAMPLE DATA: Industrial Parks
-- ===================================================
INSERT INTO industrial_parks (code, name, slug, province, total_area, available_area, rental_price_min, rental_price_max, infrastructure_power, infrastructure_water, infrastructure_drainage, infrastructure_internet, infrastructure_security, description, thumbnail_url, allowed_industries)
VALUES
('INL-KCN-001', 'KCN Tân Bình', 'kcn-tan-binh', 'TP.HCM', 500.00, 120.00, 80000, 150000, true, true, true, true, true, 'KCN hiện đại, hạ tầng hoàn chỉnh, gần cảng biển', 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=1200', ARRAY['dien-tu', 'co-khi', 'hoa-chat']),
('INL-KCN-002', 'KCN Long Thành', 'kcn-long-thanh', 'Đồng Nai', 1200.00, 450.00, 70000, 120000, true, true, true, true, true, 'KCN quy mô lớn, gần sân bay Long Thành', 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1200', ARRAY['may-mac', 'co-khi', 'nong-san']);

-- ===================================================
-- END OF SCHEMA
-- ===================================================
