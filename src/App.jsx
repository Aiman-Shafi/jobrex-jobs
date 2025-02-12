import { ThemeProvider } from "./components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Root from "./layouts/Root";
import AllJobs from "./pages/AllJobs";
import MyJobs from "./pages/MyJobs";
import JobDetails from "./pages/JobDetails";
import Onboard from "./pages/Onboard";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import PostJob from "./pages/PostJob";
import { Toaster } from "react-hot-toast";

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
        element: (
          <AuthenticatedRoute>
            <AllJobs />
          </AuthenticatedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <AuthenticatedRoute>
            <MyJobs />
          </AuthenticatedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <AuthenticatedRoute>
            <JobDetails />
          </AuthenticatedRoute>
        ),
      },
      {
        path: "/onboard",
        element: (
          <AuthenticatedRoute>
            <Onboard />
          </AuthenticatedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <AuthenticatedRoute>
            <PostJob />
          </AuthenticatedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: "#fffff",
              color: "#363636",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              iconTheme: {
                primary: "green",
                secondary: "white",
              },
            },
          }}
        />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
