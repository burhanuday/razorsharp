export interface BladeNode {
  layerName: string;
  id: string;
  type: SceneNode["type"];
  parent: BladeNode | null;
}

type Children =
  | BladeComponentInstanceNode
  | BladeFrameNode
  | BladeTextNode
  | BladeGroupNode
  | BladeVectorNode
  | BladeRectangleNode;

type BladeComponentProperties = {
  [key: string]:
    | { type: ComponentPropertyType; value: string | boolean }
    | undefined;
};

export interface BladeComponentInstanceNode extends BladeNode {
  componentProperties: BladeComponentProperties;
  type: "INSTANCE";
  children: Children[];
  name: string | null;
}

export interface BladeFrameNode extends BladeNode {
  type: "FRAME";
  children: Children[];
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
  children: Children[];
}

export interface BladeVectorNode extends BladeNode {
  type: "VECTOR";
}

export interface BladeRectangleNode extends BladeNode {
  type: "RECTANGLE";
}

type JSXType = "string" | "boolean" | "number" | "instance";

export type JSXValue = {
  type: JSXType;
  value: string;
};

export type BladeProps = Record<string, JSXValue>;

export type BladeHelperProps = Record<string, JSXType>;
