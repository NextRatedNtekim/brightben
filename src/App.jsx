import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Root from "../src/components/navbar"; 
import HomePage from "./pages/home";
import About from "./pages/about"
import Contact from "./pages/contact";
import Projects from "./pages/projects";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

