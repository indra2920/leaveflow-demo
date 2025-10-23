# Panduan Penggunaan Aplikasi Pengajuan Libur/Offsite

## Persiapan

### 1. Install Node.js
- Download dan install Node.js dari https://nodejs.org/
- Pilih versi LTS (Long Term Support)
- Restart komputer setelah instalasi

### 2. Setup Aplikasi
- Double-click file `install.bat` untuk setup otomatis
- Atau jalankan manual:
  ```
  npm install
  node setup.js
  ```

### 3. Menjalankan Aplikasi
- Double-click file `start.bat`
- Atau jalankan manual: `npm start`
- Buka browser ke `http://localhost:3000`

## Cara Penggunaan

### Login
Gunakan salah satu akun demo:
- **Staff**: staff@company.com / password123
- **Supervisor**: supervisor@company.com / password123  
- **Manager**: manager@company.com / password123
- **Director**: director@company.com / password123
- **Admin**: admin@company.com / password123

### Membuat Pengajuan Baru
1. Login sebagai karyawan (contoh: staff@company.com)
2. Klik tab "Pengajuan Baru"
3. Pilih jenis: Cuti/Libur atau Offsite
4. Isi tanggal mulai dan selesai
5. Tulis alasan pengajuan
6. Klik "Ajukan"

### Melihat Status Pengajuan
1. Klik tab "Pengajuan Saya"
2. Lihat daftar semua pengajuan dengan status:
   - **Menunggu**: Sedang dalam proses approval
   - **Disetujui**: Sudah disetujui semua level
   - **Ditolak**: Ditolak oleh salah satu approver

### Melakukan Approval (Supervisor/Manager/Director)
1. Login sebagai supervisor/manager/director
2. Klik tab "Persetujuan"
3. Lihat daftar pengajuan yang menunggu approval
4. Klik "Setujui" atau "Tolak"
5. Masukkan komentar (opsional)

## Alur Approval

### Hierarki Organisasi
```
Director (Level 4)
    ↓
Manager (Level 3)
    ↓
Supervisor (Level 2)
    ↓
Staff (Level 1)
```

### Proses Approval
1. **Staff** mengajukan cuti → otomatis masuk ke **Supervisor**
2. **Supervisor** approve → masuk ke **Manager**
3. **Manager** approve → masuk ke **Director**
4. **Director** approve → **Pengajuan Disetujui**

Jika ada yang menolak di level manapun, pengajuan langsung **Ditolak**.

## Fitur Aplikasi

### Dashboard Karyawan
- Informasi profil (nama, ID, jabatan, lokasi)
- Daftar pengajuan pribadi
- Status real-time

### Form Pengajuan
- Validasi tanggal
- Perhitungan otomatis jumlah hari
- Jenis pengajuan: Cuti/Libur atau Offsite

### Sistem Approval
- Approval berjenjang otomatis
- Tracking status per level
- Komentar pada setiap approval
- Notifikasi untuk approver

### Laporan
- Riwayat pengajuan
- Status tracking
- Detail approval chain

## Troubleshooting

### Aplikasi tidak bisa dijalankan
- Pastikan Node.js sudah terinstall
- Jalankan `npm install` untuk install dependencies
- Cek apakah port 3000 sudah digunakan aplikasi lain

### Database error
- Hapus file `database/leave_requests.db`
- Jalankan ulang `node setup.js`

### Login gagal
- Pastikan menggunakan email dan password yang benar
- Cek kredensial demo di README.md

### Pengajuan tidak muncul
- Refresh halaman browser
- Logout dan login kembali
- Cek console browser untuk error

## Pengembangan Lanjutan

### Menambah Karyawan Baru
Edit file `setup.js` dan tambahkan data karyawan baru, lalu jalankan:
```
node setup.js
```

### Menambah Lokasi/Wilayah
Edit bagian sample data di `backend/config/initDb.js`

### Kustomisasi UI
Edit file `frontend/index.html` dan `frontend/js/app.js`

### API Integration
Gunakan endpoint API yang tersedia untuk integrasi dengan sistem lain

## Kontak Support

Jika ada pertanyaan atau masalah, silakan hubungi tim development.