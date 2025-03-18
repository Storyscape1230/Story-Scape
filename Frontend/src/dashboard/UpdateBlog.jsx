import axios from "axios";
import { useRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { LuImageUp } from "react-icons/lu";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const editor = useRef();
  const [about, setAbout] = useState("");

  // Debounced onChange handler for JoditEditor
  // const handleEditorChange = useCallback((newContent) => {
  //   console.log("Editor content changed:", newContent); // Debug log
  //   setAbout(newContent);
  // }, []);

  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  // const changePhotoHandler = (e) => {
  //   console.log(e);
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     setBlogImagePreview(reader.result);
  //     setBlogImage(file);
  //   };
  // };
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImagePreview(URL.createObjectURL(file));
      setBlogImage(file);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8001/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
        setTitle(data?.title);
        setCategory(data?.category);
        setAbout(data?.about);
        setBlogImage(data?.blogImage.url);
      } catch (error) {
        console.log(error);
        toast.error("Please fill the required fields");
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about); // Ensure `about` is included
  
    if (blogImage instanceof File) {
      formData.append("blogImage", blogImage);
    }
  
    // Debug: Log FormData content
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      const { data } = await axios.put(
        `http://localhost:8001/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update response:", data);
      toast.success(data.message || "Blog updated successfully");
      navigateTo("/");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update blog");
    }
  };

  return (
    <div>
      <div className="container mx-auto my-12 p-4 md:ml-64">
        {" "}
        {/* Added md:ml-64 here */}
        <section className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">UPDATE BLOG</h3>
          <form>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Category</label>
              <select
                className="w-full p-2 border rounded-md"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="BLOG MAIN TITLE"
              className="w-full p-2 mb-4 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="mb-4">
              <label className="block mb-2 font-semibold">BLOG IMAGE</label>
              <div
                className="w-full h-48 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
                onClick={() => document.getElementById("fileInput").click()} // Trigger file input on click
              >
                {blogImagePreview || blogImage ? (
                  <img
                    src={blogImagePreview || blogImage}
                    alt="Blog Main"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <LuImageUp className="w-12 h-12" />{" "}
                    {/* Icon for no image */}
                    <p className="mt-2 text-sm">Upload an image</p>
                  </div>
                )}
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={changePhotoHandler}
              />
            </div>
            {/* <textarea
              rows="6"
              className="w-full p-2 mb-4 border rounded-md"
              placeholder="Something about your blog atleast 200 characters!"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            /> */}
            <JoditEditor
              ref={editor}
              placeholder="Write something about your blog"
              value={about}
              onChange={(newContent) => setAbout(newContent)}
              config={{
                askBeforePasteFromWord: false,
                askBeforePasteHTML: false,
                defaultActionOnPaste: "insert_only_text",
              }}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            />

            <button
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleUpdate}
            >
              UPDATE
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default UpdateBlog;
