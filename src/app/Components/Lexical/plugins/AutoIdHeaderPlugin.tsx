import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { $isHeadingNode } from "@lexical/rich-text";

import { slugify } from "@/utils/markdownUtils";

export default function AutoIdHeaderPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const headings = root.getChildren().filter((node) => $isHeadingNode(node));

        const idCounts: { [key: string]: number } = {};

        headings.forEach((node) => {
          const key = node.getKey();
          const dom = editor.getElementByKey(key);
          if (dom) {
            const text = node.getTextContent();
            let id = slugify(text);

            if (idCounts[id]) {
              idCounts[id]++;
              id = `${id}-${idCounts[id] - 1}`;
            } else {
              idCounts[id] = 1;
            }

            if (dom.id !== id) {
              console.log(`[AutoIdHeaderPlugin] Assigning ID: ${id} to`, dom);
              dom.id = id;
            }
          }
        });
      });
    });
  }, [editor]);

  return null;
}
