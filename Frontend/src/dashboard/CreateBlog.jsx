import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
import { LuImageUp } from "react-icons/lu";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const editor = useRef(null);
  const [about, setAbout] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.post(
        "http://localhost:8001/api/blogs/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog created successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Please fill the required fields"
      );
    }
  };

  return (
    <div>
      <div className="min-h-screen md:ml-64 flex justify-center items-center bg-gradient-to-r from-blue-100 to-purple-100 p-6">
        <div className="max-w-4xl mx-auto p-8 border rounded-lg shadow-lg bg-white w-full">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">Create Blog</h3>
          <form onSubmit={handleCreateBlog} className="space-y-6">
            {/* Category */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Blog Image */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Blog Image
              </label>
              <div className="flex items-center justify-center">
                <div
                  className="w-full max-w-sm h-48 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  {blogImagePreview ? (
                    <img
                      src={blogImagePreview}
                      alt="Blog Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <LuImageUp className="w-12 h-12" />
                      <p className="mt-2 text-sm">Upload an image</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={changePhotoHandler}
                />
              </div>
            </div>

            {/* About */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                About
              </label>
              <JoditEditor
                ref={editor}
                placeholder="Write something about your blog"
                value={about}
                onChange={(newContent) => setAbout(newContent)}
                config={{
                  askBeforePasteHTML: false,
                  askBeforePasteFromWord: false,
                  defaultActionOnPaste: "insert_only_text",
                }}
                className="w-full border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Post Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;