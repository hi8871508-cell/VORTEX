// src/components/SearchModal.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Server, User, Crosshair, Terminal, ChevronRight } from "lucide-react";
import { SERVERS_LIST, LEADERBOARD_PLAYERS, PRO_CONFIGS } from "../data/mockData";
import { PageRoute } from "../types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageRoute) => void;
  onSelectServer: (ip: string, port: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectServer,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Toggle search
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredServers = SERVERS_LIST.filter(
    (s) =>
      s.map.toLowerCase().includes(query.toLowerCase()) ||
      s.mode.toLowerCase().includes(query.toLowerCase()) ||
      `${s.ip}:${s.port}`.includes(query)
  );

  const filteredPlayers = LEADERBOARD_PLAYERS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.steamId.toLowerCase().includes(query.toLowerCase())
  );

  const filteredConfigs = PRO_CONFIGS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.team.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-xl bg-[#140e2b] border border-purple-800/60 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-purple-900/40 flex items-center gap-3">
              <Search className="w-5 h-5 text-pink-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Сервер, газрын зураг, тоглогч эсвэл config хайх..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-purple-400/50 text-base outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 text-purple-400 hover:text-white rounded-lg hover:bg-purple-950/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick shortcuts */}
            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
              {/* Servers section */}
              <div>
                <p className="text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-pink-400" />
                  Серверүүд ({filteredServers.length})
                </p>
                <div className="space-y-1.5">
                  {filteredServers.slice(0, 4).map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => {
                        onSelectServer(srv.ip, srv.port);
                        onClose();
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/40 hover:bg-pink-950/30 border border-purple-900/30 hover:border-pink-500/40 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Crosshair className="w-4 h-4 text-pink-400" />
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {srv.map} <span className="text-xs text-purple-300">({srv.mode})</span>
                          </p>
                          <p className="text-xs text-purple-400 font-mono">
                            {srv.ip}:{srv.port}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-pink-400">
                          {srv.playersOnline}/{srv.maxPlayers}
                        </span>
                        <p className="text-[10px] text-emerald-400">{srv.ping}ms</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Players section */}
              {filteredPlayers.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    Тоглогчид ({filteredPlayers.length})
                  </p>
                  <div className="space-y-1.5">
                    {filteredPlayers.map((player) => (
                      <div
                        key={player.name}
                        onClick={() => {
                          onNavigate("leaderboards");
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-900/30 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={player.avatar}
                            alt={player.name}
                            className="w-6 h-6 rounded-full border border-purple-500"
                          />
                          <span className="text-sm font-medium text-white">{player.name}</span>
                        </div>
                        <span className="text-xs text-yellow-400 font-mono">{player.elo} ELO</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pro Configs */}
              {filteredConfigs.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    Pro CFG & Crosshairs
                  </p>
                  <div className="space-y-1.5">
                    {filteredConfigs.map((cfg) => (
                      <div
                        key={cfg.id}
                        onClick={() => {
                          onNavigate("config");
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-900/30 transition-colors cursor-pointer"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">{cfg.name}</p>
                          <p className="text-xs text-purple-400 font-mono">
                            {cfg.resolution} • {cfg.dpi} DPI • Sens {cfg.sens}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-purple-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
