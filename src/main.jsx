import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
// import { dark } from "@clerk/themes";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const FRONTEND_API = "https://pleased-mastiff-0.clerk.accounts.dev";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      frontendApi={FRONTEND_API}
      afterSignOutUrl="/"
      // appearance={{
      //   baseTheme: dark,
      // }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
);
