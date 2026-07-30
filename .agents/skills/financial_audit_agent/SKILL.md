---
name: financial_audit_agent
description: "Agent khusus untuk audit model finansial, kalkulasi DCF NPV, IRR, PBP, persamaaan CAPEX/OPEX, dan validasi rasio kelayakan keuangan proposal Cinyungcung."
---

# Financial Audit Agent Skill

## Overview
Skill ini digunakan untuk menguji dan memverifikasi secara presisi seluruh persamaan matematika finansial, penjumlahan pos CAPEX/OPEX, omzet penjualan, formula Net Present Value (NPV), Payback Period (PBP), dan komitmen struktur uang awal (Day 0) pada dokumen proposal Cinyungcung.

## Parameter Finansial Baseline yang Diverifikasi:
1. **Total CAPEX Fisik (12 Sektor)**: `Rp 15.890.000.000`
2. **Total OPEX Operasional (Thn-1)**: `Rp 10.183.390.000`
3. **Total Gross Revenue 100% Kapasitas**: `Rp 21.364.562.000`
4. **Modal Kerja Awal Ramp-Up (4 Bulan)**: `Rp 3.394.463.333`
5. **Total Komitmen Uang Awal Disiapkan**: `Rp 19.681.713.333`
6. **Net Present Value (NPV @10%)**: `+Rp 33.803.915.873`
7. **Internal Rate of Return (IRR)**: `64,82% / Tahun`
8. **Payback Period (PBP)**: `1,39 Tahun (~16,7 Bulan)`

## Cara Menjalankan Audit Finansial:
Jalankan perintah berikut di terminal:
```bash
node scripts/audit_financial.js
```
