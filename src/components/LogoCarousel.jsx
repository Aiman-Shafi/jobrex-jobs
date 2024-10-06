export default function LogoCarousel() {
  const logos = [
    {
      name: "Company 1",
      src: "https://pngimg.com/d/google_PNG19644.png",
    },
    {
      name: "Company 1",
      src: "https://pngimg.com/d/google_PNG19644.png",
    },
    {
      name: "Company 1",
      src: "https://pngimg.com/d/google_PNG19644.png",
    },
    {
      name: "Company 1",
      src: "https://pngimg.com/d/google_PNG19644.png",
    },
    {
      name: "Company 1",
      src: "https://pngimg.com/d/google_PNG19644.png",
    },
    {
      name: "Company 1",
      src: "https://pngimg.com/d/google_PNG19644.png",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8 text-primary">
          Trusted by Leading Companies
        </h2>
        <div className="flex overflow-hidden space-x-12">
          <div className="flex space-x-12 animate-carousel">
            {logos.concat(logos).map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-[200px]"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  width={200}
                  height={80}
                  className="object-contain grayscale"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
