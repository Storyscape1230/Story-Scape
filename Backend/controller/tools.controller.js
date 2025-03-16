import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

// Function to upload image by file
const uploadImageByFile = async (blogImage) => {
  try {
    const formData = new FormData();
    formData.append("blogImage", blogImage);

    const token = localStorage.getItem("token") || document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      alert("Session expired. Please log in again.");
      throw new Error("No token found. Please log in again.");
    }

    const response = await fetch("http://localhost:8001/api/blogs/upload-image", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.image && data.image.url) {
      return {
        success: 1,
        file: {
          url: data.image.url,
        },
      };
    } else {
      throw new Error(data.message || "Failed to upload image");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: 0,
      message: error.message || "Error uploading image",
    };
  }
};
// Function to upload image by URL
const uploadImageByUrl = async (url) => {
  try {
    // Validate URL
    if (!url || typeof url !== "string") {
      throw new Error("Invalid URL");
    }

    return {
      success: 1,
      blogImage: {
        url,
      },
    };
  } catch (error) {
    console.error("Error uploading image by URL:", error);
    return {
      success: 0,
      message: error.message || "Error uploading image by URL",
    };
  }
};

// Export tools configuration
export const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile: uploadImageByFile,
        uploadByUrl: uploadImageByUrl,
      },
      rendered: (block) => {
        console.log("Image block rendered:", block);
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Type Heading...",
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  marker: Marker,
  inlineCode: InlineCode,
};
