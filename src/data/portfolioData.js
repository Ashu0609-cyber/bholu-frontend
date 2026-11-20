/**
 * Portfolio Master Data for Ashutosh Sanjay Thakur (Bholu 2.0)
 * Centralized, typed, and structured for instant availability across the entire portfolio.
 */

export const PORTFOLIO_DATA = {
  personal: {
    name: "Ashutosh Sanjay Thakur",
    title: "AI/ML Engineer | Generative AI Developer",
    tagline: "Building intelligent systems, one spell at a time.",
    subtagline: "Specializing in Large Language Models, Transformer Architectures from Scratch, and Production Agentic RAG Pipelines.",
    location: "Bengaluru, Karnataka, India",
    email: "thakurashutosh12341235@gmail.com",
    phone: "+91 7058727787",
    linkedin: "https://www.linkedin.com/in/ashutosh-thakur-735673357",
    github: "https://github.com/Ashu0609-cyber",
    resumePdf: `${import.meta.env.BASE_URL || "/"}resume.pdf`,
    summary:
      "Computer Science Engineering student at BMSIT&M with strong expertise in Generative AI, PyTorch, Transformers, Agentic Workflows, and RAG systems. Built a 124M-parameter GPT model from scratch, engineered scientific vision algorithms for microscopy reconstruction (StructureGuard), and developed low-latency retrieval pipelines. Top 2100 in Amazon ML Challenge 2024 among 89,000+ teams.",
    education: {
      degree: "B.E. in Computer Science and Engineering",
      institution: "BMS Institute of Technology & Management, Bengaluru",
      duration: "Expected 2027",
      cgpa: "8.89 (7th Semester)",
      keyHighlights: [
        "Data Structures & Algorithms (100+ LeetCode solved)",
        "Artificial Intelligence & Deep Learning",
        "Database Management Systems & Relational Design",
        "Operating Systems & Distributed Networks",
      ],
    },
    houseNote: {
      house: "Hogwarts Alum with Slytherin Precision",
      description: "Resourceful engineering, ambitious problem-solving, and meticulous attention to performance and code craft.",
    },
  },

  // Verified real architectural photography
  photography: {
    greatHall: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=2000&q=85", // Gothic stone hall with warm chandeliers
    gothicLibrary: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=85", // Majestic ancient library
    stoneCloister: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1600&q=85", // Cathedral stone archway
    ancientBooks: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1600&q=85", // Ancient manuscript and parchment
    castleMist: "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=1600&q=85", // Castle in mist / owl post
    chamberBooks: "https://images.unsplash.com/photo-1507842229451-7f01be7ffc18?auto=format&fit=crop&w=1600&q=85", // Grand bookshelves
  },

  projects: [
    {
      id: "structureguard",
      name: "StructureGuard",
      subtitle: "Microscopy Reconstruction & Scientific Integrity Platform",
      category: "Computer Vision & Scientific AI",
      tag: "Flagship Project",
      image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80",
      problem:
        "High-resolution microscopy imagery is prone to optical noise, structural artifacts, and lack of reproducible validation standards in scientific analysis.",
      solution:
        "Developed StructureGuard, an AI-powered microscopy reconstruction pipeline utilizing a custom Micro-EDSR-32 architecture with rigorous scientific validation metrics and reproducibility checks.",
      architecture:
        "Custom Micro-EDSR-32 (Enhanced Deep Residual Networks) trained with perceptual and structural loss functions, combined with an automated provenance tracker for data reliability.",
      techStack: ["Python", "PyTorch", "OpenCV", "NumPy", "Scientific Metrics", "Docker"],
      results:
        "Significantly restored fine cellular structures with high peak signal-to-noise ratio (PSNR) and SSIM scores while maintaining model integrity and repeatable benchmark fidelity.",
      repo: "https://github.com/Ashu0609-cyber/StructureGuard",
      demo: null,
      promptSuggestion: "Explain StructureGuard's Micro-EDSR-32 architecture and scientific validation features.",
    },
    {
      id: "oceanscope",
      name: "OceanScope",
      subtitle: "Agentic LLM Interface for Oceanographic Data Exploration",
      category: "Generative AI & RAG",
      tag: "RAG & Vector DB",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
      problem:
        "Oceanographic sensor telemetry is massive, multidimensional, and difficult for non-technical researchers and oceanographers to query using natural language.",
      solution:
        "Built an intelligent RAG platform combining PostgreSQL relational data and vector embeddings to answer complex geospatial and temporal ocean data queries in real time.",
      architecture:
        "FastAPI backend orchestrating hybrid retrieval over PostgreSQL relational tables and pgvector similarity search, feeding grounded context to an LLM agent with structured SQL generation.",
      techStack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "LangChain", "Gemini API", "React"],
      results:
        "Enabled sub-second natural language question answering across ocean temperature, salinity, and bathymetry data with zero hallucination via strict schema grounding.",
      repo: "https://github.com/Ashu0609-cyber/OceanScope",
      demo: null,
      promptSuggestion: "How does OceanScope integrate PostgreSQL and vector search for oceanographic queries?",
    },
    {
      id: "gpt-124m",
      name: "GPT-124M from Scratch",
      subtitle: "Decoder-Only Transformer Architecture in Pure PyTorch",
      category: "Deep Learning & LLM Core",
      tag: "LLM Architecture",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      problem:
        "Understanding modern large language models requires deep, first-principles knowledge of the underlying attention mechanics rather than just calling wrapper APIs.",
      solution:
        "Constructed a 124-million parameter decoder-only GPT transformer completely from scratch in PyTorch without using Hugging Face transformers or high-level abstractions.",
      architecture:
        "Implemented token & learned positional embeddings, causal masked multi-head self-attention (MHA), LayerNorm, GELU activations, residual stream connections, and projection heads. Built end-to-end training pipeline with custom BPE tokenization, AdamW optimizer, cosine learning rate scheduler, checkpointing, and autoregressive generation sampling.",
      techStack: ["Python", "PyTorch", "CUDA", "BPE Tokenization", "Math & Linear Algebra"],
      results:
        "Successfully verified training convergence, loss reduction, and generated coherent autoregressive text samples mirroring OpenAI GPT-2 Small architecture.",
      repo: "https://github.com/Ashu0609-cyber/124MGPT_Model_From_Scratch",
      demo: null,
      promptSuggestion: "Did Ashutosh implement multi-head attention and LayerNorm from scratch in GPT-124M?",
    },
    {
      id: "amazon-ml-challenge",
      name: "Amazon ML Challenge 2024",
      subtitle: "Multimodal Entity & Dimension Extraction at Scale",
      category: "Competitive Machine Learning",
      tag: "Top 2.3% Nationwide",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      problem:
        "Extracting standardized product dimensions (weight, volume, length) from noisy e-commerce product images and text catalog entries across millions of diverse products.",
      solution:
        "Formulated a hybrid multimodal architecture combining OCR text parsing with Vision Transformers and fine-tuned text encoders, supplemented by custom regex post-processing.",
      architecture:
        "Ensemble of OCR (PaddleOCR/EasyOCR) for feature extraction + fine-tuned RoBERTa and DeBERTa for attribute entity classification, with deterministic unit normalization.",
      techStack: ["Python", "PyTorch", "Hugging Face", "OCR", "Scikit-learn", "Pandas", "DeBERTa"],
      results:
        "Secured Top 2,100 rank out of 89,000+ registered competitive teams nationwide, achieving superior F1-score across ambiguous numerical attribute categories.",
      repo: "https://github.com/Ashu0609-cyber/Amazon-ML-Challenge",
      demo: null,
      promptSuggestion: "What was Ashutosh's technical approach in the Amazon ML Challenge 2024?",
    },
    {
      id: "student-dropout",
      name: "Student Dropout Prediction",
      subtitle: "Predictive Academic Risk Classification System",
      category: "Machine Learning & Analytics",
      tag: "Supervised ML",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      problem:
        "Educational institutions struggle to identify at-risk students early enough to implement meaningful counseling and academic interventions.",
      solution:
        "Built a multi-model comparative machine learning pipeline analyzing demographic, socioeconomic, and academic performance indicators to forecast dropout risk.",
      architecture:
        "End-to-end pipeline: data preprocessing, SMOTE class balancing, feature engineering, and hyperparameter-tuned classification with Random Forest, Support Vector Machines (SVM), and Logistic Regression.",
      techStack: ["Python", "Scikit-Learn", "NumPy", "Pandas", "Matplotlib", "Seaborn"],
      results:
        "Achieved high classification accuracy and precision, with Random Forest providing the strongest predictive power and actionable feature importance rankings.",
      repo: "https://github.com/Ashu0609-cyber/student-dropout-prediction",
      demo: null,
      promptSuggestion: "How did the Student Dropout Prediction model handle class imbalance?",
    },
    {
      id: "heart-disease",
      name: "Heart Disease Prediction",
      subtitle: "Deep Learning Clinical Risk Stratification",
      category: "Healthcare & Deep Learning",
      tag: "Neural Networks",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      problem:
        "Early clinical detection of cardiovascular risk factors from non-invasive patient biometric diagnostics.",
      solution:
        "Developed a deep neural network classifier built with TensorFlow and Keras, evaluated against benchmark patient clinical data.",
      architecture:
        "Feed-forward deep neural network featuring Dropout regularization, Batch Normalization, and binary cross-entropy loss function, validated using k-fold cross-validation.",
      techStack: ["Python", "TensorFlow", "Keras", "Scikit-Learn", "Pandas"],
      results:
        "Attained robust sensitivity and ROC-AUC metrics, demonstrating consistent generalization on unseen clinical validation splits.",
      repo: "https://github.com/Ashu0609-cyber/heart_prediction_model",
      demo: null,
      promptSuggestion: "What architecture and regularization techniques were used in Heart Disease Prediction?",
    },
  ],

  skillCategories: [
    {
      name: "Programming Languages",
      houseMotif: "Core Invocations",
      skills: ["Python", "C++", "Java", "C", "SQL", "JavaScript (ES6+)"],
      accent: "gold",
    },
    {
      name: "Generative AI & LLMs",
      houseMotif: "Transfiguration & Deep Magic",
      skills: [
        "Large Language Models (LLMs)",
        "Transformer Architectures (From Scratch)",
        "Retrieval-Augmented Generation (RAG)",
        "Vector Embeddings",
        "Instruction Fine-Tuning",
        "Prompt Engineering",
        "Attention Mechanics",
      ],
      accent: "gold",
    },
    {
      name: "Agentic AI & Orchestration",
      houseMotif: "Automated Charms & Ensembles",
      skills: [
        "LangChain",
        "LangGraph",
        "Model Context Protocol (MCP)",
        "Function & Tool Calling",
        "Autonomous Agent Workflows",
        "Multi-Agent Coordination",
      ],
      accent: "emerald", // Subtle Slytherin green accent
    },
    {
      name: "AI & Machine Learning",
      houseMotif: "Divination & Pattern Craft",
      skills: [
        "Machine Learning",
        "Deep Learning",
        "PyTorch",
        "TensorFlow & Keras",
        "Scikit-Learn",
        "Computer Vision & OpenCV",
        "NumPy & Pandas",
      ],
      accent: "burgundy",
    },
    {
      name: "Backend & Cloud Engineering",
      houseMotif: "Foundational Alchemy",
      skills: [
        "FastAPI",
        "Django & Django REST Framework",
        "REST APIs & SSE Streaming",
        "Docker Containerization",
        "Linux & Shell Scripting",
        "Git & GitHub Actions",
      ],
      accent: "gold",
    },
    {
      name: "Databases & Vector Storage",
      houseMotif: "Vaults & Persistent Archives",
      skills: [
        "PostgreSQL",
        "pgvector",
        "Supabase",
        "FAISS",
        "ChromaDB",
        "MySQL",
      ],
      accent: "emerald", // Subtle Slytherin accent
    },
  ],

  achievements: [
    {
      id: "amazon-ml-2024",
      title: "Amazon ML Challenge 2024",
      role: "Top 2100 National Rank",
      organization: "Amazon India",
      date: "2024",
      badge: "Top 2.3% Nationwide",
      description:
        "Ranked in the top 2.3% nationwide among 89,000+ competing engineering teams. Built an automated multimodal entity-extraction pipeline combining Vision Transformers and NLP models to standardize product attribute dimensions from noisy e-commerce imagery and catalogs.",
      category: "National Competition",
    },
    {
      id: "zeiss-beyondcode",
      title: "ZEISS BeyondCode Hackathon",
      role: "Selected Participant & Innovator",
      organization: "ZEISS Group",
      date: "2024",
      badge: "Finalist / Participant",
      description:
        "Selected to participate in the prestigious ZEISS BeyondCode hackathon, tackling optical and computer vision challenges with high-performance computational models, precision metrics, and real-time processing pipelines.",
      category: "Industry Hackathon",
    },
    {
      id: "bmsit-academic",
      title: "Academic Excellence — B.E. Computer Science",
      role: "CGPA 8.89 (7th Sem)",
      organization: "BMS Institute of Technology & Management, Bengaluru",
      date: "Expected 2027",
      badge: "8.89 CGPA",
      description:
        "Consistent academic excellence in core Computer Science coursework: Algorithms, Artificial Intelligence, Database Management Systems, Computer Networks, and Object-Oriented System Design.",
      category: "Academics",
    },
    {
      id: "leetcode-dsa",
      title: "100+ Algorithmic Challenges Solved",
      role: "Competitive Problem Solving",
      organization: "LeetCode",
      date: "Ongoing",
      badge: "100+ Solved",
      description:
        "Demonstrated problem-solving rigor across data structures, dynamic programming, binary search, tree traversals, and graph algorithms.",
      category: "Problem Solving",
    },
  ],

  suggestedQuestions: [
    "Tell me about Ashutosh.",
    "Explain StructureGuard's architecture.",
    "What is Micro-EDSR-32?",
    "Tell me about the GPT-124M project.",
    "What was the Amazon ML Challenge?",
    "What technologies does Ashutosh know?",
    "What makes StructureGuard different?",
    "How can I contact Ashutosh?",
  ],
};
