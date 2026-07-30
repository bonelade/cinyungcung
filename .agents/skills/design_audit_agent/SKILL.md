---
name: design_audit_agent
description: "Agent khusus untuk audit visual desain, kontras warna, tipografi formal, dan layout Continuous Flow 842px pada dokumen proposal Cinyungcung."
---

# Design Audit Agent Skill

## Overview
Skill ini digunakan untuk mengaudit dan mengevaluasi seluruh elemen estetika visual, kontras warna, tipografi formal, dan kepatuhan layout Continuous Flow 842px Uniform Width pada dokumen proposal Cinyungcung.

## Aturan Utama Audit Desain:
1. **Continuous Flow Layout 842px**:
   - Seluruh container `.pdf-a4-sheet` dan `.pdf-a4-sheet-landscape` wajib terkunci pada lebar `842px`.
   - Tidak boleh ada pemotongan konten vertikal (`height: 842px !important` atau `overflow: hidden !important`).
2. **Kontras Warna Teks & Latar Belakang**:
   - Baris total hijau tua (`#2E5A44` / `#1B4D3E`) dan header navy (`#1A3A6B`) WAJIB menggunakan warna teks Putih Murni (`#FFFFFF !important`) atau Emas Terang (`#FFD700 !important`).
3. **Skala Tipografi Formal**:
   - Judul Utama Cover: `2.2rem` (35px), Line Height 1.0
   - Header Bab H2: `1.5rem` (24px), Line Height 1.1
   - Teks Sel Tabel Data: `0.68rem - 0.74rem` (10.8px - 11.8px), Line Height 1.0
4. **Palet Warna Resmi**:
   - Utama: Deep Navy `#1A3A6B`
   - Sekunder: Forest Green `#2E5A44`
   - Emas Terang: Gold `#FFD700` / `#D4AF37`

## Cara Menjalankan Audit Desain:
Jalankan perintah berikut di terminal:
```bash
node scripts/audit_design.js
```
