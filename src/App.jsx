import { ThemeProvider } from "./components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Root from "./layouts/Root";
import AllJobs from "./pages/AllJobs";
import MyJobs from "./pages/MyJobs";
import JobDetails from "./pages/JobDetails";
import Onboard from "./pages/Onboard";

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
      {
        path: "/jobs",
        element: <AllJobs />,
      },
      {
        path: "/my-jobs",
        element: <MyJobs />,
      },
      {
        path: "/job/:id",
        element: <JobDetails />,
      },
      {
        path: "/onboard",
        element: <Onboard />,
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
