# Proposal — Kawasan Ketahanan Pangan Terpadu Blok Cinyungcung

Aplikasi web **proposal interaktif** untuk studi kelayakan kawasan ketahanan pangan
terpadu: **11 sentra terintegrasi** dalam sistem ekonomi sirkular *closed-loop*
(limbah satu sentra menjadi input bernilai bagi sentra lain).

Fitur utama:
- **Jaring sirkular interaktif** — 11 kartu sentra dengan *physics engine* (arahkan
  kursor ke kartu untuk melihat alur "memberi / menerima manfaat").
- **Simulator finansial** — 4 *slider* (populasi ayam, populasi nila, harga telur,
  harga nila) yang menghitung CAPEX, revenue, OPEX, laba bersih, dan *payback period*
  secara *live*, dilengkapi 3 grafik Chart.js.
- **Laporan keuangan 5 tahun** — proyeksi revenue/opex/laba + komposisi CAPEX.
- **Download PDF** — seluruh proposal diekspor ke PDF langsung dari browser
  (client-side, tanpa server).

## Technology Stack
- **Frontend**: HTML5 + CSS3 + Vanilla JS (tanpa framework/bundler)
- **Charting**: [Chart.js 4](https://www.chartjs.org/) (disimpan lokal di `vendor/`)
- **PDF**: [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) (disimpan lokal di `vendor/`)
- **Backend**: Flask 2.3+ — murni *static file server* (tidak ada database/API bisnis)
- **Python**: 3.11+

> **Catatan**: Tidak ada database, tidak ada `models.py`, dan tidak ada *template engine*.
> Seluruh logika ada di sisi klien (`app.js`). Flask hanya menyajikan berkas statis.

## Struktur Proyek

```
project-root/
│
├── index.html                  # Halaman utama (seluruh proposal interaktif)
├── app.js                      # Logika interaktif: circular web, simulator, PDF
├── styles.css                  # Design system "proposal formal" (Playfair + Lora)
├── BAB3_INTEGRASI_11_SENTRA.md # Dokumen spesifikasi naratif (11 sentra, matriks)
│
├── backend/
│   ├── __init__.py             # Inisialisasi Flask app (static_folder = root)
│   ├── app.py                  # Entry point: app.run(port=8000)
│   └── routes.py               # Route "/" + "/<file>" → serve static
│
├── vendor/
│   ├── chart.umd.min.js        # Chart.js 4 (salinan lokal)
│   └── html2pdf.bundle.min.js  # html2pdf.js (salinan lokal)
│
├── requirements.txt            # Flask, Flask-CORS
└── README.md
```

## Getting Started

### 1. Setup Environment
```bash
python -m venv .venv
.venv\Scripts\activate      # Windows
# atau
source .venv/bin/activate   # Linux/macOS
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Jalankan Aplikasi (via Flask)
```bash
python backend/app.py
```
Buka browser di **http://localhost:8000**

> Flask dijalankan di **port 8000** (lihat `backend/app.py`), bukan 5000.

### 4. Atau buka langsung (tanpa server)
Cukup buka `index.html` di browser — seluruh fitur (simulator, grafik, PDF)
tetap berfungsi karena semua aset dimuat secara relatif (`app.js`, `styles.css`,
`vendor/*`). Mode *static* ini praktis untuk pratinjau cepat.

## Cara Kerja Singkat

| Komponen | Berkas | Penjelasan |
|----------|--------|------------|
| Jaring sirkular | `app.js` (`nodeDescriptions` + `updatePhysics`) | 11 node + 31 link SVG, posisi dihitung tiap frame (`requestAnimationFrame`) |
| Simulator | `app.js` (`updateCalculations`) | Slider → CAPEX/Revenue/OPEX/Laba/Payback + 3 chart |
| Download PDF | `index.html` (inline `<script>`) | Clone `#proposal-content` → `html2pdf()` |
| Server | `backend/routes.py` | `send_from_directory(root, filename)` |

## Rekonsiliasi Angka (Proposal ↔ Simulator)

Lihat **BAB3_INTEGRASI_11_SENTRA.md §10** untuk tabel sinkronisasi antara narasi
proposal (docx) dan kalkulator `app.js`. Ringkasan:
- `app.js` adalah sumber acuan operasional; selisih CAPEX hanya ~Rp 0,5 Miliar.
- Konvensi: **M = Miliar**, **Jt = Juta**.
- Total investasi baseline ≈ **Rp 8,3 Miliar**; laba bersih thn-1 ≈ **Rp 6,8 Miliar**;
  payback ≈ **1,2 tahun** (pada slider default).

## Lisensi
Proposal internal / feasibility study.
