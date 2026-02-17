import {
  $createTableCellNode,
  $createTableNode,
  $createTableRowNode,
  $isTableCellNode,
  $isTableNode,
  $isTableRowNode,
  TableCellHeaderStates,
  TableCellNode,
  TableNode,
  TableRowNode,
} from "@lexical/table";
import {
  $createParagraphNode,
  $isElementNode,
  $isParagraphNode,
  $createTextNode,
  ElementNode,
  LexicalNode,
} from "lexical";
import { Transformer } from "@lexical/markdown";

// Table transformer handling GFM tables.

// We need a MultilineElementTransformer
export const TABLE_TRANSFORMER: Transformer = {
  dependencies: [TableNode, TableRowNode, TableCellNode],
  type: "multiline-element",
  regExpStart: /^\|(.+)\|$/,
  regExpEnd: {
    optional: true,
    regExp: /^$/, // End on empty line
  },
  replace: (
    rootNode,
    children,
    startMatch,
    endMatch,
    linesInBetween
  ) => {
    const tableNode = $createTableNode();
    const allLines = [startMatch[0], ...(linesInBetween || [])];

    // Check for header separator row (e.g. |---|---|)
    // usually it's the second line.
    let hasHeader = false;
    if (allLines.length >= 2) {
        const secondLine = allLines[1].trim();
        if (/^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(secondLine)) {
            hasHeader = true;
            // Remove the separator line from data processing
            allLines.splice(1, 1);
        }
    }

    allLines.forEach((line, rowIndex) => {
        // Basic pipe splitting, doesn't handle escaped pipes \|
        const cells = line.split("|").filter((_, i, arr) => {
             // filter empty first/last if they are empty strings (common in | a | format)
             if (i === 0 && _.trim() === "") return false;
             if (i === arr.length - 1 && _.trim() === "") return false;
             return true;
        });

        const rowNode = $createTableRowNode();
        
        cells.forEach((cellText) => {
            // Header state
            const isHeader = hasHeader && rowIndex === 0;
            const cellNode = $createTableCellNode(
                isHeader ? TableCellHeaderStates.ROW : TableCellHeaderStates.NO_STATUS
            );
            
            const paragraph = $createParagraphNode();
            paragraph.append($createTextNode(cellText.trim()));
            cellNode.append(paragraph);
            rowNode.append(cellNode);
        });

        tableNode.append(rowNode);
    });

    rootNode.append(tableNode);
    return true; 
  },
  export: (node) => {
      if (!$isTableNode(node)) return null;
      
      const rows = node.getChildren();
      const outputLines: string[] = [];
      const columnWidths: number[] = [];

      // First pass: get content and calculate widths (optional, but good for styling)
      const grid: string[][] = [];
      
      rows.forEach((row) => {
           if (!$isTableRowNode(row)) return;
           const rowContent: string[] = [];
           row.getChildren().forEach((cell, i) => {
               if (!$isTableCellNode(cell)) return;
               const text = cell.getTextContent();
               rowContent.push(text);
               columnWidths[i] = Math.max(columnWidths[i] || 3, text.length);
           });
           grid.push(rowContent);
      });

      // Construct strings
      grid.forEach((row, rowIndex) => {
          const line = "| " + row.map((text, i) => text.padEnd(columnWidths[i])).join(" | ") + " |";
          outputLines.push(line);

          // Add separator after first row
          if (rowIndex === 0) {
               const separator = "| " + columnWidths.map(w => "-".repeat(w)).join(" | ") + " |";
               outputLines.push(separator);
          }
      });

      return outputLines.join("\n");
  }
};
