const express = require("express");
const Blog = require("../models/blogSchema");
const jwt = require("jsonwebtoken");

const router = express.Router();

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

// Middleware to authenticate and extract user info
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ status: "error", error: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ status: "error", error: "Token expired or invalid" });
    }
    req.user = user; // Attach user info to the request
    next();
  });
};

// Route to create a blog (only for Admins)
router.post("/blogs", authenticateToken, async (req, res) => {
  if (req.user.userType !== "admin") {
    return res.status(403).json({ status: "error", error: "Access denied" });
  }

  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ status: "error", error: "Title and content are required" });
  }

  try {
    const blog = new Blog({
      title,
      content,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      author: req.user.email,
    });

    const savedBlog = await blog.save();
    res.status(201).json({ status: "ok", data: savedBlog });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// Route to get all blogs (Public)
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ status: "ok", data: blogs });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

module.exports = router;
