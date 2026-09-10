// src/components/Navbar.tsx
import React from "react";
import { Menu, Search, Phone, ShieldCheck, User } from "lucide-react";
import { PageRoute } from "../types";

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onToggleDrawer: () => void;
  onOpenSearch: () => void;
  onOpenSteamModal: () => void;
  isLoggedIn: boolean;
  steamUser: { name: string; avatar: string } | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onToggleDrawer,
  onOpenSearch,
  onOpenSteamModal,
  isLoggedIn,
  steamUser,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/30 bg-[#0c0a17]/85 backdrop-blur-md transition-all">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Hamburger button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="nav-drawer-toggle-btn"
            onClick={onToggleDrawer}
            aria-label="Цэс нээх"
            className="w-10 h-10 rounded-lg bg-purple-950/40 border border-purple-800/40 hover:border-pink-500/50 hover:bg-purple-900/40 text-purple-200 flex items-center justify-center transition-colors cursor-pointer group"
          >
            <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Search box matching Screenshot 1 */}
          <button
            id="nav-search-btn"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#18132d]/90 border border-purple-800/30 hover:border-pink-500/40 text-purple-300/80 hover:text-white transition-all text-xs sm:text-sm font-medium w-32 sm:w-48 text-left cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="truncate">Хайх</span>
            <kbd className="hidden sm:inline-block ml-auto text-[10px] bg-purple-950/80 text-purple-400 border border-purple-800/40 px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Center: Desktop Navigation tabs */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            id="nav-link-home"
            onClick={() => onNavigate("home")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              currentPage === "home"
                ? "bg-gradient-to-r from-pink-600/30 to-purple-600/30 text-pink-300 border border-pink-500/30"
                : "text-purple-300/70 hover:text-white hover:bg-purple-950/30"
            }`}
          >
            Нүүр
          </button>
          <button
            id="nav-link-about"
            onClick={() => onNavigate("about")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              currentPage === "about"
                ? "bg-gradient-to-r from-pink-600/30 to-purple-600/30 text-pink-300 border border-pink-500/30"
                : "text-purple-300/70 hover:text-white hover:bg-purple-950/30"
            }`}
          >
            Бидний тухай
          </button>
          <button
            id="nav-link-contact"
            onClick={() => onNavigate("contact")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              currentPage === "contact"
                ? "bg-gradient-to-r from-pink-600/30 to-purple-600/30 text-pink-300 border border-pink-500/30"
                : "text-purple-300/70 hover:text-white hover:bg-purple-950/30"
            }`}
          >
            Холбоо барих
          </button>
          <button
            id="nav-link-store"
            onClick={() => onNavigate("store")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              currentPage === "store"
                ? "bg-gradient-to-r from-pink-600/30 to-purple-600/30 text-pink-300 border border-pink-500/30"
                : "text-purple-300/70 hover:text-white hover:bg-purple-950/30"
            }`}
          >
            Дэлгүүр (VIP)
          </button>
        </nav>

        {/* Right: Click-to-call link + Steam Login button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Click-to-call phone link - required in prompt */}
          <a
            id="nav-click-to-call"
            href="tel:1800123456"
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-purple-950/50 hover:bg-pink-950/40 border border-purple-800/40 hover:border-pink-500/50 text-pink-300 text-xs sm:text-sm font-semibold transition-all group"
            title="Call 1800 123 456"
          >
            <Phone className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">1800 123 456</span>
          </a>

          {/* Steam Login / Profile Button matching Screenshot 1 */}
          {isLoggedIn && steamUser ? (
            <button
              id="nav-steam-profile-btn"
              onClick={onOpenSteamModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1f1638] border border-pink-500/40 hover:border-pink-500 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <img
                src={steamUser.avatar}
                alt={steamUser.name}
                className="w-5 h-5 rounded-full border border-pink-400"
              />
              <span className="hidden sm:inline max-w-[100px] truncate">{steamUser.name}</span>
            </button>
          ) : (
            <button
              id="nav-steam-login-btn"
              onClick={onOpenSteamModal}
              className="h-10 px-3.5 sm:px-4 rounded-lg bg-[#f43f5e] hover:bg-[#e11d48] active:scale-95 text-white flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 transition-all font-semibold text-xs sm:text-sm cursor-pointer"
              title="Steam-ээр нэвтрэх"
            >
              {/* Official Steam icon SVG */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.34 3.48 9.87 8.32 11.45l2.67-3.69c-.4-.56-.63-1.25-.63-1.99 0-1.89 1.54-3.43 3.43-3.43.34 0 .66.05.97.14l2.76-4.01C17.18 10.15 17 9.6 17 9c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5c-.32 0-.63-.04-.93-.1l-2.75 3.99c.32.55.51 1.18.51 1.86 0 2.07-1.68 3.75-3.75 3.75-1.52 0-2.83-.9-3.43-2.2L6.16 23.4C7.94 23.79 9.94 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0zm0 15.75c-1.24 0-2.25-1.01-2.25-2.25 0-.41.11-.79.3-1.12l3.07 1.25c-.01.04-.02.08-.02.12 0 1.1-.9 2-2 2zm8-6.75c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3z"/>
              </svg>
              <span className="hidden sm:inline">Steam</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
