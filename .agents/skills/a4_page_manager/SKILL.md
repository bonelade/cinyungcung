---
name: a4_page_manager
description: Rules and instructions for managing A4 (595x842px) document sheets, layout locking, and automatic content overflow pagination to next pages.
---

# A4 Page Manager & Auto-Pagination Skill

Use this skill whenever adding or modifying content in document sheets (`index.html` / `styles.css`).

## Core Sizing Rules:
- Portrait Sheet (`.pdf-a4-sheet`): `width: 595px !important; height: 842px !important; padding: 40px 35px 25px 35px !important; overflow: hidden !important;`
- Usable Content Box: `525px` max width x `777px` max height.

## Mandatory Auto-Pagination Workflow:
1. **Detect Overflow**: Calculate if total content height in a `.pdf-a4-sheet` exceeds 777px (or pushes close to bottom margin / footer).
2. **Create Next Page Sheet**: If content overflows:
   - Create a new `.pdf-a4-sheet` container immediately after the current sheet.
   - Move excess paragraphs, table rows, diagram nodes, or sub-sections into the new sheet.
3. **Sequential Footer**: Add `.pdf-a4-footer` at the bottom of the new sheet with incremented page number (`Halaman N+1`).
4. **Height Fit Balance**: Adjust font sizes, line heights, and padding on both pages so both sheets are balanced 100% PAS without large whitespace gaps.
