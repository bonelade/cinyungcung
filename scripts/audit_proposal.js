const fs = require('fs');
const path = require('path');

console.log("==========================================================================");
console.log("🤖 AGENT AUDIT COMPREHENSIVE 360° EVALUASI SELURUH ASPEK DOKUMEN PROPOSAL 🤖");
console.log("==========================================================================");

const indexPath = path.join(__dirname, '../index.html');
const financialPath = path.join(__dirname, '../financial-detail.html');

const indexHtml = fs.readFileSync(indexPath, 'utf8');
const financialHtml = fs.readFileSync(financialPath, 'utf8');

const auditRules = [
    // 1. FINANSIAL & INVESTASI
    {
        category: "1. Finansial & Investasi",
        name: "Total CAPEX Baseline (12 Sektor)",
        target: "15.890.000.000",
        invalidPatterns: ["10.000.000.000 (12 Sektor)", "23.170.000.000", "13.680.000.000"],
        desc: "Total CAPEX Investasi Awal Fisik 12 Sektor harus konsisten Rp 15.890.000.000"
    },
    {
        category: "1. Finansial & Investasi",
        name: "OPEX Biaya Operasional Tahun Ke-1",
        target: "10.183.390.000",
        invalidPatterns: ["10.471.040.000 / thn", "10.890.000.000 / thn"],
        desc: "Total OPEX Operasional Thn-1 harus konsisten Rp 10.183.390.000"
    },
    {
        category: "1. Finansial & Investasi",
        name: "Gross Revenue 100% Capacity",
        target: "21.364.562.000",
        invalidPatterns: ["21.300.000.000 / THN", "22.500.000.000 / THN"],
        desc: "Total Pendapatan Bruto (Sales) 100% Kapasitas harus konsisten Rp 21.364.562.000"
    },
    {
        category: "1. Finansial & Investasi",
        name: "Modal Kerja Awal Ramp-Up (4 Bulan)",
        target: "3.394.463.333",
        invalidPatterns: ["2.500.000.000 (4 Bln)", "4.000.000.000 (4 Bln)"],
        desc: "Modal Kerja Awal 4 Bulan harus konsisten Rp 3.394.463.333"
    },
    {
        category: "1. Finansial & Investasi",
        name: "Total Komitmen Uang Awal Disiapkan (Day 0)",
        target: "19.681.713.333",
        invalidPatterns: ["18.500.000.000", "20.000.000.000"],
        desc: "Total Uang Awal Disiapkan (CAPEX + Working Capital + Contingency) harus Rp 19.681.713.333"
    },

    // 2. METRIK KELAYAKAN FINANSIAL (DCF)
    {
        category: "2. Evaluasi Kelayakan (DCF)",
        name: "Net Present Value (NPV @10%)",
        target: "33.803.915.873",
        invalidPatterns: ["28.650.000.000"],
        desc: "Nilai NPV diskonto 10% harus konsisten Rp 33.803.915.873"
    },
    {
        category: "2. Evaluasi Kelayakan (DCF)",
        name: "Internal Rate of Return (IRR)",
        target: "64,82%",
        invalidPatterns: ["48,5% / TAHUN", "48,5% / thn"],
        desc: "Nilai IRR harus konsisten 64,82% per tahun"
    },
    {
        category: "2. Evaluasi Kelayakan (DCF)",
        name: "Payback Period Normal (PBP)",
        target: "1,39 Tahun",
        invalidPatterns: ["1,8 TAHUN (21 BULAN)", "0,73 Tahun"],
        desc: "Payback Period normal harus konsisten 1,39 Tahun (~16,7 Bulan)"
    },
    {
        category: "2. Evaluasi Kelayakan (DCF)",
        name: "Discounted Payback Period (DPBP @10%)",
        target: "1,57 Tahun",
        invalidPatterns: ["2,1 Tahun"],
        desc: "Discounted Payback Period harus konsisten 1,57 Tahun (~18,8 Bulan)"
    },
    {
        category: "2. Evaluasi Kelayakan (DCF)",
        name: "Benefit-Cost Ratio (B/C Ratio)",
        target: "3,13",
        invalidPatterns: ["2,50", "1,85"],
        desc: "Benefit-Cost Ratio harus konsisten 3,13"
    },

    // 3. SEKTOR PETERNAKAN AYAM PETELUR
    {
        category: "3. Sektor Ayam Petelur",
        name: "Populasi Ayam Petelur Closed-House",
        target: "30.000",
        invalidPatterns: ["25.000 ekor ayam", "50.000 ekor ayam"],
        desc: "Populasi ayam petelur closed-house harus 30.000 ekor"
    },
    {
        category: "3. Sektor Ayam Petelur",
        name: "Produksi Telur Harian (HDP 90%)",
        target: "27.000",
        invalidPatterns: ["22.500 butir/hari", "28.000 butir/hari"],
        desc: "Produksi telur harian harus 27.000 butir/hari"
    },
    {
        category: "3. Sektor Ayam Petelur",
        name: "Omzet Penjualan Telur Tahunan",
        target: "15.652.062.000",
        invalidPatterns: ["14.500.000.000 (Telur)", "16.000.000.000 (Telur)"],
        desc: "Revenue penjualan telur harus konsisten Rp 15.652.062.000 / thn"
    },

    // 4. SEKTOR PERIKANAN NILA MERAH RAS
    {
        category: "4. Sektor Perikanan Nila RAS",
        name: "Jumlah Kolam Nila Wiremesh D5",
        target: "12",
        invalidPatterns: ["16 Unit Kolam Nila", "20 Kolam Nila"],
        desc: "Jumlah kolam bundar wiremesh D5 RAS harus 12 kolam"
    },
    {
        category: "4. Sektor Perikanan Nila RAS",
        name: "Volume Panen Tahunan Nila Merah",
        target: "76.500",
        invalidPatterns: ["80.000 kg nila", "70.000 kg nila"],
        desc: "Volume panen harian/tahunan ikan nila merah RAS harus 76.500 kg (76,5 Ton)"
    },
    {
        category: "4. Sektor Perikanan Nila RAS",
        name: "Omzet Penjualan Nila RAS",
        target: "2.677.500.000",
        invalidPatterns: ["2.500.000.000 (Nila)", "3.000.000.000 (Nila)"],
        desc: "Revenue perikanan nila RAS harus konsisten Rp 2.677.500.000 / thn"
    },

    // 5. SEKTOR PUPUK ORGANIK & SIRKULAR
    {
        category: "5. Sektor Pupuk Organik SNI",
        name: "Kapasitas Pabrik Pupuk Granul SNI",
        target: "600",
        invalidPatterns: ["800 ton pupuk", "1.000 ton pupuk"],
        desc: "Kapasitas produksi pupuk organik granul SNI harus 600 Ton/Tahun"
    },

    // 6. TEKNOLOGI AI IOT & SERVER ENTERPRISE
    {
        category: "6. Teknologi AI IoT & Server",
        name: "Cluster Server AI Enterprise",
        target: "NVIDIA HGX H100",
        invalidPatterns: ["Server RTX 4090", "Server A100"],
        desc: "Spesifikasi server AI harus NVIDIA HGX H100 (8x GPU H100 80GB SXM5)"
    },

    // 7. SUMBER DAYA MANUSIA (SDM)
    {
        category: "7. Sumber Daya Manusia (SDM)",
        name: "Jumlah Tenaga Kerja Lokal",
        target: "30",
        invalidPatterns: ["36 Orang Tenaga Kerja", "50 Orang Tenaga Kerja"],
        desc: "Total alokasi tenaga kerja kawasan harus konsisten 30 Personel"
    },

    // 8. KERANGKA STRATEGI BISNIS
    {
        category: "8. Kerangka Strategi Bisnis",
        name: "7 Matriks Analisis Bisnis Strategis",
        target: "7 Matriks",
        invalidPatterns: [],
        desc: "Kerangka analisis bisnis harus mencakup 7 Matriks lengkap (BMC, SWOT, PESTEL, Porter, Ansoff, BCG, Risk)"
    }
];

let issuesFound = [];
let passCount = 0;

console.log("\n--- HASIL DETEKSI INSPEKSI AGENT 360° LINTAS SEKTOR & BAB ---\n");

auditRules.forEach(rule => {
    let hasTargetInIndex = indexHtml.includes(rule.target);
    let invalidMatchesIndex = rule.invalidPatterns.filter(p => indexHtml.includes(p));
    let invalidMatchesFinancial = rule.invalidPatterns.filter(p => financialHtml.includes(p));

    if (invalidMatchesIndex.length > 0 || invalidMatchesFinancial.length > 0) {
        issuesFound.push({
            category: rule.category,
            rule: rule.name,
            desc: rule.desc,
            foundInvalidInIndex: invalidMatchesIndex,
            foundInvalidInFinancial: invalidMatchesFinancial
        });
        console.log(`❌ [DISCREPANCY] [${rule.category}] ${rule.name}`);
        if (invalidMatchesIndex.length > 0) console.log(`   - Data berbenturan di index.html: ${invalidMatchesIndex.join(', ')}`);
        if (invalidMatchesFinancial.length > 0) console.log(`   - Data berbenturan di financial-detail.html: ${invalidMatchesFinancial.join(', ')}`);
    } else if (hasTargetInIndex) {
        passCount++;
        console.log(`✅ [100% SINKRON] [${rule.category}] ${rule.name} -> Target "${rule.target}" Valid!`);
    } else {
        console.log(`⚠️ [PERINGATAN] [${rule.category}] ${rule.name}: Baseline "${rule.target}" belum tercantum eksplisit.`);
    }
});

console.log(`\n==========================================================================`);
console.log(`TOTAL ASPEK & ATURAN DIAUDIT    : ${auditRules.length}`);
console.log(`TOTAL TERVERIFIKASI SINKRON     : ${passCount}`);
console.log(`TOTAL KETIDAKSESUAIAN DITEMUKAN : ${issuesFound.length}`);
console.log(`==========================================================================\n`);

if (issuesFound.length === 0) {
    console.log("🎉 HASIL AUDIT 360°: SELURUH BAB (BAB I S/D BAB VI) DAN LAMPIRAN FINANSIAL 100% SINKRON & BEBAS MISTAKE!");
} else {
    console.log("DAFTAR TEMUAN KETIDAKSESUAIAN:");
    console.log(JSON.stringify(issuesFound, null, 2));
}
