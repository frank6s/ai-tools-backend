const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const MONGO_URI =
  "mongodb+srv://moghadambaktash:Dc9fmXVELrH5mjFK@cluster0.podil.mongodb.net/ai_tools?retryWrites=true&w=majority";

mongoose
.connect(MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB:", err));


// Schema and Models
const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  metaDescription: String,
  slug: String,
  date: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", BlogSchema);

// Routes
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

{
    "_id": "unique-id",
    "title": "Test Blog",
    "content": "This is a test blog post.",
    "metaDescription": "A short description of my test blog.",
    "slug": "test-blog",
    "date": "2024-12-28T20:10:00.000Z"
  }
  


app.post("/api/blogs", async (req, res) => {
  try {
    const { title, content, metaDescription, slug } = req.body;
    const newBlog = new Blog({ title, content, metaDescription, slug });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ error: "Error creating blog" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

