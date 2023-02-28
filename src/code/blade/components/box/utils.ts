import { AXIS_ALIGNMENT, AXIS_ALIGNMENT_TO_FLEX_MAP } from "./constants";

export const getFlexAlignmentFromAxisAlignment = (
  figmaLayoutAlignment: keyof typeof AXIS_ALIGNMENT
) => {
  return AXIS_ALIGNMENT_TO_FLEX_MAP[figmaLayoutAlignment];
};
