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
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import UpdateBlog from "./dashboard/UpdateBlog";
import Detail from "./Pages/Detail";
import Save from "./Pages/Save";
import CreatorProfile from "./components/CreatorProfile";
import ScrollToTop from "./components/ScrollToTop";
import UserProfile from "./components/UserProfile";
import Legal from "./Pages/Legal";
import PropTypes from "prop-types";
import Community from "./Pages/Community";
import BlogLikes from "./dashboard/BlogLikes";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!hideNavbarFooter && <Navbar />}

      {/* Main Content should take all available space */}
      <div className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/creators" element={<Creators />} />
          <Route exact path="/community" element={<Community />} />
          <Route exact path="/blog/:id" element={<Detail />} />
          <Route exact path="/legal" element={<Legal />} />

          {/* Protected Routes */}
          <Route
            exact
            path="/"
            element={
                <Home />
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/dashboard/blog-likes/:blogId"
            element={
              <ProtectedRoute>
                <BlogLikes />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/save"
            element={
              <ProtectedRoute>
                <Save />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/blog/update/:id"
            element={
              <ProtectedRoute>
                <UpdateBlog />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/creator/:creatorId"
            element={<CreatorProfile />}
          />
        </Routes>
      </div>

      <Toaster />

      {/* Footer stays at the bottom */}
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
