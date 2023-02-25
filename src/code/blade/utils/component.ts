import { BladeProps } from "~/code/types/Blade";
import { attributes } from "./attributes";
import { indent } from "./indent";
import { newLine } from "./newLine";

const filterPropsWithDefaultValues = (
  props: BladeProps,
  defaultValues: BladeProps
): BladeProps => {
  const filteredProps = {};
  Object.entries(props).forEach(([key, value]) => {
    if (value !== defaultValues[key]) {
      filteredProps[key] = value;
    }
  });

  return filteredProps;
};

type Options = {
  props: BladeProps;
  defaultValues: BladeProps;
  children?: string;
};

export const component = (
  componentName: string,
  options: Options = {
    props: {},
    defaultValues: {},
    children: "",
  }
) => {
  const { props, defaultValues, children = "" } = options;

  let code = newLine("<" + componentName);

  const filteredProps = filterPropsWithDefaultValues(props, defaultValues);
  const propsLength = Object.keys(filteredProps).length;

  code += attributes(filteredProps);

  const shouldUseNewLine = propsLength > 0;

  if (!children || children.length === 0) {
    code += shouldUseNewLine ? newLine("/>") : "/>";
  } else {
    code += shouldUseNewLine ? newLine(">") : ">";
    code += indent(children.startsWith("\n") ? children : newLine(children));
    code += newLine("</" + componentName + ">");
  }

  return code;
};
