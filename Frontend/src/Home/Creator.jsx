import axios from "axios";
import { useEffect, useState } from "react";

function Creator() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await axios.get(
        "http://localhost:8001/api/users/admins",
        {
          withCredentials: true,
        }
      );
      setAdmin(data.admins);
    };
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Popular Creators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => (
            <div
              key={element._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={element.photo.url}
                alt={element.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold">{element.name}</h2>
                <p className="text-gray-600 text-sm">{element.role}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Creator;