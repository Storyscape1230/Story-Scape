import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import { Navigate } from "react-router-dom";

// Add custom scrollbar styles
const scrollbarStyles = `
  .dashboard-content::-webkit-scrollbar {
    width: 8px;
  }

  .dashboard-content::-webkit-scrollbar-track {
    background: #000000;
  }

  .dashboard-content::-webkit-scrollbar-thumb {
    background: #333333;
    border-radius: 4px;
  }

  .dashboard-content::-webkit-scrollbar-thumb:hover {
    background: #444444;
  }

  .dashboard-content {
    scrollbar-width: thin;
    scrollbar-color: #333333 #000000;
  }
`;

// Add style tag to document head
const styleSheet = document.createElement("style");
styleSheet.innerText = scrollbarStyles;
document.head.appendChild(styleSheet);

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState(() => {
    // Initialize from localStorage or default to "My Blogs"
    return localStorage.getItem("selectedDashboardComponent") || "My Blogs";
  });

  // Update localStorage when component changes
  useEffect(() => {
    localStorage.setItem("selectedDashboardComponent", component);
  }, [component]);

  console.log(profile);
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-screen bg-[#0B1120] dashboard-content">
      <div className="relative">
        <Sidebar component={component} setComponent={setComponent} />
        <div className="overflow-y-auto h-screen dashboard-content">
          {component === "My Profile" ? (
            <MyProfile />
          ) : component === "Create Blog" ? (
            <CreateBlog />
          ) : component === "Update Blog" ? (
            <UpdateBlog />
          ) : (
            <MyBlogs />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
