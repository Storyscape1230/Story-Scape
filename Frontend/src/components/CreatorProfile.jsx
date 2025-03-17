import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Blogs from "../pages/Blogs";


function CreatorProfile() {
  const { creatorId } = useParams(); // Get creatorId from the URL
  const [creator, setCreator] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchCreatorAndBlogs = async () => {
      try {
        // Fetch creator details
        const creatorResponse = await axios.get(
          `http://localhost:8001/api/users/${creatorId}`,
          { withCredentials: true }
        );
        console.log("Creator Response:", creatorResponse.data);

        if (!creatorResponse.data || !creatorResponse.data.user) {
          console.log("Invalid creator data");
          setCreator(null);
          return;
        }

        setCreator(creatorResponse.data.user);

        // Fetch blogs by creator
        const blogsResponse = await axios.get(
          `http://localhost:8001/api/blogs?creator=${creatorId}`,
          { withCredentials: true }
        );
        console.log("Blogs Response:", blogsResponse.data);

        if (!blogsResponse.data || !blogsResponse.data.blogs) {
          console.log("Invalid blogs data");
          setBlogs([]);
          return;
        }

        setBlogs(blogsResponse.data.blogs);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("Creator not found");
          setCreator(null); // Set creator to null to show a "Not Found" message
        } else {
          console.log("Error fetching creator or blogs:", error);
        }
      }
    };
    fetchCreatorAndBlogs();
  }, [creatorId]);

  if (!creator) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-gray-800">Creator Not Found</h1>
        <p className="text-gray-600 mt-2">
          The creator you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <img
            src={creator.photo.url}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
          />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">{creator.name}</h1>
          <p className="text-gray-600">{creator.email}</p>
          <p className="text-gray-600">{creator.phone}</p>
          <p className="text-gray-600">{creator.role}</p>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Blogs by {creator.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((Blog) => (
            <div
              key={Blogs._id.$oid} // Use blog._id.$oid for MongoDB ObjectId
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={Blog.blogImage.url}
                alt="blog"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {blogs.title}
                </h3>
                <p className="text-gray-600 mt-2">{blogs.category}</p>
                <div
                  className="text-gray-600 mt-2"
                  dangerouslySetInnerHTML={{ __html: blogs.about }} // Render HTML content
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreatorProfile;