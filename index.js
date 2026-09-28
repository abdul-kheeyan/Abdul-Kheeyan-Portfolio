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

// Resume Download Route
app.get("/download-resume", (req, res) => {
  const filePath = path.join(__dirname, "public", "image", "Abdul_Kheeyan.pdf");
  res.download(filePath, "Abdul_Kheeyan_Resume.pdf", (err) => {
    if (err) {
      console.error("Resume download error:", err);
      res.status(404).send("Resume not found");
    }
  });
});

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
    const { message, history } = req.body || {};
    const normalizedMessage = typeof message === "string" ? message.trim() : "";
    if (!normalizedMessage) return res.status(400).json({ error: "Message required" });
    if (normalizedMessage.length > 500) {
      return res.status(400).json({ error: "Message must be 500 characters or less" });
    }

    // Local fallback responder in case API fails or has quota issues
    const getLocalResponse = (msgText) => {
      const msg = msgText.toLowerCase().trim();

      // Why Hire / Reasons to hire
      if (msg.includes("hire") || msg.includes("why select") || msg.includes("should i hire")) {
        return "Why You Should Hire Abdul Kheeyan:\n\n✔ Full Stack Developer (MERN) & Aspiring Software Engineer seeking SDE-1 / Full Stack / MERN roles.\n✔ 2 Full-Stack Internships: Unified Mentor (shipped Nagrik Setu) & Technical One (FASTION barter marketplace).\n✔ Production AI Engineering: 6-model Gemini fallback chain in MediAI Pro (20% downtime reduction) & hybrid Gemini 2.0 Flash + AST analyzer in Reviewly (30% false positive reduction).\n✔ Real-Time Systems: WebRTC peer-to-peer video consultations with Socket.io signaling (35% latency reduction).\n✔ Security & DevOps: Webhook HMAC SHA-256 signatures, RBAC, JWT silent refresh, node-cron SLA escalations.\n✔ Strong Problem Solving: 200+ LeetCode DSA problems solved (including Hard challenges, 50 Days Badge 2026).\n✔ High Academic Standing: BCA CGPA 8.82 at KKSU.";
      }

      // What makes him different / unique / special
      if (msg.includes("different") || msg.includes("diffrent") || msg.includes("unique") || msg.includes("special") || msg.includes("stand out")) {
        return "What Sets Abdul Kheeyan Apart:\n\n1. Production AI Engineering — Hybrid Gemini 2.0 Flash + AST static analyzer (Reviewly) cutting false positives by 30%, and a 6-model fallback chain in MediAI Pro.\n2. Real-Time Systems & WebRTC — Peer-to-peer video with Socket.io signaling (35% latency cut) without third-party server costs.\n3. End-to-End Enterprise Systems — Shipped Nagrik Setu with node-cron SLA escalation engines and RBAC at Unified Mentor.\n4. Strong DSA Fundamentals — 200+ LeetCode problems solved with 50 Days 2026 Badge.\n5. Academic Excellence — BCA with 8.82 CGPA at KKSU.";
      }

      // Who is Abdul / About Abdul / Intro
      if (msg.includes("who") || msg.includes("about") || msg.includes("intro") || msg.includes("tell me")) {
        return "Abdul Kheeyan is a Full Stack Developer (MERN) and Software Engineer seeking SDE-1 / Full Stack Developer roles.\n\n• Tech Stack: React.js (v19), Node.js, Express.js, MongoDB, WebRTC, Socket.io, Gemini API (2.0 Flash), Octokit.\n• Experience: Full Stack Intern at Unified Mentor (shipped Nagrik Setu) & Web Dev Intern at Technical One (FASTION).\n• Projects: MediAI Pro (AI Healthcare with WebRTC & Razorpay) and Reviewly (AI Code Review Platform with Octokit & AST analyzer).\n• Education & DSA: BCA (CGPA: 8.82) at KKSU | 200+ LeetCode problems solved.";
      }

      // LeetCode / coding profile / DSA
      if (msg.includes("leetcode") || msg.includes("coding profile") || msg.includes("coding practice") || msg.includes("dsa") || msg.includes("algorithm")) {
        return "Abdul Kheeyan's DSA & LeetCode Profile:\n\n💻 Profile: https://leetcode.com/u/abdul_kheeyan/\n\n• 200+ Data Structures & Algorithms problems solved, including Hard-level challenges.\n• LeetCode Badge: 50 Days 2026.\n• Solid foundation in Data Structures & Algorithms (Arrays, Linked Lists, Trees, Graphs, DP, System Design fundamentals).";
      }

      // Skills / Tech
      if (msg.includes("skill") || msg.includes("technolog") || msg.includes("languages") || msg.includes("frontend") || msg.includes("backend") || msg.includes("code") || msg.includes("stack") || msg.includes("kaun si technology") || msg.includes("kya aata hai")) {
        return "Abdul Kheeyan's Technical Skills:\n\n• Languages: JavaScript (ES6+), C, C++, HTML5, CSS3, SQL\n• Frontend: React.js (v19), React Router DOM, Vite, Tailwind CSS, Axios, Responsive Web Design, Component-Based Architecture\n• Backend: Node.js, Express.js, RESTful API Design, Middleware, Microservices, Socket.io, WebRTC\n• Databases: MongoDB, MongoDB Atlas, Database Design, Query Optimization, SQL\n• Auth & Security: JWT, bcryptjs, RBAC, HMAC SHA-256, Rate Limiting\n• AI / LLM: Google Gemini API (2.0 Flash), LLM Integration, Prompt Engineering, Generative AI, Octokit (GitHub API)\n• Core CS: Data Structures & Algorithms (200+ solved), OOP, System Design Fundamentals, SDLC\n• Tools: Git, GitHub, Postman, Vercel, Render, Agile/Scrum";
      }

      // Projects
      if (msg.includes("project") || msg.includes("mediai") || msg.includes("reviewly") || msg.includes("codevault") || msg.includes("nagrik") || msg.includes("fastion") || msg.includes("work") || msg.includes("built")) {
        return "Abdul Kheeyan's Key Projects:\n\n🏥 MediAI Pro (2026): Multi-role AI healthcare platform featuring appointment booking, e-prescriptions, Razorpay payments, 6-model Gemini fallback chain, WebRTC video consultations, and automated medication reminders.\n\n💻 Reviewly (2026): Full-stack AI-powered code review and repository intelligence platform via Octokit for 8+ languages. Hybrid Gemini 2.0 Flash + AST static analyzer (30% fewer false positives), automated PR reviews via HMAC SHA-256 webhooks, and 100-pt code quality scoring.\n\n🏛️ Nagrik Setu: Production digital grievance management system with RBAC and node-cron SLA escalation engine built at Unified Mentor.\n\n👕 FASTION: MERN clothing barter marketplace with Socket.io real-time chat & AI integration built at Technical One.";
      }

      // Experience
      if (msg.includes("experience") || msg.includes("job") || msg.includes("intern")) {
        return "Abdul Kheeyan's Work Experience (2 Full-Stack Internships):\n\n1. 💼 Full Stack Web Development Intern — Unified Mentor Pvt. Ltd. (June 2026 – August 2026 | Remote)\n• Architected and shipped Nagrik Setu, a production-grade Digital Grievance Management System (MERN, RBAC).\n• Engineered an automated SLA-driven escalation engine using node-cron, multi-level complaint routing, and analytics dashboards deployed on Render.\n\n2. 💼 Web Development Intern — Technical One (January 2026 – June 2026 | Remote)\n• Developed REST API endpoints, Socket.io real-time chat, and React.js frontend for FASTION (clothing barter marketplace).\n• Applied LLM and Generative AI concepts to integrate AI-driven features into production deliverables.";
      }

      // Education
      if (msg.includes("education") || msg.includes("college") || msg.includes("university") || msg.includes("degree") || msg.includes("bca") || msg.includes("study") || msg.includes("cgpa") || msg.includes("marks")) {
        return "Abdul Kheeyan's Education:\n\n🎓 Bachelor of Computer Applications (BCA)\n• Institution: Kavikulaguru Kalidas Sanskrit University (KKSU), India\n• Duration: June 2024 – June 2028\n• CGPA: 8.82 / 10";
      }

      // Certifications & Achievements
      if (msg.includes("certif") || msg.includes("achievement") || msg.includes("badge") || msg.includes("award")) {
        return "Abdul Kheeyan's Certifications & Achievements:\n\n🏆 LeetCode: 200+ Data Structures & Algorithms problems solved including Hard challenges | 50 Days 2026 Badge.\n🤖 Generative AI Mastermind — Outskill (Oct 2025): Hands-on training with 14+ AI tools, LLMs, and Prompt Engineering.\n💡 ChatGPT & AI Tools Workshop — Be10x (2026): Practical GPT-4 and AI automation techniques for engineering workflows.";
      }

      // Contact
      if (msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("reach") || msg.includes("address") || msg.includes("linkedin") || msg.includes("github") || msg.includes("kaise contact")) {
        return "Contact Abdul Kheeyan:\n\n📧 Email: abdulkheeyan@gmail.com\n📱 Phone: +91 9527864410\n🔗 LinkedIn: https://www.linkedin.com/in/abdul-kheeyan\n🐙 GitHub: https://github.com/abdul-kheeyan\n💻 LeetCode: https://leetcode.com/u/abdul_kheeyan/";
      }

      // Resume
      if (msg.includes("resume") || msg.includes("cv")) {
        return "You can download Abdul's resume directly from the 'About Me' section of this portfolio, or contact him at abdulkheeyan@gmail.com to request it.";
      }

      // Greetings (ONLY match explicit greetings!)
      if (/^(hello|hi|hey|greetings|namaste|हेलो|नमस्ते)(\s|$)/i.test(msg)) {
        return "Hello! I am KHEEYAN, Abdul Kheeyan's portfolio assistant. How can I help you today? You can ask about his skills, projects (MediAI Pro, Reviewly), internships (Unified Mentor, Technical One), LeetCode stats, education, or contact info!";
      }

      return "Abdul Kheeyan is a Full Stack Developer (MERN) & Software Engineer. You can ask me about his skills, projects, work experience, LeetCode progress, education, why to hire him, or contact details!";
    };

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const systemPrompt = `You are KHEEYAN, Abdul Kheeyan's portfolio AI assistant. Your job is to answer ANY questions about Abdul Kheeyan naturally, professionally, and accurately (e.g. who he is, his skills, projects, internships/experience, education, contact info, what makes him unique, why hire him, DSA/LeetCode achievements, etc.).

If someone asks anything completely unrelated to Abdul Kheeyan (such as weather, sports, general coding questions not about Abdul's work, general knowledge, etc.), politely decline and say: "I can only answer questions about Abdul Kheeyan. Please ask me about his skills, projects, experience, or contact info!"

Here is Abdul Kheeyan's complete profile:

NAME: Abdul Kheeyan
ROLE: Full Stack Developer (MERN) | Software Engineer
TARGET ROLES: SDE-1 / Full Stack Developer / MERN Stack Developer

SUMMARY:
Full Stack Developer (MERN) and aspiring Software Engineer with hands-on experience designing, building, and deploying production-grade full-stack web applications using JavaScript (ES6+), React.js, Node.js, Express.js, and MongoDB. Skilled in REST API design, authentication (JWT), real-time systems (Socket.io, WebRTC), and LLM/Generative AI integration (Google Gemini API). Solid foundation in Data Structures & Algorithms with 200+ LeetCode problems solved. Experienced in Agile teams across two full-stack internships.

KEY HIGHLIGHTS & UNIQUE STRENGTHS:
- Shipped 2 production-grade applications during 2 remote internships (Nagrik Setu at Unified Mentor, FASTION at Technical One).
- Built a 6-model Google Gemini API fallback chain for AI symptom triage, report analysis, and diet planning in MediAI Pro, reducing service downtime by 20%.
- Engineered peer-to-peer WebRTC video consultations with Socket.io signaling, eliminating third-party infrastructure and reducing latency by 35%.
- Built Reviewly: AI code review and repository intelligence platform with GitHub API (Octokit) across 8+ languages, featuring a hybrid Gemini 2.0 Flash + AST static analyzer cutting false positives by 30%.
- Automated GitHub pull request reviews via webhooks with HMAC SHA-256 signature verification, cutting manual review time by 40%.
- Solved 200+ Data Structures & Algorithms problems on LeetCode with the 50 Days 2026 Badge.
- BCA with CGPA 8.82 at KKSU.

TECHNICAL SKILLS:
- Languages: JavaScript (ES6+), C, C++, HTML5, CSS3, SQL
- Frontend: React.js (React, v19), React Router DOM, Vite, Tailwind CSS, Axios, Responsive Web Design, Component-Based Architecture
- Backend: Node.js, Express.js, RESTful API Design & Development, Middleware, Microservices, Server-Side Development
- Databases: MongoDB, MongoDB Atlas, Database Design, Query Optimization, SQL
- APIs & Real-Time: REST APIs, Socket.io, WebSockets, WebRTC, Peer-to-Peer Communication, Webhooks
- Auth & Security: JWT (JSON Web Tokens), bcryptjs, Role-Based Access Control (RBAC), HMAC SHA-256, Rate Limiting
- AI / LLM: Google Gemini API (2.0 Flash), LLM Integration, Prompt Engineering, Generative AI, AI-Powered Applications, Octokit (GitHub API)
- Core CS / Software Engineering: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Problem Solving, Debugging, System Design Fundamentals, Software Development Lifecycle (SDLC)
- Tools & Version Control: Git, GitHub, Postman, Vercel, Render, Agile/Scrum

EXPERIENCE (2 Full-Stack Internships):
1. Full Stack Web Development Intern — Unified Mentor Pvt. Ltd. (June 2026 – August 2026, Remote)
   - Architected and independently shipped Nagrik Setu, a production-grade Digital Grievance Management System built with the MERN stack (React.js, Node.js, Express.js, MongoDB), implementing role-based access control (RBAC) for Citizens, Officers, and Admins.
   - Engineered an automated SLA-driven escalation engine using node-cron for scheduled jobs, multi-level complaint routing logic, analytics dashboards, and RESTful API endpoints – deployed to production on Render.

2. Web Development Intern — Technical One (January 2026 – June 2026, Remote)
   - Developed REST API endpoints, Socket.io-based real-time chat, and React.js frontend components for FASTION, a MERN stack clothing barter marketplace, collaborating with a distributed team in an Agile workflow.
   - Applied LLM and Generative AI concepts to integrate AI-driven features into production deliverables, improving development velocity and feature delivery turnaround.

PROJECTS:
1. MediAI Pro (2026) | React.js, Node.js, Express.js, MongoDB, Gemini API, WebRTC, Socket.io, Razorpay
   - Architected a multi-role (patient / doctor / pharmacy owner) AI-powered full-stack healthcare platform with appointment scheduling, e-prescriptions, medical records, and an integrated e-pharmacy with Razorpay payment integration.
   - Built a 6-model Google Gemini API fallback chain powering AI symptom triage, medical report analysis, and personalized diet planning via prompt engineering, reducing service downtime by 20%.
   - Implemented peer-to-peer WebRTC video consultations with Socket.io signaling for real-time notifications and call rooms, reducing communication latency by 35%.
   - Designed JWT-based authentication with bcryptjs password hashing, Multer file uploads, and an automated medication-reminder service using scheduled interval jobs.

2. Reviewly (2026) | React.js, Node.js, Express.js, MongoDB, Gemini API, GitHub API (Octokit), JWT
   - Built a full-stack AI-powered code review and repository intelligence platform integrating with GitHub repositories via Octokit to auto-detect bugs, security vulnerabilities, and architectural issues across 8+ languages (JavaScript, React, Python, Java, Go, Rust, C/C++).
   - Designed a hybrid analysis engine combining Google Gemini 2.0 Flash with a custom static heuristic AST analyzer, improving detection reliability and cutting false positives by 30% versus AI-only analysis.
   - Automated GitHub pull request reviews via webhook integration with HMAC SHA-256 signature verification, enabling line-by-line PR comments and reducing manual review time by 40%.
   - Built a 100-point code quality scoring system (modularity, documentation, complexity, test coverage), a severity-tagged security scanner, and a dependency/tech-stack inspector with JWT authentication and silent token refresh.

3. Nagrik Setu (2026) | Shipped at Unified Mentor
   - Production Digital Grievance Management System (MERN, RBAC, node-cron SLA escalation engine, analytics dashboard).

4. FASTION (2026) | Built at Technical One
   - Clothing barter marketplace with real-time Socket.io chat and AI-driven features.

EDUCATION:
- Bachelor of Computer Applications (BCA) | CGPA: 8.82 (June 2024 – June 2028), Kavikulaguru Kalidas Sanskrit University (KKSU), India.

CERTIFICATIONS & ACHIEVEMENTS:
- LeetCode: 200+ Data Structures & Algorithms problems solved including Hard-level challenges | Badge: 50 Days 2026 (Profile: https://leetcode.com/u/abdul_kheeyan/)
- Generative AI Mastermind – Outskill (Oct 2025): Hands-on training with 14+ AI tools, LLMs, and Prompt Engineering.
- ChatGPT & AI Tools Workshop – Be10x (2026): Practical GPT-4 and AI automation techniques for engineering workflows.

CONTACT:
- Email: abdulkheeyan@gmail.com
- Phone: +91 9527864410
- LinkedIn: https://www.linkedin.com/in/abdul-kheeyan
- GitHub: https://github.com/abdul-kheeyan
- LeetCode: https://leetcode.com/u/abdul_kheeyan/

Keep responses concise, clear, and recruiter-friendly. Use bullet points when listing items. You can understand and reply in English, Hindi, or Hinglish. Match the user's language when practical. Only discuss Abdul Kheeyan and his portfolio. When mentioning a profile, use the complete URL.\n\nRecent conversation context will be provided below when available.`;

      const safeHistory = Array.isArray(history)
        ? history
            .filter(item => item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string")
            .slice(-6)
            .map(item => `${item.role}: ${item.content.slice(0, 800)}`)
        : [];
      const conversationContext = safeHistory.length
        ? `\n\nRecent conversation:\n${safeHistory.join("\n")}`
        : "";

      const result = await model.generateContent(systemPrompt + conversationContext + "\n\nUser question: " + normalizedMessage);
      const reply = result.response.text();
      res.json({ reply });
    } catch (apiErr) {
      console.warn("Gemini API call failed, using local fallback. Error details:", apiErr.message);
      const reply = getLocalResponse(normalizedMessage);
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
