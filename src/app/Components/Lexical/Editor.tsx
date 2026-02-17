import React, { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $convertFromMarkdownString, $convertToMarkdownString } from "@lexical/markdown";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import AutoIdHeaderPlugin from "./plugins/AutoIdHeaderPlugin";
import { TABLE_TRANSFORMER } from "./plugins/TableTransformer";
import Nodes from "./Nodes";
import { theme } from "./Theme";
import styles from "./Editor.module.scss";

const ALL_TRANSFORMERS = [
  ...TRANSFORMERS,
  TABLE_TRANSFORMER
];

// Initial state plugin to load markdown
function MarkdownPlugin({ markdown }: { markdown: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Only update if content is completely different to avoid losing cursor
    // or disrupting user input (IME).
    editor.update(() => {
      const currentMarkdown = $convertToMarkdownString(ALL_TRANSFORMERS);
      if (currentMarkdown !== markdown) {
        console.log("[Editor] MarkdownPlugin: Updating markdown content");
        $convertFromMarkdownString(markdown, ALL_TRANSFORMERS);
      } else {
        console.log("[Editor] MarkdownPlugin: Markdown content identical, skipping update");
      }
    });
  }, [markdown, editor]);

  return null;
}

// Capture changes and convert back to markdown
function OnChangeMarkdown({ onChange }: { onChange: (markdown: string) => void }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const markdown = $convertToMarkdownString(ALL_TRANSFORMERS);
        onChange(markdown);
      });
    });
  }, [editor, onChange]);

  return null;
}

interface EditorProps {
  initialMarkdown: string;
  onChange?: (markdown: string) => void;
  readOnly?: boolean;
}

export default function Editor({ initialMarkdown, onChange, readOnly = false }: EditorProps) {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    nodes: Nodes,
    onError: (error: Error) => {
      console.error(error);
    },
    editable: !readOnly,
  };

  return (
    <div className={`${styles.editorContainer} ${readOnly ? styles.readOnly : ""}`}>
      <LexicalComposer initialConfig={initialConfig}>
        <div className={styles.editorInner}>
          <RichTextPlugin
            contentEditable={<ContentEditable className={styles.editorInput} />}
            placeholder={!readOnly ? <div className={styles.editorPlaceholder}>Start typing...</div> : null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <TablePlugin />
          <AutoIdHeaderPlugin />
          <MarkdownShortcutPlugin transformers={ALL_TRANSFORMERS} />
          
          {/* Plugin to load initial markdown */}
          <MarkdownPlugin markdown={initialMarkdown} />
          
          {/* Plugin to export markdown changes if editable */}
          {!readOnly && onChange && <OnChangeMarkdown onChange={onChange} />}
        </div>
      </LexicalComposer>
    </div>
  );
}
