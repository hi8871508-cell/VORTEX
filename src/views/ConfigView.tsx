// src/views/ConfigView.tsx
import React, { useState } from "react";
import { motion } from "motion/react";
import { FileText, Copy, Check, ArrowLeft, Download } from "lucide-react";
import { PRO_CONFIGS } from "../data/mockData";
import { PageRoute } from "../types";

interface ConfigViewProps {
  onNavigate: (page: PageRoute) => void;
}

export const ConfigView: React.FC<ConfigViewProps> = ({ onNavigate }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-10">
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
              <FileText className="w-3.5 h-3.5" />
              <span>Pro CS2 Configs</span>
            </div>

            <h1 className="font-['Chakra_Petch',sans-serif] text-4xl sm:text-5xl font-extrabold text-white">
              Мэргэжлийн Тамирчдын Тохиргоо
            </h1>

            <p className="text-sm sm:text-base text-purple-200/80 leading-relaxed max-w-2xl">
              The MongolZ болон олон улсын шилдэг тамирчдын Crosshair код, DPI, хулганы мэдрэмж (Sensitivity), нягтралын тохиргоонууд.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRO_CONFIGS.map((cfg) => (
            <div
              key={cfg.id}
              className="p-6 rounded-2xl bg-[#130d29]/95 border border-purple-800/40 hover:border-pink-500/50 transition-all space-y-4 shadow-xl"
            >
              <div>
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider bg-pink-950/80 px-2 py-0.5 rounded border border-pink-500/30">
                  {cfg.team}
                </span>
                <h3 className="text-lg font-bold text-white mt-2 font-['Chakra_Petch',sans-serif]">
                  {cfg.name}
                </h3>
                <p className="text-xs text-purple-400">{cfg.role}</p>
              </div>

              <div className="space-y-2 text-xs text-purple-200 border-t border-purple-900/30 pt-3">
                <div className="flex justify-between">
                  <span className="text-purple-400">Resolution:</span>
                  <span className="font-mono text-white">{cfg.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-400">DPI / Sens:</span>
                  <span className="font-mono text-emerald-400">
                    {cfg.dpi} DPI / {cfg.sens}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-400">Таталт:</span>
                  <span className="text-purple-300">{cfg.downloads.toLocaleString()} удаа</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-[11px] font-bold text-purple-300">Crosshair Код:</p>
                <div className="flex items-center justify-between p-2 rounded-xl bg-purple-950/70 border border-purple-800/40 text-[10px] font-mono text-pink-300">
                  <span className="truncate mr-2">{cfg.crosshairCode}</span>
                  <button
                    onClick={() => handleCopy(cfg.crosshairCode)}
                    className="p-1 text-purple-400 hover:text-white"
                  >
                    {copiedCode === cfg.crosshairCode ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleCopy(cfg.crosshairCode)}
                className="w-full py-2 px-3 rounded-xl bg-purple-900/40 hover:bg-pink-600 border border-purple-700/40 hover:border-pink-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Crosshair хуулах</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
