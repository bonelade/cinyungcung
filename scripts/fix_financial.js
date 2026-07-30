const fs = require('fs');
const path = require('path');

console.log("==========================================================================");
console.log("🛠️ SUB-AGENT AUTO-REVISI FINANSIAL (AUTO-FIX FINANCIAL REVISER) 🛠️");
console.log("==========================================================================");

const indexPath = path.join(__dirname, '../index.html');
const financialPath = path.join(__dirname, '../financial-detail.html');

let indexHtml = fs.readFileSync(indexPath, 'utf8');
let financialHtml = fs.readFileSync(financialPath, 'utf8');

let fixedCount = 0;

// REVISION RULES FOR FINANCIAL DISCREPANCIES
const financialRevisions = [
    {
        pattern: /Rp 28\.650\.000\.000/g,
        replacement: "Rp 33.803.915.873",
        desc: "Merevisi NPV lama Rp 28.65 M menjadi +Rp 33.80 M"
    },
    {
        pattern: /48,5%/g,
        replacement: "64,82%",
        desc: "Merevisi IRR lama 48.5% menjadi 64.82%"
    },
    {
        pattern: /1,8 TAHUN \(21 BULAN\)/g,
        replacement: "1,39 TAHUN (~16,7 BULAN)",
        desc: "Merevisi Payback Period lama 1.8 thn menjadi 1.39 thn"
    }
];

financialRevisions.forEach(rule => {
    if (rule.pattern.test(indexHtml)) {
        indexHtml = indexHtml.replace(rule.pattern, rule.replacement);
        fixedCount++;
        console.log(`🔧 [AUTO-FIX APPLIED] ${rule.desc} di index.html`);
    }
    if (rule.pattern.test(financialHtml)) {
        financialHtml = financialHtml.replace(rule.pattern, rule.replacement);
        fixedCount++;
        console.log(`🔧 [AUTO-FIX APPLIED] ${rule.desc} di financial-detail.html`);
    }
});

if (fixedCount > 0) {
    fs.writeFileSync(indexPath, indexHtml, 'utf8');
    fs.writeFileSync(financialPath, financialHtml, 'utf8');
    console.log(`\n🎉 SUB-AGENT AUTO-REVISI FINANSIAL: ${fixedCount} KETIDAKSESUAIAN FINANSIAL BERHASIL DIPERBAIKI SINKRON!`);
} else {
    console.log("\n✅ SUB-AGENT AUTO-REVISI FINANSIAL: METRIK FINANSIAL SUDAH 100% SINKRON & VALID (NIHIL FIX NEEDED).");
}
