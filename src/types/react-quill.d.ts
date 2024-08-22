// src/types/react-quill.d.ts

declare module 'react-quill' {
    import * as React from 'react';
  
    interface QuillEditorProps {
      value: string;
      onChange: (content: string, delta: Delta, source: Sources, editor: UnprivilegedEditor) => void;
      theme?: string;
      modules?: { [key: string]: any };
      formats?: string[];
      bounds?: string | HTMLElement;
      placeholder?: string;
      readOnly?: boolean;
      scrollingContainer?: string | HTMLElement;
      preserveWhitespace?: boolean;
    }
  
    type Delta = any; // You can replace `any` with a more specific type if needed
    type Sources = 'api' | 'user' | 'silent';
    type UnprivilegedEditor = {
      getHTML: () => string;
      getText: (length?: number) => string;
      getLength: () => number;
    };
  
    class QuillEditor extends React.Component<QuillEditorProps> {}
  
    export default QuillEditor;
  }
  