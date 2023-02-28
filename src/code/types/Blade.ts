export interface BladeNode {
  layerName: string;
  id: string;
  type: SceneNode["type"];
  parent: BladeNode | null;
}

export interface BladeComponentInstanceNode extends BladeNode {
  componentProperties: ComponentProperties;
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

export type JSXValue = {
  type: "string" | "boolean" | "number" | "instance";
  value: string;
};

export type BladeProps = Record<string, JSXValue>;
