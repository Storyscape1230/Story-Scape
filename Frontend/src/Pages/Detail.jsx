import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({});

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8001/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [id]);

  return (
    <div className="font-roboto">
      <div className="max-w-4xl mx-auto p-4">
        {/* Category */}
        <p className="text-red-700 text-sm uppercase ">{blogs?.category}</p>

        {/* Title */}
        <h1 className="text-4xl font-bold mt-2">{blogs?.title}</h1>
        {/* Author Section */}
        <div className="flex items-start mt-4">
          {/* Author Photo */}
          <img
            src={blogs?.adminPhoto}
            alt="author_avatar"
            className="w-12 h-12 rounded-lg mr-4" // Square image with rounded corners
          />

          {/* Author Details */}
          <div>
            {/* "Author" Text */}
            <p className="text-xs text-gray-500">Author</p>{" "}
            {/* "Author" text in smaller size and gray color */}
            {/* Author's Name */}
            <p className="text-sm font-semibold mt-1">
              {blogs?.adminName}
            </p>{" "}
            {/* Author's name */}
          </div>
        </div>

        {/* Blog Image */}
        {blogs?.blogImage?.url ? (
          <img
            src={blogs.blogImage.url}
            alt="mainblogsImg"
            className="w-full mt-4 rounded-lg shadow-lg"
            height="400"
          />
        ) : (
          <p className="text-gray-500 mt-4">No image available</p>
        )}

        {/* Blog Content */}
        <div
          className="text-gray-700 mt-6"
          dangerouslySetInnerHTML={{ __html: blogs?.about }}
        ></div>
      </div>
    </div>
  );
}

export default Detail;
