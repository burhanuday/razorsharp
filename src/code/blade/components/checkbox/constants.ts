import { BladeHelperProps, BladeProps } from "~/code/types/Blade";

export const checkboxDefaultValues: BladeProps = {
  size: {
    type: "string",
    value: "medium",
  },
  helpText: {
    type: "string",
    value: "",
  },
};

export const checkboxHelpers: BladeHelperProps = {
  onChange: "instance",
  isChecked: "boolean",
};
