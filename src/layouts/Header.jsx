// import { ModeToggle } from "@/components/mode-toggle";

import ThemeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, SignIn } from "@clerk/clerk-react";
import { Briefcase } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
    }
  };

  return (
    <header className="py-10">
      <div className="flex justify-between max-w-6xl mx-auto items-center">
        <div className="logo font-thin text-2xl">JOBREX</div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SignedOut>
            <Button onClick={() => setShowSignIn(true)}>Login</Button>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "size-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<Briefcase size={15} />}
                  href="/my-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>

          {showSignIn && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-slate-900/80"
              onClick={handleOverlayClick}
            >
              <SignIn
              // signUpForceRedirectUrl="/onboard"
              // signInFallbackRedirectUrl="/onboard"
              // signInForceRedirectUrl="/onboard"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
