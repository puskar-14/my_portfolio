export const projectsData = [
  {
    id: "shopsense",
    isFeatured: true,
    title: "ShopSense",
    subtitle: "Customer Insight & Product Analytics Platform",
    tagline: "Uncovering actionable e-commerce intelligence from customer voice and sales signals",
    category: "Full-Stack Analytics",
    badge: "Flagship Project",
    pastel: "#FFE5D4",
    accent: "#E28743",
    icon: "ShoppingBag",
    overview: "ShopSense is an end-to-end customer intelligence and analytics platform engineered to bridge the gap between customer sentiment and inventory performance for modern e-commerce stores.",
    problemStatement: "E-commerce retailers are inundated with fragmented reviews, star ratings, return notes, and customer support queries. Without automated sentiment categorization and product health tracking, merchants miss early warning signals on defective batches, sizing confusion, or declining product satisfaction.",
    solution: "Engineered a centralized analytics dashboard powered by a high-throughput FastAPI backend and PostgreSQL database. The platform aggregates customer sentiment across multiple product SKUs, detects satisfaction velocity trends, and pinpoints recurring friction keywords, enabling merchants to make immediate product and inventory adjustments.",
    technologies: ["React", "FastAPI", "Python", "PostgreSQL", "Tailwind CSS", "RESTful APIs", "SQL"],
    keyFeatures: [
      "Real-Time Sentiment Scoring: Automatically evaluates customer reviews and scores product satisfaction on a normalized scale.",
      "Product Health Telemetry: Identifies SKU churn indicators, return rates, and positive sentiment momentum.",
      "Interactive Analytics Dashboard: Clean visual breakdown of rating distributions, customer feedback themes, and sales correlation.",
      "High-Performance REST API: Modular FastAPI architecture ensuring fast query execution against relational PostgreSQL data.",
      "Friction Keyword Extraction: Surfaces recurring customer pain points like 'zipper quality' or 'runs small' to prevent returns."
    ],
    metrics: [
      { label: "Architecture", val: "FastAPI + Postgres" },
      { label: "Frontend", val: "React + Tailwind" },
      { label: "Data Pipeline", val: "Sentiment Analysis" }
    ],
    github: "https://github.com/Puskar-dev/ShopSense",
    liveDemo: "https://shopsense-demo.vercel.app"
  },
  {
    id: "ai-finance-health-coach",
    isFeatured: true,
    title: "AI Finance Health Coach",
    subtitle: "Intelligent Cashflow & Budget Optimization Assistant",
    tagline: "Empowering everyday users with empathetic, data-driven financial clarity",
    category: "AI & FinTech",
    badge: "AI Application",
    pastel: "#D4F4DD",
    accent: "#38A169",
    icon: "PiggyBank",
    overview: "An AI-guided personal financial health coach that tracks spending patterns, categorizes expense flows, and provides proactive conversational guidance to eliminate financial leakages.",
    problemStatement: "Most budgeting tools either require tedious manual receipt logging or present intimidating spreadsheets full of dry numbers without providing actionable advice on what adjustments to make next.",
    solution: "Built a responsive financial coaching system that categorizes transactions automatically, computes a holistic 'Financial Health Index', and uses AI recommendation heuristics to highlight unnecessary subscriptions, discretionary leaks, and realistic savings targets.",
    technologies: ["Python", "FastAPI", "React", "PostgreSQL", "Tailwind CSS", "Data Analysis"],
    keyFeatures: [
      "Smart Expense Categorization: Ingests transactions and categorizes necessities vs. discretionary spending.",
      "Financial Health Index: Generates an easy-to-understand health score (0-100) based on savings-to-income and debt velocity.",
      "Conversational Financial Coach: Contextual AI tips explaining how small weekly adjustments lead to compound savings.",
      "Predictive Cashflow Alerts: Warns users about upcoming bill clusters before end-of-month budget shortfalls occur."
    ],
    metrics: [
      { label: "Coaching Engine", val: "Heuristic AI" },
      { label: "Stack", val: "Python + React" },
      { label: "Focus", val: "Cashflow Clarity" }
    ],
    github: "https://github.com/Puskar-dev/ai-finance-health-coach",
    liveDemo: "https://finance-coach.puskar.dev"
  },
  {
    id: "algorithmic-vault",
    isFeatured: false,
    title: "Algorithmic Practice Vault",
    subtitle: "Curated 250+ LeetCode & 90+ CodeChef Solutions",
    tagline: "A benchmarked repository of data structure implementations and algorithmic patterns",
    category: "Algorithms & Systems",
    badge: "DSA Portfolio",
    pastel: "#E8DDFF",
    accent: "#7C3AED",
    icon: "Binary",
    overview: "A comprehensive problem-solving repository documenting optimal time and space complexity solutions across 340+ competitive coding challenges in Java, Python, and C++.",
    problemStatement: "Retaining algorithmic intuition requires deep pattern recognition across graph traversals, dynamic programming states, two-pointer techniques, and edge case handling.",
    solution: "Maintained a structured, test-verified code vault categorizing problems by pattern (Sliding Window, Binary Search, DFS/BFS, Knapsack, Union-Find) with time/space complexity proofs.",
    technologies: ["Java", "Python", "C", "Data Structures", "Algorithms", "Git"],
    keyFeatures: [
      "Pattern-first classification for fast retrieval of algorithmic templates",
      "Rigorous time and space complexity annotations on every solution",
      "Benchmark comparisons between naive and optimal dynamic programming solutions"
    ],
    metrics: [
      { label: "LeetCode", val: "250+ Solved" },
      { label: "CodeChef", val: "90+ Solved" },
      { label: "Languages", val: "Java & Python" }
    ],
    github: "https://github.com/Puskar-dev/algorithmic-vault",
    liveDemo: null
  },
  {
    id: "campus-resource-hub",
    isFeatured: false,
    title: "CEMK Campus Resource Hub",
    subtitle: "Collaborative Academic Repository & Study Portal",
    tagline: "Connecting engineering students with organized course materials and peer notes",
    category: "Web Application",
    badge: "Community",
    pastel: "#D6E6FF",
    accent: "#3182CE",
    icon: "GraduationCap",
    overview: "A lightweight collaborative web portal designed for engineering peers at College of Engineering & Management, Kolaghat to share semester syllabus guides, verified lab practicals, and lecture notes.",
    problemStatement: "Engineering coursework materials are often scattered across disparate messaging groups and personal drives, making exam revision stressful and disorganized.",
    solution: "Created a searchable portal organized by semester, branch, and subject code with quick PDF previews, verified uploads, and subject discussion forums.",
    technologies: ["React", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    keyFeatures: [
      "Semester & department filtered directory of verified study notes",
      "Fast PDF viewer integration and tag-based document search",
      "Peer contribution queue with upload moderation"
    ],
    metrics: [
      { label: "Community", val: "CEMK CSE" },
      { label: "Database", val: "PostgreSQL" },
      { label: "UX", val: "Instant Search" }
    ],
    github: "https://github.com/Puskar-dev/campus-resource-hub",
    liveDemo: null
  }
];
