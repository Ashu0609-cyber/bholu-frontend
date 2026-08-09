import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootSequence from "./components/BootSequence.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import SkillsPage from "./pages/SkillsPage.jsx";
import ResumePage from "./pages/ResumePage.jsx";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [activeView, setActiveView] = useState("chat");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingChatPrompt, setPendingChatPrompt] = useState(null);

  // Used by other pages (e.g. Projects "Learn More") to jump into chat
  // with a prefilled question - still requires the user to hit send.
  const askInChat = (prompt) => {
    setPendingChatPrompt(prompt);
    setActiveView("chat");
  };

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  const views = {
    chat: <LandingPage externalPrompt={pendingChatPrompt} onExternalPromptConsumed={() => setPendingChatPrompt(null)} />,
    about: <AboutPage />,
    projects: <ProjectsPage onAskAbout={askInChat} />,
    skills: <SkillsPage />,
    resume: <ResumePage />,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-screen w-screen flex bg-base bg-bholu-radial overflow-hidden"
    >
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onNavigate={setActiveView} onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 min-h-0 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {views[activeView]}
            </motion.div>
          </AnimatePresence>
        </main>

        {activeView !== "chat" && <Footer />}
      </div>
    </motion.div>
  );
}
