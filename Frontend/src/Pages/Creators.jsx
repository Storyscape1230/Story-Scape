import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-6">
          Our Creators
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Meet the talented individuals behind the scenes who make it all happen.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {creators.map((creator) => (
            <div
              key={creator._id}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
              style={{ width: "350px", height: "450px" }} // Fixed card size
            >
              {/* Image Section (35% of card height) */}
              <div className="relative h-[47%]"> {/* 35% of card height */}
                <img
                  src={creator.photo.url}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2 flex justify-center">
                  <img
                    src={creator.photo.url}
                    alt="avatar"
                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                  />
                </div>
              </div>

              {/* Content Section (65% of card height) */}
              <div className="h-[53%] flex flex-col justify-center px-6 py-4 text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {creator.name}
                </h2>
                <p className="text-gray-600 mt-2">{creator.email}</p>
                <p className="text-gray-600 mt-2">{creator.role}</p>
                <div className="mt-6">
                  <Link
                    to={`/creator/${creator._id}`}
                    className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
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