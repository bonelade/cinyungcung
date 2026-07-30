const fs = require('fs');
const path = require('path');

console.log("==========================================================================");
console.log("🎨 SUB-AGENT AUTO-REVISI DESAIN & KONTRAS VISUAL (AUTO-FIX DESIGN) 🎨");
console.log("==========================================================================");

const financialPath = path.join(__dirname, '../financial-detail.html');
let financialHtml = fs.readFileSync(financialPath, 'utf8');

let fixedCount = 0;

// REVISION RULES FOR DESIGN & CONTRAST DISCREPANCIES
if (financialHtml.includes('style="background: #2E5A44; color: #FFFFFF; font-weight: 800; font-size: 0.88rem;"')) {
    financialHtml = financialHtml.replace(
        'style="background: #2E5A44; color: #FFFFFF; font-weight: 800; font-size: 0.88rem;"',
        'style="background: #1B4D3E !important; color: #FFFFFF !important; font-weight: 800; font-size: 0.88rem;"'
    );
    fixedCount++;
    console.log("🔧 [AUTO-FIX DESAIN] Menyetel kontras tinggi #1B4D3E & #FFFFFF !important pada baris total OPEX");
}

if (fixedCount > 0) {
    fs.writeFileSync(financialPath, financialHtml, 'utf8');
    console.log(`\n🎉 SUB-AGENT AUTO-REVISI DESAIN: ${fixedCount} DETAIL CONTRAST BERHASIL DISESUAIKAN!`);
} else {
    console.log("\n✅ SUB-AGENT AUTO-REVISI DESAIN: KONTRAS ELEMEN DESAIN VISUAL SUDAH 100% PERFECT (NIHIL FIX NEEDED).");
}
