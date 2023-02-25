import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";
//fonts
// LATO
// import "@fontsource/lato/400.css";
// import "@fontsource/lato/400-italic.css";
// import "@fontsource/lato/700.css";
// import "@fontsource/lato/700-italic.css";

const container: HTMLElement | null = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
