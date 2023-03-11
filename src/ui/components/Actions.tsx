import { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import copy from "clipboard-copy";

import { ToastContext } from "../providers/Toast";

export const Actions: FunctionComponent<{
  code: string;
}> = ({ code }) => {
  const { showToast } = useContext(ToastContext);

  const handleCopyClicked = () => {
    copy(code);
    showToast("✅ Copied to clipboard");
  };

  return (
    <section className="section__actions">
      <button className="button button-primary" onClick={handleCopyClicked}>
        Copy
      </button>
    </section>
  );
};
