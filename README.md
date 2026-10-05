# RAECCA Beauty POS & Live Reporting Ecosystem 💄✨
**Proyek Booth Pop-Up Store – Curved Counter L, Pantai Indah Kapuk (PIK)**  
*Sistem Point of Sales & Pelaporan Harian Terintegrasi*

![Raecca Beauty Logo](public/images.png)

---

## 📌 Ringkasan Eksekutif
Ekosistem POS dan pelaporan terintegrasi ini dirancang untuk operasional ritel booth Raecca selama 61 hari (hingga 13 Januari 2027) dengan prinsip **Zero Revenue Leakage**, **Real-Time Data Visibility**, dan **Strict Access Governance**.

### 🌟 Fitur Utama
1. **Front-End Kasir (POS Terminal Kiosk)**
   - Katalog SKU Resmi Raecca (*Lip Care, Skincare, Body Care, Event Bundles*).
   - Simulasi Pemindai Barcode USB instan.
   - Perhitungan diskon bundling otomatis (*hemat hingga Rp 21.000*).
   - Multichannel Payment: Standing QRIS, Mesin EDC Bank, dan Tunai (Cash).
   - Cetak Struk Fisik Thermal 80mm realistis.

2. **Tata Kelola Otoritas (Supervisor Level 2)**
   - Otorisasi PIN rahasia untuk pembatalan transaksi (*Void/Return*).
   - Buku register digital (*Logbook Audit Trail*) dengan status tanda tangan fisik.
   - Modul *Stock Opname* booth harian & form permintaan *Restock* besok pagi (H+1).

3. **Dashboard Pemantauan Manajemen (Cloud Real-Time)**
   - Live Ticker transaksi detik-ke-detik.
   - KPI Metrik: Omzet Kotor (Gross), Total Diskon, Omzet Bersih (Net), Jumlah Transaksi, Average Basket Size, dan Cashless Ratio.
   - Grafik Penjualan per Jam & Heatmap *Peak Hours* mall (14:00 & 19:00 WIB).
   - Peringkat *Top 3 Fast-Moving Hero SKUs*.
   - Live Feed transaksi terenkripsi.

4. **Laporan Closing Harian (EOD Cut-Off 22.00 & Broadcast 22.30 WIB)**
   - Generator teks laporan broadcast WhatsApp otomatis siap salin (1-klik).
   - Ekspor data transaksi format **CSV / Excel**.
   - Lembar serah terima closing siap cetak format PDF.

5. **Kontinjensi & Mitigasi Risiko Transaksi**
   - **Offline Mode Engine**: Menyimpan transaksi ke *local cache* saat sinyal seluler drop.
   - **Auto-Sync Queue**: Otomatis menyinkronkan seluruh transaksi tertunda ke cloud begitu koneksi pulih tanpa risiko nota ganda.

---

## 🛠️ Panduan Menjalankan Proyek

### Prasyarat
- [Node.js](https://nodejs.org/) (v18+)
- npm (v9+)

### Instalasi & Menjalankan Lokal
```bash
# 1. Clone repository
git clone https://github.com/kamisammaaa/event-pik-raecca.git
cd event-pik-raecca

# 2. Install dependencies
npm install

# 3. Jalankan Development Server
npm run dev
```

Buka browser di: **`http://localhost:3000`**

### Build Production
```bash
npm run build
```

---

## 📄 Dokumen Spesifikasi & Update
- 📘 **[Dokumentasi Update Sistem v2.0.0](DOKUMENTASI_UPDATE_SISTEM.md)**: Catatan rilis lengkap 5 pilar optimalisasi, panduan teknis, dan SOP operasional kasir.
- 📋 **[Proposal & Cetak Biru POS Raecca](PROPOSAL_SOP_POS_DAN_PELAPORAN_RAECCA.md)**: Cetak biru arsitektur hardware, software RBAC, mitigasi risiko, dan tata kelola pelaporan harian.
