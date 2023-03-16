import { useState, useEffect } from "preact/hooks";
import { CodePreview } from "./components/CodePreview/CodePreview";
import { ToastProvider } from "./providers/Toast";
import { ToastManager } from "./components/ToastManager/ToastManager";
import { Message, Result } from "~/types/MessageTypes";
import { Preferences } from "./components/Preferences/Preferences";

const emptyPlaceholder: Result = {
  component: "Empty",
  imports: "Empty",
};

export function App() {
  const [code, setCode] = useState<Result>(emptyPlaceholder);

  useEffect(() => {
    onmessage = (event: Message) => {
      if (!event.data.pluginMessage) {
        return;
      }

      if (event.data.pluginMessage.type === "empty") {
        setCode(emptyPlaceholder);
      }

      if (event.data.pluginMessage.type === "result") {
        const { component, imports } = event.data.pluginMessage;
        setCode({ component, imports });
      }
    };
  }, []);

  return (
    <ToastProvider>
      <section>
        <CodePreview content={code.imports} />
        <CodePreview content={code.component} />
      </section>
      <Preferences />
      <ToastManager />
    </ToastProvider>
  );
}
