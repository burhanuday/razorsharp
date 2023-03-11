import { useState, useEffect } from "preact/hooks";
import { CodePreview } from "./components/CodePreview";
import { ToastProvider } from "./providers/Toast";
import { ToastManager } from "./components/ToastManager/ToastManager";
import { Actions } from "./components/Actions";

const emptyPlaceholder = "Empty";

export function App() {
  const [code, setCode] = useState<string>(emptyPlaceholder);

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
    <ToastProvider>
      <div>
        <Actions code={code} />
        <section>
          <CodePreview content={code} />
        </section>
      </div>
      <ToastManager />
    </ToastProvider>
  );
}
