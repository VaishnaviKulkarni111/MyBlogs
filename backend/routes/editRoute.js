const express = require("express");
const Blog = require("../models/blogSchema");
const router = express.Router();

// Route to update a blog (Admin only)
router.put("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ status: "error", error: "Title and content are required" });
  }

  try {
    const formattedTags =
      Array.isArray(tags) ? tags : tags.split(",").map((tag) => tag.trim());

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        tags: formattedTags,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ status: "error", error: "Blog not found" });
    }

    res.status(200).json({ status: "ok", data: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error.message);
    res.status(500).json({ status: "error", error: error.message });
  }
});


// Route to delete a blog (Admin only)
router.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ status: "error", error: "Blog not found" });
    }

    res.status(200).json({ status: "ok", data: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    res.status(500).json({ status: "error", error: error.message });
  }
});

module.exports = router;
