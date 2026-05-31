const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Contact = require("./models/contactModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

// ----------------------------
//  NODEMAILER TRANSPORTER (created once for speed)
// ----------------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true,           // reuse connections for speed
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.APP_PASS
  }
});

// ----------------------------
//  VIEW ENGINE + STATIC
// ----------------------------
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ----------------------------
//  MONGODB CONNECTION
// ----------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));


// =============================
//      CONTACT FORM ROUTE
// =============================
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // ✅ INSTANT response to user — no waiting!
  res.json({ success: true, message: "Message sent successfully!" });

  // 📧 Send email in BACKGROUND (fire & forget)
  transporter.sendMail({
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    subject: `New Message From Portfolio - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #6c63ff;">📬 New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="background:#f4f4f4;padding:12px;border-radius:6px;">${message}</p>
      </div>
    `
  }).then(() => {
    console.log(`✅ Email sent for: ${name} <${email}>`);
  }).catch((err) => {
    console.error("❌ Email send error:", err.message);
  });
});


// =============================
//           ROUTES
// =============================

// Home Page
app.get("/home", (req, res) => {
  res.render("home.ejs");
});

// HTML CSS Projects
app.get("/recipe", (req, res) => res.render("recipe.ejs"));
app.get("/flexmart", (req, res) => res.render("flexmart.ejs"));
app.get("/pixelkart", (req, res) => res.render("pixelkart.ejs"));
app.get("/amazon", (req, res) => res.render("amazon.ejs"));

// HTML CSS JS Projects
app.get("/stopwacth", (req, res) => res.render("stopwacth.ejs"));
app.get("/tictaktio", (req, res) => res.render("tictaktio.ejs"));
app.get("/rockpeparscissor", (req, res) => res.render("rockpeparscissor.ejs"));
app.get("/neomart", (req, res) => res.render("neomart.ejs"));
app.get("/wanderlust", (req, res) => res.render("wanderlust.ejs"));
app.get("/resume", (req, res) => res.render("resume"));
app.get("/Expense", (req,res)=> res.render("Expense"))

// MERN Stack – Postverse
let posts = [];

app.get("/postverse", (req, res) => res.render("postverse.ejs"));

app.post("/api/posts", (req, res) => {
  const { username, caption, imageUrl } = req.body;
  if (!username || !caption) {
    return res.status(400).json({ error: "Username and caption are required" });
  }

  const newPost = {
    id: Date.now(),
    username,
    caption,
    imageUrl
  };

  posts.unshift(newPost);
  res.json({ message: "Post created!", post: newPost });
});

app.get("/api/posts", (req, res) => res.json(posts));

app.put("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { caption, imageUrl } = req.body;

  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  if (caption) post.caption = caption;
  if (imageUrl) post.imageUrl = imageUrl;

  res.json({ message: "Post updated!", post });
});

app.delete("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(p => p.id !== id);
  res.json({ message: "Post deleted!" });
});

// Category Pages
app.get("/htmlcss-projects", (req, res) => res.render("htmlcss-projects.ejs"));
app.get("/htmlcssjs-project", (req, res) => res.render("htmlcssjs-project.ejs"));
app.get("/mern-projects", (req, res) => res.render("mern-projects.ejs"));

// 404 Page
app.use((req, res) => {
  res.status(404).render("404.ejs");
});

// =============================
//        START SERVER
// =============================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ App is listening at http://localhost:${PORT}`);

  // Keep Render free server alive (ping every 10 minutes)
  if (process.env.RENDER_EXTERNAL_URL) {
    const https = require("https");
    const http = require("http");
    setInterval(() => {
      const url = process.env.RENDER_EXTERNAL_URL;
      const client = url.startsWith("https") ? https : http;
      client.get(url, (res) => {
        console.log(`🏓 Keep-alive ping: ${res.statusCode}`);
      }).on("error", (err) => {
        console.log("Keep-alive ping error:", err.message);
      });
    }, 10 * 60 * 1000); // every 10 minutes
  }
});
