// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "./components/ui/accordion";
// import "./App.css";
// import { Button } from "./components/ui/button";
import { ThemeProvider } from "./components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Root from "./layouts/Root";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
