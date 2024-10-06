import AboutSection from "@/components/AboutSection";
import LogoCarousel from "@/components/LogoCarousel";
import Reviews from "@/components/Reviews";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main className="max-w-6xl mx-auto">
        <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-4 tracking-tight">
                Launch Your Career Today
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Connect with top companies hiring fresh talent. Your dream job
                is just a click away.
              </p>
              <div className="flex justify-center gap-4 mb-12">
                <Button size="lg">Find Jobs</Button>
                <Button size="lg" variant="outline">
                  Post Jobs
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-12 text-center">
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">
                  10,000+
                </h3>
                <p className="text-muted-foreground">Jobs Available</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">5,000+</h3>
                <p className="text-muted-foreground">Companies Hiring</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">
                  50,000+
                </h3>
                <p className="text-muted-foreground">Successful Placements</p>
              </div>
            </div>
          </div>
        </section>
        <LogoCarousel />
        <AboutSection />
        <h2 className="text-center text-3xl my-10 font-bold">
          Clients Feedback!
        </h2>
        <Reviews />
      </main>
    </>
  );
}
