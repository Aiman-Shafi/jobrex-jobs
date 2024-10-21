import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";

export default function AuthenticatedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();
  //   const pathname = useLocation();

  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" />;
  }
  //   if (isSignedIn === false) {
  //     return <Navigate to="/?sign-in=true" />;
  //   }

  // TODO: fix - if no role is found - redirect user
  //   //
  //   if (
  //     user !== undefined &&
  //     !user?.unsafeMetadata?.role &&
  //     pathname !== "/onboard"
  //   ) {
  //     return <Navigate to="/onboard" />;
  //   }
  return children;
}
