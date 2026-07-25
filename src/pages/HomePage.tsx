import { Hero, About, Services, Gallery, Calculator, Contact } from "../components/sections";

export function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Calculator />
      <Contact />
    </main>
  );
}