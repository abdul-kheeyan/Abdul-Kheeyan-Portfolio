const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Gemini AI setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
//           ROUTES
// =============================

// Home Page
app.get("/home", (req, res) => {
  res.render("home.ejs", { contactEmail: process.env.MY_EMAIL });
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
app.get("/NewsHub", (req,res)=> res.render("newshub.ejs"))

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

// =============================
//     CHATBOT API ROUTE
// =============================
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    // Local fallback responder in case API fails or has quota issues
    const getLocalResponse = (msgText) => {
      const msg = msgText.toLowerCase();

      // Why Hire / Reasons to hire
      if (msg.includes("hire") || msg.includes("why select") || msg.includes("should i hire")) {
        return "Why You Should Hire Abdul Kheeyan:\n\n✔ Full-Stack MERN Specialist with production experience.\n✔ Production AI Integration: Built a 6-model Gemini API fallback chain in MediAI Pro, reducing service downtime by ~20%.\n✔ Real-Time Systems: Architected peer-to-peer WebRTC video consultations with Socket.io signaling, cutting latency by ~35%.\n✔ Database Optimization: Reduced data retrieval latency by ~40%.\n✔ Experienced in agile internship workflows at Technical One.\n✔ Quick learner, self-driven, focused on clean, maintainable code.";
      }

      // What makes him different / unique / special
      if (msg.includes("different") || msg.includes("diffrent") || msg.includes("unique") || msg.includes("special") || msg.includes("stand out")) {
        return "What Sets Abdul Kheeyan Apart:\n\n1. Production AI Engineering — Built a 6-model Gemini API fallback chain in MediAI Pro (20% downtime reduction).\n2. Real-Time Systems — WebRTC video consultations with Socket.io signaling (35% latency reduction).\n3. Optimization Focus — 40% reduction in database retrieval latency.\n4. Certified AI Developer — Trained in Generative AI Mastermind & Prompt Engineering with 14+ AI tools.";
      }

      // Who is Abdul / About Abdul / Intro
      if (msg.includes("who") || msg.includes("about") || msg.includes("intro") || msg.includes("tell me")) {
        return "Abdul Kheeyan is a Full Stack MERN Developer specializing in building production-grade, AI-integrated web applications.\n\n• Tech Stack: React.js, Node.js, Express.js, MongoDB, WebRTC, Socket.io, Google Gemini API.\n• Projects: MediAI Pro (Healthcare AI Platform) & CodeVault (AI Code Review Tool).\n• Experience: Web Development Intern at Technical One (6 months, remote).";
      }

      // Skills / Tech
      if (msg.includes("skill") || msg.includes("technolog") || msg.includes("languages") || msg.includes("frontend") || msg.includes("backend") || msg.includes("code") || msg.includes("stack")) {
        return "Abdul Kheeyan's Technical Skills:\n\n• Languages: JavaScript (ES6+), HTML5, CSS3, C++\n• Frontend: React.js (v19), Vite, Tailwind CSS, Framer Motion, Material UI\n• Backend: Node.js, Express.js, REST APIs, Socket.io, WebRTC\n• Database: MongoDB, Mongoose ODM, MySQL\n• AI & APIs: Google Gemini API, GitHub API, LLM Integration\n• Tools: Git, GitHub, Postman, Vercel, Render, CI/CD";
      }

      // Projects
      if (msg.includes("project") || msg.includes("mediai") || msg.includes("codevault") || msg.includes("work") || msg.includes("built")) {
        return "Abdul Kheeyan's Key Projects:\n\n🏥 MediAI Pro (2026): Multi-role AI healthcare platform featuring appointment booking, Razorpay payments, 6-model Gemini symptom triage, and WebRTC video consultations.\n\n💻 CodeVault (2026): AI-driven code analysis tool fetching GitHub repos to review code quality and suggest structural refactoring.";
      }

      // Experience
      if (msg.includes("experience") || msg.includes("job") || msg.includes("intern")) {
        return "Abdul Kheeyan's Work Experience:\n\n💼 Web Development Intern — Technical One (Jan 2026 - Jun 2026 | Remote)\n• Delivered full-stack MERN features in an agile environment.\n• Integrated LLM and Generative AI features into production deliverables.";
      }

      // Education
      if (msg.includes("education") || msg.includes("college") || msg.includes("university") || msg.includes("degree") || msg.includes("bca") || msg.includes("study")) {
        return "Abdul Kheeyan's Education:\n\n• BCA (Bachelor of Computer Applications) — KKSU (2024 - 2028)\n• B.Com (Bachelor of Commerce) — YCMOU (2024 - 2027)";
      }

      // Contact
      if (msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("reach") || msg.includes("address") || msg.includes("linkedin") || msg.includes("github")) {
        return "Contact Abdul Kheeyan:\n\n📧 Email: abdulkheeyan@gmail.com\n📱 Phone: +91 9527864410\n🔗 LinkedIn: linkedin.com/in/abdul-kheeyan\n🐙 GitHub: github.com/abdul-kheeyan";
      }

      // Resume
      if (msg.includes("resume") || msg.includes("cv")) {
        return "You can download Abdul's resume directly from the 'About Me' section of this portfolio, or contact him at abdulkheeyan@gmail.com to request it.";
      }

      // Greetings (ONLY match explicit greetings!)
      if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("greetings") || msg.includes("namaste")) {
        return "Hello! I am KHEEYAN, Abdul Kheeyan's portfolio assistant. How can I help you today? You can ask about his skills, projects, experience, education, why to hire him, or contact info!";
      }

      return "Abdul Kheeyan is a Full Stack MERN Developer. You can ask me about his skills, projects, experience, education, why to hire him, or contact details!";
    };

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const systemPrompt = `You are KHEEYAN, Abdul Kheeyan's portfolio AI assistant. Your job is to answer ANY questions about Abdul Kheeyan naturally, professionally, and accurately (e.g. who he is, his skills, projects, experience, education, contact info, what makes him unique, why hire him, etc.).

If someone asks anything completely unrelated to Abdul Kheeyan (such as weather, sports, general coding questions not about Abdul's work, general knowledge, etc.), politely decline and say: "I can only answer questions about Abdul Kheeyan. Please ask me about his skills, projects, experience, or contact info!"

Here is Abdul Kheeyan's complete profile:

NAME: Abdul Kheeyan
ROLE: Full Stack MERN Developer

SUMMARY:
Full Stack Developer specializing in MERN stack development with hands-on experience building production-grade, AI-integrated web applications. Proficient in React.js, Node.js, Express.js, MongoDB, WebRTC, Socket.io, and Google Gemini AI. Skilled at architecting scalable systems, real-time communication, and robust LLM-powered features within agile environments.

KEY HIGHLIGHTS & UNIQUE STRENGTHS:
- Built a 6-model Google Gemini API fallback chain for AI symptom triage in MediAI Pro, reducing service downtime by ~20%.
- Engineered peer-to-peer WebRTC video consultations with Socket.io signaling, eliminating third-party infrastructure and reducing latency by ~35%.
- Optimized database queries and implemented lazy loading in CodeVault, cutting data retrieval latency by ~40%.
- Certified in Generative AI Mastermind & Prompt Engineering with 14+ AI tools.

TECHNICAL SKILLS:
- Languages: JavaScript (ES6+), HTML5, CSS3, C++
- Frontend: React.js (v19), Vite, Tailwind CSS, React Router DOM, Axios, Framer Motion, Material UI
- Backend: Node.js, Express.js, REST APIs, Socket.io, Multer, Nodemon
- Database: MongoDB, Mongoose ODM, MongoDB Atlas, MySQL
- Auth & Security: JWT, bcrypt.js, HMAC signature verification, role-based access control
- AI/APIs: Google Gemini API, GitHub API, LLM integration, Razorpay, WebRTC
- Tools: Git, GitHub, Postman, Vercel, Render, CI/CD

EXPERIENCE:
Web Development Intern at Technical One (January 2026 - June 2026, Remote)
- Completed a 6-month full-stack web development internship, delivering assigned features using React.js, Node.js, Express.js, and MongoDB in an agile environment.
- Participated in comprehensive AI/ML training sessions covering Large Language Models (LLMs) and Generative AI, integrating AI-driven features into project deliverables.

PROJECTS:
1. MediAI Pro (2026) - MERN Stack, Gemini API, WebRTC, Socket.io, Razorpay
   - Architected a multi-role (patient/doctor/pharmacy) AI-powered healthcare platform featuring appointment booking, Razorpay processing, and a digital Health Vault.
   - 6-model Gemini fallback chain & WebRTC peer-to-peer video consultations.

2. CodeVault (2026) - React.js, Node.js, GitHub API, LLMs, UI/UX Design
   - Engineered an AI-driven code analysis tool that dynamically fetches repositories via GitHub APIs to automatically analyze codebases, identify bugs, and suggest structural refactoring.

EDUCATION:
- Bachelor of Computer Applications (BCA), June 2024 - June 2028, KKSU, India
- Bachelor of Commerce (B.Com), July 2024 - June 2027, YCMOU, Nashik, India

CERTIFICATIONS:
- Generative AI Mastermind (Oct 2025) - Outskill
- ChatGPT & AI Tools Workshop (2026) - Be10x

CONTACT:
- Email: abdulkheeyan@gmail.com
- Phone: +91 9527864410
- LinkedIn: linkedin.com/in/abdul-kheeyan
- GitHub: github.com/abdul-kheeyan
- Twitter/X: x.com/ABDUL_KHEEYAN

Keep responses concise, clear, and recruiter-friendly. Use bullet points when listing items.`;

      const result = await model.generateContent(systemPrompt + "\n\nUser question: " + message);
      const reply = result.response.text();
      res.json({ reply });
    } catch (apiErr) {
      console.warn("Gemini API call failed, using local fallback. Error details:", apiErr.message);
      const reply = getLocalResponse(message);
      res.json({ reply });
    }
  } catch (err) {
    console.error("Chatbot API error:", err);
    res.status(500).json({ reply: "Sorry, I'm having trouble right now. Please try again or use the quick-reply buttons!" });
  }
});

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
