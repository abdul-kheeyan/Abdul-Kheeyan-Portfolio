/* ===================================
   CHATBOT DATA — Abdul Kheeyan
   All pre-built Q&A for quick buttons
=================================== */

const CHATBOT_DATA = {

  // ─── GREETING (shown on first open) ───
  greeting: {
    text: "Hi! I'm KHEEYAN, Abdul Kheeyan's portfolio AI assistant.\nI can help you explore his skills, production projects, internships, LeetCode stats, and contact details!\n\nClick a button below or type your question.",
    buttons: [
      { label: "<i class='fas fa-user-tie'></i> About Me", key: "about" },
      { label: "<i class='fas fa-tools'></i> Skills", key: "skills" },
      { label: "<i class='fas fa-laptop-code'></i> Projects", key: "projects" },
      { label: "<i class='fas fa-briefcase'></i> Experience", key: "experience" },
      { label: "<i class='fas fa-code'></i> LeetCode", key: "leetcode" },
      { label: "<i class='fas fa-graduation-cap'></i> Education", key: "education" },
      { label: "<i class='fas fa-address-book'></i> Contact", key: "contact" }
    ]
  },

  // ─── RESPONSES (keyed by button key) ───
  responses: {

    // ── ABOUT ──
    about: {
      text: "Abdul Kheeyan is a Full Stack Developer (MERN) & Software Engineer seeking SDE-1 / Full Stack Developer roles.\n\n• Experience: 2 full-stack internships (Unified Mentor & Technical One), shipping enterprise systems to production.\n• Production AI Engineering: 6-model Gemini fallback chain in MediAI Pro (20% downtime reduction) & hybrid Gemini 2.0 Flash + AST static analyzer in Reviewly (30% false positive cut).\n• Real-Time Systems: Peer-to-peer WebRTC video consultations with Socket.io signaling (35% latency reduction).\n• Problem Solving: 200+ DSA problems solved on LeetCode (Hard challenges included, 50 Days Badge 2026).\n• Education: BCA with 8.82 CGPA at KKSU.",
      buttons: [
        { label: "<i class='fas fa-tools'></i> Skills", key: "skills" },
        { label: "<i class='fas fa-laptop-code'></i> Projects", key: "projects" },
        { label: "<i class='fas fa-briefcase'></i> Experience", key: "experience" },
        { label: "<i class='fas fa-code'></i> LeetCode Profile", key: "leetcode" },
        { label: "<i class='fas fa-address-book'></i> Contact", key: "contact" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── SKILLS OVERVIEW ──
    skills: {
      text: "Abdul possesses a solid technical skill set across the full stack:\n\n• Languages — JavaScript (ES6+), C, C++, HTML5, CSS3, SQL\n• Frontend — React.js (v19), React Router DOM, Vite, Tailwind CSS, Axios, Responsive Design\n• Backend — Node.js, Express.js, RESTful APIs, Middleware, Microservices, Socket.io, WebRTC\n• Databases — MongoDB, MongoDB Atlas, Database Design, Query Optimization, SQL\n• Auth & Security — JWT, bcryptjs, RBAC, HMAC SHA-256, Rate Limiting\n• AI & LLM — Gemini 2.0 Flash, Prompt Engineering, Octokit (GitHub API), LLM Integration\n• Core CS — DSA (200+ LeetCode), OOP, System Design Fundamentals, SDLC\n• Tools — Git, GitHub, Postman, Vercel, Render, Agile/Scrum\n\nClick below to explore each domain:",
      buttons: [
        { label: "<i class='fab fa-react'></i> Frontend", key: "frontend_skills" },
        { label: "<i class='fas fa-server'></i> Backend & APIs", key: "backend_skills" },
        { label: "<i class='fas fa-database'></i> Database", key: "database_skills" },
        { label: "<i class='fas fa-brain'></i> AI & LLM", key: "ai_skills" },
        { label: "<i class='fas fa-code'></i> Core CS & DSA", key: "core_cs_skills" },
        { label: "<i class='fas fa-terminal'></i> Dev Tools", key: "tools_skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── FRONTEND SKILLS ──
    frontend_skills: {
      text: "Frontend Technologies:\n\n• React.js (v19) — Modern component architecture, hooks, and state management\n• Vite — Lightning-fast build tool & dev server\n• Tailwind CSS — Responsive, utility-first UI styling\n• React Router DOM — Client-side SPA routing\n• Axios — Robust HTTP client for RESTful API integration\n• Responsive Web Design — Mobile-first, cross-browser compatibility\n• Component-Based Architecture — Reusable, scalable UI components",
      buttons: [
        { label: "<i class='fas fa-server'></i> Backend & APIs", key: "backend_skills" },
        { label: "<i class='fas fa-brain'></i> AI & LLM", key: "ai_skills" },
        { label: "<i class='fas fa-tools'></i> All Skills", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── BACKEND SKILLS ──
    backend_skills: {
      text: "Backend & System Technologies:\n\n• Node.js & Express.js — High-performance RESTful API microservices & middleware\n• Socket.io & WebSockets — Real-time bidirectional event streaming & chat\n• WebRTC — Peer-to-peer audio/video streaming & data channels\n• Scheduled Jobs — node-cron for automated SLA escalation workflows\n• Authentication & Security — JWT authentication with silent token refresh, bcryptjs password hashing\n• API Security — HMAC SHA-256 webhook signatures, Role-Based Access Control (RBAC), and Rate Limiting\n• Multer — Secure multipart file handling",
      buttons: [
        { label: "<i class='fab fa-react'></i> Frontend", key: "frontend_skills" },
        { label: "<i class='fas fa-database'></i> Database", key: "database_skills" },
        { label: "<i class='fas fa-tools'></i> All Skills", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── DATABASE SKILLS ──
    database_skills: {
      text: "Database Technologies:\n\n• MongoDB & MongoDB Atlas — Scalable document store & cloud cluster management\n• Mongoose ODM — Schemas, validation, aggregation pipelines, and indexing\n• SQL — Relational data modeling, table normalization, and querying\n• Query Optimization — Indexing and lean queries for fast data retrieval",
      buttons: [
        { label: "<i class='fab fa-react'></i> Frontend", key: "frontend_skills" },
        { label: "<i class='fas fa-server'></i> Backend & APIs", key: "backend_skills" },
        { label: "<i class='fas fa-tools'></i> All Skills", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── AI & LLM SKILLS ──
    ai_skills: {
      text: "AI & LLM Integration:\n\n• Google Gemini API (2.0 Flash) — Multi-model fallbacks, prompt engineering, and report parsing\n• Octokit (GitHub API) — Dynamic repository exploration and AST code intelligence\n• Hybrid AI Systems — Combining LLM reasoning with static AST heuristic analyzers (30% false positive cut)\n• Prompt Engineering — Structured outputs, triage workflows, and automated code review\n• Conversational AI — Interactive context-aware portfolio assistants",
      buttons: [
        { label: "<i class='fas fa-code'></i> Core CS & DSA", key: "core_cs_skills" },
        { label: "<i class='fas fa-laptop-code'></i> Projects", key: "projects" },
        { label: "<i class='fas fa-tools'></i> All Skills", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── CORE CS & DSA ──
    core_cs_skills: {
      text: "Core Computer Science & Problem Solving:\n\n• Data Structures & Algorithms (DSA) — 200+ LeetCode problems solved (including Hard challenges)\n• LeetCode Achievement — 50 Days Badge 2026\n• Object-Oriented Programming (OOP) — Inheritance, encapsulation, polymorphism, abstraction\n• System Design Fundamentals — Scalability, caching, microservices, load balancing, real-time protocols\n• Software Development Lifecycle (SDLC) — Agile/Scrum sprints, code reviews, Git version control",
      buttons: [
        { label: "<i class='fas fa-code'></i> View LeetCode", key: "leetcode" },
        { label: "<i class='fas fa-briefcase'></i> Experience", key: "experience" },
        { label: "<i class='fas fa-tools'></i> All Skills", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── DEVELOPER TOOLS ──
    tools_skills: {
      text: "Developer Tools & Platforms:\n\n• Git & GitHub — Branching strategies, PR reviews, webhook automation\n• Postman — API testing & endpoint validation\n• Deployment Platforms — Render (backend microservices) & Vercel (frontend SPAs)\n• Agile & Scrum — Sprint planning, distributed async collaboration, CI/CD workflows",
      buttons: [
        { label: "<i class='fab fa-react'></i> Frontend", key: "frontend_skills" },
        { label: "<i class='fas fa-tools'></i> All Skills", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── PROJECTS OVERVIEW ──
    projects: {
      text: "Abdul has engineered production-ready full-stack systems:\n\n🏥 MediAI Pro (2026) — AI Healthcare Platform (WebRTC, 6-model Gemini fallback, Razorpay)\n💻 Reviewly (2026) — AI Code Review & Intelligence Platform (Octokit, AST Analyzer, HMAC PR webhooks)\n🏛️ Nagrik Setu (2026) — Digital Grievance System (MERN, node-cron SLA engine, RBAC)\n👕 FASTION (2026) — Clothing Barter Marketplace (Socket.io real-time chat, GenAI)\n\nClick below to explore each project:",
      buttons: [
        { label: "<i class='fas fa-heartbeat'></i> MediAI Pro", key: "mediai_pro" },
        { label: "<i class='fas fa-shield-alt'></i> Reviewly", key: "reviewly" },
        { label: "<i class='fas fa-landmark'></i> Nagrik Setu", key: "nagrik_setu" },
        { label: "<i class='fas fa-tshirt'></i> FASTION", key: "fastion" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── MEDIAI PRO ──
    mediai_pro: {
      text: "MediAI Pro (2026) | Full-Stack Healthcare Platform\nTech: React.js, Node.js, Express.js, MongoDB, Gemini API, WebRTC, Socket.io, Razorpay\n\n• Architected a multi-role (patient / doctor / pharmacy owner) platform with appointment scheduling, e-prescriptions, medical records, and integrated e-pharmacy with Razorpay payment.\n• Built a 6-model Google Gemini API fallback chain for AI symptom triage, medical report analysis, and personalized diet planning, cutting service downtime by 20%.\n• Implemented peer-to-peer WebRTC video consultations with Socket.io signaling, reducing communication latency by 35%.\n• Engineered JWT authentication with bcryptjs hashing, Multer file uploads, and automated medication-reminder background interval jobs.",
      buttons: [
        { label: "<i class='fas fa-shield-alt'></i> Reviewly", key: "reviewly" },
        { label: "<i class='fas fa-landmark'></i> Nagrik Setu", key: "nagrik_setu" },
        { label: "<i class='fas fa-laptop-code'></i> All Projects", key: "projects" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── REVIEWLY (formerly CodeVault) ──
    reviewly: {
      text: "Reviewly (2026) | AI Code Review & Repository Intelligence\nTech: React.js, Node.js, Express.js, MongoDB, Gemini API, GitHub API (Octokit), JWT\n\n• Built an AI-powered code review platform integrating with GitHub via Octokit to auto-detect bugs, security vulnerabilities, and architectural issues across 8+ languages (JS, React, Python, Java, Go, Rust, C/C++).\n• Designed a hybrid analysis engine combining Google Gemini 2.0 Flash with a custom static heuristic AST analyzer, cutting false positives by 30% vs AI-only.\n• Automated GitHub pull request reviews via webhooks with HMAC SHA-256 signature verification, enabling line-by-line PR comments and cutting manual review time by 40%.\n• Engineered a 100-point code quality scoring system (modularity, docs, complexity, tests), severity-tagged security scanner, and JWT auth with silent token refresh.",
      buttons: [
        { label: "<i class='fas fa-heartbeat'></i> MediAI Pro", key: "mediai_pro" },
        { label: "<i class='fas fa-landmark'></i> Nagrik Setu", key: "nagrik_setu" },
        { label: "<i class='fas fa-laptop-code'></i> All Projects", key: "projects" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // Alias for codevault to reviewly
    codevault: {
      text: "Reviewly (formerly CodeVault) is Abdul's flagship AI code review platform built with React.js, Node.js, Express.js, MongoDB, Gemini 2.0 Flash, Octokit, and HMAC SHA-256 webhooks.\n\nIt features a hybrid Gemini + AST analyzer that cuts false positives by 30% across 8+ languages.",
      buttons: [
        { label: "<i class='fas fa-shield-alt'></i> Full Reviewly Details", key: "reviewly" },
        { label: "<i class='fas fa-laptop-code'></i> All Projects", key: "projects" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── NAGRIK SETU ──
    nagrik_setu: {
      text: "Nagrik Setu (2026) | Shipped at Unified Mentor Pvt. Ltd.\nTech: MERN Stack (React.js, Node.js, Express.js, MongoDB), node-cron, Render\n\n• Architected and independently shipped a production-grade Digital Grievance Management System.\n• Implemented Role-Based Access Control (RBAC) across Citizens, Officers, and Admins.\n• Engineered an automated SLA-driven escalation engine using node-cron for scheduled jobs and multi-level complaint routing logic.\n• Built analytics dashboards and RESTful API endpoints, deployed to production on Render.",
      buttons: [
        { label: "<i class='fas fa-heartbeat'></i> MediAI Pro", key: "mediai_pro" },
        { label: "<i class='fas fa-shield-alt'></i> Reviewly", key: "reviewly" },
        { label: "<i class='fas fa-briefcase'></i> View Internships", key: "experience" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── FASTION ──
    fastion: {
      text: "FASTION (2026) | Built at Technical One\nTech: MERN Stack (React.js, Node.js, Express.js, MongoDB), Socket.io\n\n• Developed REST API endpoints, Socket.io-based real-time chat, and React.js components for a clothing barter marketplace.\n• Collaborated in a distributed Agile team environment.\n• Integrated LLM and Generative AI features into production deliverables, boosting development velocity and feature turnaround.",
      buttons: [
        { label: "<i class='fas fa-briefcase'></i> View Internships", key: "experience" },
        { label: "<i class='fas fa-laptop-code'></i> All Projects", key: "projects" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── EXPERIENCE ──
    experience: {
      text: "Work Experience (2 Full-Stack Internships):\n\n1. 💼 Full Stack Web Development Intern — Unified Mentor Pvt. Ltd.\n📅 June 2026 – August 2026 | Remote\n• Architected & independently shipped Nagrik Setu (Digital Grievance Management System) with MERN stack & RBAC.\n• Engineered an automated SLA-driven escalation engine using node-cron, multi-level routing, and analytics dashboards deployed on Render.\n\n2. 💼 Web Development Intern — Technical One\n📅 January 2026 – June 2026 | Remote\n• Developed REST APIs, Socket.io real-time chat, and React frontend for FASTION (clothing barter marketplace).\n• Integrated LLM and Generative AI features into production deliverables within an Agile workflow.",
      buttons: [
        { label: "<i class='fas fa-landmark'></i> Nagrik Setu Details", key: "nagrik_setu" },
        { label: "<i class='fas fa-tshirt'></i> FASTION Details", key: "fastion" },
        { label: "<i class='fas fa-tools'></i> Skills", key: "skills" },
        { label: "<i class='fas fa-laptop-code'></i> Projects", key: "projects" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── EDUCATION ──
    education: {
      text: "Education:\n\n🎓 Bachelor of Computer Applications (BCA)\n🏛️ Kavikulaguru Kalidas Sanskrit University (KKSU), India\n📅 June 2024 – June 2028\n📊 CGPA: 8.82 / 10\n\nStrong academic foundation in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, and Software Engineering.",
      buttons: [
        { label: "<i class='fas fa-code'></i> LeetCode Profile", key: "leetcode" },
        { label: "<i class='fas fa-certificate'></i> Certifications", key: "certifications" },
        { label: "<i class='fas fa-briefcase'></i> Experience", key: "experience" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── CERTIFICATIONS ──
    certifications: {
      text: "Certifications & Achievements:\n\n🏆 LeetCode Problem Solving (2026)\n• 200+ Data Structures & Algorithms problems solved, including Hard challenges\n• Earned the 50 Days 2026 Badge\n\n🤖 Generative AI Mastermind — Outskill (Oct 2025)\n• Hands-on mastery of 14+ AI tools, LLM fine-tuning concepts, and prompt engineering for software engineering\n\n💡 ChatGPT & AI Tools Workshop — Be10x (2026)\n• Practical GPT-4 and AI automation techniques for software engineering workflows",
      buttons: [
        { label: "<i class='fas fa-code'></i> LeetCode Stats", key: "leetcode" },
        { label: "<i class='fas fa-graduation-cap'></i> Education", key: "education" },
        { label: "<i class='fas fa-laptop-code'></i> Projects", key: "projects" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── LEETCODE ──
    leetcode: {
      text: "Abdul Kheeyan's DSA & Problem Solving:\n\n💻 LeetCode Profile: https://leetcode.com/u/abdul_kheeyan/\n\n• 200+ Problems Solved across Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, and Strings.\n• Tackled Hard-level algorithmic challenges.\n• Badge: 50 Days 2026 Badge.\n\nClick below to open his live LeetCode profile:",
      buttons: [
        { label: "<i class='fas fa-external-link-alt'></i> Open LeetCode Profile", key: "open_leetcode", url: "https://leetcode.com/u/abdul_kheeyan/" },
        { label: "<i class='fas fa-code'></i> Core CS Skills", key: "core_cs_skills" },
        { label: "<i class='fas fa-laptop-code'></i> Projects", key: "projects" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── CONTACT ──
    contact: {
      text: "Contact Abdul Kheeyan:\n\n📧 Email: abdulkheeyan@gmail.com\n📱 Phone: +91 9527864410\n🔗 LinkedIn: https://www.linkedin.com/in/abdul-kheeyan\n🐙 GitHub: https://github.com/abdul-kheeyan\n💻 LeetCode: https://leetcode.com/u/abdul_kheeyan/\n\nAvailable for SDE-1 / Full Stack Developer / MERN Stack Developer opportunities!",
      buttons: [
        { label: "<i class='fas fa-user-tie'></i> About Me", key: "about" },
        { label: "<i class='fas fa-briefcase'></i> Experience", key: "experience" },
        { label: "<i class='fas fa-laptop-code'></i> Projects", key: "projects" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    }
  }
};
