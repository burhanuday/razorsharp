import { BladeProps } from "~/code/types/Blade";
import { attributes } from "./attributes";
import { indent } from "./indent";
import { isJSXValueEmpty } from "./isJSXValueEmpty";
import { newLine } from "./newLine";

const filterPropsWithDefaultValues = (
  props: BladeProps,
  defaultValues: BladeProps
): BladeProps => {
  const filteredProps: BladeProps = {};
  Object.entries(props).forEach(([key, jsxValue]) => {
    if (!key || isJSXValueEmpty(jsxValue)) {
      return;
    }

    if (
      isJSXValueEmpty(defaultValues[key]) ||
      jsxValue.type !== defaultValues[key].type ||
      jsxValue.value !== defaultValues[key].value
    ) {
      filteredProps[key] = jsxValue;
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
