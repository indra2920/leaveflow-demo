# 📊 LeaveFlow - Master Data Management Guide

## 🎯 **Overview**

Master Data Management adalah fitur administrator untuk mengelola data dasar sistem LeaveFlow, meliputi:
- **Wilayah Kerja** (Regions)
- **Lokasi Kerja** (Work Locations) 
- **Jabatan** (Positions)

---

## 🔐 **Akses Administrator**

### **Login Credentials:**
```
Email: admin@company.com
Password: password123
Access Level: Administrator (Level 5)
```

### **Cara Akses:**
1. Login sebagai administrator
2. Klik menu **"Master Data"** di navigation bar
3. Atau klik tombol **"Master Data"** di Quick Actions dashboard

---

## 🗺️ **1. WILAYAH KERJA (REGIONS)**

### **Fungsi:**
- Mengelompokkan lokasi kerja berdasarkan wilayah geografis
- Dasar untuk organisasi struktur perusahaan multi-lokasi

### **Fitur CRUD:**

#### **📋 View Regions**
- Tampilkan semua wilayah kerja
- Informasi: ID, Nama, Kode, Jumlah Lokasi, Tanggal Dibuat
- Sorting dan filtering otomatis

#### **➕ Create Region**
```javascript
// API Endpoint
POST /api/admin/regions

// Data Required
{
  "name": "Jakarta",        // Required: Nama wilayah
  "code": "JKT"            // Required: Kode unik (max 10 karakter)
}
```

#### **✏️ Update Region**
```javascript
// API Endpoint
PUT /api/admin/regions/:id

// Data Required
{
  "name": "Jakarta Raya",   // Updated name
  "code": "JKT"            // Updated code
}
```

#### **🗑️ Delete Region**
- **Validasi**: Tidak dapat dihapus jika masih memiliki lokasi kerja
- **Konfirmasi**: Double confirmation untuk keamanan
- **API**: `DELETE /api/admin/regions/:id`

### **Validasi:**
- ✅ Nama wilayah wajib diisi
- ✅ Kode wilayah wajib diisi dan unik
- ✅ Kode maksimal 10 karakter
- ✅ Tidak dapat dihapus jika masih digunakan

---

## 🏢 **2. LOKASI KERJA (WORK LOCATIONS)**

### **Fungsi:**
- Mengelola lokasi fisik tempat karyawan bekerja
- Terhubung dengan wilayah kerja
- Dasar untuk penempatan karyawan

### **Fitur CRUD:**

#### **📋 View Work Locations**
- Tampilkan semua lokasi kerja dengan informasi wilayah
- Informasi: ID, Nama, Alamat, Wilayah, Jumlah Karyawan, Tanggal Dibuat
- Join dengan tabel regions untuk menampilkan nama wilayah

#### **➕ Create Work Location**
```javascript
// API Endpoint
POST /api/admin/work-locations

// Data Required
{
  "name": "Kantor Pusat Jakarta",           // Required: Nama lokasi
  "address": "Jl. Sudirman No. 1, Jakarta", // Optional: Alamat lengkap
  "region_id": 1                            // Required: ID wilayah
}
```

#### **✏️ Update Work Location**
```javascript
// API Endpoint
PUT /api/admin/work-locations/:id

// Data Required
{
  "name": "Kantor Pusat Jakarta - Updated",
  "address": "Jl. Sudirman No. 1, Jakarta Pusat",
  "region_id": 1
}
```

#### **🗑️ Delete Work Location**
- **Validasi**: Tidak dapat dihapus jika masih memiliki karyawan
- **Konfirmasi**: Double confirmation untuk keamanan
- **API**: `DELETE /api/admin/work-locations/:id`

### **Validasi:**
- ✅ Nama lokasi wajib diisi
- ✅ Wilayah wajib dipilih dan harus valid
- ✅ Alamat opsional
- ✅ Tidak dapat dihapus jika masih digunakan karyawan

---

## 👔 **3. JABATAN (POSITIONS)**

### **Fungsi:**
- Mengelola struktur jabatan dalam organisasi
- Menentukan hierarki approval untuk pengajuan cuti
- Dasar untuk sistem approval berjenjang

### **Fitur CRUD:**

#### **📋 View Positions**
- Tampilkan semua jabatan dengan level dan approval level
- Informasi: ID, Nama, Level, Level Approval, Jumlah Karyawan, Tanggal Dibuat
- Sorting berdasarkan level jabatan

#### **➕ Create Position**
```javascript
// API Endpoint
POST /api/admin/positions

// Data Required
{
  "name": "Senior Manager",    // Required: Nama jabatan
  "level": 3,                 // Required: Level jabatan (1-5)
  "approval_level": 3         // Required: Level approval (1-5)
}
```

#### **✏️ Update Position**
```javascript
// API Endpoint
PUT /api/admin/positions/:id

// Data Required
{
  "name": "Senior Manager - Updated",
  "level": 3,
  "approval_level": 3
}
```

#### **🗑️ Delete Position**
- **Validasi**: Tidak dapat dihapus jika masih digunakan karyawan
- **Konfirmasi**: Double confirmation untuk keamanan
- **API**: `DELETE /api/admin/positions/:id`

### **Level System:**
```
Level 1: Staff          - Approval Level 1
Level 2: Supervisor     - Approval Level 2  
Level 3: Manager        - Approval Level 3
Level 4: Director       - Approval Level 4
Level 5: Administrator  - Approval Level 5 (Full Access)
```

### **Validasi:**
- ✅ Nama jabatan wajib diisi
- ✅ Level jabatan wajib diisi (1-5)
- ✅ Level approval wajib diisi (1-5)
- ✅ Level harus berupa angka
- ✅ Tidak dapat dihapus jika masih digunakan karyawan

---

## 🔗 **Relasi Data**

### **Database Schema:**
```sql
regions (1) -----> (many) work_locations
work_locations (1) -----> (many) employees
positions (1) -----> (many) employees
```

### **Dependency Chain:**
1. **Regions** → Work Locations → Employees
2. **Positions** → Employees
3. **Employees** → Leave Requests → Approvals

### **Cascade Rules:**
- ❌ **Cannot delete Region** if has Work Locations
- ❌ **Cannot delete Work Location** if has Employees  
- ❌ **Cannot delete Position** if has Employees
- ✅ **Can update** any master data (with validation)

---

## 🚀 **API Endpoints**

### **Regions:**
```javascript
GET    /api/admin/regions           // Get all regions
GET    /api/admin/regions/:id       // Get single region
POST   /api/admin/regions           // Create region
PUT    /api/admin/regions/:id       // Update region
DELETE /api/admin/regions/:id       // Delete region
```

### **Work Locations:**
```javascript
GET    /api/admin/work-locations           // Get all locations
GET    /api/admin/work-locations/:id       // Get single location
POST   /api/admin/work-locations           // Create location
PUT    /api/admin/work-locations/:id       // Update location
DELETE /api/admin/work-locations/:id       // Delete location
```

### **Positions:**
```javascript
GET    /api/admin/positions           // Get all positions
GET    /api/admin/positions/:id       // Get single position
POST   /api/admin/positions           // Create position
PUT    /api/admin/positions/:id       // Update position
DELETE /api/admin/positions/:id       // Delete position
```

### **Summary:**
```javascript
GET    /api/admin/master-data/summary  // Get master data summary
```

---

## 🎨 **User Interface**

### **Modern Design Features:**
- ✅ **Tabbed Interface** - Easy navigation between master data types
- ✅ **Responsive Tables** - Mobile-friendly data display
- ✅ **Modal Forms** - Clean add/edit experience
- ✅ **Action Buttons** - Quick edit/delete actions
- ✅ **Status Badges** - Visual status indicators
- ✅ **Confirmation Dialogs** - Safe delete operations
- ✅ **Toast Notifications** - Success/error feedback
- ✅ **Loading States** - Better user experience

### **Color Coding:**
- 🔵 **Primary** - Region codes and main actions
- 🟢 **Success** - Employee counts and success states
- 🟡 **Warning** - Edit actions and warnings
- 🔴 **Danger** - Delete actions and errors
- ⚫ **Secondary** - Position levels
- 🟣 **Info** - Approval levels and information

---

## 📱 **Mobile Responsiveness**

### **Responsive Features:**
- ✅ **Mobile-first Design** - Optimized for mobile devices
- ✅ **Touch-friendly Buttons** - Large touch targets
- ✅ **Responsive Tables** - Horizontal scroll on mobile
- ✅ **Collapsible Navigation** - Mobile navigation menu
- ✅ **Adaptive Modals** - Full-screen modals on mobile
- ✅ **Optimized Forms** - Mobile-friendly form inputs

---

## 🔒 **Security Features**

### **Access Control:**
- ✅ **Administrator Only** - Requires admin role (Level 5)
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Role Validation** - Server-side role checking
- ✅ **Input Sanitization** - All inputs validated and sanitized

### **Data Integrity:**
- ✅ **Foreign Key Constraints** - Database-level integrity
- ✅ **Cascade Validation** - Prevent orphaned records
- ✅ **Unique Constraints** - Prevent duplicate codes
- ✅ **Required Field Validation** - Ensure data completeness

---

## 📊 **Sample Data**

### **Default Regions:**
```javascript
[
  {id: 1, name: 'Jakarta', code: 'JKT'},
  {id: 2, name: 'Bandung', code: 'BDG'},
  {id: 3, name: 'Surabaya', code: 'SBY'},
  {id: 4, name: 'Medan', code: 'MDN'}
]
```

### **Default Work Locations:**
```javascript
[
  {id: 1, name: 'Kantor Pusat Jakarta', region_id: 1},
  {id: 2, name: 'Cabang Jakarta Selatan', region_id: 1},
  {id: 3, name: 'Cabang Jakarta Utara', region_id: 1},
  {id: 4, name: 'Cabang Bandung', region_id: 2},
  {id: 5, name: 'Cabang Bandung Timur', region_id: 2},
  {id: 6, name: 'Cabang Surabaya', region_id: 3},
  {id: 7, name: 'Cabang Surabaya Barat', region_id: 3},
  {id: 8, name: 'Cabang Medan', region_id: 4}
]
```

### **Default Positions:**
```javascript
[
  {id: 1, name: 'Staff', level: 1, approval_level: 1},
  {id: 2, name: 'Supervisor', level: 2, approval_level: 2},
  {id: 3, name: 'Manager', level: 3, approval_level: 3},
  {id: 4, name: 'Director', level: 4, approval_level: 4},
  {id: 5, name: 'Administrator', level: 5, approval_level: 5}
]
```

---

## 🧪 **Testing**

### **Manual Testing:**
1. **Login** sebagai administrator
2. **Navigate** ke Master Data page
3. **Test CRUD** operations untuk setiap master data type
4. **Validate** error handling dan confirmations
5. **Check** responsive design pada berbagai device

### **API Testing:**
- Gunakan file `test-api.http` untuk testing API endpoints
- Test semua CRUD operations
- Test validation rules
- Test error scenarios

### **Test Scenarios:**
```javascript
// Positive Tests
✅ Create valid master data
✅ Update existing master data
✅ Delete unused master data
✅ View all master data

// Negative Tests
❌ Create with missing required fields
❌ Create with duplicate codes
❌ Delete master data in use
❌ Access without admin role
```

---

## 🔧 **Troubleshooting**

### **Common Issues:**

#### **1. Cannot Delete Master Data**
```
Error: "Cannot delete region. It is being used by work locations."
Solution: Delete or reassign dependent records first
```

#### **2. Duplicate Code Error**
```
Error: "Region code already exists"
Solution: Use unique code for each region
```

#### **3. Invalid Region Selected**
```
Error: "Invalid region selected"
Solution: Select valid region from dropdown
```

#### **4. Access Denied**
```
Error: "Access denied. Administrator role required."
Solution: Login with administrator account
```

### **Debug Steps:**
1. Check browser console for JavaScript errors
2. Verify JWT token is valid
3. Check network tab for API response errors
4. Validate input data format
5. Check database constraints

---

## 📈 **Future Enhancements**

### **Planned Features:**
- [ ] **Bulk Operations** - Import/export master data via CSV
- [ ] **Audit Trail** - Track all master data changes
- [ ] **Data Validation Rules** - Custom validation rules
- [ ] **Master Data Templates** - Predefined templates
- [ ] **Advanced Search** - Search and filter capabilities
- [ ] **Data Relationships** - Visual relationship mapping

### **Integration Possibilities:**
- [ ] **HR System Integration** - Sync with external HR systems
- [ ] **Geographic API** - Auto-complete addresses
- [ ] **Organizational Chart** - Visual org chart based on positions
- [ ] **Reporting Dashboard** - Master data analytics

---

## 📞 **Support**

### **Documentation:**
- **README.md** - Basic setup guide
- **ADMIN-FEATURES-COMPLETE.md** - Complete admin features
- **DEPLOYMENT-GUIDE.md** - Production deployment guide

### **Demo Files:**
- **demo-admin-masterdata.html** - Master data management demo
- **demo-admin-full.html** - Complete admin dashboard
- **test-api.http** - API testing collection

### **Contact:**
- **GitHub Issues** - Report bugs and feature requests
- **Documentation** - Complete guides available
- **API Reference** - Detailed API documentation

---

## 🎉 **Summary**

Master Data Management di LeaveFlow menyediakan:

### ✅ **Complete CRUD Operations**
- Create, Read, Update, Delete untuk semua master data
- Validation dan error handling lengkap
- Responsive dan user-friendly interface

### ✅ **Data Integrity**
- Foreign key constraints
- Cascade validation
- Referential integrity checks

### ✅ **Security & Access Control**
- Administrator-only access
- JWT authentication
- Role-based permissions

### ✅ **Modern UI/UX**
- Tabbed interface
- Modal forms
- Responsive design
- Toast notifications

### ✅ **API-Ready**
- RESTful API endpoints
- JSON data format
- Comprehensive error handling

**Master Data Management sekarang siap digunakan untuk mengelola data dasar sistem LeaveFlow! 🚀✨**