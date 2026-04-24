import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Root from "../src/components/navbar"; 
import HomePage from "./pages/home";
import About from "./components/about"
import Contact from "./pages/contact";
import Experience from "./components/experience";
import Projects from "./pages/projects";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}


