import { useMemo } from "preact/hooks";
import Prism from "./prism";
import "./prism.css";

interface CodePreviewProps {
  content: string;
}

export function CodePreview({ content }: CodePreviewProps) {
  const highlighted = useMemo(
    () => Prism.highlight(content, Prism.languages["jsx"], "jsx"),
    [content]
  );

  return (
    <pre className="language-jsx">
      <code
        className="language-jsx"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </pre>
  );
}
