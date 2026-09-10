// src/views/HomeView.tsx
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Zap,
  Copy,
  Check,
  Server,
  Play,
  Flame,
  Shield,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { FEATURED_MATCH, LIVE_STATS, SERVERS_LIST, ROTATING_TAGLINES } from "../data/mockData";
import { PageRoute, ServerInfo } from "../types";

interface HomeViewProps {
  onNavigate: (page: PageRoute) => void;
  onOpenSteamModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenSteamModal }) => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [copiedIp, setCopiedIp] = useState<string | null>(null);
  const [selectedModeFilter, setSelectedModeFilter] = useState<string>("All");
  const [activeServer, setActiveServer] = useState<ServerInfo>(FEATURED_MATCH);

  // Rotating taglines like "хурдан" in Screenshot 1
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % ROTATING_TAGLINES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleCopyConnect = (ip: string, port: number) => {
    const command = `connect ${ip}:${port}`;
    navigator.clipboard.writeText(command);
    setCopiedIp(`${ip}:${port}`);
    setTimeout(() => setCopiedIp(null), 2500);
  };

  const handleLaunchSteam = (ip: string, port: number) => {
    window.location.href = `steam://connect/${ip}:${port}`;
  };

  const filteredServers =
    selectedModeFilter === "All"
      ? SERVERS_LIST
      : SERVERS_LIST.filter((s) => s.mode.includes(selectedModeFilter));

  return (
    <div className="relative min-h-[calc(100vh-4rem)] pb-16">
      {/* 1. Live ticker & VIP user banner matching Screenshot 1 */}
      <div className="max-w-4xl mx-auto px-4 pt-4 sm:pt-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-2 p-2 sm:px-4 sm:py-2 rounded-xl bg-[#140e2d]/80 border border-purple-900/40 text-xs text-purple-200"
        >
          {/* Live indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold text-emerald-400 text-[11px] uppercase tracking-wider">
              ШУУД
            </span>
            <span className="hidden sm:inline text-purple-400">|</span>
            <span className="text-purple-300/80 text-[11px] truncate">
              Match #1 de_mirage эхэллээ • 9 мин өмнө
            </span>
          </div>

          {/* User badge with crown matching Screenshot 1 */}
          <div
            onClick={onOpenSteamModal}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/60 hover:bg-pink-950/40 border border-purple-800/40 text-xs cursor-pointer transition-colors"
          >
            <span className="text-amber-400 text-xs">👑</span>
            <img
              src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=50&auto=format&fit=crop&q=80"
              alt="Steve miles"
              className="w-4 h-4 rounded-full border border-pink-400"
            />
            <span className="font-semibold text-white text-[11px]">^Steve ^miles</span>
          </div>
        </motion.div>
      </div>

      {/* 2. Giant Hero Title & Tagline matching Screenshot 1 */}
      <div className="max-w-4xl mx-auto px-4 pt-8 sm:pt-12 text-left">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          {/* Giant Title: VORTEX (User specifically instructed: "Neriign VORTEX nova gesn nernii orond vortex bolgooroi") */}
          <h1 className="font-['Chakra_Petch',sans-serif] text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-white select-none">
            VOR<span className="text-[#f43f5e] drop-shadow-[0_0_25px_rgba(244,63,94,0.4)]">TEX</span>
          </h1>

          {/* Tagline: "Vortex бол [ хурдан ]" */}
          <div className="flex items-center gap-3 text-lg sm:text-2xl font-bold text-purple-200">
            <span className="text-purple-300 font-['Chakra_Petch',sans-serif]">VORTEX бол</span>
            <div className="relative inline-flex items-center justify-center px-4 py-1.5 rounded-lg border border-purple-700/60 bg-[#160f33] shadow-inner">
              <span className="text-white font-['Chakra_Petch',sans-serif] tracking-wide">
                {ROTATING_TAGLINES[taglineIndex]}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. The Iconic MATCH #1 Live Card matching Screenshot 1 */}
      <div className="max-w-4xl mx-auto px-4 pt-8 sm:pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative p-5 sm:p-7 rounded-2xl bg-[#130d2a]/95 border border-pink-500/50 shadow-2xl shadow-pink-950/20 overflow-hidden"
        >
          {/* Top subtle border glow line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent" />

          {/* Card Header text */}
          <div className="flex items-center justify-between text-xs text-purple-400 font-mono tracking-wider mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <span className="text-purple-300 font-semibold uppercase text-[11px] sm:text-xs">
                ШУУД ОРОХ • ТАНЫГ ОРУУЛАХ СЕРВЕР:
              </span>
            </div>

            {/* Score pill */}
            <div className="flex items-center gap-2 bg-[#1d133f] px-3 py-1 rounded-full border border-purple-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-pink-400 font-bold text-xs uppercase">ШУУД</span>
            </div>
          </div>

          {/* Main Card Content */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <h2 className="font-['Chakra_Petch',sans-serif] text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
                  MATCH #{activeServer.matchNumber}
                </h2>
                <span className="text-sm font-semibold text-pink-400 bg-pink-950/60 border border-pink-500/30 px-2 py-0.5 rounded">
                  {activeServer.mode}
                </span>
              </div>

              {/* Server IP info */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-purple-300 font-mono">
                <span className="text-white font-semibold">{activeServer.map}</span>
                <span>•</span>
                <span className="text-purple-400">
                  {activeServer.ip}:{activeServer.port}
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">{activeServer.ping}ms</span>
                <span>•</span>
                <span className="text-purple-300">{activeServer.tickrate} Tick</span>
              </div>
            </div>

            {/* Live Score Counter matching Screenshot 1 (Score 5 : 4 with dots) */}
            {activeServer.currentScore && (
              <div className="flex items-center gap-3 bg-[#1c133d] px-4 py-2.5 rounded-xl border border-purple-800/40">
                <div className="text-center">
                  <p className="text-[10px] text-blue-400 font-bold uppercase">CT</p>
                  <p className="text-xl sm:text-2xl font-black text-blue-400 font-mono">
                    {activeServer.currentScore.ct}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-1">
                  <span className="w-1 h-1 rounded-full bg-purple-400" />
                  <span className="w-1 h-1 rounded-full bg-purple-400" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-amber-400 font-bold uppercase">T</p>
                  <p className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                    {activeServer.currentScore.t}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Row matching Screenshot 1: [ Тоглох → ] button and progress bar */}
          <div className="mt-6 pt-6 border-t border-purple-900/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Angled/Chamfered Pink Button matching Screenshot 1 */}
              <button
                id="btn-play-match-1"
                onClick={() => handleCopyConnect(activeServer.ip, activeServer.port)}
                className="relative px-6 py-3 bg-[#f43f5e] hover:bg-[#e11d48] text-white font-['Chakra_Petch',sans-serif] font-bold text-base tracking-wider uppercase shadow-lg shadow-pink-600/30 transition-all cursor-pointer flex items-center gap-2 group [clip-path:polygon(0_0,100%_0,100%_75%,88%_100%,0_100%)]"
              >
                <span>Тоглох →</span>
              </button>

              <button
                id="btn-copy-ip-match-1"
                onClick={() => handleCopyConnect(activeServer.ip, activeServer.port)}
                className="px-3.5 py-3 rounded-lg bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/40 text-purple-300 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                title="Холбогдох командыг хуулах"
              >
                {copiedIp === `${activeServer.ip}:${activeServer.port}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Хууллаа!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-pink-400" />
                    <span>IP хуулах</span>
                  </>
                )}
              </button>

              <button
                id="btn-steam-direct-connect"
                onClick={() => handleLaunchSteam(activeServer.ip, activeServer.port)}
                className="hidden sm:flex px-3.5 py-3 rounded-lg bg-purple-950/60 hover:bg-pink-950/40 border border-purple-800/40 text-purple-300 hover:text-white transition-colors text-xs font-semibold items-center gap-1.5 cursor-pointer"
                title="Steam CS2-оор шууд нээх"
              >
                <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                <span>CS2 нээх</span>
              </button>
            </div>

            {/* Progress bar matching Screenshot 1 */}
            <div className="flex items-center gap-3 w-full sm:w-56">
              <div className="flex-1 h-2 rounded-full bg-purple-950/80 overflow-hidden border border-purple-800/30">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-500 shadow-sm"
                  style={{
                    width: `${(activeServer.playersOnline / activeServer.maxPlayers) * 100}%`,
                  }}
                />
              </div>
              <span className="font-mono text-sm font-bold text-pink-400 whitespace-nowrap">
                {activeServer.playersOnline} <span className="text-purple-400/80 font-normal">/ {activeServer.maxPlayers}</span>
              </span>
            </div>
          </div>

          {/* Footer of Card: "224 онлайн • бүх сервер дээр" */}
          <div className="mt-4 pt-3 border-t border-purple-950/40 flex items-center justify-between text-xs text-purple-400">
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-emerald-400">{LIVE_STATS.playingNow}</span>
              <span>онлайн • бүх сервер дээр</span>
            </span>

            <span className="font-mono text-[11px] text-purple-400/70 hidden sm:inline">
              Console: connect {activeServer.ip}:{activeServer.port}
            </span>
          </div>
        </motion.div>
      </div>

      {/* 4. Live Statistics Grid (4 columns, matching Screenshot 1) */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: ОДОО ТОГЛОЖ БУЙ */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-4 rounded-xl bg-[#120d28]/90 border border-purple-900/40 hover:border-pink-500/30 transition-colors"
          >
            <p className="text-[11px] font-bold text-purple-400/80 uppercase tracking-wider">
              ОДОО ТОГЛОЖ БУЙ
            </p>
            <p className="font-['Chakra_Petch',sans-serif] text-2xl sm:text-3xl font-extrabold text-pink-400 mt-1">
              {LIVE_STATS.playingNow}
            </p>
            <p className="text-[10px] text-purple-400/60 mt-0.5">{LIVE_STATS.playingLabel}</p>
          </motion.div>

          {/* Card 2: АЖИЛЛАЖ БУЙ СЕРВЕР */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-xl bg-[#120d28]/90 border border-purple-900/40 hover:border-pink-500/30 transition-colors"
          >
            <p className="text-[11px] font-bold text-purple-400/80 uppercase tracking-wider">
              АЖИЛЛАЖ БУЙ СЕРВЕР
            </p>
            <p className="font-['Chakra_Petch',sans-serif] text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
              {LIVE_STATS.activeServers}
            </p>
            <p className="text-[10px] text-purple-400/60 mt-0.5">{LIVE_STATS.activeServersLabel}</p>
          </motion.div>

          {/* Card 3: СҮҮЛИЙН 24 ЦАГ */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="p-4 rounded-xl bg-[#120d28]/90 border border-purple-900/40 hover:border-pink-500/30 transition-colors"
          >
            <p className="text-[11px] font-bold text-purple-400/80 uppercase tracking-wider">
              СҮҮЛИЙН 24 ЦАГ
            </p>
            <p className="font-['Chakra_Petch',sans-serif] text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {LIVE_STATS.last24Hours}
            </p>
            <p className="text-[10px] text-purple-400/60 mt-0.5">Тоглосон хэрэглэгч</p>
          </motion.div>

          {/* Card 4: СҮҮЛИЙН 7 ХОНОГ */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 rounded-xl bg-[#120d28]/90 border border-purple-900/40 hover:border-pink-500/30 transition-colors"
          >
            <p className="text-[11px] font-bold text-purple-400/80 uppercase tracking-wider">
              СҮҮЛИЙН 7 ХОНОГ
            </p>
            <p className="font-['Chakra_Petch',sans-serif] text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {LIVE_STATS.last7Days}
            </p>
            <p className="text-[10px] text-purple-400/60 mt-0.5">Идэвхтэй тоглогчид</p>
          </motion.div>
        </div>
      </div>

      {/* 5. Server Browser Section */}
      <div className="max-w-4xl mx-auto px-4 pt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-['Chakra_Petch',sans-serif] text-xl font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-pink-400" />
              <span>Идэвхтэй Серверүүд</span>
            </h3>
            <p className="text-xs text-purple-400">
              Газрын зураг сонгож, тоглолтонд шууд холбогдоно уу
            </p>
          </div>

          {/* Mode Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {["All", "5v5", "Retake", "Deathmatch", "1v1"].map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedModeFilter(mode)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedModeFilter === mode
                    ? "bg-pink-600 text-white"
                    : "bg-purple-950/60 text-purple-300 hover:text-white hover:bg-purple-900/60"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Server List */}
        <div className="space-y-2.5">
          {filteredServers.map((server) => {
            const isSelected = activeServer.id === server.id;
            return (
              <div
                key={server.id}
                onClick={() => setActiveServer(server)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isSelected
                    ? "bg-[#181136] border-pink-500/60 shadow-md shadow-pink-950/30"
                    : "bg-[#120d26]/80 border-purple-900/30 hover:border-purple-700/50 hover:bg-[#161030]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-950/80 border border-purple-800/40 flex items-center justify-center font-['Chakra_Petch',sans-serif] font-bold text-sm text-pink-400">
                    #{server.matchNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{server.map}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950/90 text-purple-300 border border-purple-800/30 font-semibold">
                        {server.mode}
                      </span>
                    </div>
                    <p className="text-xs text-purple-400 font-mono mt-0.5">
                      {server.ip}:{server.port} • {server.tickrate} Tick
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-right">
                    <p className="text-xs font-bold text-pink-400">
                      {server.playersOnline} / {server.maxPlayers}
                    </p>
                    <p className="text-[10px] text-emerald-400 font-mono">{server.ping}ms ping</p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyConnect(server.ip, server.port);
                      }}
                      className="p-2 rounded-lg bg-purple-950/60 hover:bg-pink-600 text-purple-300 hover:text-white transition-colors cursor-pointer"
                      title="Командыг хуулах"
                    >
                      {copiedIp === `${server.ip}:${server.port}` ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLaunchSteam(server.ip, server.port);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#f43f5e] hover:bg-[#e11d48] text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Тоглох
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. VIP Callout Banner */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-[#26134a] to-pink-950/60 border border-pink-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs bg-pink-600 text-white font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                PayPal $10 One-Time
              </span>
              <h4 className="font-['Chakra_Petch',sans-serif] text-lg font-bold text-white">
                VORTEX VIP Pass Авах
              </h4>
            </div>
            <p className="text-xs text-purple-300/80">
              Бүх дүүрсэн серверүүдэд шууд орох slot, [VIP] алтан чат тэмдэг, 10,000 VT$ койн.
            </p>
          </div>

          <button
            id="home-cta-store"
            onClick={() => onNavigate("store")}
            className="px-5 py-2.5 rounded-xl bg-[#f43f5e] hover:bg-[#e11d48] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-pink-600/20 transition-all cursor-pointer whitespace-nowrap"
          >
            Дэлгүүр үзэх ($10) →
          </button>
        </div>
      </div>
    </div>
  );
};
