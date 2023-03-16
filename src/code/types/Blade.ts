export interface BladeNode {
  layerName: string;
  id: string;
  type: SceneNode["type"];
  parent: BladeNode | null;
}

type BladeComponentProperties = {
  [key: string]:
    | { type: ComponentPropertyType; value: string | boolean }
    | undefined;
};

export interface BladeComponentInstanceNode extends BladeNode {
  componentProperties: BladeComponentProperties;
  type: "INSTANCE";
  children: BladeNode[];
  name: string | null;
}

export interface BladeFrameNode extends BladeNode {
  type: "FRAME";
  children: BladeNode[];
  layoutMode: FrameNode["layoutMode"];
  primaryAxisAlignItems: FrameNode["primaryAxisAlignItems"];
  counterAxisAlignItems: FrameNode["counterAxisAlignItems"];
  paddingLeft: number;
  paddingRight: number;
  paddingBottom: number;
  paddingTop: number;
  itemSpacing: number;
}

export interface BladeTextNode extends BladeNode {
  characters: string;
  type: "TEXT";
  textStyleId: TextNode["textStyleId"];
}

export interface BladeGroupNode extends BladeNode {
  type: "GROUP";
  children: BladeNode[];
}

type JSXType = "string" | "boolean" | "number" | "instance";

export type JSXValue = {
  type: JSXType;
  value: string;
};

export type BladeProps = Record<string, JSXValue>;

export type BladeHelperProps = Record<string, JSXType | JSXValue>;

export const isJSXValue = (value: any): value is JSXValue => {
  return typeof value === "object" && value.type && value.value;
};

export const isJSXType = (value: any): value is JSXType => {
  return (
    typeof value === "string" &&
    ["string", "boolean", "number", "instance"].includes(value)
  );
};
