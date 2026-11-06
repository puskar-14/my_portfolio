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
    id: "finance-health-coach",
    isFeatured: true,
    status: "In Planning",
    title: "AI Finance Health Coach",
    subtitle: "AI-Powered Personal Finance Management Platform",
    tagline: "Understand your money, improve your financial habits, and plan smarter.",
    category: "FinTech & Artificial Intelligence",
    badge: "Upcoming College Project",
    pastel: "#8DCFC4",
    accent: "#279B88",
    icon: "Wallet",
    overview:
      "AI Finance Health Coach is a personal finance management platform designed to help users understand their financial habits through transaction tracking, expense analysis, budgeting, savings management, and intelligent financial insights.",
    problemStatement:
      "Individuals often struggle to track spending, manage budgets, categorize transactions, and understand their overall financial health. Traditional expense trackers provide records but offer limited personalized insights.",
    solution:
      "Proposed a centralized financial platform that organizes income, expenses, budgets, savings, loans, and financial goals while generating actionable financial insights.",
    implementationDetails:
      "Planned features include automatic transaction categorization, user-correctable categories, Financial Health Score calculation, overspending detection, cash-flow forecasting, expense prediction, goal tracking, bill reminders, anomaly detection, and financial report generation.",
    technologies: [
      "Python",
      "React",
      "FastAPI",
      "PostgreSQL",
      "Machine Learning",
      "Data Analytics",
      "REST APIs"
    ],
    keyFeatures: [
      "Financial Health Score: Evaluates overall financial habits using income, expenses, savings, and budget patterns.",
      "Smart Transaction Categorization: Categorizes transactions with the ability to review and correct predictions.",
      "Expense Analytics: Visualizes spending patterns and identifies major expense categories.",
      "Budget Management: Helps users establish budgets and detect overspending.",
      "Cash-Flow Forecasting: Estimates future financial positions using historical transaction patterns.",
      "Financial Goals: Tracks savings targets, loans, and financial milestones.",
      "Anomaly Detection: Identifies unusual transaction patterns."
    ],
    metrics: [
      { label: "Core Focus", val: "Financial Health" },
      { label: "Analytics", val: "Expense & Cash Flow" },
      { label: "AI Application", val: "Prediction & Categorization" }
    ],
    github: "https://github.com/puskar-14",
    liveDemo: null
  },

  {
    id: "returnshield-ai",
    isFeatured: true,
    status: "Hackathon Concept",
    title: "ReturnShield AI",
    subtitle: "AI-Powered Refund Risk Assessment System",
    tagline: "Detect. Explain. Decide.",
    category: "FinTech & AI Risk Intelligence",
    badge: "Razorpay Hackathon Concept",
    pastel: "#F2A6A6",
    accent: "#D65B65",
    icon: "ShieldCheck",
    overview:
      "ReturnShield AI is a proposed intelligent refund risk assessment platform designed to help e-commerce businesses evaluate potentially suspicious refund requests and make informed decisions.",
    problemStatement:
      "Businesses face financial losses from fraudulent refund requests, suspicious return patterns, and abuse of refund policies. Manual review makes it difficult to assess every request consistently.",
    solution:
      "Proposed a risk-scoring system that evaluates refund requests, explains suspicious patterns, and recommends appropriate actions for human reviewers.",
    implementationDetails:
      "The proposed system uses transaction information, refund history, customer behaviour, and risk indicators to generate an explainable refund risk score.",
    technologies: [
      "Python",
      "Machine Learning",
      "React",
      "FastAPI",
      "PostgreSQL",
      "Explainable AI",
      "REST APIs"
    ],
    keyFeatures: [
      "Refund Risk Scoring: Assigns risk levels to incoming refund requests.",
      "Explainable Decisions: Highlights the factors contributing to a risk assessment.",
      "Decision Recommendations: Supports Approve, Review, and Hold workflows.",
      "Risk Analytics: Provides insights into suspicious refund patterns.",
      "Financial Impact Analysis: Estimates potential exposure from risky refund requests."
    ],
    metrics: [
      { label: "Core Concept", val: "Refund Risk Scoring" },
      { label: "Decision System", val: "Approve / Review / Hold" },
      { label: "USP", val: "Explainable Risk Assessment" }
    ],
    github: "https://github.com/puskar-14",
    liveDemo: null
  },

  {
    id: "egovdrishti-ai",
    isFeatured: false,
    status: "Concept / In Development",
    title: "e-GovDrishti AI",
    subtitle: "AI-Based Government Website Compliance & Accessibility Platform",
    tagline: "Making digital government services more accessible, transparent, and compliant.",
    category: "GovTech & Artificial Intelligence",
    badge: "SIH AI Innovation Concept",
    pastel: "#A8C8F0",
    accent: "#568ACB",
    icon: "Landmark",
    overview:
      "e-GovDrishti AI is a proposed platform for evaluating government websites against digital accessibility, security, and compliance requirements.",
    problemStatement:
      "Government websites need to maintain accessibility, usability, security, and compliance standards. Manual auditing can be time-consuming and makes continuous monitoring difficult.",
    solution:
      "Proposed an AI-assisted auditing platform that evaluates website compliance indicators, highlights potential accessibility issues, and presents findings through an explainable dashboard.",
    implementationDetails:
      "The concept includes automated website checks, compliance scoring, accessibility analysis, audit logs, visual reports, and monitoring dashboards aligned with relevant guidelines and standards.",
    technologies: [
      "React",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "AI/ML",
      "Web Accessibility"
    ],
    keyFeatures: [
      "Website Compliance Auditing: Evaluates selected website compliance indicators.",
      "Accessibility Analysis: Identifies potential usability and accessibility issues.",
      "Explainable Reports: Presents detected issues with supporting explanations.",
      "Compliance Dashboard: Visualizes audit results and compliance trends.",
      "Audit Trail: Maintains records of evaluation activities.",
      "Continuous Monitoring: Concept for tracking changes in website compliance."
    ],
    metrics: [
      { label: "Domain", val: "GovTech" },
      { label: "Core Focus", val: "Accessibility & Compliance" },
      { label: "Architecture", val: "React + FastAPI" }
    ],
    github: "https://github.com/puskar-14",
    liveDemo: null
  },


  {
    id: "autonomous-ai-hospital Finder",
    isFeatured: false,
    status: "Hackathon Concept",
    title: "Autonomous Multi-Agent AI Hospital",
    subtitle: "Multi-Agent Artificial Intelligence for Healthcare Workflows",
    tagline: "Coordinating intelligent agents to streamline hospital operations.",
    category: "Agentic AI & Healthcare",
    badge: "Hackathon Concept",
    pastel: "#B8D9CE",
    accent: "#559B83",
    icon: "Hospital",
    overview:
      "A proposed multi-agent AI hospital management system where specialized AI agents collaborate to support different hospital workflows and improve operational coordination.",
    problemStatement:
      "Hospital workflows involve multiple interconnected activities, including appointment coordination, patient information management, resource allocation, and administrative tasks. Disconnected workflows can create delays and inefficiencies.",
    solution:
      "Proposed a coordinated multi-agent architecture in which specialized agents handle different operational tasks and collaborate through a central orchestration layer.",
    implementationDetails:
      "The concept explores autonomous agent coordination, task delegation, shared context, workflow orchestration, and GPU-accelerated AI capabilities.",
    technologies: [
      "Python",
      "Agentic AI",
      "LLMs",
      "Multi-Agent Systems",
      "FastAPI",
      "React",
      "NVIDIA GPU Computing"
    ],
    keyFeatures: [
      "Multi-Agent Coordination: Specialized agents collaborate on hospital workflows.",
      "Workflow Automation: Supports coordination of administrative tasks.",
      "Task Delegation: Assigns tasks to specialized agents.",
      "Central Orchestration: Coordinates agent communication and task execution.",
      "Operational Dashboard: Concept for monitoring agent activities and workflow status."
    ],
    metrics: [
      { label: "Architecture", val: "Multi-Agent AI" },
      { label: "Domain", val: "Healthcare Technology" },
      { label: "Focus", val: "Workflow Automation" }
    ],
    github: "https://github.com/puskar-14",
    liveDemo: null
  }
];
