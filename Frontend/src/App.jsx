import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home";
import Footer from "../src/components/Footer";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Blogs from "./Pages/Blogs";
import About from "./Pages/About";
import Contact from "../src/pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "../src/pages/Dashboard";
import Creators from "./pages/Creators";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import UpdateBlog from "./dashboard/UpdateBlog";
import Detail from "./Pages/Detail";
import Save from "./Pages/Save";
import CreatorProfile from "./components/CreatorProfile";
// import NotFound from "./pages/NotFound";
function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );
  const { blogs, isAuthenticated } = useAuth();
  let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage to maininting the routes protect (Go to login.jsx)
  console.log(blogs); 
  console.log(isAuthenticated); // it is not using because every page refresh it was redirected to /login

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbarFooter && <Navbar />}

      {/* Main Content should take all available space */}
      <div className="flex-grow">
        <Routes>
          <Route
            exact
            path="/"
            element={token ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/creators" element={<Creators />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/save" element={<Save />} />
          <Route path="/creator/:creatorId" element={<CreatorProfile />} />
          <Route exact path="/blog/:id" element={<Detail />} />
          <Route exact path="/blog/update/:id" element={<UpdateBlog />} />
        </Routes>
      </div>

      <Toaster />

      {/* Footer stays at the bottom */}
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
