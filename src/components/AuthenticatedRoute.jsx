import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router";

export default function AuthenticatedRoute({ children }) {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" />;
  }
  //   if (isSignedIn === false) {
  //     return <Navigate to="/?sign-in=true" />;
  //   }

  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboard"
  ) {
    return <Navigate to="/onboard" />;
  }
  return children;
}
