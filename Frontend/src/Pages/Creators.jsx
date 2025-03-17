import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link

function Creators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8001/api/users/admins",
          {
            withCredentials: true,
          }
        );
        setCreators(data.admins);
      } catch (error) {
        console.log("Error fetching creators:", error);
      }
    };
    fetchCreators();
  }, []);

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Creators
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {creators.map((creator) => (
            <div
              key={creator._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative">
                <img
                  src={creator.photo.url}
                  alt="avatar"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
                  <img
                    src={creator.photo.url}
                    alt="avatar"
                    className="w-20 h-20 rounded-full mx-auto border-4 border-white"
                  />
                </div>
              </div>
              <div className="px-6 py-8 mt-8 text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {creator.name}
                </h2>
                <p className="text-gray-600 mt-2">{creator.email}</p>
                <p className="text-gray-600 mt-2">{creator.phone}</p>
                <p className="text-gray-600 mt-2">{creator.role}</p>
                <div className="mt-4">
                  <Link
                    to={`/creator/${creator._id}`} // Redirect to creator's profile page
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Creators;