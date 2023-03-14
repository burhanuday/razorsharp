import { Checkbox } from "../Checkbox/Checkbox";
import { JSXInternal } from "preact/src/jsx";
import { useState } from "preact/hooks";
import { GENERATE_HELPERS_DEFAULT_VALUE } from "~/constants/defaults";

export const Preferences = () => {
  const [addHelpers, setAddHelpers] = useState(GENERATE_HELPERS_DEFAULT_VALUE);

  const handleChange = (
    e: JSXInternal.TargetedEvent<HTMLInputElement, Event>
  ) => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "preference",
          key: "helpers",
          value: e.currentTarget.checked,
        },
      },
      "*"
    );
    setAddHelpers(e.currentTarget.checked);
  };

  return (
    <>
      <Checkbox
        value={addHelpers}
        onChange={handleChange}
        label="[experimental] Generate helper props (eg. value, onChange)"
      />
    </>
  );
};
