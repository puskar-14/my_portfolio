export const projectsData = [
  {
    id: "shopsense",
    isFeatured: true,
    title: "ShopSense",
    subtitle: "AI-Powered Multi-Vendor E-Commerce Analytics Platform",
    tagline: "Empowering multi-vendor commerce with Admin, Vendor, and Customer portals and AI-driven insights",
    category: "Full-Stack Analytics & AI",
    badge: "Flagship Project • Infosys Springboard",
    pastel: "#FFA875",
    accent: "#E28743",
    icon: "ShoppingBag",
    overview: "ShopSense is a full-stack multi-vendor e-commerce analytics platform developed during an Infosys Springboard internship. It centralizes product catalog management, sales telemetry, and automated customer sentiment extraction across specialized portals.",
    problemStatement: "Multi-vendor platforms lack centralized tools for product management, sales analysis, and feedback aggregation. Vendors and administrators struggle to analyze customer review sentiment, optimize product discovery, and track cross-store sales trends efficiently.",
    solution: "Built a full-stack platform featuring distinct Admin, Vendor, and Customer portals for end-to-end product management, sales analytics, and AI-powered customer insights.",
    implementationDetails: "Used FastAPI and PostgreSQL for robust backend and data management, SQLAlchemy for relational modeling, Pandas for analytics, and AI/ML APIs for product tagline generation, semantic product discovery, and automated customer review sentiment analysis.",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "SQLAlchemy",
      "Pandas",
      "AI/ML APIs",
      "REST APIs"
    ],
    keyFeatures: [
      "Three Distinct Portals: Tailored interfaces for Platform Administrators, Independent Vendors, and End Customers.",
      "AI Sentiment Analysis: Evaluates customer review streams to classify satisfaction scores and alert vendors to product issues.",
      "Semantic Product Discovery: AI-powered search enabling customers to discover products through natural language and contextual intent.",
      "Automated Tagline Generation: Generates compelling marketing taglines for products via AI/ML API integration.",
      "Comprehensive Sales Telemetry: Pandas-driven analytics tracking SKU performance, sales volume, and vendor revenue."
    ],
    metrics: [
      { label: "Backend Architecture", val: "FastAPI + SQLAlchemy" },
      { label: "Database Engine", val: "PostgreSQL" },
      { label: "Data Pipeline", val: "Pandas + AI/ML APIs" }
    ],
    github: "https://github.com/puskar-14",
    liveDemo: "https://shopsense-demo.vercel.app"
  },
  {
    id: "career-ladder",
    isFeatured: true,
    title: "Career Ladder",
    subtitle: "AI-Powered Career Guidance Web App",
    tagline: "Personalized career roadmaps and skill-building journeys powered by Gemini API",
    category: "Generative AI & Web",
    badge: "AI Guidance Application",
    pastel: "#6DE0A6",
    accent: "#10B981",
    icon: "GraduationCap",
    overview: "Career Ladder is an intelligent career mentoring web application that helps students and early-career developers discover customized professional paths, build in-demand skills, and track learning milestones.",
    problemStatement: "Students often lack personalized guidance for choosing careers, understanding prerequisite skills, and structuring sequential roadmaps tailored to their individual passions and background.",
    solution: "Developed an AI web application that automatically generates comprehensive, step-by-step career roadmaps based on user interests, current technical skills, and target career goals.",
    implementationDetails: "Integrated the Gemini API for contextual AI recommendations and career path generation. Utilized Google Firebase for secure user authentication and persistent cloud storage, complete with roadmap saving, PDF export, notes taking, and instant search/filter features.",
    technologies: [
      "Gemini API",
      "Firebase",
      "HTML",
      "CSS",
      "JavaScript",
      "PDF Export",
      "Cloud Storage"
    ],
    keyFeatures: [
      "Gemini AI Roadmap Generation: Custom-tailored milestone roadmaps adapting to each user's skill level and career goals.",
      "Firebase Cloud Authentication & Storage: Secure user accounts enabling progress saving and synchronized cross-device access.",
      "PDF Roadmap Export: Allows students to download and print formatted career guides for offline revision.",
      "Interactive Learning Notes: In-app note taking to track bookmarked courses, tutorials, and certification milestones.",
      "Search & Filter: Fast discovery of trending technology roles, required competencies, and salary benchmarks."
    ],
    metrics: [
      { label: "AI Engine", val: "Google Gemini API" },
      { label: "Cloud & Auth", val: "Google Firebase" },
      { label: "Features", val: "PDF Export & Roadmaps" }
    ],
    github: "https://github.com/puskar-14",
    liveDemo: null
  },
  {
    id: "algorithmic-vault",
    isFeatured: false,
    title: "Algorithmic Problem Solving Vault",
    subtitle: "250+ LeetCode Solutions & Pattern Benchmarks",
    tagline: "Rigorous problem solving across Data Structures and Algorithms in Java and Python",
    category: "Algorithms & Problem Solving",
    badge: "250+ LeetCode Solved",
    pastel: "#BFA8FA",
    accent: "#8B5CF6",
    icon: "Code2",
    overview: "A repository of optimal time and space complexity solutions across 250+ LeetCode challenges, categorizing patterns across Dynamic Programming, Graph Traversals, Trees, and Two Pointers.",
    problemStatement: "Mastering competitive coding and technical interviews requires identifying recurring algorithmic templates and understanding asymptotic complexity tradeoffs.",
    solution: "Curated and documented clean Java and Python implementations with formal time/space complexity proofs and edge case analyses.",
    implementationDetails: "Implemented core algorithmic templates in Java and Python with JUnit test coverage and complexity notes.",
    technologies: ["Java", "Python", "Data Structures", "Algorithms", "Git"],
    keyFeatures: [
      "250+ LeetCode problems solved with verified optimal time/space complexity.",
      "Pattern-based organization: Graphs, Trees, Dynamic Programming, Two Pointers, and Binary Search.",
      "Clean, readable code with in-line logic explanations."
    ],
    metrics: [
      { label: "LeetCode Solved", val: "250+ Problems" },
      { label: "Core Languages", val: "Java & Python" },
      { label: "Focus", val: "DSA Mastery" }
    ],
    github: "https://github.com/puskar-14",
    liveDemo: null
  }
];
