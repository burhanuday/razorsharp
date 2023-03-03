import { useMemo } from "preact/hooks";
import Prism from "./prism";
import "./prism.css";

interface CodePreviewProps {
  content: string;
  language?: string;
}

export function CodePreview({
  content,
  language = "jsx",
}: CodePreviewProps): JSX.Element {
  const highlighted = useMemo(
    () => Prism.highlight(content, Prism.languages["jsx"], "jsx"),
    [content, language]
  );

  return (
    <pre>
      <code
        className="language-jsx"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </pre>
  );
}
