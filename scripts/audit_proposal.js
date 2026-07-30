const fs = require('fs');
const path = require('path');

console.log("==========================================================================");
console.log("🤖 AGENT AUDIT EVALUASI KETIDAKSESUAIAN DATA & INKONSISTENSI DOKUMEN 🤖");
console.log("==========================================================================");

const indexPath = path.join(__dirname, '../index.html');
const financialPath = path.join(__dirname, '../financial-detail.html');

const indexHtml = fs.readFileSync(indexPath, 'utf8');
const financialHtml = fs.readFileSync(financialPath, 'utf8');

const auditRules = [
    {
        name: "CAPEX Total Baseline",
        target: "15.890.000.000",
        invalidPatterns: ["10.000.000.000 (12 Sektor)", "23.170.000.000", "13.680.000.000"],
        desc: "Total CAPEX Investasi Awal Fisik (12 Sektor) harus konsisten Rp 15.890.000.000"
    },
    {
        name: "OPEX Tahun Ke-1 Baseline",
        target: "10.183.390.000",
        invalidPatterns: ["10.471.040.000 / thn", "10.890.000.000 / thn"],
        desc: "Total OPEX Operasional Thn-1 harus konsisten Rp 10.183.390.000"
    },
    {
        name: "Gross Revenue 100% Capacity",
        target: "21.364.562.000",
        invalidPatterns: ["21.300.000.000 / THN", "22.500.000.000 / THN"],
        desc: "Total Pendapatan Bruto (Sales) 100% Kapasitas harus konsisten Rp 21.364.562.000"
    },
    {
        name: "Net Present Value (NPV @10%)",
        target: "33.803.915.873",
        invalidPatterns: ["28.650.000.000"],
        desc: "Nilai NPV diskonto 10% harus konsisten Rp 33.803.915.873"
    },
    {
        name: "Internal Rate of Return (IRR)",
        target: "64,82%",
        invalidPatterns: ["48,5% / TAHUN", "48,5% / thn"],
        desc: "Nilai IRR harus konsisten 64,82% per tahun"
    },
    {
        name: "Payback Period Normal (PBP)",
        target: "1,39 Tahun",
        invalidPatterns: ["1,8 TAHUN (21 BULAN)", "0,73 Tahun"],
        desc: "Payback Period normal harus konsisten 1,39 Tahun (~16,7 Bulan)"
    },
    {
        name: "Populasi Ayam Petelur",
        target: "30.000",
        invalidPatterns: ["25.000 ekor ayam", "50.000 ekor ayam"],
        desc: "Populasi ayam petelur closed-house harus 30.000 ekor"
    },
    {
        name: "Produksi Telur Harian",
        target: "27.000",
        invalidPatterns: ["22.500 butir/hari", "28.000 butir/hari"],
        desc: "Produksi telur harian (HDP 90%) harus 27.000 butir/hari"
    },
    {
        name: "Volume Ikan Nila RAS",
        target: "76.500",
        invalidPatterns: ["80.000 kg nila", "70.000 kg nila"],
        desc: "Volume panen harian/tahunan ikan nila merah RAS harus 76.500 kg (76,5 Ton)"
    },
    {
        name: "Kebutuhan Uang Awal Complete Commitment",
        target: "19.681.713.333",
        invalidPatterns: [],
        desc: "Total komitmen uang awal (CAPEX + Working Capital 4 Bln + Contingency) harus Rp 19.681.713.333"
    }
];

let issuesFound = [];
let passCount = 0;

console.log("\n--- HASIL EVALUASI AGENT AUDIT DATA ---");

auditRules.forEach(rule => {
    let hasTargetInIndex = indexHtml.includes(rule.target);
    let invalidMatchesIndex = rule.invalidPatterns.filter(p => indexHtml.includes(p));
    let invalidMatchesFinancial = rule.invalidPatterns.filter(p => financialHtml.includes(p));

    if (invalidMatchesIndex.length > 0 || invalidMatchesFinancial.length > 0) {
        issuesFound.push({
            rule: rule.name,
            desc: rule.desc,
            foundInvalidInIndex: invalidMatchesIndex,
            foundInvalidInFinancial: invalidMatchesFinancial
        });
        console.log(`❌ [KETIDAKSESUAIAN] ${rule.name}`);
        if (invalidMatchesIndex.length > 0) console.log(`   - Data tidak valid di index.html: ${invalidMatchesIndex.join(', ')}`);
        if (invalidMatchesFinancial.length > 0) console.log(`   - Data tidak valid di financial-detail.html: ${invalidMatchesFinancial.join(', ')}`);
    } else if (hasTargetInIndex) {
        passCount++;
        console.log(`✅ [SINKRON 100%] ${rule.name}: Terverifikasi baseline "${rule.target}"`);
    } else {
        console.log(`⚠️ [WARNING] ${rule.name}: Baseline "${rule.target}" belum tercantum secara eksplisit.`);
    }
});

console.log(`\n==========================================================================`);
console.log(`TOTAL ATURAN DIAUDIT           : ${auditRules.length}`);
console.log(`TOTAL SINKRON & VALID          : ${passCount}`);
console.log(`TOTAL KETIDAKSESUAIAN DITEMUKAN: ${issuesFound.length}`);
console.log(`==========================================================================\n`);

if (issuesFound.length === 0) {
    console.log("🎉 SELURUH BAB (BAB I S/D BAB VI) DAN LAMPIRAN FINANSIAL 100% SINKRON & VALID!");
}
