// import { ModeToggle } from "@/components/mode-toggle";

import ThemeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";

export default function Header() {
  const [showSignIn, setShowSignIn] = useState(false);
  const { user } = useUser();
  const [search, setSearch] = useSearchParams();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  return (
    <header className="py-10">
      <div className="flex justify-between max-w-6xl mx-auto items-center">
        <div className="logo font-thin text-2xl">
          <Link to={"/"}>JOBREX</Link>
        </div>
        <nav>
          <ul className="flex gap-4">
            <li>
              <NavLink to="/jobs">Jobs</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Company</NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SignedOut>
            <Button onClick={() => setShowSignIn(true)}>Login</Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata.role === "recruiter" && (
              <Button>
                <Link to="/post-job">Post Job</Link>
              </Button>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "size-10",
                },
              }}
            >
              <UserButton.MenuItems>
                {user?.unsafeMetadata.role === "recruiter" ? (
                  <UserButton.Link
                    label="My Jobs"
                    labelIcon={<Briefcase size={15} />}
                    href="/my-jobs"
                  />
                ) : (
                  <UserButton.Link
                    label="My Applications"
                    labelIcon={<Briefcase size={15} />}
                    href="/my-jobs"
                  />
                )}
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>

          {showSignIn && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-slate-900/80 z-50"
              onClick={handleOverlayClick}
            >
              <SignIn
                signUpForceRedirectUrl="/onboard"
                fallbackRedirectUrl="/onboard"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
