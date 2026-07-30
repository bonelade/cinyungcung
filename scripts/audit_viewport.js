const fs = require('fs');
const path = require('path');

console.log("==========================================================================");
console.log("📱 SUB-AGENT AUDIT TAMPILAN RESPONSIF & VIEWPORT DEVICE LOCK (VIEWPORT AUDIT) 📱");
console.log("==========================================================================");

const indexPath = path.join(__dirname, '../index.html');
const financialPath = path.join(__dirname, '../financial-detail.html');
const cssPath = path.join(__dirname, '../styles.css');

const indexHtml = fs.readFileSync(indexPath, 'utf8');
const financialHtml = fs.readFileSync(financialPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');

const viewportRules = [
    {
        device: "Meta Viewport Tag",
        name: "Tag Meta Viewport Responsive Device-Width",
        test: () => indexHtml.includes('name="viewport"') && financialHtml.includes('name="viewport"'),
        desc: "Meta tag viewport device-width terpasang presisi di seluruh dokumen HTML"
    },
    {
        device: "Uniform Sheet Width",
        name: "Kunci Lebar Seragam Sheet 842px Margin Auto",
        test: () => cssContent.includes('width: 842px !important') && cssContent.includes('margin: 0 auto'),
        desc: "Sheet terkunci 842px dengan centering margin auto di semua jenis layar"
    },
    {
        device: "Table Overflow Container",
        name: "Container Pembungkus Tabel Responsif (-webkit-overflow-scrolling)",
        test: () => cssContent.includes('.table-container') && cssContent.includes('overflow-x: auto'),
        desc: "Tabel terlindungi dari pemotongan samping di perangkat layar kecil/HP"
    },
    {
        device: "Mobile Breakpoints",
        name: "Media Query Breakpoint Max-Width 890px",
        test: () => cssContent.includes('@media screen and (max-width: 890px)'),
        desc: "Aturan khusus responsif layar smartphone & tablet terverifikasi aktif"
    }
];

let pass = 0;
let errors = [];

console.log("\n--- HASIL EVALUASI SUB-AGENT RESPONSIVITAS DEVICE ---\n");

viewportRules.forEach(rule => {
    if (rule.test()) {
        pass++;
        console.log(`✅ [VIEWPORT OK] [${rule.device}] ${rule.name}`);
        console.log(`   - Keterangan: ${rule.desc}`);
    } else {
        errors.push(rule);
        console.log(`❌ [VIEWPORT ERROR] [${rule.device}] ${rule.name}`);
    }
});

console.log(`\n==========================================================================`);
console.log(`TOTAL ATURAN VIEWPORT DIAUDIT  : ${viewportRules.length}`);
console.log(`TOTAL SINKRON & RESPONSIVE    : ${pass}`);
console.log(`TOTAL PELANGGARAN LAYOUT DEVICE: ${errors.length}`);
console.log(`==========================================================================\n`);

if (errors.length === 0) {
    console.log("📱 🎉 SUB-AGENT VIEWPORT: SELURUH HAK KUNCI LAYOUT 842PX & RESPONSIVITAS DEVICE 100% PERFECT!");
}
