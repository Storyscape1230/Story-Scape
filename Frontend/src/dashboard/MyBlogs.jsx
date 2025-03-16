import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8001/api/blogs/my-blog",
          { withCredentials: true }
        );
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8001/api/blogs/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Blog deleted successfully");
        setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to delete blog");
      });
  };

  return (
    <div className="flex-1 min-h-screen p-4 md:ml-64 overflow-hidden bg-gradient-to-r from-blue-100 to-purple-100">
      <p className="text-3xl font-bold  text-xxl">My Blogs</p>
      <div className="container mx-auto my-12 px-4 w-full overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <div
                className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col w-full"
                key={element._id}
              >
                {element?.blogImage?.url ? (
                  <img
                    src={element.blogImage.url}
                    alt="blogImg"
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <p className="text-gray-500">No image available</p>
                )}

                <div className="p-4 flex-1 flex flex-col">
                  <span className="text-sm text-gray-600">
                    {element.category}
                  </span>
                  <h4 className="text-lg font-semibold my-2 line-clamp-2">
                    {element.title}
                  </h4>
                  <div className="flex justify-between mt-4 gap-2">
                    <Link
                      to={`/blog/update/${element._id}`}
                      className="text-blue-500 bg-white rounded-md shadow-sm px-3 py-1 border border-gray-400 hover:underline flex-1 text-center"
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="text-red-500 bg-white rounded-md shadow-sm px-3 py-1 border border-gray-400 hover:underline flex-1 text-center"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You have not posted any blog to see!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;