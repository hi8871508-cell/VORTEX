// src/components/Footer.tsx
import React from "react";
import { Phone, Mail, MapPin, Globe, Shield, Heart } from "lucide-react";
import { PageRoute } from "../types";

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative border-t border-purple-900/30 bg-[#0a0815]/90 text-purple-300/80 text-xs z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-['Chakra_Petch',sans-serif] text-2xl font-bold tracking-wider text-white">
                VOR<span className="text-[#f43f5e]">TEX</span>
              </span>
            </div>
            <p className="text-purple-300/70 leading-relaxed">
              Монголын хамгийн бага пингтэй, 128-tick rate CS2 серверүүдийн өрсөлдөөнт сүлжээ. Шударга тоглолт, өндөр бүтээмж.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Бүх 74 сервер хэвийн ажиллаж байна</span>
            </div>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 font-['Chakra_Petch',sans-serif]">
              Хуудсууд
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => {
                    onNavigate("home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  Нүүр (Home)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => {
                    onNavigate("about");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  Бидний тухай (About)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-contact"
                  onClick={() => {
                    onNavigate("contact");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  Холбоо барих (Contact)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-store"
                  onClick={() => {
                    onNavigate("store");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  Дэлгүүр (VIP / VT$ PayPal)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-leaderboards"
                  onClick={() => {
                    onNavigate("leaderboards");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  Leaderboards & Үзүүлэлт
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 font-['Chakra_Petch',sans-serif]">
              Холбоо барих
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  id="footer-click-to-call"
                  href="tel:1800123456"
                  className="flex items-center gap-2 hover:text-pink-400 text-pink-300 font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-pink-400" />
                  <span>1800 123 456 (24/7 Шуурхай)</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>support@vortex.cc</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Ulaanbaatar, Mongolia (VORTEX NOC)</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-purple-400" />
                <span>vortex.cc (novacs.cc)</span>
              </li>
            </ul>
          </div>

          {/* Social Media Col - Linked exactly as specified in prompt! */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 font-['Chakra_Petch',sans-serif]">
              Нийгмийн сүлжээ
            </h4>
            <div className="space-y-2">
              {/* Facebook */}
              <a
                id="social-link-facebook"
                href="https://facebook.com/gymjunkies"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-purple-950/40 hover:bg-pink-950/40 border border-purple-900/40 hover:border-pink-500/40 text-purple-200 hover:text-white transition-all group"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span>facebook.com/gymjunkies</span>
              </a>

              {/* Instagram */}
              <a
                id="social-link-instagram"
                href="https://instagram.com/gymjunkies"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-purple-950/40 hover:bg-pink-950/40 border border-purple-900/40 hover:border-pink-500/40 text-purple-200 hover:text-white transition-all group"
              >
                <div className="w-6 h-6 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span>instagram.com/gymjunkies</span>
              </a>

              {/* Youtube */}
              <a
                id="social-link-youtube"
                href="https://youtube.com/@gymjunkies"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-purple-950/40 hover:bg-pink-950/40 border border-purple-900/40 hover:border-pink-500/40 text-purple-200 hover:text-white transition-all group"
              >
                <div className="w-6 h-6 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <span>youtube.com/@gymjunkies</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-purple-900/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-purple-400/60 text-[11px]">
          <p>© {new Date().getFullYear()} VORTEX Matchmaking Network. Бүх эрх хуулиар хамгаалагдсан.</p>
          <div className="flex items-center gap-4">
            <span>Valve & CS2 нь Valve Corporation-ийн бүртгэлтэй худалдааны тэмдэг юм.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
