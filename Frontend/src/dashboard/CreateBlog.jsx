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
    console.log(e);
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
      console.log(data);
      toast.success(data.message || "Blog created successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Please fill the required fields"
      );
    }
  };

  return (
    <div>
      <div className="min-h-screen py-10 md:ml-64">
        {" "}
        {/* Added md:ml-64 to account for the sidebar */}
        <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-8">Create Blog</h3>
          <form onSubmit={handleCreateBlog} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-lg">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
  <label className="block text-lg">Blog Image</label>
  <div className="flex items-center justify-center">
    {/* Container for image preview and file input */}
    <div
      className="w-full max-w-sm h-48 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
      onClick={() => document.getElementById("fileInput").click()} // Trigger file input on click
    >
      {blogImagePreview ? (
        <img
          src={blogImagePreview}
          alt="Blog Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <LuImageUp className="w-12 h-12" /> {/* Icon for no image */}
          <p className="mt-2 text-sm">Upload an image</p>
        </div>
      )}
    </div>

    {/* Hidden file input */}
    <input
      type="file"
      id="fileInput"
      className="hidden"
      onChange={changePhotoHandler} // Handle file selection
    />
  </div>
</div>

            <div className="space-y-2">
              <label className="block text-lg">About</label>
              {/* <textarea
                rows="5"
                placeholder="Write something about your blog"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              /> */}
              <JoditEditor
                ref={editor}
                placeholder="Write something about your blog"
                value={about}
                onChange={(newContent) => setAbout(newContent)}
                config={{
                  askBeforePasteHTML: false,
                  askBeforePasteFromWord: false, // Prevents Word formatting popup
                  defaultActionOnPaste: "insert_only_text",
                }}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
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
