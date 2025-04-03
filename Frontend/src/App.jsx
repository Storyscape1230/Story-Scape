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
import ScrollToTop from "./components/ScrollToTop";
import UserProfile from "./components/UserProfile";
import Legal from "./Pages/Legal";
import PropTypes from 'prop-types';


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2A3B5C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg mt-4 text-[#6B7280]">Loading...</p>
        </div>
      </div>
    );
  }   

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
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
          <Route path="/creator/:creatorId" element={<CreatorProfile />} />
          <Route exact path="/blog/:id" element={<Detail />} />
          <Route exact path="/legal" element={<Legal />} />

          {/* Protected Routes */}
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
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
        </Routes>
      </div>

      <Toaster />

      {/* Footer stays at the bottom */}
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
