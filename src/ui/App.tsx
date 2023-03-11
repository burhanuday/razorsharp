import { useState, useEffect } from "preact/hooks";
import copy from "clipboard-copy";
import { CodePreview } from "./components/CodePreview";

const emptyPlaceholder = "Empty";

export function App() {
  const [code, setCode] = useState<string>(emptyPlaceholder);

  const handleCopyClicked = () => {
    copy(code);
  };

  useEffect(() => {
    onmessage = (event) => {
      if (!event.data.pluginMessage) {
        return;
      }

      if (event.data.pluginMessage.type === "empty") {
        setCode(emptyPlaceholder);
      }

      if (event.data.pluginMessage.type === "result") {
        const codeData = event.data.pluginMessage.data;
        setCode(codeData.trim());
      }
    };
  }, []);

  return (
    <div>
      <section className="section__actions">
        <button className="button button-primary" onClick={handleCopyClicked}>
          Copy
        </button>
      </section>
      <section>
        <CodePreview content={code} />
      </section>
    </div>
  );
}
