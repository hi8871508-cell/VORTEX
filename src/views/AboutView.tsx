// src/views/AboutView.tsx
import React from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Zap,
  Target,
  Users,
  Award,
  ArrowLeft,
  Server,
  Heart,
  Cpu,
  Globe,
} from "lucide-react";
import { PageRoute } from "../types";

interface AboutViewProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Back navigation & Page Header */}
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
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Бидний тухай</span>
            </div>

            <h1 className="font-['Chakra_Petch',sans-serif] text-4xl sm:text-5xl font-extrabold text-white">
              VORTEX Esports Network
            </h1>

            <p className="text-sm sm:text-base text-purple-200/80 leading-relaxed max-w-2xl">
              Монголын цахим спортын тамирчид, сонирхогчдод зориулсан 128-tick rate өндөр хүчин чадалтай, хакердах эрсдэлгүй хамгийн шуурхай CS2 серверүүдийн сүлжээ.
            </p>
          </motion.div>
        </div>

        {/* Dedicated "Our Genesis" section - Explicitly required in prompt! */}
        <motion.section
          id="our-genesis-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#181136] via-[#1c123d] to-[#120c29] border border-pink-500/40 shadow-2xl overflow-hidden"
        >
          {/* Subtle glow accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-pink-400">
              <Cpu className="w-5 h-5" />
              <h2 className="font-['Chakra_Petch',sans-serif] text-2xl sm:text-3xl font-bold tracking-wide text-white">
                Our Genesis (Бидний Үүсэл Түүх)
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-purple-200/90 leading-relaxed font-normal">
              <p>
                VORTEX (эхлэл нэршил нь NovaCS) нь 2024 онд Монголын цахим спортын идэвхтэй тамирчид болон өндөр зэрэглэлийн сүлжээний инженерүүдийн санаачилгаар байгуулагдсан юм. Гадаад серверүүдийн өндөр пинг (80ms - 120ms), байнга гарах packet loss, болон 64-tick rate-ийн хоцрогдсон системүүд нь Монголын өсвөр үеийн тамирчдын ур чадвараа бүрэн нээхэд гол саад болж байлаа.
              </p>
              <p>
                Бид энэхүү бэрхшээлийг үгүй хийхийн тулд Улаанбаатар хотын төв дата төвд суурилсан шууд fiber-optic холболттой, Линукс кернелийн түвшинд 128-tickrate тусгай тохируулгатай, 5ms-ээс бага пингтэй бие даасан серверийн дэд бүтцийг босгосон.
              </p>
              <p className="border-l-2 border-pink-500 pl-4 italic text-pink-200/90">
                “Бидний зорилго бол хүн бүрт адил тэгш, ямар ч хоцрогдолгүй, шударга өрсөлдөөний талбарыг бий болгох явдал юм.”
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-purple-900/40 text-center">
              <div className="p-3 rounded-xl bg-purple-950/40">
                <p className="text-xl font-bold text-pink-400 font-['Chakra_Petch',sans-serif]">
                  &lt; 5ms
                </p>
                <p className="text-[11px] text-purple-300">UB хотын пинг</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-950/40">
                <p className="text-xl font-bold text-emerald-400 font-['Chakra_Petch',sans-serif]">
                  128
                </p>
                <p className="text-[11px] text-purple-300">Tick Rate</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-950/40">
                <p className="text-xl font-bold text-cyan-400 font-['Chakra_Petch',sans-serif]">
                  74+
                </p>
                <p className="text-[11px] text-purple-300">Идэвхтэй Сервер</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-950/40">
                <p className="text-xl font-bold text-yellow-400 font-['Chakra_Petch',sans-serif]">
                  100%
                </p>
                <p className="text-[11px] text-purple-300">Anti-Cheat хамгаалалт</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Mission & Values */}
        <section className="space-y-6">
          <h3 className="font-['Chakra_Petch',sans-serif] text-2xl font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-pink-400" />
            <span>Бидний Эрхэм Зорилго & Үнэт Зүйлс</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#130d28]/90 border border-purple-900/40 hover:border-pink-500/40 transition-colors space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-pink-950/70 text-pink-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base">Хамгийн Бага Пинг</h4>
              <p className="text-xs text-purple-300/80 leading-relaxed">
                Монголын бүх интернетийн үйлчилгээ үзүүлэгч (Univision, Skymedia, G-Mobile, Mobinet)-тэй шууд пиринг холболттой тул хамгийн богино замналаар дата дамжуулна.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#130d28]/90 border border-purple-900/40 hover:border-pink-500/40 transition-colors space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-purple-950/70 text-purple-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base">Шударга Өрсөлдөөн</h4>
              <p className="text-xs text-purple-300/80 leading-relaxed">
                VORTEX Anti-Cheat болон хиймэл оюун ухаанд суурилсан тоглогчийн зан төлөвийн хяналтын системээр аливаа хууран мэхлэлт, хакердах үйлдлийг 0.1 секундэд илрүүлж хаана.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#130d28]/90 border border-purple-900/40 hover:border-pink-500/40 transition-colors space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/70 text-emerald-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base">Хамт Олон & Клан</h4>
              <p className="text-xs text-purple-300/80 leading-relaxed">
                Энгийн тоглогчоос эхлээд мэргэжлийн түвшний тамирчид хүртэл өдөр бүрийн 5v5 тэмцээн, цол хэргэм, VT$ шагналт уралдаанд чөлөөтэй оролцох боломжтой.
              </p>
            </div>
          </div>
        </section>

        {/* Roadmap / Features highlight */}
        <section className="p-6 rounded-2xl bg-[#120d26]/80 border border-purple-900/40 space-y-4">
          <h3 className="font-['Chakra_Petch',sans-serif] text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Серверийн Техникийн Онцлогууд</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-purple-300">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded bg-purple-950 flex items-center justify-center text-pink-400 font-bold shrink-0">
                ✓
              </div>
              <p>
                <strong className="text-white">CS2 Dedicated 128 Tickrate:</strong> Тоглогчийн сумны бүртгэл (sub-tick + 128-tick hybrid) хамгийн оновчтой.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded bg-purple-950 flex items-center justify-center text-pink-400 font-bold shrink-0">
                ✓
              </div>
              <p>
                <strong className="text-white">DDoS хамгаалалт:</strong> 2Tbps хүртэлх дайралтыг автоматаар шүүх Arbor & Cloudflare Edge сүлжээ.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded bg-purple-950 flex items-center justify-center text-pink-400 font-bold shrink-0">
                ✓
              </div>
              <p>
                <strong className="text-white">Skinchanger & Knives:</strong> Тоглолтын явцад дурын хутга, бууны будгийг үнэгүй солих боломж.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded bg-purple-950 flex items-center justify-center text-pink-400 font-bold shrink-0">
                ✓
              </div>
              <p>
                <strong className="text-white">Huddy AI Assistant:</strong> Тоглогчдод сервер тохиргоо, команд, VIP эрх авахад туслах ухаалаг туслах.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate("home")}
            className="px-6 py-3 rounded-xl bg-[#f43f5e] hover:bg-[#e11d48] text-white font-['Chakra_Petch',sans-serif] font-bold text-sm uppercase tracking-wider shadow-lg shadow-pink-600/25 transition-all cursor-pointer"
          >
            Серверт Холбогдож Тоглох →
          </button>
        </div>
      </div>
    </div>
  );
};
