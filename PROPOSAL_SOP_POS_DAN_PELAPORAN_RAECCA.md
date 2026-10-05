# BLUEPRINT SISTEM POS (POINT OF SALES) & STANDAR OPERASIONAL PROSEDUR (SOP) PELAPORAN TERINTEGRASI
**Proyek Booth Raecca – Pop-Up Store (Curved Counter L, PIK)**  
*Dokumen Otorisasi Teknis & Operasional Klien Raecca*

---

## 1. Executive Summary & Sasaran Sistem
Implementasi sistem Point of Sales (POS) dan ekosistem pelaporan harian pada booth Raecca dirancang dengan pendekatan **Zero Revenue Leakage**, **Real-Time Data Visibility**, dan **Strict Access Governance**. 

Sistem ini memastikan seluruh aktivitas transaksi selama 61 hari operasional (hingga penutupan 13 Januari 2027) terekam secara akurat, transparan, dapat diaudit kapan saja oleh Manajemen Raecca, dan terproteksi dari risiko gangguan teknis maupun kelalaian manusia di lapangan.

```
                    ┌────────────────────────────────────────────────────────┐
                    │            MANAJEMEN RAECCA (BACK-END)                 │
                    │  - Real-Time Live Dashboard via Mobile & Web           │
                    │  - Master Data & Price Control                         │
                    │  - Automated EOD Reports (WhatsApp & Email)            │
                    └───────────────────────────▲────────────────────────────┘
                                                │ Cloud Sync (Encrypted)
                                                ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        INFRASTRUKTUR BOOTH KASIR (FRONT-END)                           │
│                                                                                        │
│   ┌──────────────────────────┐    USB Wired      ┌─────────────────────────────────┐   │
│   │ Dedicated POS Terminal   ├──────────────────►│ Printer Thermal 80mm           │   │
│   │ (Laptop Kiosk Mode Win)  │                   │ (Struk Resmi Pelanggan)         │   │
│   └────────────▲─────────────┘                   └─────────────────────────────────┘   │
│                │                                                                       │
│   ┌────────────┴─────────────┐                   ┌─────────────────────────────────┐   │
│   │ Dedicated 4G/5G Router   │                   │ Payment Terminals               │   │
│   │ (Private Mobile Network) │                   │ - Static Standing QRIS          │   │
│   └──────────────────────────┘                   │ - EDC Bank / Merchant Partner   │   │
│                                                  └─────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Arsitektur Perangkat Keras (Hardware Level)

Infrastruktur fisik kasir ditempatkan secara ergonomis dan aman pada area **Curved Counter L** dengan konfigurasi:

| Komponen Hardware | Spesifikasi & Konfigurasi Teknis | Rationale & Fungsi Pengamanan |
| :--- | :--- | :--- |
| **Central POS Unit** | • 1 Unit Laptop Windows (Min. Core i5/Ryzen 5, RAM 8GB, SSD NVMe)<br>• OS Hardening / Kiosk Policy: Akses browser non-kerja diblokir, disable instalasi software eksternal.<br>• Antivirus & OS Auto-Update dijadwalkan off selama jam buka mall. | Menjamin performa POS bebas lag/hang saat antrean tinggi, mencegah infeksi malware, dan mencegah kasir beralih ke aktivitas non-operasional. |
| **Receipt Printer** | • Printer Thermal High-Speed 80mm<br>• Koneksi: **USB Direct Wired** (Bukan Bluetooth)<br>• Auto-Cutter terintegrasi. | Area mall memiliki kepadatan gelombang frekuensi tinggi (interferensi Bluetooth/Wi-Fi). Kabel USB menjamin 100% reliabilitas cetak struk tanpa delay. |
| **Payment Gateway** | • 1 Unit EDC Merchant Bank rekanan resmi.<br>• 1 Unit Acrylic Standing Tent Card QRIS Statis (Anti-reflektif barcode). | Mendukung transaksi nontunai (Debit, Kredit, QRIS Gopay/OVO/ShopeePay/BCA Mobile) secara cepat di kasir. |
| **Konektivitas Jaringan** | • 1 Unit Dedicated Mobile Router (Enterprise 4G/5G WiFi Cat-6).<br>• SIM Card kuota unlimited priority speed.<br>• Backup failover tethering router sekunder. | Booth **tidak bergantung pada Wi-Fi publik mall** yang rentan putus, lambat saat ramai pengunjung, dan memiliki risiko celah keamanan MITM (Man-in-the-Middle). |
| **Power Protection** | • 1 Unit Mini-UPS / Power Surge Protector pada stop kontak kasir. | Melindungi perangkat dari lonjakan arus mall dan mencegah laptop/printer mati mendadak saat mall mengalami trip listrik. |

---

## 3. Arsitektur Perangkat Lunak & Tata Kelola Otorisasi (Software & RBAC)

Sistem menggunakan POS Cloud Enterprise (Moka POS / Pawoon / In-House Raecca Engine) dengan penerapan **Role-Based Access Control (RBAC)** berprinsip *least privilege*:

```
[Role: Kasir / BA / SPG]
   │  Akses: Buat Transaksi, Scan SKU, Hold/Recall Cart, Cetak Struk
   │  Blokir: Ubah Harga, Hapus Transaksi (Void), Manual Edit Stok
   ▼
[Role: Supervisor / Team Leader]
   │  Akses: Input PIN Otorisasi Void/Retur, Input Alasan Void, Closing Shift, Stock Adjustment
   ▼
[Role: Manajemen Raecca (Admin / Owner)]
      Akses Penuh: Dashboard Omzet Real-Time, Master SKU & Promo, User Management, Log Audit
```

### 3.1. Fase Setup & Persiapan (Pra-Event)
1. **Master SKU & Barcode**: Seluruh SKU produk Raecca diinput lengkap dengan Barcode resmi, kategori produk, varian (shades/aroma), dan Harga Jual Konsumen (HJK).
2. **Setup Skema Promo & Bundling**: Rule diskon khusus event (e.g. *Buy 2 Get 1*, diskon bundling hemat, potongan minimum pembelian) dimasukkan langsung ke sistem POS untuk menghindari kalkulasi manual oleh kasir.
3. **Initial Inventory Intake**: Penghitungan stok awal (*starting inventory*) diverifikasi bersama antara Team Leader operasional dan perwakilan logistik Raecca sebelum event dibuka.

### 3.2. Batasan Hak Akses Front-End Kasir (SPG / BA)
- **Hanya transaksi berjalan**: Menginput barang, memilih opsi pembayaran, dan mencetak struk.
- **Harga terkunci**: Kasir tidak memiliki akses atau kolom untuk mengedit nominal harga produk secara bebas.
- **Fitur Void terkunci**: Tombol batalkan transaksi atau hapus item yang sudah ter-submit wajib meminta otentikasi **PIN Supervisor**.
- **Audit Trail**: Setiap struk mencantumkan nama kasir/BA yang sedang aktif bertugas (*Shift Tracker*).

### 3.3. Hak Akses Back-End Manajemen Raecca
- Akun Owner/Executive dengan akses aplikasi mobile (Android/iOS) dan Web Console.
- Hak pantau real-time terhadap dashboard penjualan, grafik revenue, stok menipis (*low-stock alert*), dan riwayat pembatalan.

---

## 4. Standar Operasional Prosedur (SOP) Transaksi Kasir

### 4.1. SOP Pembukaan Kasir (Opening Shift - Pukul 09.30 WIB)
1. Nyalakan laptop POS, printer thermal, dan router dedicated 4G/5G.
2. Lakukan tes cetak (*test print*) 1 lembar struk untuk memastikan kertas thermal terpasang baik dan tinta jelas.
3. Login ke sistem POS dengan akun kasir masing-masing.
4. Hitung uang kas modal kembalian (*Petty Cash*) di laci kasir dan lakukan input nominal modal awal pada menu **"Open Shift"** POS.
5. Verifikasi koneksi online dan pastikan sinkronisasi harga/promo terbaru telah terunduh.

### 4.2. SOP Alur Transaksi Pelanggan
1. **Penerimaan Barang**: Kasir melakukan scan barcode fisik produk Raecca atau memilih SKU dari katalog cepat POS.
2. **Konfirmasi Promo & Bundling**: Sistem otomatis membaca potongan diskon sesuai rule event. Kasir mengonfirmasi total akhir kepada pelanggan.
3. **Pemilihan Metode Pembayaran**:
   - **QRIS**: Tunjukkan standing QRIS / generate dynamic QR, minta pelanggan menunjukkan bukti bayar "BERHASIL", cocokkan nominal pembayaran dan kode referensi sebelum menekan tombol selesai.
   - **EDC / Kartu**: Gesek/insert kartu di mesin EDC, pastikan struk EDC keluar bertuliskan "APPROVED", input 4 digit nomor approval EDC ke catatan transaksi POS.
   - **Cash (Tunai)**: Terima uang tunai, periksa keaslian uang, input nominal uang yang diterima di POS, kembalikan uang kembalian beserta struk thermal asli.
4. **Penyerahan Struk**: Struk belanja wajib dicetak dan diserahkan kepada pelanggan bersama produk yang dikemas dalam shopping bag resmi.

---

## 5. Ekosistem & Jadwal Pelaporan Terstruktur (Reporting Ecosystem)

Pelaporan dirancang dalam 3 fase waktu berkesinambungan:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        JADWAL PELAPORAN OPERASIONAL                    │
├───────────────────────┬────────────────────────┬───────────────────────┤
│    FASE 1: REAL-TIME  │    FASE 2: HARIAN      │    FASE 3: PASCA-EVENT│
│    (24/7 Live Data)   │    (Pukul 22.30 WIB)   │    (H+7 Pasca Acara)  │
├───────────────────────┼────────────────────────┼───────────────────────┤
│ • Dashboard Smartphone│ • Closing Shift 22.00  │ • Executive Summary   │
│ • Live Hourly Sales   │ • Sales Summary PDF/XLS│ • 61-Day Trend Charts │
│ • Fast-Moving Alerts  │ • Cash vs QRIS vs EDC  │ • Peak Hours Heatmap  │
│ • Hourly Footfall/Tx  │ • Daily Stock Opname   │ • SKU Velocity & ROI  │
│                       │ • Next-Day Restock Req │ • Conversion Funnel   │
└───────────────────────┴────────────────────────┴───────────────────────┘
```

### 5.1. Real-Time Monitoring (Live Streaming Data)
Manajemen Raecca dapat memantau status gerai dari mana saja melalui smartphone:
- **Net Sales Detik-ke-Detik**: Total perolehan omzet berjalan hari itu.
- **Transaction Count & Basket Size**: Jumlah nota transaksi dan rata-rata belanja per pelanggan (*Average Order Value*).
- **Fast-Moving SKU Alert**: Indikator produk yang terjual cepat untuk mengantisipasi kehabisan stok display di booth.

### 5.2. Daily Closing Report (Laporan Tutup Harian – Cut-Off Pukul 22.00 WIB)
Setiap hari pada penutupan mall, Team Leader bertugas melakukan rekonsiliasi kasir. Dokumen laporan closing dikirimkan **paling lambat pukul 22.30 WIB** ke WhatsApp Group Resmi dan Email Manajemen Raecca.

#### Format Laporan Harian Terdiri Dari:
1. **Sales Summary**:
   - Total Gross Sales (Penjualan kotor sebelum diskon).
   - Total Promo/Voucher Discount.
   - Total Net Sales (Uang bersih hasil penjualan).
2. **Payment Channel Reconciliation**:
   - Total Cash (Tunai fisik di laci kasir).
   - Total QRIS (Sesuai settlement mutasi QRIS).
   - Total EDC / Debit / Kredit (Sesuai struk batch summary mesin EDC).
   - Keterangan selisih (*variance*) jika ada (Target: Rp 0 / Zero Discrepancy).
3. **Itemized Sales Breakdown**:
   - Rincian unit per SKU yang laku terjual hari tersebut.
   - Total omzet per kategori produk.
4. **Physical Stock Opname & Request Restock**:
   - Perhitungan fisik sisa stok di booth (*End of Day Stock*).
   - Form permintaan kiriman stok (*Restock Requisition*) untuk pengiriman sebelum operasional jam 10.00 WIB hari berikutnya.

### 5.3. Final Analytics Report (Pasca-Event – 13 Januari 2027)
Diserahkan secara resmi pada H+7 penutupan event (13 Januari 2027) dalam format presentasi eksekutif & spreadsheet komprehensif yang memuat:
- **Tren Penjualan 61 Hari**: Analisis performa omzet *weekday* vs *weekend*, serta pengaruh promo tematik (Payday, Year-End, Libur Akhir Tahun).
- **Heatmap Jam Sibuk (Peak Hours)**: Analisis kurva traffic jam kunjungan tertinggi untuk optimasi penempatan jumlah staf/BA.
- **Analisis Portofolio Produk**: Matriks Pareto 80/20 produk terlaris (*hero product*) vs produk lambat (*slow-moving*).
- **Rekomendasi Strategis**: Evaluasi taktik bundling, efektivitas konversi kasir, dan rekomendasi event ritel Raecca di masa mendatang.

---

## 6. Protokol Mitigasi Risiko & Kontinjensi Transaksi (Contingency Plan)

### 6.1. Protokol Transaksi Offline (Koneksi Seluler Putus / Signal Blackout)
Jika terjadi kendala pemancar BTS seluler di kawasan PIK:
1. Sistem POS secara otomatis beralih ke **Local Storage Cache (Offline Mode)** tanpa menghentikan kasir.
2. Kasir tetap menginput transaksi seperti biasa dan printer thermal tetap mencetak struk bertanda khusus *(Offline Record)*.
3. Seluruh data transaksi dienkripsi dan disimpan di database lokal laptop kasir.
4. Begitu koneksi router pulih atau modem cadangan tersambung, sistem POS otomatis mengeksekusi antrean sinkronisasi (*auto-queue synchronization*) ke cloud server Raecca tanpa risiko data ganda atau hilang.

### 6.2. SOP Ketat Pembatalan Transaksi (Void) & Retur
Untuk mencegah manipulasi kasir atau kebocoran nota:
1. **Larangan Void Mandiri**: SPG/BA tidak dapat melakukan void tanpa kehadiran fisik Team Leader/Supervisor.
2. **Supervisor PIN Authorization**: Supervisor memeriksa kebenaran alasan pembatalan (misal salah ketik SKU / salah input nominal) dan memasukkan PIN rahasia di layar POS.
3. **Buku Logbook Fisik (Audit Trail)**: Setiap void wajib dicatat di buku register manual berisi:
   - Nomor Struk Asli.
   - Waktu & SKU yang dibatalkan.
   - Alasan pembatalan.
   - Struk asli ditarik kembali, distempel/ditulis **"VOID - DIBATALKAN"**, dan distaples pada buku logbook.
   - Tanda tangan: Kasir yang bertugas + Supervisor yang mengotorisasi.

```
[Kesalahan Input Kasir] 
       │
       ▼
[Panggil Supervisor] ──► [Verifikasi Barang & Struk]
                                │
                                ▼
                       [Input PIN Supervisor di POS]
                                │
                                ▼
                       [Stempel "VOID" pada Struk Fisik]
                                │
                                ▼
                       [Catat & TTD di Buku Register Void]
```

### 6.3. Protokol Penanganan Selisih Kas (Cash Discrepancy Protocol)
1. Toleransi selisih uang tunai adalah **Rp 0 (Nol Rupiah)**.
2. Apabila terjadi selisih antara rekonsiliasi sistem POS dengan uang fisik di laci kasir saat tutup buku malam:
   - Supervisor wajib melakukan *re-count* sebanyak 2 kali bersama kasir bertugas.
   - Cek silang nota pembayaran nontunai (struk EDC dan riwayat notifikasi QRIS).
   - Apabila selisih tetap terjadi, rekaman CCTV booth pada jam terkait diperiksa dan dibuatkan Berita Acara Selisih Kasir yang ditandatangani malam itu juga.

---

## 7. Format Baku Pelaporan Operasional (Templates)

### 7.1. Template Broadcast Daily Closing (WhatsApp Group)
```text
========================================
LAPORAN CLOSING HARIAN - BOOTH RAECCA PIK
Hari/Tanggal : [Senin, 10 November 2026]
Shift Leader : [Nama Supervisor]
Kasir On Duty: [Nama BA/SPG]
========================================

RINGKASAN PENJUALAN:
- Gross Sales     : Rp [XX.XXX.XXX]
- Total Diskon    : Rp [X.XXX.XXX]
- NET SALES       : Rp [XX.XXX.XXX]
- Total Transaksi : [XXX] Nota
- Average Basket  : Rp [XXX.XXX]

RINCIAN PEMBAYARAN:
- Cash (Tunai)    : Rp [X.XXX.XXX] (Fisik Sesuai)
- QRIS            : Rp [XX.XXX.XXX] ([XX] Transaksi)
- EDC / Debit     : Rp [X.XXX.XXX] ([XX] Transaksi)
- Selisih Kas     : Rp 0 (Balance)

TOP 3 FAST-MOVING SKU:
1. [Nama Produk SKU A] : [XX] pcs
2. [Nama Produk SKU B] : [XX] pcs
3. [Nama Produk SKU C] : [XX] pcs

PERMINTAAN RESTOCK BESOK (H+1):
1. [Nama Produk SKU A] - Request [XX] pcs (Sisa fisik: [X] pcs)
2. [Nama Produk SKU D] - Request [XX] pcs (Sisa fisik: [X] pcs)

Catatan Operasional / Event:
- Kondisi jaringan: Normal (Router 4G dedicated)
- Kejadian khusus / Void: 0 Transaksi
- Seluruh file rekonsiliasi detail (.pdf & .xlsx) telah dikirimkan ke email manajemen.

Terima kasih.
========================================
```

### 7.2. Format Buku Register Logbook Void / Retur
| No | Tanggal & Jam | No. Struk POS | SKU / Nama Produk | Qty | Nominal (Rp) | Alasan Void | TTD Kasir | TTD SPV |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | 10/11/26 14:15 | #RC-1011-0042 | Lip Tint Shade 02 | 1 | 89.000 | Salah pilih shade | *(TTD)* | *(TTD)* |
| 2 | 15/11/26 19:30 | #RC-1511-0188 | Jelly Cleanser | 2 | 198.000 | Pembayaran QRIS timeout | *(TTD)* | *(TTD)* |

---

## 8. Jadwal Implementasi & Verifikasi Pra-Event

| Milestone & Kegiatan | Target Waktu | PIC Bertanggung Jawab | Output & Deliverables |
| :--- | :--- | :--- | :--- |
| **Input Master SKU & Promo** | H-7 Acara | IT & Data Operations | Seluruh barcode & rule diskon aktif di database POS. |
| **Staging & Hardware Testing** | H-3 Acara | IT Hardware Support | Laptop, printer USB, standing QRIS, dan EDC teruji lancar. |
| **Simulasi Transaksi & Offline Mode** | H-2 Acara | Supervisor & Kasir | Stress-test cetak struk, uji cabut modem (offline test), uji void PIN. |
| **Stock Intake & Opname Awal** | H-1 Acara | Logistik & Supervisor | Berita Acara Serah Terima Stok Awal Booth ditandatangani. |
| **Go-Live Opening Day** | Hari H (10.00 WIB) | Seluruh Tim Booth | Booth beroperasi melayani transaksi pelanggan. |
| **Final Analytics Handover** | 13 Januari 2027 | Operations Manager | Penyerahan Comprehensive 61-Day Performance Report. |

---
*Dokumen ini diterbitkan sebagai pedoman resmi operasional booth Raecca. Setiap modifikasi terhadap hak otorisasi atau alur pelaporan harus melalui persetujuan tertulis dari Manajemen Raecca.*
