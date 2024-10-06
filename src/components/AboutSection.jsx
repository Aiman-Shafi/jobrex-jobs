import { Button } from "./ui/button";

export default function AboutSection() {
  return (
    <section className="py-24 min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary">
              About JobRex
            </h2>
            <p className="text-lg mb-6 text-muted-foreground">
              JobRex is dedicated to helping recent graduates and newcomers to
              the job market find their perfect career start. We understand the
              challenges of entering the workforce and have tailored our
              platform to support your journey.
            </p>
            <p className="text-lg mb-6 text-muted-foreground">
              Our mission is to bridge the gap between talented freshers and
              companies looking for fresh perspectives. With personalized job
              matches, career resources, and a supportive community, we're here
              to help you take your first step towards a successful career.
            </p>
            <Button size="lg">Learn More</Button>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1506784926709-22f1ec395907?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Team working together"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
