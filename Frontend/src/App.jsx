import { Route , Routes , useLocation} from "react-router-dom";
import Navbar from "../src/components/Navbar.jsx";
import Home from "../src/components/Home.jsx";
import Footer from "../src/components/Footer.jsx";
import Blogs from "../src/Pages/Blogs.jsx";
import About from "../src/Pages/About.jsx";
import Contact from "../src/Pages/Contact.jsx";
import Login from "../src/Pages/Login.jsx";
import Register from "../src/Pages/Register.jsx";
import Dashboard from "../src/Pages/Dashboard.jsx";
import Creators from "../src/Pages/Creators.jsx"
import { useAuth } from "./context/AuthProvider.jsx";



function App() {

  const location = useLocation();
  const hideNavbarFooter = ["/dashboard" , "/login" , "/register"].includes(
    location.pathname
  );
  const {blogs}=useAuth();
  console.log(blogs);
  return <div>
    {!hideNavbarFooter && <Navbar/>}
      <Routes>  
      <Route exact path="/" element ={<Home />} />
        <Route exact path="/Blogs" element ={<Blogs />} />
        <Route exact path="/about" element ={<About />} /> 
        <Route exact path="/contact" element ={<Contact />} />
        <Route exact path="/creators" element={<Creators />} />
        <Route exact path="/login" element ={<Login />} />
        <Route exact path="/register" element ={<Register />} />
        <Route exact path="/dashboard" element ={<Dashboard />} />
      
      </Routes>

      {!hideNavbarFooter && <Footer/>}
 
    </div>;

}

export default App;