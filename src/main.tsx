import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </ThemeProvider>
);
