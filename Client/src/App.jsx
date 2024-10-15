import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages:
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Dashboard from "./pages/dashboard/Dashboard";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import PostUpdate from "./pages/updatePost/PostUpdate";
import PostPage from "./pages/postPage/PostPage";

// Import components:
import Header from "./components/header/Header";
import FooterCom from "./components/footer/Footer";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import CreatePost from "./pages/createPost/CreatePost";

// App Component:
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:postId" element={<PostUpdate />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
}

// Export Component:
export default App;
