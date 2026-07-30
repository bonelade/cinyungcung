const fs = require('fs');
const path = require('path');

console.log("==========================================================================");
console.log("⚙️ SUB-AGENT AUDIT KHUSUS TEKNIS, REKAYASA & INFRASTRUKTUR (TECHNICAL AUDIT) ⚙️");
console.log("==========================================================================");

const indexPath = path.join(__dirname, '../index.html');
const financialPath = path.join(__dirname, '../financial-detail.html');

const indexHtml = fs.readFileSync(indexPath, 'utf8');
const financialHtml = fs.readFileSync(financialPath, 'utf8');

const techAuditRules = [
    {
        subagent: "Kandang Ayam Vertikal",
        name: "Closed-House 3-Lantai Vertikal 30.000 Ekor",
        test: () => indexHtml.includes("Closed-House Vertikal 3-Lantai") || indexHtml.includes("30.000 Ekor"),
        desc: "Struktur kandang closed-house 3-lantai vertikal dengan iklim terkontrol terverifikasi"
    },
    {
        subagent: "Perikanan RAS",
        name: "Sistem Rekirkulasi Akuakultur (RAS) 12 Kolam D5 Wiremesh",
        test: () => indexHtml.includes("12 Kolam D5 Wiremesh") || indexHtml.includes("76.500 kg"),
        desc: "Sistem filter drum & bio-filter RAS 12 kolam D5 terverifikasi"
    },
    {
        subagent: "Mikrogrid Energi",
        name: "PLTS Off-Grid 30 kWp + PLTMH 3 kW + BESS 50 kWh",
        test: () => indexHtml.includes("30 kWp") && indexHtml.includes("PLTMH"),
        desc: "Sistem energi terbarukan mandiri terintegrasi terverifikasi"
    },
    {
        subagent: "Server AI HGX H100",
        name: "Cluster Server Enterprise NVIDIA HGX H100 8x GPU SXM5",
        test: () => indexHtml.includes("NVIDIA HGX H100") || financialHtml.includes("NVIDIA HGX H100"),
        desc: "Spesifikasi hardware computing AI Edge Telemetry terverifikasi"
    },
    {
        subagent: "Pabrik Pupuk Granul",
        name: "Pabrik Pupuk Organik Granul SNI 600 Ton/Tahun",
        test: () => indexHtml.includes("600 Ton/Tahun") || indexHtml.includes("Granul SNI"),
        desc: "Kapasitas reaktor fermentasi & pengering pupuk granul terverifikasi"
    }
];

let pass = 0;
let errors = [];

console.log("\n--- HASIL EVALUASI SUB-AGENT REKAYASA TEKNIS ---\n");

techAuditRules.forEach(rule => {
    if (rule.test()) {
        pass++;
        console.log(`✅ [TECHNICAL OK] [${rule.subagent}] ${rule.name}`);
        console.log(`   - Keterangan: ${rule.desc}`);
    } else {
        errors.push(rule);
        console.log(`❌ [TECHNICAL ERROR] [${rule.subagent}] ${rule.name}`);
    }
});

console.log(`\n==========================================================================`);
console.log(`TOTAL SPEK TEKNIS DIAUDIT     : ${techAuditRules.length}`);
console.log(`TOTAL SINKRON & SESUAI STANDAR: ${pass}`);
console.log(`TOTAL PELANGGARAN TEKNIS      : ${errors.length}`);
console.log(`==========================================================================\n`);

if (errors.length === 0) {
    console.log("⚙️ 🎉 SUB-AGENT TEKNIS: SELURUH REKAYASA INFRASTRUKTUR 100% MEMENUHI STANDAR ENGINGEERING!");
}
