import React, { useEffect, useState } from "react";
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
    <div className="container">
      <section>
        <CodePreview code={code} />
      </section>
      <nav>
        <ul>
          <li></li>
        </ul>
        <ul>
          <li>
            <a href="#" role="button" onClick={handleCopyClicked}>
              Copy
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
