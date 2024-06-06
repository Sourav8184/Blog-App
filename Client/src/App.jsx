import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages:
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/project/Projects";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";

// Import components:
import Header from "./components/header/Header";

// App Component:
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

// Export Component:
export default App;
