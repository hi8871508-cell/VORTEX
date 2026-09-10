// src/views/LeaderboardView.tsx
import React from "react";
import { motion } from "motion/react";
import { Trophy, Award, Flame, ArrowLeft, Star, TrendingUp } from "lucide-react";
import { LEADERBOARD_PLAYERS } from "../data/mockData";
import { PageRoute } from "../types";

interface LeaderboardViewProps {
  onNavigate: (page: PageRoute) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <button
            onClick={() => onNavigate("home")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-pink-400 mb-4 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Нүүр хуудас руу буцах</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/70 border border-pink-500/40 text-pink-300 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>Шилдэг Тоглогчид</span>
            </div>

            <h1 className="font-['Chakra_Petch',sans-serif] text-4xl sm:text-5xl font-extrabold text-white">
              VORTEX Leaderboards & Streak
            </h1>

            <p className="text-sm sm:text-base text-purple-200/80 leading-relaxed max-w-2xl">
              5v5 өрсөлдөөнт тоглолтын үр дүнгээр шалгарсан шилдэг тоглогчид, өдрийн дарааллын урамшуулал.
            </p>
          </motion.div>
        </div>

        {/* Streak Highlight Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/50 to-pink-950/40 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-['Chakra_Petch',sans-serif] text-lg font-bold text-white">
                Daily Streak Урамшуулал
              </h3>
              <p className="text-xs text-purple-300">
                Өдөр бүр VORTEX серверт 1 тоглолт хийж +500 VT$ койн авна. Одоогийн дараалал: 5 өдөр.
              </p>
            </div>
          </div>
          <span className="px-4 py-2 rounded-xl bg-amber-500 text-black font-['Chakra_Petch',sans-serif] font-bold text-xs uppercase tracking-wider">
            Өдрийн Бэлэг Авах
          </span>
        </div>

        {/* Players List Table */}
        <div className="rounded-2xl bg-[#130d29]/95 border border-purple-800/40 overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-purple-900/40 flex items-center justify-between text-xs font-bold text-purple-400 uppercase tracking-wider">
            <span>Эрэмбэ & Тоглогч</span>
            <div className="flex items-center gap-8 pr-4">
              <span className="hidden sm:inline">Win Rate</span>
              <span className="hidden sm:inline">K/D Ratio</span>
              <span>ELO Оноо</span>
            </div>
          </div>

          <div className="divide-y divide-purple-900/30">
            {LEADERBOARD_PLAYERS.map((player) => (
              <div
                key={player.name}
                className="p-4 flex items-center justify-between hover:bg-purple-950/30 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      player.rank === 1
                        ? "bg-amber-400 text-black font-extrabold"
                        : player.rank === 2
                        ? "bg-gray-300 text-black"
                        : player.rank === 3
                        ? "bg-amber-700 text-white"
                        : "bg-purple-950 text-purple-400"
                    }`}
                  >
                    #{player.rank}
                  </div>

                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-9 h-9 rounded-full border border-purple-500"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{player.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-950/80 text-pink-300 border border-pink-500/30 font-semibold">
                        {player.badge}
                      </span>
                    </div>
                    <span className="text-xs text-purple-400/80 font-mono">{player.steamId}</span>
                  </div>
                </div>

                <div className="flex items-center gap-8 pr-4 text-xs font-semibold">
                  <span className="hidden sm:inline text-purple-300">{player.winRate}%</span>
                  <span className="hidden sm:inline text-emerald-400">{player.kd}</span>
                  <span className="text-yellow-400 font-bold font-mono text-sm">
                    {player.elo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
