/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { PageRoute } from "./types";
import { SakuraBackground } from "./components/SakuraBackground";
import { Navbar } from "./components/Navbar";
import { SidebarDrawer } from "./components/SidebarDrawer";
import { SearchModal } from "./components/SearchModal";
import { SteamModal } from "./components/SteamModal";
import { ChatbotWidget } from "./components/ChatbotWidget";
import { Footer } from "./components/Footer";
import { HomeView } from "./views/HomeView";
import { AboutView } from "./views/AboutView";
import { ContactView } from "./views/ContactView";
import { StoreView } from "./views/StoreView";
import { LeaderboardView } from "./views/LeaderboardView";
import { ConfigView } from "./views/ConfigView";

export default function App() {
  // State-based routing as requested: "implement a state-based routing system"
  const [currentPage, setCurrentPage] = useState<PageRoute>("home");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSteamModalOpen, setIsSteamModalOpen] = useState(false);

  // Steam authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [steamUser, setSteamUser] = useState<{
    name: string;
    avatar: string;
    steamId: string;
    elo: number;
  } | null>({
    name: "^Steve ^miles",
    avatar:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=80",
    steamId: "STEAM_0:1:48291032",
    elo: 2840,
  });

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSteamLogin = (customName: string) => {
    setIsLoggedIn(true);
    setSteamUser({
      name: customName,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      steamId: "STEAM_0:1:" + Math.floor(10000000 + Math.random() * 90000000),
      elo: 2450,
    });
  };

  const handleSteamLogout = () => {
    setIsLoggedIn(false);
    setSteamUser(null);
  };

  const handleSelectServerFromSearch = (ip: string, port: number) => {
    navigator.clipboard.writeText(`connect ${ip}:${port}`);
    setCurrentPage("home");
  };

  return (
    <div className="relative min-h-screen bg-[#0c0a17] text-white font-['Plus_Jakarta_Sans',sans-serif] selection:bg-pink-600 selection:text-white flex flex-col">
      {/* Visual background matching Screenshot 1 & 2 */}
      <SakuraBackground />

      {/* Sticky top Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onToggleDrawer={() => setIsDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSteamModal={() => setIsSteamModalOpen(true)}
        isLoggedIn={isLoggedIn}
        steamUser={steamUser}
      />

      {/* Slide-out Sidebar Drawer matching Screenshot 2 */}
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        onSelectServer={handleSelectServerFromSearch}
      />

      {/* Steam Authentication Modal */}
      <SteamModal
        isOpen={isSteamModalOpen}
        onClose={() => setIsSteamModalOpen(false)}
        isLoggedIn={isLoggedIn}
        steamUser={steamUser}
        onLogin={handleSteamLogin}
        onLogout={handleSteamLogout}
      />

      {/* Main Page Content (State-based routing) */}
      <main className="flex-1 relative z-10">
        {currentPage === "home" && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenSteamModal={() => setIsSteamModalOpen(true)}
          />
        )}
        {currentPage === "about" && <AboutView onNavigate={handleNavigate} />}
        {currentPage === "contact" && <ContactView onNavigate={handleNavigate} />}
        {currentPage === "store" && <StoreView onNavigate={handleNavigate} />}
        {currentPage === "leaderboards" && <LeaderboardView onNavigate={handleNavigate} />}
        {currentPage === "config" && <ConfigView onNavigate={handleNavigate} />}
      </main>

      {/* Floating Gemini AI Chatbot Widget (Huddy, plumbing AI assistant) */}
      <ChatbotWidget />

      {/* Global Footer with social media and page links */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
