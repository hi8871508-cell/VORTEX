// src/components/SteamModal.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, ExternalLink, LogOut, CheckCircle, Zap } from "lucide-react";

interface SteamModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  steamUser: { name: string; avatar: string; steamId: string; elo: number } | null;
  onLogin: (name: string) => void;
  onLogout: () => void;
}

export const SteamModal: React.FC<SteamModalProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  steamUser,
  onLogin,
  onLogout,
}) => {
  const [customName, setCustomName] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSimulatedSteamLogin = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      onLogin(customName.trim() || "VORTEX_Player_01");
      setIsAuthenticating(false);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-[#130e28] border border-purple-800/60 rounded-2xl shadow-2xl p-6 z-10 text-white overflow-hidden"
          >
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500" />

            <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#f43f5e] flex items-center justify-center text-white">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.34 3.48 9.87 8.32 11.45l2.67-3.69c-.4-.56-.63-1.25-.63-1.99 0-1.89 1.54-3.43 3.43-3.43.34 0 .66.05.97.14l2.76-4.01C17.18 10.15 17 9.6 17 9c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5c-.32 0-.63-.04-.93-.1l-2.75 3.99c.32.55.51 1.18.51 1.86 0 2.07-1.68 3.75-3.75 3.75-1.52 0-2.83-.9-3.43-2.2L6.16 23.4C7.94 23.79 9.94 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0zm0 15.75c-1.24 0-2.25-1.01-2.25-2.25 0-.41.11-.79.3-1.12l3.07 1.25c-.01.04-.02.08-.02.12 0 1.1-.9 2-2 2zm8-6.75c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3z"/>
                  </svg>
                </div>
                <h3 className="font-['Chakra_Petch',sans-serif] text-lg font-bold">
                  {isLoggedIn ? "Таны Steam Профайл" : "Steam-ээр нэвтрэх"}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-purple-400 hover:text-white rounded-lg hover:bg-purple-950/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isLoggedIn && steamUser ? (
              <div className="py-5 space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                  <img
                    src={steamUser.avatar}
                    alt={steamUser.name}
                    className="w-14 h-14 rounded-xl border-2 border-pink-500 shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold truncate text-white">{steamUser.name}</p>
                    <p className="text-xs text-purple-400 font-mono">{steamUser.steamId}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[10px] bg-pink-950/80 text-pink-300 border border-pink-500/40 px-2 py-0.5 rounded font-semibold">
                        VIP ACTIVE
                      </span>
                      <span className="text-xs text-yellow-400 font-bold">{steamUser.elo} ELO</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#1a1433] border border-purple-900/30">
                    <p className="text-purple-400">Дээд амжилт</p>
                    <p className="text-lg font-bold text-white mt-0.5">Global Elite</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#1a1433] border border-purple-900/30">
                    <p className="text-purple-400">Сервер Slot</p>
                    <p className="text-lg font-bold text-emerald-400 mt-0.5">Reserved (No Queue)</p>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-purple-950/70 hover:bg-rose-950/50 border border-purple-800/40 hover:border-rose-500/40 text-rose-300 text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Гарах (Sign Out)
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-5 space-y-4">
                <p className="text-sm text-purple-200/80 leading-relaxed">
                  VORTEX серверүүдэд нэвтэрч, 5v5 тоглолтуудын ELO, MVP, K/D үзүүлэлт болон VT$ койн цуглуулахын тулд Steam-ээр нэвтэрнэ үү.
                </p>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-purple-300">
                    Steam хоч нэр (Gamer Tag):
                  </label>
                  <input
                    type="text"
                    placeholder="Жишээ: Steve^miles эсвэл MongolSniper"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c1539] border border-purple-800/50 text-white placeholder-purple-400/40 text-sm outline-none focus:border-pink-500 transition-colors"
                  />
                </div>

                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/30 text-xs text-purple-300/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>VORTEX Anti-Cheat & Steam OpenID 2.0 хамгаалагдсан</span>
                  </div>
                  <p className="text-[11px] text-purple-400/70">
                    Таны нууц үг шаардагдахгүй, зөвхөн олон нийтэд нээлттэй SteamID-г ашиглана.
                  </p>
                </div>

                <button
                  disabled={isAuthenticating}
                  onClick={handleSimulatedSteamLogin}
                  className="w-full py-3 px-4 rounded-xl bg-[#f43f5e] hover:bg-[#e11d48] text-white text-sm font-bold shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isAuthenticating ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-current" />
                      <span>Steam OpenID-ээр Шууд Нэвтрэх</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
