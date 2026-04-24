import { Link as ScrollLink, Element } from "react-scroll";
import Hero from "../components/hero";
import Contact from "../components/contact";
import Projects from "../components/projects";
import About from "../components/about";
import Testimonials  from "../components/testimonials";
import Experience from "../components/experience";

export default function HomePage() {
  
  return (
    <div className="overflow-hidden">
      <Hero />
      <About />
      <Projects />
      <Element name="experience">
        <Experience />
      </Element>
      <Testimonials />
      <Contact />
    </div>
  );
}