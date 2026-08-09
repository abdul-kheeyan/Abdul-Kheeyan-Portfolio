/* ===================================
   CHATBOT DATA — Abdul Kheeyan
   All pre-built Q&A for quick buttons
=================================== */

const CHATBOT_DATA = {

  // ─── GREETING (shown on first open) ───
  greeting: {
    text: "Hi! I'm KHEEYAN, Abdul Kheeyan's portfolio assistant.\nI can help you learn about his skills, projects, experience, and contact details!\n\nClick a button below or type your question.",
    buttons: [
      { label: "<i class='fas fa-user-tie'></i> About Me", key: "about" },
      { label: "<i class='fas fa-tools'></i> Skills", key: "skills" },
      { label: "<i class='fas fa-laptop-code'></i> Projects", key: "projects" },
      { label: "<i class='fas fa-briefcase'></i> Experience", key: "experience" },
      { label: "<i class='fas fa-graduation-cap'></i> Education", key: "education" },
      { label: "<i class='fas fa-address-book'></i> Contact", key: "contact" }
    ]
  },

  // ─── RESPONSES (keyed by button key) ───
  responses: {

    // ── ABOUT ──
    about: {
      text: "Abdul Kheeyan is a Full Stack Developer specializing in MERN stack development.\n\nHe has hands-on experience building production-grade, AI-integrated web applications. Proficient in React.js, Node.js, Express.js, MongoDB, WebRTC, Socket.io, and Google Gemini AI.\n\nSkilled at architecting scalable systems, real-time communication, and robust LLM-powered features within agile environments.",
      buttons: [
        { label: "<i class='fas fa-tools'></i> Skills", key: "skills" },
        { label: "<i class='fas fa-laptop-code'></i> Projects", key: "projects" },
        { label: "<i class='fas fa-briefcase'></i> Experience", key: "experience" },
        { label: "<i class='fas fa-address-book'></i> Contact", key: "contact" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── SKILLS OVERVIEW ──
    skills: {
      text: "Abdul has a diverse and strong technical skill set across the full stack:\n\n• Languages — JavaScript (ES6+), HTML5, CSS3, C++\n• Frontend — React.js, Vite, Tailwind CSS, Framer Motion\n• Backend — Node.js, Express.js, REST APIs, Socket.io, WebRTC\n• Database — MongoDB, Mongoose, MongoDB Atlas, MySQL\n• AI & APIs — Google Gemini API, GitHub API, LLM Integration\n• Security — JWT, bcrypt.js, HMAC, RBAC\n• Tools — Git, GitHub, Postman, Vercel, Render, CI/CD\n\nClick below to explore each area:",
      buttons: [
        { label: "<i class='fab fa-react'></i> Frontend", key: "frontend_skills" },
        { label: "<i class='fas fa-server'></i> Backend", key: "backend_skills" },
        { label: "<i class='fas fa-database'></i> Database", key: "database_skills" },
        { label: "<i class='fas fa-brain'></i> AI & APIs", key: "ai_skills" },
        { label: "<i class='fas fa-terminal'></i> Dev Tools", key: "tools_skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── FRONTEND SKILLS ──
    frontend_skills: {
      text: "Frontend Technologies:\n\n• React.js (v19) — Component-based UI development\n• Vite — Fast build tool & development server\n• Tailwind CSS — Utility-first CSS framework\n• React Router DOM — Client-side routing\n• Axios — HTTP client for API calls\n• Framer Motion — Smooth animations & transitions\n• Responsive Design — Mobile-first approach\n• Material UI — React component library",
      buttons: [
        { label: "<i class='fas fa-server'></i> Backend", key: "backend_skills" },
        { label: "<i class='fas fa-database'></i> Database", key: "database_skills" },
        { label: "<i class='fas fa-tools'></i> All Skills", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── BACKEND SKILLS ──
    backend_skills: {
      text: "Backend Technologies:\n\n• Node.js — Server-side JavaScript runtime\n• Express.js — Minimal & flexible web framework\n• REST APIs — RESTful API design & development\n• Socket.io — Real-time bidirectional communication\n• WebRTC — Peer-to-peer video/audio streaming\n• Multer — File upload handling\n• Nodemon — Auto-restart dev server\n• JWT & bcrypt.js — Authentication & password hashing\n• HMAC Signature Verification — Secure API communication\n• Role-Based Access Control — User permission management",
      buttons: [
        { label: "<i class='fab fa-react'></i> Frontend", key: "frontend_skills" },
        { label: "<i class='fas fa-database'></i> Database", key: "database_skills" },
        { label: "<i class='fas fa-tools'></i> All Skills", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── DATABASE SKILLS ──
    database_skills: {
      text: "Database Technologies:\n\n• MongoDB — NoSQL document database\n• Mongoose ODM — Object Data Modeling for MongoDB\n• MongoDB Atlas — Cloud-hosted database service\n• MySQL — Relational database management\n• Database Design — Schema design & query optimization",
      buttons: [
        { label: "<i class='fab fa-react'></i> Frontend", key: "frontend_skills" },
        { label: "<i class='fas fa-server'></i> Backend", key: "backend_skills" },
        { label: "<i class='fas fa-tools'></i> All Skills", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── AI & API SKILLS ──
    ai_skills: {
      text: "AI & API Integrations:\n\n• Google Gemini API — Multi-model AI integration with fallback chains\n• GitHub API — Repository analysis & code fetching\n• LLM Integration — Large Language Model-powered features\n• Razorpay — Payment gateway integration\n• OpenAI API — AI-powered features\n• Prompt Engineering — Crafting effective AI prompts\n• AI Chatbots — Building conversational AI interfaces",
      buttons: [
        { label: "<i class='fab fa-react'></i> Frontend", key: "frontend_skills" },
        { label: "<i class='fas fa-server'></i> Backend", key: "backend_skills" },
        { label: "<i class='fas fa-tools'></i> All Skills", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── DEVELOPER TOOLS ──
    tools_skills: {
      text: "Developer Tools:\n\n• Git — Version control system\n• GitHub — Code hosting & collaboration\n• Postman — API testing & documentation\n• VS Code — Primary code editor\n• Chrome DevTools — Debugging & performance profiling\n• npm — Package management\n• Vercel — Frontend deployment platform\n• Render — Backend deployment platform\n• CI/CD — Continuous integration & deployment pipelines",
      buttons: [
        { label: "<i class='fab fa-react'></i> Frontend", key: "frontend_skills" },
        { label: "<i class='fas fa-brain'></i> AI & APIs", key: "ai_skills" },
        { label: "<i class='fas fa-tools'></i> All Skills", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── PROJECTS OVERVIEW ──
    projects: {
      text: "Abdul has built several production-grade projects:\n\n🏥 MediAI Pro — AI-powered healthcare platform with video consultations\n💻 CodeVault — AI-driven code analysis & review tool\n🌐 Portfolio Website — The site you're on right now!\n\nClick below to learn more about each:",
      buttons: [
        { label: "<i class='fas fa-heartbeat'></i> MediAI Pro", key: "mediai_pro" },
        { label: "<i class='fas fa-code'></i> CodeVault", key: "codevault" },
        { label: "<i class='fas fa-globe'></i> Other Projects", key: "other_projects" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── MEDIAI PRO ──
    mediai_pro: {
      text: "MediAI Pro (2026)\nTech: MERN Stack, Gemini API, WebRTC, Socket.io, Razorpay\n\n• Architected a multi-role (patient / doctor / pharmacy) AI-powered healthcare platform featuring appointment booking, Razorpay payment processing, and a digital Health Vault\n\n• Engineered a 6-model Google Gemini API fallback chain for AI symptom triage, reducing service downtime by ~20%\n\n• Implemented peer-to-peer WebRTC video consultations with Socket.io signaling, eliminating third-party infrastructure and reducing communication latency by ~35%",
      buttons: [
        { label: "<i class='fas fa-code'></i> CodeVault", key: "codevault" },
        { label: "<i class='fas fa-laptop-code'></i> All Projects", key: "projects" },
        { label: "<i class='fas fa-tools'></i> Skills Used", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── CODEVAULT ──
    codevault: {
      text: "CodeVault (2026)\nTech: React.js, Node.js, GitHub API, LLMs, UI/UX Design\n\n• Engineered an AI-driven code analysis tool that dynamically fetches repositories via GitHub APIs to automatically analyze codebases, identify bugs, and suggest structural refactoring\n\n• Integrated LLM-powered logic to review code quality in real-time, enforcing best practices and significantly reducing manual debugging time for developers\n\n• Optimized backend database queries and implemented frontend lazy loading, decreasing data retrieval latency by ~40% and enhancing overall SPA speed",
      buttons: [
        { label: "<i class='fas fa-heartbeat'></i> MediAI Pro", key: "mediai_pro" },
        { label: "<i class='fas fa-laptop-code'></i> All Projects", key: "projects" },
        { label: "<i class='fas fa-tools'></i> Skills Used", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── OTHER PROJECTS ──
    other_projects: {
      text: "Other Projects by Abdul:\n\n🎨 Simple & Responsive UI Designs\nBuilt responsive webpages using HTML & CSS, focusing on layout, typography, and modern design principles\n\n⚡ Interactive Web Components\nDynamic applications with JavaScript featuring real-time interactivity, DOM manipulation, and event handling\n\n🔧 Full-Stack MERN Applications\nComplete web applications with MongoDB, Express.js, React, and Node.js — including CRUD operations, authentication, and API integration\n\nExplore all projects on this portfolio website!",
      buttons: [
        { label: "<i class='fas fa-heartbeat'></i> MediAI Pro", key: "mediai_pro" },
        { label: "<i class='fas fa-code'></i> CodeVault", key: "codevault" },
        { label: "<i class='fas fa-laptop-code'></i> All Projects", key: "projects" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── EXPERIENCE ──
    experience: {
      text: "Work Experience:\n\nWeb Development Intern — Technical One\n📅 January 2026 – June 2026 | Remote\n\n• Completed a 6-month full-stack web development internship, delivering assigned features using React.js, Node.js, Express.js, and MongoDB in an agile environment\n\n• Participated in comprehensive AI/ML training sessions covering Large Language Models (LLMs) and Generative AI, integrating AI-driven features into project deliverables",
      buttons: [
        { label: "<i class='fas fa-tools'></i> Skills", key: "skills" },
        { label: "<i class='fas fa-laptop-code'></i> Projects", key: "projects" },
        { label: "<i class='fas fa-graduation-cap'></i> Education", key: "education" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── EDUCATION ──
    education: {
      text: "Education:\n\n• Bachelor of Computer Applications (BCA)\nKavikulaguru Kalidas Sanskrit University (KKSU)\n📅 June 2024 – June 2028 | India\n\n• Bachelor of Commerce (B.Com)\nYashwantrao Chavan Maharashtra Open University (YCMOU)\n📅 July 2024 – June 2027 | Nashik, India",
      buttons: [
        { label: "<i class='fas fa-certificate'></i> Certifications", key: "certifications" },
        { label: "<i class='fas fa-briefcase'></i> Experience", key: "experience" },
        { label: "<i class='fas fa-tools'></i> Skills", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── CERTIFICATIONS ──
    certifications: {
      text: "Certifications:\n\n• Generative AI Mastermind — Outskill (Oct 2025)\nCompleted intensive program on Generative AI, LLMs, and prompt engineering, gaining hands-on experience with 14+ AI tools for software development workflows\n\n• ChatGPT & AI Tools Workshop — Be10x (2026)\nCompleted hands-on workshop covering ChatGPT (GPT-4) and AI-powered automation techniques to streamline development workflows",
      buttons: [
        { label: "<i class='fas fa-graduation-cap'></i> Education", key: "education" },
        { label: "<i class='fas fa-briefcase'></i> Experience", key: "experience" },
        { label: "<i class='fas fa-tools'></i> Skills", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    },

    // ── CONTACT ──
    contact: {
      text: "Contact Abdul Kheeyan:\n\n📧 Email: abdulkheeyan@gmail.com\n📱 Phone: +91 9527864410\n🔗 LinkedIn: linkedin.com/in/abdul-kheeyan\n🐙 GitHub: github.com/abdul-kheeyan\n🐦 Twitter/X: x.com/ABDUL_KHEEYAN\n\nFeel free to reach out for collaborations, job opportunities, or just to say hi!",
      buttons: [
        { label: "<i class='fas fa-user-tie'></i> About Me", key: "about" },
        { label: "<i class='fas fa-laptop-code'></i> Projects", key: "projects" },
        { label: "<i class='fas fa-tools'></i> Skills", key: "skills" },
        { label: "<i class='fas fa-home'></i> Main Menu", key: "greeting" }
      ]
    }
  }
};
