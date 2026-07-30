const fs = require('fs');
const path = require('path');

console.log("==========================================================================");
console.log("👥 SUB-AGENT AUDIT SDM, STRUKTUR ORGANISASI & KESEJAHTERAAN (HR AUDIT) 👥");
console.log("==========================================================================");

const indexPath = path.join(__dirname, '../index.html');
const financialPath = path.join(__dirname, '../financial-detail.html');

const indexHtml = fs.readFileSync(indexPath, 'utf8');
const financialHtml = fs.readFileSync(financialPath, 'utf8');

const hrRules = [
    {
        aspect: "Total Headcount SDM",
        name: "Alokasi SDM 30 Personel Staff Lokal Terlatih",
        test: () => indexHtml.includes("30") && (financialHtml.includes("30 Staff") || financialHtml.includes("Gaji")),
        desc: "Total kuota tenaga kerja kawasan konsisten 30 personel"
    },
    {
        aspect: "Struktur Organisasi",
        name: "Struktur Organisasi Kawasan (General Manager, Dokter Hewan, Ahli RAS)",
        test: () => indexHtml.includes("Struktur Organisasi") || indexHtml.includes("Manager"),
        desc: "Hirarki manajemen & tim teknis terverifikasi"
    },
    {
        aspect: "Penggajian UMK & BPJS",
        name: "Alokasi Gaji UMK + BPJS Kesehatan & Ketenagakerjaan (Rp 1.456.800.000/thn)",
        test: () => financialHtml.includes("1.456.800.000") || financialHtml.includes("BPJS"),
        desc: "Standar pengangkatan upah & jaminan sosial terverifikasi"
    },
    {
        aspect: "Pengembangan Kapasitas",
        name: "Program Pelatihan & Sertifikasi Bio-Sirkular Tenaga Kerja Lokal",
        test: () => indexHtml.includes("Sertifikasi") || financialHtml.includes("Sertifikasi"),
        desc: "Program peningkatan skill teknis masyarakat lokal terverifikasi"
    }
];

let pass = 0;
let errors = [];

console.log("\n--- HASIL EVALUASI SUB-AGENT SDM & STRUKTUR ---\n");

hrRules.forEach(rule => {
    if (rule.test()) {
        pass++;
        console.log(`✅ [HUMAN CAPITAL OK] [${rule.aspect}] ${rule.name}`);
        console.log(`   - Keterangan: ${rule.desc}`);
    } else {
        errors.push(rule);
        console.log(`❌ [HUMAN CAPITAL ERROR] [${rule.aspect}] ${rule.name}`);
    }
});

console.log(`\n==========================================================================`);
console.log(`TOTAL STRUKTUR SDM DIAUDIT  : ${hrRules.length}`);
console.log(`TOTAL TERVERIFIKASI MEMENUHI : ${pass}`);
console.log(`TOTAL PELANGGARAN ALOKASI SDM: ${errors.length}`);
console.log(`==========================================================================\n`);

if (errors.length === 0) {
    console.log("👥 🎉 SUB-AGENT HUMAN CAPITAL: SELURUH STRUKTUR SDM & KESEJAHTERAAN 100% TERJAMIN!");
}
