import { BladeHelperProps, BladeProps } from "~/code/types/Blade";

export const defaultValues: BladeProps = {
  variant: { value: "primary", type: "string" },
  size: { value: "medium", type: "string" },
  isFullWidth: { value: "false", type: "boolean" },
  iconPosition: { value: "left", type: "string" },
};

export const helpers: BladeHelperProps = {
  onClick: "instance",
};
