const { execSync } = require('child_process');
const path = require('path');

console.log("==========================================================================");
console.log("👑 MASTER ORCHESTRATOR MULTI-AGENT AUDIT SYSTEM PROPOSAL CINYUNGCUNG 👑");
console.log("==========================================================================");
console.log("Menjalankan 5 Sub-Agent Auditor secara sekuensial & paralel...\n");

const subagents = [
    { id: "AGENT-01", name: "Financial Model & DCF Audit Sub-Agent", script: "audit_financial.js" },
    { id: "AGENT-02", name: "Visual Design & 842px Layout Audit Sub-Agent", script: "audit_design.js" },
    { id: "AGENT-03", name: "Cross-Chapter Data Consistency Audit Sub-Agent", script: "audit_proposal.js" },
    { id: "AGENT-04", name: "Engineering & Infrastructure Technical Sub-Agent", script: "audit_technical.js" },
    { id: "AGENT-05", name: "Legal, ESG & AMDAL Compliance Sub-Agent", script: "audit_compliance.js" }
];

let overallPass = true;
let summaryReport = [];

subagents.forEach((agent, index) => {
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
console.log("📊 RINGKASAN AUDIT SYSTEM ORCHESTRATOR LENGKAP (5 SUB-AGENTS) 📊");
console.log("==========================================================================");

summaryReport.forEach(item => {
    console.log(`- ${item.id} | ${item.name.padEnd(50)} : ${item.status}`);
});

console.log("==========================================================================");

if (overallPass) {
    console.log("\n🏆 🎉 MASTER SYSTEM RESULT: SELURUH 5 SUB-AGENT AUDITOR LOG PEMBERITAHUAN 100% PERFECT SCORE!");
    console.log("DOKUMEN PROPOSAL KAWASAN TERPADU CINYUNGCUNG 2026 SIAP DITERBITKAN/DIPRESENTASIKAN!\n");
} else {
    console.log("\n⚠️ PERINGATAN: DITEMUKAN PELANGGARAN PADA BEBERAPA SUB-AGENT AUDITOR!\n");
}
