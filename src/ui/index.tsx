import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

const container: HTMLElement | null = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
