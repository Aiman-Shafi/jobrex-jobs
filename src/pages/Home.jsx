import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
              Find Your Dream Job Today
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl dark:text-gray-200">
              Discover thousands of job opportunities from top companies around
              the world. Your next career move starts here.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <Button
              className="w-full bg-white text-purple-600 hover:bg-gray-100"
              size="lg"
            >
              <Search className="mr-2 h-4 w-4" />
              Search Jobs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
