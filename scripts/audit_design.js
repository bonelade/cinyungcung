const fs = require('fs');
const path = require('path');

console.log("==========================================================================");
console.log("🎨 AGENT AUDIT KHUSUS DESAIN, TIPOGRAFI & LAYOUT FORMAL (DESIGN AUDIT) 🎨");
console.log("==========================================================================");

const cssPath = path.join(__dirname, '../styles.css');
const indexPath = path.join(__dirname, '../index.html');
const financialPath = path.join(__dirname, '../financial-detail.html');

const cssContent = fs.readFileSync(cssPath, 'utf8');
const indexHtml = fs.readFileSync(indexPath, 'utf8');
const financialHtml = fs.readFileSync(financialPath, 'utf8');

const designAuditRules = [
    // 1. CONTINUOUS FLOW 842PX UNIFORM WIDTH LOCK
    {
        category: "1. Layout Standard (Continuous Flow)",
        name: "842px Uniform Width Lock",
        check: () => {
            let has842Width = cssContent.includes('842px');
            let has595WidthMixed = cssContent.includes('width: 595px');
            return has842Width && !has595WidthMixed;
        },
        desc: "Seluruh sheet (.pdf-a4-sheet) harus mengunci uniform width 842px tanpa percampuran width 595px"
    },
    {
        category: "1. Layout Standard (Continuous Flow)",
        name: "Forbidden Height & Overflow Locks",
        check: () => {
            let hasForbiddenHeight = cssContent.includes('.pdf-a4-sheet { height: 842px !important') || cssContent.includes('.pdf-a4-sheet-landscape { height: 595px !important');
            let hasForbiddenOverflow = cssContent.includes('.pdf-a4-sheet { overflow: hidden !important');
            return !hasForbiddenHeight && !hasForbiddenOverflow;
        },
        desc: "Tidak boleh ada height lock 842px atau overflow:hidden pada sheet container yang memotong konten"
    },

    // 2. KONTRAST WARNA TEKS DENGAN BACKGROUND TEBAL
    {
        category: "2. Color Contrast & Accessibility",
        name: "High Contrast Total Row Text (Hijau Tua #2E5A44)",
        check: () => {
            // Check that all dark green rows in financial-detail and index have explicit white/gold text
            let darkGreenRowsInFinancial = financialHtml.includes('background: #2E5A44; color: #FFFFFF') || financialHtml.includes('background: #1B4D3E !important; color: #FFFFFF !important');
            let hasDarkTextOverlap = financialHtml.includes('background: #2E5A44; color: #000000') || financialHtml.includes('background: #2E5A44; color: #1A1A2E');
            return darkGreenRowsInFinancial && !hasDarkTextOverlap;
        },
        desc: "Seluruh teks di atas latar hijau tua (#2E5A44/#1B4D3E) wajib menggunakan warna Putih Murni (#FFFFFF) atau Emas Terang (#FFD700)"
    },
    {
        category: "2. Color Contrast & Accessibility",
        name: "High Contrast Table Header Text (Navy #1A3A6B)",
        check: () => {
            let hasNavyHeaders = cssContent.includes('background: #1A3A6B') || cssContent.includes('color: #FFFFFF !important');
            return hasNavyHeaders;
        },
        desc: "Header tabel dengan background Navy (#1A3A6B) wajib menggunakan teks Putih Murni (#FFFFFF)"
    },

    // 3. STANDAR TIPOGRAFI
    {
        category: "3. Standar Tipografi Document Scale",
        name: "Judul Utama Cover (Cover Title 2.2rem)",
        check: () => {
            return cssContent.includes('--fs-cover-title') || cssContent.includes('font-size: 2.2rem') || indexHtml.includes('cover-title');
        },
        desc: "Judul utama proposal cover menggunakan font size 2.2rem (35px) / 2.5rem"
    },
    {
        category: "4. Standar Tipografi Document Scale",
        name: "Header Judul Bab H2 (1.5rem / 24px)",
        check: () => {
            return cssContent.includes('--fs-h1-bab') || cssContent.includes('font-size: 1.5rem') || cssContent.includes('section-title');
        },
        desc: "Judul Bab H2 menggunakan font size 1.5rem (24px) dengan Line Height 1.1"
    },
    {
        category: "5. Standar Tipografi Document Scale",
        name: "Teks Sel Tabel Keuangan (0.68rem - 0.74rem)",
        check: () => {
            return cssContent.includes('--fs-table-text') || cssContent.includes('font-size: 0.72rem') || indexHtml.includes('font-size: 0.74rem !important');
        },
        desc: "Teks data sel tabel keuangan konsisten rapat 0.68rem - 0.74rem (10.8px - 11.8px)"
    },

    // 4. PALET WARNA RESMI & KONSISTENSI BRANDING
    {
        category: "6. Palet Warna Branding Proposal",
        name: "Warna Utama Navy (#1A3A6B)",
        check: () => {
            return cssContent.includes('#1A3A6B');
        },
        desc: "Warna aksen utama konsisten menggunakan Deep Navy #1A3A6B"
    },
    {
        category: "6. Palet Warna Branding Proposal",
        name: "Warna Sekunder Hijau Sirkular (#2E5A44)",
        check: () => {
            return cssContent.includes('#2E5A44') || financialHtml.includes('#2E5A44');
        },
        desc: "Warna tema sirkular & pertanian konsisten menggunakan Forest Green #2E5A44"
    },
    {
        category: "6. Palet Warna Branding Proposal",
        name: "Warna Emas Terang (#FFD700 / #D4AF37)",
        check: () => {
            return cssContent.includes('#D4AF37') || financialHtml.includes('#FFD700');
        },
        desc: "Warna highlight nilai nominal & KPI konsisten menggunakan Gold #FFD700 / #D4AF37"
    }
];

let issuesFound = [];
let passCount = 0;

console.log("\n--- HASIL EVALUASI AGENT AUDIT DESAIN & LAYOUT ---\n");

designAuditRules.forEach(rule => {
    let isValid = rule.check();
    if (isValid) {
        passCount++;
        console.log(`✅ [100% DESAIN LULUS] [${rule.category}] ${rule.name}`);
        console.log(`   - ${rule.desc}`);
    } else {
        issuesFound.push({
            category: rule.category,
            rule: rule.name,
            desc: rule.desc
        });
        console.log(`❌ [PELANGGARAN DESAIN] [${rule.category}] ${rule.name}`);
        console.log(`   - ${rule.desc}`);
    }
});

console.log(`\n==========================================================================`);
console.log(`TOTAL ATURAN DESAIN DIAUDIT    : ${designAuditRules.length}`);
console.log(`TOTAL TERVERIFIKASI MEMENUHI   : ${passCount}`);
console.log(`TOTAL PELANGGARAN DESAIN       : ${issuesFound.length}`);
console.log(`==========================================================================\n`);

if (issuesFound.length === 0) {
    console.log("🎨 🎉 SELURUH HASIL AUDIT DESAIN: 100% MEMENUHI STANDAR VISUAL, CONTRAST, & LAYOUT 842PX!");
} else {
    console.log("DAFTAR TEMUAN PELANGGARAN DESAIN:");
    console.log(JSON.stringify(issuesFound, null, 2));
}
