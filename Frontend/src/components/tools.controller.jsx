import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

// Function to upload image by file
const uploadImageByFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("blogImage", file);

    const response = await fetch("http://localhost:8001/api/blogs/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.image && data.image.url) {
      return {
        success: 1,
        file: {
          url: data.image.url,
        },
      };
    } else {
      return {
        success: 0,
        message: "Failed to upload image",
      };
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: 0,
      message: "Error uploading image",
    };
  }
};

// Function to upload image by URL
const uploadImageByUrl = async (url) => {
  return {
    success: 1,
    file: {
      url,
    },
  };
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
        uploadByUrl: uploadImageByUrl,
        uploadByFile: uploadImageByFile,
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