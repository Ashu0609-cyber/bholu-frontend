import React, { useState } from "react";
import Navigation from "./components/Navigation.jsx";
import GreatHall from "./sections/GreatHall.jsx";
import TheWizard from "./sections/TheWizard.jsx";
import Spellbook from "./sections/Spellbook.jsx";
import TheHouses from "./sections/TheHouses.jsx";
import TheJourney from "./sections/TheJourney.jsx";
import TheScroll from "./sections/TheScroll.jsx";
import OwlPost from "./sections/OwlPost.jsx";
import Footer from "./components/Footer.jsx";
import BholuWidget from "./components/BholuChatbot/BholuWidget.jsx";
import { useChat } from "./hooks/useChat.js";

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState(null);
  const chatState = useChat();

  const handleOpenChatWithPrompt = (prompt) => {
    setPendingPrompt(prompt);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone text-parchment relative selection:bg-gold/30 selection:text-gold-light">
      {/* Top Fixed Gothic Navigation */}
      <Navigation onOpenChat={() => setChatOpen(true)} />

      {/* Main Single-Page Portfolio Stream */}
      <main>
        {/* Section I: The Great Hall (Hero) */}
        <GreatHall onOpenChat={() => setChatOpen(true)} />

        {/* Section II: The Wizard (About Me) */}
        <TheWizard />

        {/* Section III: The Spellbook (Featured Projects) */}
        <Spellbook onAskAboutProject={handleOpenChatWithPrompt} />

        {/* Section IV: The Houses of Knowledge (Skills) */}
        <TheHouses />

        {/* Section V: The Hall of Honors (Experience & Achievements) */}
        <TheJourney />

        {/* Section VI: The Archival Scroll (Resume & Download) */}
        <TheScroll />

        {/* Section VII: Owl Post (Contact Form & Social Links) */}
        <OwlPost />
      </main>

      {/* Gothic Footer */}
      <Footer />

      {/* Ambient Floating Bholu AI Assistant */}
      <BholuWidget
        isOpen={chatOpen}
        onToggle={() => setChatOpen(!chatOpen)}
        onClose={() => setChatOpen(false)}
        chatState={chatState}
        pendingPrompt={pendingPrompt}
        onPendingPromptConsumed={() => setPendingPrompt(null)}
      />
    </div>
  );
}
