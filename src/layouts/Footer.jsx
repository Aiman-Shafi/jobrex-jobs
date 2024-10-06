import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="dark:bg-background bg-primary text-white dark:border-t-2 mt-40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About FresherJobs</h3>
            <p className="text-sm">
              FresherJobs is dedicated to helping recent graduates and newcomers
              find their perfect career start.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-foreground/80">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-primary-foreground/80">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-primary-foreground/80">
                <Linkedin size={20} />
                <span className="sr-only">aedIn</span>
              </a>
              <a href="#" className="hover:text-primary-foreground/80">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick as</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:underline">
                  Find Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  For Employers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Career Advice
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  CV Templates
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Interview Tips
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for the latest job opportunities and
              career tips.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground text-primary"
              />
              <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} FresherJobs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
