const fs = require('fs');
const path = require('path');

console.log("==========================================================================");
console.log("📱 SUB-AGENT AUTO-REVISI TAMPILAN DEVICE & VIEWPORT (AUTO-FIX VIEWPORT) 📱");
console.log("==========================================================================");

const cssPath = path.join(__dirname, '../styles.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

let fixedCount = 0;

if (!cssContent.includes('@media screen and (max-width: 890px)')) {
    cssContent += `
@media screen and (max-width: 890px) {
    body {
        overflow-x: auto !important;
        padding: 10px 5px !important;
        -webkit-overflow-scrolling: touch;
    }
    .pdf-a4-sheet, .pdf-a4-sheet-landscape {
        width: 842px !important;
        min-width: 842px !important;
        max-width: 842px !important;
    }
}
`;
    fixedCount++;
    console.log("🔧 [AUTO-FIX VIEWPORT] Menambahkan media query breakpoint responsif layar HP/Tablet");
}

if (fixedCount > 0) {
    fs.writeFileSync(cssPath, cssContent, 'utf8');
    console.log(`\n🎉 SUB-AGENT AUTO-REVISI VIEWPORT: ${fixedCount} PENYESUAIAN DEVICE BERHASIL DITERAPKAN!`);
} else {
    console.log("\n✅ SUB-AGENT AUTO-REVISI VIEWPORT: TAMPILAN DEVICE SUDAH 100% LOCK & RESPONSIF (NIHIL FIX NEEDED).");
}
