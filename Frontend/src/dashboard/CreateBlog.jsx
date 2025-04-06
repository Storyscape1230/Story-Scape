import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { LuImageUp } from "react-icons/lu";
import JoditEditor from "jodit-react";
import { motion } from "framer-motion";
import { FiPlus, FiX, FiUpload } from "react-icons/fi";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const editor = useRef(null);
  const [about, setAbout] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title || !category || !about || !blogImage) {
      toast.error("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);
    formData.append("tags", JSON.stringify(tags));

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
      // Reset form
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage(null);
      setBlogImagePreview("");
      setTags([]);
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create blog. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col relative bg-[#0B1120] overflow-hidden"
    >
      {/* Futuristic Particle Background */}
      <div className="items-center justify-center   absolute inset-0 overflow-hidden">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}></div>
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#3B82F6]"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.2, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Glowing orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#3B82F6] opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#8B5CF6] opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Modified flex container */}
      <div className="flex flex-1 relative z-10">
        {/* Sticky Sidebar - updated CSS */}
        <aside className="hidden lg:block w-64 fixed top-0 left-0 h-full bg-[#1E293B]/70 backdrop-blur-lg border-r border-[#334155] overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold text-[#E2E8F0] mb-4">Navigation</h2>
            {/* Add your sidebar content here */}
          </div>
        </aside>

        {/* Main Content - add margin to prevent overlap with fixed sidebar */}
        <div className="flex-1 lg:ml-64 p-4 md:p-8">
          <motion.div className="max-w-5xl mx-auto">
            {/* Header with animated gradient */}
            <motion.div 
              className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-[#334155] shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#818CF8] mb-2"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Create Your Masterpiece
              </motion.h1>
              <motion.p 
                className="text-[#94A3B8] text-lg"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.5 }}
              >
                Share your thoughts with the world in a stunning format
              </motion.p>
            </motion.div>

            {/* Form Container */}
            <motion.div 
              className="bg-[#1E293B]/70 backdrop-blur-lg rounded-2xl border border-[#334155] shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <form onSubmit={handleCreateBlog} className="p-6 md:p-8 space-y-8">
                {/* Category and Title Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div className="space-y-3">
                    <label className="block text-lg font-medium text-[#E2E8F0]">
                      Category <span className="text-[#F43F5E]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-5 py-3 bg-[#1E293B] border border-[#334155] rounded-xl text-[#E2E8F0] outline-none focus:ring-2 focus:ring-[#818CF8] focus:border-transparent appearance-none"
                      >
                        <option value="">Select a category</option>
                        <option value="Education">Education</option>
                        <option value="News">News</option>
                        <option value="Olympics">Olympics</option>
                        <option value="Business">Business</option>
                        <option value="Devotion">Devotion</option>
                        <option value="Travel">Travel</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-3">
                    <label className="block text-lg font-medium text-[#E2E8F0]">
                      Title <span className="text-[#F43F5E]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your amazing blog title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-5 py-3 bg-[#1E293B] border border-[#334155] rounded-xl text-[#E2E8F0] outline-none focus:ring-2 focus:ring-[#818CF8] focus:border-transparent placeholder-[#64748B]"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-3">
                  <label className="block text-lg font-medium text-[#E2E8F0]">
                    Featured Image <span className="text-[#F43F5E]">*</span>
                  </label>
                  <div 
                    className={`relative group rounded-xl overflow-hidden border-2 border-dashed ${blogImagePreview ? 'border-transparent' : 'border-[#334155] hover:border-[#818CF8]'} transition-all duration-300`}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    {blogImagePreview ? (
                      <>
                        <img
                          src={blogImagePreview}
                          alt="Blog Preview"
                          className="w-full h-64 md:h-80 object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                          <div className="flex items-center space-x-2 bg-[#1E293B] px-4 py-2 rounded-lg">
                            <FiUpload className="text-[#E2E8F0]" />
                            <span className="text-[#E2E8F0]">Change Image</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 md:h-80 p-6 text-center cursor-pointer">
                        <div className="p-4 rounded-full bg-[#1E293B] mb-4">
                          <LuImageUp className="w-8 h-8 text-[#818CF8]" />
                        </div>
                        <h3 className="text-xl font-medium text-[#E2E8F0] mb-2">Upload Featured Image</h3>
                        <p className="text-[#94A3B8]">Drag & drop or click to browse (Recommended: 1200x630)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      onChange={changePhotoHandler}
                      accept="image/*"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <label className="block text-lg font-medium text-[#E2E8F0]">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 items-center">
                    {tags.map(tag => (
                      <motion.div 
                        key={tag}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center bg-[#334155] rounded-full px-3 py-1"
                      >
                        <span className="text-[#E2E8F0] text-sm">{tag}</span>
                        <button 
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-[#94A3B8] hover:text-[#E2E8F0]"
                        >
                          <FiX size={16} />
                        </button>
                      </motion.div>
                    ))}
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Add tag..."
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addTag()}
                        className="px-3 py-1 bg-[#1E293B] border border-[#334155] rounded-l-lg text-[#E2E8F0] outline-none focus:border-[#818CF8] w-32"
                      />
                      <motion.button
                        type="button"
                        onClick={addTag}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-[#818CF8] text-[#0F172A] rounded-r-lg flex items-center"
                      >
                        <FiPlus size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Content Editor */}
                <div className="space-y-3">
                  <label className="block text-lg font-medium text-[#E2E8F0]">
                    Content <span className="text-[#F43F5E]">*</span>
                  </label>
                  <div className="rounded-xl overflow-hidden border border-[#334155]">
                    <JoditEditor
                      ref={editor}
                      value={about}
                      onBlur={newContent => setAbout(newContent)}
                      config={{
                        theme: 'dark',
                        height: 400,
                        toolbarButtonSize: 'medium',
                        buttons: [
                          'bold', 'italic', 'underline', 'strikethrough', '|',
                          'ul', 'ol', '|', 
                          'font', 'fontsize', 'brush', 'paragraph', '|', 
                          'image', 'video', 'table', 'link', '|', 
                          'left', 'center', 'right', 'justify', '|', 
                          'undo', 'redo', '|', 'source'
                        ],
                        colors: {
                          background: '#1E293B',
                          text: '#E2E8F0',
                        },
                        style: {
                          background: '#1E293B',
                          border: 'none',
                        },
                        editorCssClass: 'custom-jodit',
                        askBeforePasteHTML: false,
                        askBeforePasteFromWord: false,
                        defaultActionOnPaste: 'insert_clear_html',
                        processPasteHTML: false,
                        cleanHTML: {
                          removeEmptyElements: false,
                          fillEmptyParagraph: true
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${isSubmitting ? 'bg-[#334155]' : 'bg-gradient-to-r from-[#818CF8] to-[#7DD3FC] hover:shadow-lg hover:shadow-[#818CF8]/30'}`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-[#E2E8F0] border-t-transparent rounded-full animate-spin"></div>
                        <span>Publishing...</span>
                      </div>
                    ) : (
                      <span className="text-[#0F172A]">Publish Blog</span>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Custom Jodit Editor Styles */}
      <style>{`
        .custom-jodit .jodit-toolbar__box {
          background: #1E293B !important;
          border-bottom: 1px solid #334155 !important;
        }
        .custom-jodit .jodit-workplace {
          background: #1E293B !important;
        }
        .custom-jodit .jodit-wysiwyg {
          background: #1E293B !important;
          color: #E2E8F0 !important;
          padding: 20px !important;
        }
        .custom-jodit .jodit-status-bar {
          background: #1E293B !important;
          border-top: 1px solid #334155 !important;
        }
      `}</style>
    </motion.div>
  );
}

export default CreateBlog;