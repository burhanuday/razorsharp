import { FunctionComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";
import classNames from "./Checkbox.module.css";

export const Checkbox: FunctionComponent<{
  label: string;
  onChange: JSXInternal.GenericEventHandler<HTMLInputElement>;
  value: boolean;
}> = ({ label, onChange, value }) => {
  return (
    <div>
      <label className={classNames.CheckboxContainer}>
        <input
          className={classNames.Checkbox}
          type="checkbox"
          checked={value}
          onChange={(e) => onChange?.(e)}
        />
        {label}
      </label>
    </div>
  );
};
