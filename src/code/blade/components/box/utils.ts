import { SPACING_TO_TOKEN } from "../../constants/spacing";
import { AXIS_ALIGNMENT, AXIS_ALIGNMENT_TO_FLEX_MAP } from "./constants";

export const getFlexAlignmentFromAxisAlignment = (
  figmaLayoutAlignment: keyof typeof AXIS_ALIGNMENT
) => {
  return AXIS_ALIGNMENT_TO_FLEX_MAP[figmaLayoutAlignment];
};

export const getTokenFromSpacingValue = (space: number): string => {
  // check if there is a token for the exact value
  if (space in SPACING_TO_TOKEN) {
    return `spacing.${SPACING_TO_TOKEN[space]}`;
  }

  // threshold for the nearest value search
  const THRESHOLD = 2;
  for (const spacingValue in SPACING_TO_TOKEN) {
    if (Object.prototype.hasOwnProperty.call(SPACING_TO_TOKEN, spacingValue)) {
      const token = SPACING_TO_TOKEN[spacingValue];

      if (Math.abs(+spacingValue - space) <= THRESHOLD) {
        return `spacing.${token}`;
      }
    }
  }

  return `${space}px`;
};
