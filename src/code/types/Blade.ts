export interface BaseNode {
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

export interface BladeComponentInstanceNode extends BaseNode {
  componentProperties: BladeComponentProperties;
  type: "INSTANCE";
  children: BladeNode[];
  name: string | null;
}

export type BladeNode =
  | BladeComponentInstanceNode
  | BladeFrameNode
  | BladeTextNode
  | BladeGroupNode
  | BladeVectorNode
  | BladeRectangleNode
  | BaseNode;

export interface BladeFrameNode extends BaseNode {
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

export interface BladeTextNode extends BaseNode {
  characters: string;
  type: "TEXT";
  textStyleId: TextNode["textStyleId"];
}

export interface BladeGroupNode extends BaseNode {
  type: "GROUP";
  children: BladeNode[];
}

export interface BladeVectorNode extends BaseNode {
  type: "VECTOR";
}

export interface BladeRectangleNode extends BaseNode {
  type: "RECTANGLE";
}

type JSXType = "string" | "boolean" | "number" | "instance";

export type JSXValue = {
  type: JSXType;
  value: string;
};

export type BladeProps = Record<string, JSXValue>;

export type BladeHelperProps = Record<string, JSXType>;
