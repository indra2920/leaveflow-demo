# Aplikasi Pengajuan Libur/Offsite

Aplikasi web untuk mengelola pengajuan cuti/libur dan offsite dengan sistem approval berjenjang.

## Fitur

### 1. Data Karyawan
- Manajemen data karyawan dengan hierarki organisasi
- Sistem login dan autentikasi
- Profil karyawan dengan jabatan dan lokasi kerja

### 2. Lokasi Kerja & Wilayah
- Manajemen lokasi kerja berdasarkan wilayah
- Struktur organisasi multi-lokasi

### 3. Jabatan & Hierarki
- Sistem jabatan dengan level approval
- Hierarki supervisor untuk approval berjenjang

### 4. Form Pengajuan
- Pengajuan cuti/libur
- Pengajuan offsite
- Validasi periode dan alasan

### 5. Sistem Approval Berjenjang
- Approval otomatis berdasarkan hierarki
- Status tracking real-time
- Komentar pada setiap level approval

### 6. Laporan & Status
- Dashboard pengajuan pribadi
- Status tracking pengajuan
- Riwayat approval

## Teknologi

- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5
- **Authentication**: JWT

## Instalasi

1. Clone atau download project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup database dan data sample:
   ```bash
   node setup.js
   ```

4. Jalankan aplikasi:
   ```bash
   npm start
   ```

5. Buka browser ke `http://localhost:3000`

## Login Demo

Gunakan kredensial berikut untuk testing:

- **Director**: director@company.com / password123
- **Manager**: manager@company.com / password123  
- **Supervisor**: supervisor@company.com / password123
- **Staff**: staff@company.com / password123
- **Admin**: admin@company.com / password123

## Struktur Database

### Tables:
- `regions` - Wilayah kerja
- `work_locations` - Lokasi kerja
- `positions` - Jabatan dengan level approval
- `employees` - Data karyawan dengan hierarki
- `leave_requests` - Pengajuan cuti/offsite
- `approvals` - Tracking approval berjenjang

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register (demo)

### Employees
- `GET /api/employees` - List karyawan
- `GET /api/employees/profile/me` - Profil user

### Leave Requests
- `GET /api/leave-requests/my-requests` - Pengajuan saya
- `POST /api/leave-requests` - Buat pengajuan baru
- `GET /api/leave-requests/pending-approvals` - Pengajuan menunggu approval
- `GET /api/leave-requests/:id` - Detail pengajuan

### Approvals
- `POST /api/approvals/:requestId/approve` - Approve/reject pengajuan

## Cara Kerja Approval

1. Karyawan mengajukan cuti/offsite
2. Sistem otomatis membuat approval chain berdasarkan hierarki supervisor
3. Setiap level supervisor mendapat notifikasi untuk approve
4. Approval berjalan secara berurutan dari level terendah ke tertinggi
5. Jika ada yang reject, pengajuan langsung ditolak
6. Jika semua approve, pengajuan disetujui

## Development

Untuk development dengan auto-reload:
```bash
npm run dev
```

## Struktur Project

```
leave-request-app/
├── backend/
│   ├── config/          # Database config
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   └── app.js          # Main server
├── frontend/
│   ├── js/             # Frontend JavaScript
│   └── index.html      # Main HTML
├── database/           # SQLite database
├── package.json
├── setup.js           # Database setup
└── README.md
```