import { useCallback, useRef, useState } from "react";
import { postChat, STREAM_URL } from "../services/api.js";

const SESSION_KEY = "bholu_session_id";

function getOrCreateSessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "Greetings, visitor! ⚡ I am **Bholu**, Ashutosh's AI Portfolio Assistant.\n\n" +
    "I possess complete knowledge of his engineering work, deep learning architectures, competitive milestones, and education at BMSIT&M.\n\n" +
    "You may explore his work by asking questions like:\n" +
    "- **Tell me about Ashutosh.**\n" +
    "- **Explain StructureGuard's architecture.**\n" +
    "- **What is Micro-EDSR-32?**\n" +
    "- **Tell me about the GPT-124M project.**\n" +
    "- **What was the Amazon ML Challenge?**\n" +
    "- **What technologies does Ashutosh know?**\n" +
    "- **What makes StructureGuard different?**\n" +
    "- **How can I contact Ashutosh?**\n\n" +
    "How may I assist your inquiry today?",
  timestamp: Date.now(),
};

/**
 * Sanitizes any raw JSON or debug wrappers that might be sent by an API,
 * ensuring users only ever see conversational text.
 */
function sanitizeChatAnswer(rawText) {
  if (!rawText) return "";
  let clean = String(rawText).trim();

  // 1. If entire payload is a JSON string
  if (clean.startsWith("{") && clean.endsWith("}")) {
    try {
      const parsed = JSON.parse(clean);
      if (parsed.answer) clean = parsed.answer;
      else if (parsed.response) clean = parsed.response;
      else if (parsed.data?.response) clean = parsed.data.response;
      else if (parsed.data?.answer) clean = parsed.data.answer;
    } catch (e) {}
  }

  // 2. If it contains embedded JSON e.g. {"answer":"..."}
  const jsonMatch = clean.match(/\{[\s\S]*?"(?:answer|response)"\s*:\s*"([\s\S]*?)"[\s\S]*?\}/);
  if (jsonMatch && jsonMatch[1]) {
    try {
      clean = JSON.parse(`"${jsonMatch[1]}"`);
    } catch (e) {
      clean = jsonMatch[1];
    }
  }

  // 3. Strip any accidental [filename.json] dumps
  if (clean.includes(".json]")) {
    clean = clean.replace(/\[[a-z0-9_\-\.]+\.json\]\s*\{[\s\S]*?\}/gi, "").trim();
  }

  // 4. Strip artificial top headers like "### About Ashutosh..." if directly prepended
  if (clean.startsWith("### About Ashutosh") || clean.startsWith("### Education")) {
    clean = clean.replace(/^###[^\n]+\n+/, "").trim();
  }

  return clean;
}

/**
 * Intelligent client-side fallback knowledge base
 * Delivers immediate, tailored conversational answers for all questions
 * even when the backend server is starting up, offline, or experiencing network latency.
 */
function getLocalFallbackAnswer(query) {
  const q = query.toLowerCase();

  // 1. StructureGuard Architecture
  if (q.includes("architecture") && q.includes("structureguard") || q.includes("structureguard's architecture") || q.includes("structureguard architecture")) {
    return (
      "**StructureGuard** is an AI-powered microscopy reconstruction platform designed to restore fine cellular structures from low-resolution or noisy optical captures:\n\n" +
      "- **Neural Backbone**: Custom **Micro-EDSR-32** (Enhanced Deep Residual Networks for Single Image Super-Resolution) featuring 32 residual blocks and residual scaling for stable deep feature propagation.\n" +
      "- **Loss Formulations**: Jointly optimizes structural similarity (**SSIM**) loss and perceptual loss with pixel-wise L1 loss to strictly preserve true biological cell morphology without introducing hallucinated artifacts.\n" +
      "- **High-Throughput Pipeline**: GPU-accelerated PyTorch tensor normalizations with OpenCV tile-based inference to process gigapixel microscopy slides without GPU memory exhaustion.\n" +
      "- **Scientific Provenance**: Automated provenance tracking recording exact model weights, inference parameters, and confidence maps for scientific reproducibility."
    );
  }

  // 2. What makes StructureGuard different? / Unique / Integrity
  if (q.includes("structureguard different") || q.includes("makes structureguard different") || (q.includes("different") && q.includes("structureguard")) || (q.includes("integrity") && q.includes("structureguard"))) {
    return (
      "What sets **StructureGuard** apart from conventional super-resolution models is its strict focus on **scientific validation and model integrity**:\n\n" +
      "1. **Anti-Hallucination Constraints**: Unlike generic GANs that often hallucinate plausible-looking textures that do not exist biologically, StructureGuard utilizes structural preservation metrics to prevent artificial artifact generation.\n" +
      "2. **Automated Provenance & Reproducibility**: Every reconstructed image retains an immutable record of model weights, inference parameters, and confidence maps, meeting rigorous scientific publishing standards.\n" +
      "3. **Quantitative Metric Benchmarking**: Validated against Peak Signal-to-Noise Ratio (PSNR) and Structural Similarity Index (SSIM) benchmarks on unseen biological holdouts to mathematically verify cell boundary fidelity."
    );
  }

  // 3. What is Micro-EDSR-32?
  if (q.includes("micro-edsr") || q.includes("edsr-32") || q.includes("micro edsr") || q.includes("edsr")) {
    return (
      "**Micro-EDSR-32** is a specialized Enhanced Deep Residual Network architecture engineered specifically for biological and optical microscopy super-resolution:\n\n" +
      "- **Residual Depth**: Stacks **32 residual blocks** with residual scaling factors to stabilize gradient propagation across deep feature transformations.\n" +
      "- **Stripped Batch Normalization**: Following core EDSR design principles, unnecessary Batch Normalization layers are stripped out, preserving exact pixel intensity ranges and fine illumination gradients crucial for fluorescence and brightfield imaging.\n" +
      "- **Cellular Focus**: Specifically trained to resolve diffraction-limited optical captures into crisp, measurable cellular and organelle boundaries."
    );
  }

  // 4. Age / Timeline / How old is Ashutosh?
  if (q.includes("how old") || q.includes("age") || q.includes("birthday") || q.includes("birth date") || q.includes("born")) {
    return (
      "Ashutosh's exact date of birth is not published in his public portfolio, but according to his academic timeline, " +
      "he completed secondary education in 2021, higher secondary in 2023, and is currently in his 7th semester " +
      "of B.E. Computer Science at **BMSIT&M** (Class of 2027), placing him in the typical undergraduate age range (around 20–21 years old)."
    );
  }

  // 5. Which College / University / Education
  if (q.includes("which college") || q.includes("what college") || q.includes("where does he study") || q.includes("university") || q.includes("college") || q.includes("bmsit")) {
    return (
      "Ashutosh is pursuing his **B.E. in Computer Science and Engineering** at **BMS Institute of Technology & Management (BMSIT&M)** in Bengaluru (Expected Graduation: 2027).\n\n" +
      "- **Current CGPA**: **8.89** (as of his 7th semester)\n" +
      "- **Higher Secondary (HSC)**: Chinmaya Vidyalaya, Boisar (2023)\n" +
      "- **Secondary School (SSC)**: U.S. Ostwal English Academy, Boisar (2021)"
    );
  }

  // 6. CGPA / Marks / Grades
  if (q.includes("cgpa") || q.includes("gpa") || q.includes("marks") || q.includes("grades")) {
    return (
      "Ashutosh maintains a **8.89 CGPA** (as of his 7th semester) in Computer Science and Engineering at **BMS Institute of Technology & Management (BMSIT&M)**, Bengaluru."
    );
  }

  // 7. What technologies does Ashutosh know? / Technical Skills
  if (q.includes("technolog") || q.includes("skills") || q.includes("tech stack") || q.includes("languages") || q.includes("tools") || (q.includes("know") && q.includes("what"))) {
    return (
      "Ashutosh's technical competencies span across modern AI, systems, and backend engineering:\n\n" +
      "- **Programming Languages**: Python, C++, C, SQL, Java, JavaScript (ES6+)\n" +
      "- **AI & Machine Learning**: PyTorch, TensorFlow, Keras, Scikit-Learn, OpenCV, NumPy, Pandas, Matplotlib\n" +
      "- **Generative AI & LLMs**: Transformer Architectures from Scratch, Large Language Models (LLMs), RAG, Vector Embeddings, Instruction Fine-Tuning, Prompt Engineering, Causal Attention\n" +
      "- **Agentic AI & Orchestration**: LangChain, LangGraph, Model Context Protocol (MCP), Function & Tool Calling, Autonomous Multi-Step Workflows\n" +
      "- **Databases & Vector Storage**: PostgreSQL, pgvector, Supabase, MySQL, FAISS, ChromaDB\n" +
      "- **Backend & Cloud**: FastAPI, Django, Django REST Framework, Docker, REST APIs, SSE Streaming, Git & GitHub Actions\n" +
      "- **Algorithmic Rigor**: 100+ LeetCode problems solved across Binary Search, Dynamic Programming, Trees, and Graphs"
    );
  }

  // 8. Tell me about Ashutosh / Who is Ashutosh?
  if (q.includes("who is ashutosh") || q.includes("tell me about ashutosh") || q.includes("about ashutosh") || q.includes("bio") || q.includes("background") || q.includes("profile")) {
    return (
      "**Ashutosh Sanjay Thakur** is a Computer Science Engineering student and AI/ML Engineer pursuing his B.E. at **BMS Institute of Technology & Management (BMSIT&M)**, Bengaluru (CGPA: 8.89, Expected Graduation: 2027).\n\n" +
      "He specializes in **Generative AI, Transformer Architectures from Scratch, and Agentic RAG Systems**.\n\n" +
      "Key Engineering Highlights:\n" +
      "- **Built a 124M-parameter GPT transformer from scratch** in pure PyTorch (causal self-attention, LayerNorm, custom BPE tokenizer, AdamW training loop).\n" +
      "- Developed **StructureGuard**, an AI microscopy reconstruction platform utilizing Micro-EDSR-32 with scientific validation constraints.\n" +
      "- Engineered **OceanScope**, an agentic marine data analytics platform using hybrid PostgreSQL and vector search.\n" +
      "- Ranked **Top 2100 among 89,000+ teams nationwide (Top 2.36%)** in the Amazon ML Challenge 2024.\n" +
      "- Solved **100+ LeetCode DSA problems** with a strong foundation in algorithmic problem-solving."
    );
  }

  // 9. Tell me about the GPT-124M project
  if (q.includes("gpt") || q.includes("124m") || q.includes("scratch") || (q.includes("transformer") && !q.includes("vision"))) {
    return (
      "Ashutosh implemented a **124-million parameter decoder-only GPT transformer completely from scratch in pure PyTorch**, without using Hugging Face or high-level abstraction libraries.\n\n" +
      "Key Implementation Details:\n" +
      "- **Attention Mechanism**: Implemented causal masked multi-head self-attention (MHA), learned positional embeddings, token embeddings, LayerNorm, and GELU activations.\n" +
      "- **Residual Streams**: Built residual skip connections and projection heads following the OpenAI GPT-2 Small specification.\n" +
      "- **Training Pipeline**: End-to-end training loop featuring custom Byte-Pair Encoding (BPE) data loaders, AdamW optimizer, cosine learning rate scheduler with warmup, and temperature-controlled autoregressive sampling."
    );
  }

  // 10. What was the Amazon ML Challenge?
  if (q.includes("amazon") || q.includes("ml challenge") || q.includes("competition")) {
    return (
      "In the **Amazon ML Challenge 2024**, Ashutosh and his team ranked among the **Top 2100 teams out of approximately 89,000 participating engineering teams nationwide (Top 2.36%)**, securing an **F0.5 score of 0.935**.\n\n" +
      "Technical Approach:\n" +
      "- **The Problem**: Automatically extract standardized product dimensions (weight, length, volume) from noisy product images and catalog text across millions of e-commerce items.\n" +
      "- **Multimodal Pipeline**: Combined Optical Character Recognition (PaddleOCR) for visual text extraction with fine-tuned Vision Transformers and RoBERTa/DeBERTa language models for entity classification.\n" +
      "- **Normalization Engine**: Engineered deterministic unit normalization regex rules to reconcile mixed units (grams, ounces, cm, inches) into standardized target metrics."
    );
  }

  // 11. How can I contact Ashutosh?
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("phone") || q.includes("linkedin") || q.includes("hire")) {
    return (
      "You can connect with Ashutosh Sanjay Thakur through any of the following channels:\n\n" +
      "- **Email**: [thakurashutosh12341235@gmail.com](mailto:thakurashutosh12341235@gmail.com)\n" +
      "- **Phone**: +91 7058727787\n" +
      "- **LinkedIn**: [linkedin.com/in/ashutosh-thakur-735673357](https://www.linkedin.com/in/ashutosh-thakur-735673357)\n" +
      "- **GitHub**: [github.com/Ashu0609-cyber](https://github.com/Ashu0609-cyber)\n" +
      "- **Location**: Bengaluru, Karnataka, India\n" +
      "- **Resume**: You can download his official 2-page PDF directly using the 'Download Resume' buttons in the Hero or Resume sections."
    );
  }

  // 12. Resume / CV / Download
  if (q.includes("resume") || q.includes("cv") || q.includes("curriculum vitae") || q.includes("download resume") || q.includes("pdf")) {
    return (
      "Ashutosh's verified 2-page official resume PDF is available directly on this website. " +
      "You can download it at any time using the **Download Official Resume** buttons in the Hero and Resume sections, " +
      "or view it directly at [/resume.pdf](/resume.pdf)."
    );
  }

  // 13. OceanScope
  if (q.includes("oceanscope") || q.includes("ocean") || q.includes("marine")) {
    return (
      "**OceanScope** is an intelligent agentic platform for querying and analyzing multidimensional oceanographic datasets through natural language:\n\n" +
      "- **Hybrid Data Layer**: Integrates PostgreSQL for structured telemetry (coordinates, salinity, temperature, depth) with vector search for scientific research reports.\n" +
      "- **Agentic Workflow**: Uses an LLM agent that inspects user queries, deterministically executes SQL queries for tabular sensor readings, and grounds narrative summaries without hallucination."
    );
  }

  // 14. Generic Fallback
  return (
    "Ashutosh Sanjay Thakur is an AI/ML Engineer specializing in Generative AI, pure PyTorch Transformer architectures, and Agentic RAG systems at BMSIT&M Bengaluru (CGPA: 8.89).\n\n" +
    "You can ask about his key projects (**StructureGuard**, **Micro-EDSR-32**, **GPT-124M from Scratch**, **OceanScope**), " +
    "his competitive ranking (**Amazon ML Challenge Top 2100**), or contact him directly at **thakurashutosh12341235@gmail.com**!"
  );
}

/**
 * Streams words smoothly to create a live, natural typewriter effect
 */
async function streamWordByWord(text, updateAssistant) {
  const words = text.split(" ");
  let accumulated = "";
  for (let i = 0; i < words.length; i++) {
    accumulated += (i > 0 ? " " : "") + words[i];
    updateAssistant(() => ({ content: accumulated, streaming: i < words.length - 1 }));
    await new Promise((r) => setTimeout(r, 18));
  }
}

export function useChat() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const sessionIdRef = useRef(getOrCreateSessionId());
  const eventSourceRef = useRef(null);

  const appendMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const clearChat = useCallback(() => {
    sessionIdRef.current = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionIdRef.current);
    setMessages([WELCOME_MESSAGE]);
  }, []);

  const sendMessage = useCallback(
    async (text, streamingEnabled = true) => {
      const trimmed = text.trim();
      if (!trimmed || isSending) return;

      setError(null);
      const userMsg = { id: crypto.randomUUID(), role: "user", content: trimmed, timestamp: Date.now() };
      appendMessage(userMsg);
      setIsSending(true);

      const assistantId = crypto.randomUUID();
      appendMessage({ id: assistantId, role: "assistant", content: "", timestamp: Date.now(), streaming: true });

      const updateAssistant = (updater) => {
        setMessages((prev) =>
          prev.map((m) => {
            if (m.id === assistantId) {
              const updated = updater(m);
              return {
                ...m,
                ...updated,
                content: sanitizeChatAnswer(updated.content ?? m.content),
              };
            }
            return m;
          })
        );
      };

      // 1. Try Server-Sent Events (SSE) streaming with a tight 2s timeout
      let backendSucceeded = false;
      if (streamingEnabled && typeof EventSource !== "undefined") {
        try {
          await streamViaSSE(trimmed, sessionIdRef.current, updateAssistant, eventSourceRef, 2000);
          backendSucceeded = true;
          setIsSending(false);
          return;
        } catch (streamErr) {
          // SSE failed or timed out, attempt standard postChat
        }
      }

      // 2. Try standard /chat POST if SSE didn't stream
      if (!backendSucceeded) {
        try {
          const result = await postChat(trimmed, sessionIdRef.current);
          const cleanAnswer = sanitizeChatAnswer(result?.response || result?.answer || result);
          if (cleanAnswer && cleanAnswer.length > 5) {
            updateAssistant(() => ({ content: cleanAnswer, streaming: false }));
            if (result?.session_id) sessionIdRef.current = result.session_id;
            backendSucceeded = true;
          }
        } catch (err) {
          // Backend is sleeping, offline, or experiencing CORS/mixed-content
        }
      }

      // 3. Guaranteed immediate local typewriter fallback
      if (!backendSucceeded) {
        const fallbackText = getLocalFallbackAnswer(trimmed);
        await streamWordByWord(fallbackText, updateAssistant);
      }

      setIsSending(false);
    },
    [appendMessage, isSending]
  );

  return { messages, sendMessage, isSending, error, clearChat };
}

function streamViaSSE(message, sessionId, updateAssistant, eventSourceRef, timeoutMs = 2000) {
  return new Promise((resolve, reject) => {
    let resolved = false;
    let timer = null;

    const cleanup = () => {
      if (timer) clearTimeout(timer);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };

    timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        cleanup();
        reject(new Error("SSE connection timed out"));
      }
    }, timeoutMs);

    try {
      const url = STREAM_URL(message, sessionId);
      const source = new EventSource(url);
      eventSourceRef.current = source;
      let accumulated = "";

      source.onmessage = (event) => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        let piece = event.data;
        if (piece === "[DONE]") {
          resolved = true;
          cleanup();
          updateAssistant(() => ({ streaming: false }));
          resolve();
          return;
        }
        accumulated += piece;
        updateAssistant(() => ({ content: accumulated, streaming: true }));
      };

      source.addEventListener("done", () => {
        resolved = true;
        updateAssistant(() => ({ streaming: false }));
        cleanup();
        resolve();
      });

      source.onerror = () => {
        if (!resolved) {
          resolved = true;
          cleanup();
          reject(new Error("SSE connection error"));
        }
      };
    } catch (e) {
      resolved = true;
      cleanup();
      reject(e);
    }
  });
}
