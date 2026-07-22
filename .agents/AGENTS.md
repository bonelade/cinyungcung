# Rules for Cinyuncung Proposal Workspace

## Continuous Flow Layout Standard ("Loss Doll Sampai Bawah")
1. **Uniform Width Lock (842px Uniform Width Across All Sections)**:
   - All Sheets (`.pdf-a4-sheet` & `.pdf-a4-sheet-landscape`): `width: 842px !important; min-width: 842px !important; max-width: 842px !important; height: auto !important; min-height: 0 !important; max-height: none !important; overflow: visible !important;`.
   - **DO NOT** mix 595px and 842px widths between sections to prevent width jumps. All sections use a uniform width of `842px` with a clean `#EFEFEF` gray background on the left and right sides.
   - **DO NOT** use `overflow: hidden !important;`, `height: 842px !important;`, or forced `page-break-after: always;` / `break-after: page;` on sheet containers.

2. **Natural Content Expansion**:
   - All tables, diagrams, card grids, and text paragraphs MUST expand naturally down the page without any text clipping or vertical truncation.
   - Elements inside sheets must fit their container width (`762px` usable width) with ZERO horizontal overflow.

## Typography Standards
| Role / Element Level | Font Size | Line Height | CSS Tokens & Selectors |
| :--- | :--- | :--- | :--- |
| **Judul Utama Proposal (Cover Title)** | `2.2rem` (35px) | `1.0` | `.cover-title`, `h1.main-title` |
| **Sub-Judul Proposal (Cover Subtitle)** | `1.25rem` (20px) | `1.1` | `.cover-subtitle` |
| **Header 1 / Judul Bab (H2 - Section Title)** | `1.5rem` (24px) | `1.1` | `h2.section-title`, `.pdf-a4-sheet h2` |
| **Header 2 / Sub-Bab (H3 - Sub-section Title)** | `1.15rem` (18.4px) | `1.1` | `h3`, `.pdf-a4-sheet h3` |
| **Header 3 / Judul Tabel/Pilar (H4 - Component Title)** | `0.95rem` (15.2px) | `1.15` | `h4`, `.pdf-a4-sheet h4` |
| **Teks Normal (Body Text / Paragraph)** | `0.84rem` (13.4px) | `1.15` | `p.summary-paragraph`, `.article-paragraph`, `p` |
| **Teks Tabel / Data (Table Cells & Headers)** | `0.68rem` (10.8px) | `1.0` | `.proposal-table td`, `.proposal-table th` |
| **Teks Diagram & Flowchart Nodes** | `0.72rem` (11.5px) | `1.0` | `.flow-step-desc`, `.gov-tier-sub`, `.org-node` |
| **Lencana / Badges / Footer Text** | `0.65rem` (10.4px) | `1.0` | `.flow-step-badge`, `.pdf-a4-footer span`, `.ad-box-tag` |
