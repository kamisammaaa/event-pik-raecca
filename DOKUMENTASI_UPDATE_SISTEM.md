# DOKUMENTASI UPDATE SISTEM (RELEASE NOTES & CHANGELOG)
**Sistem Aplikasi POS & Live Reporting Booth Raecca – Pop-Up Store PIK**  
*Versi Rilis: v2.0.0-Enterprise (Full 5-Pillar Optimization)*  
*Tanggal Rilis: 05 Oktober 2026*  
*Repository GitHub: [https://github.com/kamisammaaa/event-pik-raecca](https://github.com/kamisammaaa/event-pik-raecca)*

---

## 1. Ringkasan Eksekutif Pembaruan
Dokumentasi ini mencatat pembaruan menyeluruh sistem Point of Sales (POS) dan ekosistem pelaporan harian booth Raecca di Curved Counter L, Pantai Indah Kapuk (PIK). Pembaruan versi **v2.0.0-Enterprise** mengimplementasikan seluruh rekomendasi profesional mencakup aspek keandalan offline (*offline-first resilience*), pencegahan kecurangan finansial (*anti-fraud*), integrasi periferal hardware kasir, otomatisasi pelaporan WhatsApp, serta kecerdasan penjualan (*sales booster*).

---

## 2. Rincian Pembaruan Berdasarkan 5 Pilar Strategis

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        MATRIKS FITUR UPDATE SISTEM V2.0.0                              │
├───────────────────────┬──────────────────────────────────┬─────────────────────────────┤
│ PILAR OPTIMALISASI    │ FITUR BARU                       │ STATUS & DAMPAK             │
├───────────────────────┼──────────────────────────────────┼─────────────────────────────┤
│ 1. Hardware & Layar   │ • Customer-Facing Display        │ 🟢 100% Aktif & Sinkron     │
│                       │ • Global USB Barcode Buffer      │ 🟢 Auto-Scan <80ms          │
│                       │ • Direct ESC/POS Print & RJ-11   │ 🟢 Pulsa Buka Laci Kasir    │
├───────────────────────┼──────────────────────────────────┼─────────────────────────────┤
│ 2. Offline Resilience │ • PWA Standalone Kiosk Mode      │ 🟢 Installable Desktop      │
│                       │ • Service Worker Cache (sw.js)   │ 🟢 Zero-Internet Load       │
│                       │ • IndexedDB Engine (>50 MB)      │ 🟢 Anti Crash / Drop        │
├───────────────────────┼──────────────────────────────────┼─────────────────────────────┤
│ 3. Fraud Prevention   │ • Blind Shift Closing            │ 🟢 Hitung Kas Buta          │
│                       │ • Rekonsiliasi Otomatis Kasir    │ 🟢 Status Balanced/Variance │
│                       │ • Dynamic QRIS Auto-Webhook      │ 🟢 Verifikasi Otomatis      │
│                       │ • Supervisor PIN for Void/Retur  │ 🟢 Audit Log Digital        │
├───────────────────────┼──────────────────────────────────┼─────────────────────────────┤
│ 4. Otomasi Pelaporan  │ • Direct WhatsApp API Dispatch   │ 🟢 1-Klik Kirim Grup WA     │
│                       │ • Real-time CSV / Excel Export   │ 🟢 Detail Transaksi         │
│                       │ • Lembar EOD PDF Siap Cetak      │ 🟢 Tanda Tangan Fisik       │
├───────────────────────┼──────────────────────────────────┼─────────────────────────────┤
│ 5. Sales Booster & CRM│ • Smart Upselling Kasir          │ 🟢 1-Klik Upgrade Bundle    │
│                       │ • WhatsApp CRM Pembeli           │ 🟢 Database e-Receipt       │
│                       │ • Predictive Stock Depletion     │ 🟢 AI Burn Rate Velocity    │
└───────────────────────┴──────────────────────────────────┴─────────────────────────────┘
```

---

### PILAR 1: Hardware Layer & Integrasi Periferal
1. **Layar Ganda Pelanggan (*Customer-Facing Display*)**:
   - Ditambahkan tombol `🖥️ Layar Pembeli` pada header atas.
   - Layar sekunder menghadap pelanggan menampilkan produk yang sedang discan kasir secara langsung (*live itemized cart*), info penghematan diskon, ucapan selamat datang, serta QRIS pembayaran ukuran besar.
2. **Global Hardware USB Barcode Scanner Listener**:
   - Implementasi pendeteksi ketukan cepat keyboard (*keystroke buffer threshold* <80ms) yang membaca scanner barcode USB secara global.
   - Kasir dapat menembak barcode produk kapan saja **tanpa harus memindahkan kursor atau mengklik kotak pencarian**.
3. **Simulasi Direct ESC/POS Silent Print & Cash Drawer Kick**:
   - Ditambahkan tombol `⚡ Direct ESC/POS Silent Print (<0.4s)`.
   - Mengirim aliran biner langsung ke printer thermal USB (memangkas waktu dialog browser) dan memicu pulsa biner `ESC p 0 25 250` pada port RJ-11 untuk membuka laci kasir uang tunai (*cash drawer*) secara otomatis.

---

### PILAR 2: Arsitektur Data & Keandalan Offline (*Offline-First*)
1. **PWA Standalone Kiosk Mode (`public/manifest.webmanifest`)**:
   - Sistem kini mendukung instalasi sebagai aplikasi desktop Windows (*Install PWA*), berjalan dalam mode *standalone window* tanpa address bar browser, bookmark bar, atau tab navigasi.
2. **Service Worker Offline Caching (`public/sw.js`)**:
   - Menggunakan strategi *Stale-While-Revalidate* dan *Cache-First* untuk seluruh aset inti (`index.html`, `index.css`, logo, font, dan script).
   - Jika laptop kasir di-*restart* saat router PIK mati/drop total, aplikasi tetap dapat dibuka instan 100% tanpa layar putih (*offline-first*).
3. **IndexedDB Engine (`RaeccaPOS_DB`)**:
   - Migrasi penyimpanan data lokal dari `localStorage` (terbatas 5 MB) ke database lokal **IndexedDB** berkapasitas besar (>50 MB).
   - Menyimpan seluruh transaksi lokal secara asynchronous dan tahan terhadap gangguan listrik mati mendadak.

---

### PILAR 3: Pencegahan Kecurangan Finansial (*Anti-Fraud & Audit*)
1. **Protokol Blind Shift Closing (Penutupan Kasir Buta)**:
   - Tombol `🔒 Blind Shift Closing` di kanan atas header.
   - **SOP Anti-Fraud:** Kasir wajib menghitung dan menginput lembaran uang tunai fisik di laci per pecahan (Rp 100k, 50k, 20k, 10k, 5k, 2k, koin) serta modal awal (*petty cash*) **tanpa melihat angka omzet sistem terlebih dahulu**.
   - Sistem kemudian membandingkan uang fisik bersih dengan total transaksi tunai POS:
     - Jika selisih Rp 0: `BALANCED (100% Sesuai) ✅`.
     - Jika kurang: `SHORTAGE (Fisik Kurang) ❌` dan wajib mencetak Berita Acara.
     - Jika lebih: `OVERAGE (Fisik Lebih) ⚠️`.
2. **Dynamic QRIS Auto-Verification (Webhook Simulator)**:
   - Menghilangkan celah kasir ditekan manual pada struk palsu.
   - Dilengkapi tombol simulasi `⚡ Simulasi Pembeli Bayar (Auto Webhook Gateway)`. Ketika pembeli menyelesaikan transaksi di aplikasi mobile banking, sistem gateway otomatis mengirim sinyal Webhook (HTTP 200 OK) dan mengubah status kasir menjadi *"PAID"* tanpa kasir perlu klik manual.
3. **Supervisor PIN Authorization**:
   - Pembatalan transaksi (Void/Retur) terkunci di bawah otentikasi PIN Supervisor (*default pengujian:* `1234`), mewajibkan penarikan struk fisik asli dan pencatatan alasan di buku register logbook digital.

---

### PILAR 4: Otomatisasi Distribusi Pelaporan Harian
1. **Direct Zero-Click WhatsApp API Dispatch**:
   - Pada panel `📋 Daily Closing` > tab **Format WhatsApp**, ditambahkan tombol `📲 Buka & Kirim ke WhatsApp (Zero-Click)`.
   - Menggunakan tautan protokol WhatsApp API (`https://api.whatsapp.com/send?text=...`) yang otomatis membuka WhatsApp Web/Aplikasi dengan pesan rekapitulasi harian lengkap yang sudah terformat rapi.
2. **Ekspor Data Spreadsheet & PDF**:
   - Ekspor 1-klik format file **CSV / Excel** memuat rincian nota baris demi baris, item terjual, metode bayar, dan status transaksi.
   - Lembar serah terima closing harian siap cetak format PDF untuk arsip audit fisik booth.

---

### PILAR 5: Sales Booster & CRM Pembeli
1. **Smart Upselling Engine Kasir**:
   - Memantau isi keranjang belanja secara *real-time*.
   - Saat item *hero* seperti *Raecca Lippie Serum* dimasukkan, kotak saran kasir muncul di atas keranjang:
     > *"💡 REKOMENDASI UPSELL: Tawarkan Bundling Duo Lippie Hero (Tambah Rp 50.000 hemat Rp 15.000)!"*
   - Kasir dapat mengeklik tombol `Upgrade ke Bundle` untuk otomatis menukar item ke bundling hemat dengan 1-klik.
2. **Customer WhatsApp Data Capture**:
   - Kolom nomor telepon WhatsApp pembeli tersemat langsung di keranjang transaksi kasir.
   - Menyimpan data kontak pembeli untuk kebutuhan pengiriman struk digital (*e-receipt*) dan pembentukan database loyalitas pelanggan Raecca selama 61 hari event.
3. **Predictive Stock Depletion (AI Burn Rate Forecast)**:
   - Tabel analisis prediktif di Dashboard Manajemen yang menghitung laju penjualan per jam (*burn rate velocity*).
   - Memberikan indikator estimasi sisa jam operasional sebelum barang habis:
     - `🔴 URGENT (< 2.5 Jam)`: Wajib request restock segera dari gudang booth.
     - `🟡 WARNING (< 5 Jam)`: Stok menipis.
     - `🟢 SAFE`: Stok dalam batas aman.

---

### PILAR 6: Perbaikan Tampilan Visual & Aset Brand
1. **Integrasi Logo Resmi Raecca (`images.png`)**:
   - Logo lingkaran pink pastel dengan tipografi geometric *raecca BEAUTY CARE* kini disematkan pada:
     - Header aplikasi (kiri atas)
     - Favicon tab browser
     - Kartu Standing QRIS digital
     - Struk thermal fisik 80mm
     - Layar ganda pembeli (*Customer-Facing Display*)
2. **Penguncian Dimensi Gambar (Anti Layout-Shift)**:
   - Seluruh tag `<img>` logo telah dikunci dengan atribut hardware eksplisit `width="44" height="44"` dan `object-fit: cover` sehingga tidak akan pernah melar atau membesar di luar rasio.
3. **Injeksi CSS via Module Bundler**:
   - Berkas `index.css` diinjeksi via `import '../index.css'` di `src/main.js` untuk memastikan kompatibilitas penuh dengan Vite dev server dan build production tanpa kendala *MIME-type blocking*.

---

## 3. Prosedur Operasional Standar (SOP) Lapangan

### SOP 1: Buka Shift Kasir (Pukul 09.30 WIB)
1. Nyalakan laptop kasir dan hubungkan ke router dedicated 4G/5G booth.
2. Buka aplikasi POS pada browser atau klik icon PWA Raecca di desktop.
3. Klik tombol `🖥️ Layar Pembeli` dan geser jendela tersebut ke monitor kedua yang menghadap pelanggan.
4. Periksa indikator status jaringan: pastikan berwarna hijau (*Dedicated 4G/5G Online*).
5. Masukkan uang kas modal awal (*Petty Cash Float* Rp 500.000) ke laci kasir.

### SOP 2: Pelayanan Transaksi Kasir
1. Scan barcode produk menggunakan scanner USB (produk langsung masuk ke keranjang tanpa perlu klik kursor).
2. Perhatikan banner `💡 REKOMENDASI UPSELL` di keranjang untuk menawarkan paket bundling hemat kepada pembeli.
3. Masukkan nomor WhatsApp pembeli pada kolom yang tersedia (opsional untuk e-receipt & CRM).
4. Klik **PROSES BAYAR**:
   - **QRIS:** Tunjukkan layar atau monitor pembeli, tunggu Webhook otomatis atau verifikasi manual struk transfer, lalu selesaikan transaksi.
   - **EDC:** Gesek kartu di mesin EDC rekanan, masukkan approval code, lalu konfirmasi.
   - **Cash:** Input nominal uang tunai, berikan kembalian, dan laci kasir akan terbuka otomatis.
5. Klik `⚡ Direct ESC/POS Silent Print` untuk mencetak struk secara cepat.

### SOP 3: Tutup Shift & Closing Malam (Pukul 22.00 WIB)
1. **Langkah 1 (Audit Kas Buta):** Klik `🔒 Blind Shift Closing`. Buka laci kasir, hitung lembar fisik uang tunai per pecahan (Rp 100k, 50k, 20k, dst.) lalu klik **Finalisasi Rekonsiliasi**.
2. **Langkah 2 (Cek Selisih):** Pastikan status rekonsiliasi kas adalah `BALANCED (Rp 0)`. Jika ada selisih, buat Berita Acara bersama Supervisor.
3. **Langkah 3 (Broadcast Laporan):** Buka tombol `📋 Daily Closing` > tab **Format WhatsApp**, lalu klik `📲 Buka & Kirim ke WhatsApp (Zero-Click)` untuk mengirimkan rekapitulasi harian ke WhatsApp Group Manajemen Raecca.
4. **Langkah 4 (Unduh Data):** Unduh file **CSV / Excel** dan simpan di folder backup harian.

---

## 4. Panduan Verifikasi & Testing
Untuk menjalankan dan memvalidasi sistem secara lokal:
```bash
# 1. Jalankan development server
npm run dev

# 2. Buka di browser
http://localhost:3000

# 3. Lakukan pengujian production build
npm run build
```

---
*Dokumen ini merupakan catatan pembaruan resmi sistem POS & Pelaporan Booth Raecca PIK yang diterbitkan oleh Tim IT Operasional.*
