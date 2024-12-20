const express = require("express");
const Blog = require("../models/blogSchema");
const router = express.Router();

// Route to create a blog (only for Admins)
router.post("/blogs", async (req, res) => {
  const { title, content, tags } = req.body;

  console.log("Create Blog route hit, data received:", req.body); // Log the incoming request

  // Check if title and content are provided
  if (!title || !content) {
    console.error("Title and content are required but missing");
    return res.status(400).json({ status: "error", error: "Title and content are required" });
  }

  try {
    // If tags is provided, split it into an array; otherwise, set it to an empty array
    let formattedTags = Array.isArray(tags) ? tags : [];
    const blog = new Blog({
      title,
      content,
      tags: formattedTags,
     // author: "admin@example.com", // Replace with actual admin's email or identifier
    });

    console.log("Blog data to be saved:", blog);  // Log the blog data before saving

    const savedBlog = await blog.save();
    console.log("Blog saved successfully:", savedBlog);  // Log the saved blog

    res.status(201).json({ status: "ok", data: savedBlog });
  } catch (error) {
    console.error("Error saving blog:", error.message);  // Log any error during blog saving
    res.status(500).json({ status: "error", error: error.message });
  }
});

// Route to get all blogs (Public)
router.get("/blogs", async (req, res) => {
  console.log("Fetching all blogs...");

  try {
    const blogs = await Blog.find();
    console.log("Fetched blogs:", blogs);  // Log the blogs fetched from DB
    res.status(200).json({ status: "ok", data: blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);  // Log any error during fetching
    res.status(500).json({ status: "error", error: error.message });
  }
});

module.exports = router;
