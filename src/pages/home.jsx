
import Hero from "../components/hero";
import Contact from "../pages/contact";
import Projects from "../pages/projects";
import About from "../pages/about";
import Testimonials from "../components/testimonials";
import Service from "./services";



export default function HomePage() {
  
  return (
    <div className="overflow-hidden">
      
      <Hero />
      <About />
      <Projects />
      <Service />
      <Testimonials />
      <Contact />
    </div>
  );
}