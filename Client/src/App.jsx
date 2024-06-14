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
import FooterCom from "./components/footer/Footer";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import AdminPrivateRoute from "./components/adminPrivateRoute/AdminPrivateRoute";
import CreatePost from "./pages/createPost/CreatePost";
import PostUpdate from "./pages/updatePost/PostUpdate";

// App Component:
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<PostUpdate />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
}

// Export Component:
export default App;
