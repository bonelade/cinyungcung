const { execSync } = require('child_process');
const path = require('path');

console.log("==========================================================================");
console.log("👑 MASTER ORCHESTRATOR MULTI-AGENT AUDIT SUITE (10 SPECIALIZED SUB-AGENTS) 👑");
console.log("==========================================================================");
console.log("Menjalankan 10 Sub-Agent Auditor Domain Khusus secara sekuensial & paralel...\n");

const subagents = [
    { id: "AGENT-01", name: "Financial Model & DCF Calculation Audit Sub-Agent", script: "audit_financial.js" },
    { id: "AGENT-02", name: "Visual Design & 842px Layout Audit Sub-Agent", script: "audit_design.js" },
    { id: "AGENT-03", name: "Cross-Chapter Data Consistency Audit Sub-Agent", script: "audit_proposal.js" },
    { id: "AGENT-04", name: "Engineering & Infrastructure Technical Sub-Agent", script: "audit_technical.js" },
    { id: "AGENT-05", name: "Legal, ESG & AMDAL Compliance Sub-Agent", script: "audit_compliance.js" },
    { id: "AGENT-06", name: "Marketing, Sales & MBG Partnership Sub-Agent", script: "audit_marketing.js" },
    { id: "AGENT-07", name: "Operational Risk & Mitigation Matrix Sub-Agent", script: "audit_risk.js" },
    { id: "AGENT-08", name: "Human Capital, Structure & Welfare Sub-Agent", script: "audit_human_capital.js" },
    { id: "AGENT-09", name: "Agro-Bio Circular System & Zero Waste Sub-Agent", script: "audit_agri_bio.js" },
    { id: "AGENT-10", name: "Cyber-Physical IoT 4.0 & AI Cluster Sub-Agent", script: "audit_iot_security.js" }
];

let overallPass = true;
let summaryReport = [];

subagents.forEach((agent) => {
    console.log(`\n--------------------------------------------------------------------------`);
    console.log(`▶ [${agent.id}] MENJALANKAN: ${agent.name.toUpperCase()}...`);
    console.log(`--------------------------------------------------------------------------`);
    
    try {
        const scriptPath = path.join(__dirname, agent.script);
        const output = execSync(`node "${scriptPath}"`, { encoding: 'utf8' });
        console.log(output);
        summaryReport.push({ id: agent.id, name: agent.name, status: "100% LULUS & SINKRON ✅" });
    } catch (err) {
        overallPass = false;
        console.error(`❌ [${agent.id}] DIKECEWAKAN OLEH KETIDAKSESUAIAN:`, err.message);
        summaryReport.push({ id: agent.id, name: agent.name, status: "DITEMUKAN PELANGGARAN ❌" });
    }
});

console.log("\n==========================================================================");
console.log("📊 RINGKASAN REKAPITULASI AUDIT SYSTEM ORCHESTRATOR LENGKAP (10 SUB-AGENTS) 📊");
console.log("==========================================================================");

summaryReport.forEach(item => {
    console.log(`- ${item.id} | ${item.name.padEnd(54)} : ${item.status}`);
});

console.log("==========================================================================");

if (overallPass) {
    console.log("\n🏆 🎉 MASTER SYSTEM RESULT: SELURUH 10 SUB-AGENT AUDITOR PEMBERITAHUAN 100% PERFECT SCORE!");
    console.log("DOKUMEN PROPOSAL KAWASAN KETAHANAN PANGAN TERPADU CINYUNGCUNG 2026 SIAP SIAR & TERPROTEKSI REKAYASA TOTAL!\n");
} else {
    console.log("\n⚠️ PERINGATAN: DITEMUKAN PELANGGARAN PADA BEBERAPA SUB-AGENT AUDITOR!\n");
}
