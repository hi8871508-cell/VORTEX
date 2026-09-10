// src/components/SidebarDrawer.tsx
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Award,
  Flame,
  Info,
  Mail,
  ShoppingBag,
  Trophy,
  Gift,
  FileText,
  Link as LinkIcon,
  Scan,
  Crosshair,
  Ban,
  Scissors,
  Users,
  Shield,
  Server,
  X,
  ChevronRight,
} from "lucide-react";
import { PageRoute } from "../types";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer content matching Screenshot 2 */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-[320px] bg-[#120d24]/95 border-r border-purple-900/40 z-50 overflow-y-auto flex flex-col shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-purple-900/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-['Chakra_Petch',sans-serif] text-xl font-bold tracking-wider text-white">
                  VOR<span className="text-[#f43f5e]">TEX</span>
                </span>
                <span className="text-[10px] bg-pink-950/80 border border-pink-500/40 text-pink-400 px-1.5 py-0.5 rounded font-mono">
                  v2.4
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu List */}
            <div className="p-3 space-y-6 flex-1 text-sm">
              {/* Category 1: ТАНИЛЦАХ */}
              <div>
                <p className="px-3 text-[11px] font-bold text-purple-400/60 tracking-wider uppercase mb-2">
                  ТАНИЛЦАХ
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      onNavigate("home");
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all text-left cursor-pointer ${
                      currentPage === "home"
                        ? "bg-gradient-to-r from-pink-600/30 via-pink-700/20 to-purple-800/20 text-white border-l-4 border-pink-500 shadow-sm"
                        : "text-purple-200/80 hover:text-white hover:bg-purple-900/20"
                    }`}
                  >
                    <Home className="w-4 h-4 text-pink-400" />
                    <span>Нүүр</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate("leaderboards");
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all text-left cursor-pointer ${
                      currentPage === "leaderboards"
                        ? "bg-gradient-to-r from-pink-600/30 via-pink-700/20 to-purple-800/20 text-white border-l-4 border-pink-500 shadow-sm"
                        : "text-purple-200/80 hover:text-white hover:bg-purple-900/20"
                    }`}
                  >
                    <Award className="w-4 h-4 text-purple-400" />
                    <span>Leaderboards</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate("leaderboards");
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-purple-200/80 hover:text-white hover:bg-purple-900/20 transition-all text-left cursor-pointer"
                  >
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Streak</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate("about");
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all text-left cursor-pointer ${
                      currentPage === "about"
                        ? "bg-gradient-to-r from-pink-600/30 via-pink-700/20 to-purple-800/20 text-white border-l-4 border-pink-500 shadow-sm"
                        : "text-purple-200/80 hover:text-white hover:bg-purple-900/20"
                    }`}
                  >
                    <Info className="w-4 h-4 text-cyan-400" />
                    <span>Бидний тухай</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate("contact");
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all text-left cursor-pointer ${
                      currentPage === "contact"
                        ? "bg-gradient-to-r from-pink-600/30 via-pink-700/20 to-purple-800/20 text-white border-l-4 border-pink-500 shadow-sm"
                        : "text-purple-200/80 hover:text-white hover:bg-purple-900/20"
                    }`}
                  >
                    <Mail className="w-4 h-4 text-pink-400" />
                    <span>Холбоо барих</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate("store");
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all text-left cursor-pointer ${
                      currentPage === "store"
                        ? "bg-gradient-to-r from-pink-600/30 via-pink-700/20 to-purple-800/20 text-white border-l-4 border-pink-500 shadow-sm"
                        : "text-purple-200/80 hover:text-white hover:bg-purple-900/20"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    <span>Дэлгүүр (PayPal $10)</span>
                  </button>
                </div>
              </div>

              {/* Category 2: COMMUNITY */}
              <div>
                <p className="px-3 text-[11px] font-bold text-purple-400/60 tracking-wider uppercase mb-2">
                  COMMUNITY
                </p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl text-purple-200/80 hover:text-white hover:bg-purple-900/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span>Амжилт</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-pink-950/80 text-pink-400 border border-pink-500/40">
                      ШИНЭ
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onNavigate("store");
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-purple-200/80 hover:text-white hover:bg-purple-900/20 transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Gift className="w-4 h-4 text-pink-400" />
                      <span>Үнэгүй VT$</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-pink-950/80 text-pink-400 border border-pink-500/40">
                      ШИНЭ
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate("config");
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-purple-200/80 hover:text-white hover:bg-purple-900/20 transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span>Config</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-pink-950/80 text-pink-400 border border-pink-500/40">
                      ШИНЭ
                    </span>
                  </button>

                  <div className="flex items-center justify-between px-3 py-2 rounded-xl text-purple-200/80 hover:text-white hover:bg-purple-900/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <LinkIcon className="w-4 h-4 text-teal-400" />
                      <span>Холбоос</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-pink-950/80 text-pink-400 border border-pink-500/40">
                      ШИНЭ
                    </span>
                  </div>
                </div>
              </div>

              {/* Category 3: СЕРВЕР */}
              <div>
                <p className="px-3 text-[11px] font-bold text-purple-400/60 tracking-wider uppercase mb-2">
                  СЕРВЕР
                </p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl text-purple-200/80 hover:text-white hover:bg-purple-900/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Scan className="w-4 h-4 text-indigo-400" />
                      <span>Сканнер</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-500" />
                  </div>

                  <button
                    onClick={() => {
                      onNavigate("home");
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-purple-200/80 hover:text-white hover:bg-purple-900/20 transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Crosshair className="w-4 h-4 text-pink-400" />
                      <span>5v5 Competitive</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-500" />
                  </button>

                  <div className="flex items-center justify-between px-3 py-2 rounded-xl text-purple-200/80 hover:text-white hover:bg-purple-900/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Ban className="w-4 h-4 text-rose-400" />
                      <span>Bans & AC Records</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-500" />
                  </div>

                  <div className="flex items-center justify-between px-3 py-2 rounded-xl text-purple-200/80 hover:text-white hover:bg-purple-900/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Scissors className="w-4 h-4 text-purple-400" />
                      <span>Skinchanger</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-500" />
                  </div>

                  <div className="flex items-center justify-between px-3 py-2 rounded-xl text-purple-200/80 hover:text-white hover:bg-purple-900/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span>Staff & Admins</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-500" />
                  </div>

                  <div className="flex items-center justify-between px-3 py-2 rounded-xl text-purple-200/80 hover:text-white hover:bg-purple-900/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-yellow-400" />
                      <span>Clan-ууд</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-500" />
                  </div>

                  <button
                    onClick={() => {
                      onNavigate("store");
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-purple-200/80 hover:text-white hover:bg-purple-900/20 transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Server className="w-4 h-4 text-cyan-400" />
                      <span>Сервер түрээслэх</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Support Info */}
            <div className="p-4 border-t border-purple-900/30 bg-[#0d0a1a] text-xs text-purple-300/70">
              <p className="font-semibold text-white mb-1">Тусламж & Дэмжлэг</p>
              <p>Утас: 1800 123 456</p>
              <p className="text-[11px] text-purple-400/50 mt-1">Ulaanbaatar 128-Tick Fiber</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
