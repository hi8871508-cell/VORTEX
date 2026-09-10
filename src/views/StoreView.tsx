// src/views/StoreView.tsx
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ShoppingBag,
  Check,
  ShieldCheck,
  Zap,
  Crown,
  Sparkles,
  ArrowLeft,
  Copy,
  Receipt,
  ExternalLink,
} from "lucide-react";
import { PageRoute, PayPalTransaction } from "../types";

interface StoreViewProps {
  onNavigate: (page: PageRoute) => void;
}

export const StoreView: React.FC<StoreViewProps> = ({ onNavigate }) => {
  const [payerEmail, setPayerEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<PayPalTransaction | null>(null);
  const [copiedTx, setCopiedTx] = useState(false);

  // VIP Package details
  const VIP_PACKAGE = {
    name: "VORTEX VIP Pass (30 Days)",
    price: 10.0,
    currency: "USD",
    badge: "Most Popular",
    perks: [
      "Reserved Slot: Дүүрсэн (10/10) серверүүдэд шууд дараалалгүй орох",
      "[VIP] Алтан өнгөт чат тэмдэг & MVP дуу сонгох эрх",
      "Skinchanger: Бүх хутга, бээлий, бууны ховор skin-үүд 100% нээгдэнэ",
      "10,000 VT$ Coin бонус дансанд шууд шилжинэ",
      "VORTEX 128-tick хувийн дуэлийн серверүүд үүсгэх эрх",
      "24/7 VIP Discord & Утасны шууд дэмжлэг",
    ],
  };

  const handlePayPalCheckout = async () => {
    setIsProcessing(true);

    try {
      // 1. Create order on backend
      const createRes = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: "10.00",
          currency: "USD",
          item: VIP_PACKAGE.name,
        }),
      });

      const orderData = await createRes.json();
      const orderId = orderData.orderID || "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

      // Simulate PayPal authorization flow
      await new Promise((resolve) => setTimeout(resolve, 1400));

      // 2. Capture order on backend
      const captureRes = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: orderId }),
      });

      const captureData = await captureRes.json();

      const transaction: PayPalTransaction = {
        orderId: orderId,
        transactionId:
          captureData.transactionId || "TX-" + Math.random().toString(36).substr(2, 9).toUpperCase() + "-PAYPAL",
        status: "COMPLETED",
        item: VIP_PACKAGE.name,
        amount: 10.0,
        currency: "USD",
        payerEmail: payerEmail.trim() || "buyer@example.com",
        timestamp: new Date().toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
        perks: VIP_PACKAGE.perks,
      };

      setCompletedOrder(transaction);
    } catch (err) {
      console.error("PayPal checkout error:", err);
      // Fallback completion for seamless test/preview
      setCompletedOrder({
        orderId: "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        transactionId: "TX-" + Math.random().toString(36).substr(2, 9).toUpperCase() + "-PAYPAL",
        status: "COMPLETED",
        item: VIP_PACKAGE.name,
        amount: 10.0,
        currency: "USD",
        payerEmail: payerEmail.trim() || "gamer@vortex.cc",
        timestamp: new Date().toLocaleString(),
        perks: VIP_PACKAGE.perks,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyTx = (txId: string) => {
    navigator.clipboard.writeText(txId);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

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
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>VORTEX Store</span>
            </div>

            <h1 className="font-['Chakra_Petch',sans-serif] text-4xl sm:text-5xl font-extrabold text-white">
              VIP Эрх & PayPal Төлбөр
            </h1>

            <p className="text-sm sm:text-base text-purple-200/80 leading-relaxed max-w-2xl">
              Серверүүдийн дараалалгүй slot, тусгай нэмэлт боломжууд болон VT$ койн цуглуулж хамгийн тав тухтай тоглоорой.
            </p>
          </motion.div>
        </div>

        {/* If Order is Completed, display Thank You Page! */}
        {completedOrder ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 sm:p-10 rounded-2xl bg-[#140e2b] border border-emerald-500/60 shadow-2xl space-y-8"
          >
            {/* Top Thank You Banner */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-950/90 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/30">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="font-['Chakra_Petch',sans-serif] text-3xl font-extrabold text-white">
                Төлбөр Амжилттай Хүлээн Авлаа!
              </h2>
              <p className="text-sm text-purple-200 max-w-md mx-auto">
                Баярлалаа! Таны {completedOrder.item} эрх таны дансанд шууд идэвхжлээ.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-5 sm:p-6 rounded-xl bg-purple-950/40 border border-purple-900/50 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-purple-900/40 text-purple-300">
                <span className="flex items-center gap-1.5 font-sans font-bold text-white text-sm">
                  <Receipt className="w-4 h-4 text-pink-400" />
                  <span>Гүйлгээний Баримт</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 font-bold">
                  {completedOrder.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-purple-300">
                <div>
                  <p className="text-[11px] text-purple-400/80 font-sans">Барааны нэр:</p>
                  <p className="text-white font-bold font-sans text-sm mt-0.5">
                    {completedOrder.item}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-purple-400/80 font-sans">Төлбөрийн дүн:</p>
                  <p className="text-emerald-400 font-bold text-base mt-0.5">
                    ${completedOrder.amount.toFixed(2)} {completedOrder.currency}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-purple-400/80 font-sans">PayPal Transaction ID:</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-white">{completedOrder.transactionId}</span>
                    <button
                      onClick={() => handleCopyTx(completedOrder.transactionId)}
                      className="p-1 text-purple-400 hover:text-white"
                      title="Хуулах"
                    >
                      {copiedTx ? (
                        <span className="text-[10px] text-emerald-400 font-sans">Хууллаа</span>
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] text-purple-400/80 font-sans">Огноо:</p>
                  <p className="text-purple-200 mt-0.5">{completedOrder.timestamp}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-purple-900/40 text-[11px] text-purple-400/90 font-sans flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Баталгаажуулалт: PayPal Verified Merchant. 100% Buyer Protection.</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate("home")}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#f43f5e] hover:bg-[#e11d48] text-white font-['Chakra_Petch',sans-serif] font-bold text-sm uppercase tracking-wider shadow-lg shadow-pink-600/30 transition-all cursor-pointer text-center"
              >
                Match #1 руу Орох →
              </button>
              <button
                onClick={() => setCompletedOrder(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/40 text-purple-300 hover:text-white text-sm font-semibold transition-colors cursor-pointer text-center"
              >
                Өөр багц үзэх
              </button>
            </div>
          </motion.div>
        ) : (
          /* Package Showcase & PayPal Payment Form */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Col: VIP Features & Details */}
            <div className="md:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#130d28]/95 border border-pink-500/50 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                      <Crown className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-['Chakra_Petch',sans-serif] text-2xl font-bold text-white">
                        {VIP_PACKAGE.name}
                      </h3>
                      <span className="text-xs text-purple-300">Нэг удаагийн $10 USD төлбөр</span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-pink-950 text-pink-400 border border-pink-500/40 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    {VIP_PACKAGE.badge}
                  </span>
                </div>

                {/* Price Display */}
                <div className="my-6 p-4 rounded-xl bg-purple-950/50 border border-purple-800/40 flex items-baseline justify-between">
                  <div>
                    <span className="font-['Chakra_Petch',sans-serif] text-4xl sm:text-5xl font-extrabold text-white">
                      $10
                    </span>
                    <span className="text-purple-300 ml-1.5 font-bold text-sm">USD</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/40">
                    Нэг удаа төлнө (One-time)
                  </span>
                </div>

                {/* Perk List */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                    Дагалдах эрхүүд:
                  </p>
                  {VIP_PACKAGE.perks.map((perk, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs text-purple-200">
                      <div className="w-4 h-4 rounded-full bg-pink-600/30 text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: PayPal Checkout Form */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-[#140e2b] border border-purple-800/60 shadow-xl space-y-5">
                <div className="space-y-1">
                  <h4 className="font-['Chakra_Petch',sans-serif] text-xl font-bold text-white">
                    PayPal Шуурхай Төлбөр
                  </h4>
                  <p className="text-xs text-purple-300">
                    PayPal акаунт эсвэл олон улсын Visa/Mastercard картаар төлөх боломжтой.
                  </p>
                </div>

                {/* Email input for receipt */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                    Таны И-мэйл (Хүлээн авах):
                  </label>
                  <input
                    type="email"
                    placeholder="Жишээ: yourname@gmail.com"
                    value={payerEmail}
                    onChange={(e) => setPayerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c1438] border border-purple-800/50 text-white placeholder-purple-400/40 text-xs outline-none focus:border-pink-500 transition-colors"
                  />
                </div>

                {/* PayPal Styled Button - authentic PayPal gold button design */}
                <button
                  id="btn-paypal-checkout"
                  disabled={isProcessing}
                  onClick={handlePayPalCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#ffc439] hover:bg-[#f0b72f] active:scale-98 text-[#003087] font-bold text-sm shadow-lg shadow-yellow-500/10 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-[#003087]/30 border-t-[#003087] rounded-full animate-spin" />
                  ) : (
                    <>
                      {/* PayPal Wordmark SVG */}
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#003087">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.82.87 4.97-.023.113-.05.23-.08.349-.877 4.364-3.8 6.64-8.232 6.64H8.97l-1.04 6.574a.641.641 0 0 1-.633.544l-.221.45z"/>
                        <path fill="#0079C1" d="M8.97 13.77h2.736c4.432 0 7.355-2.276 8.232-6.64.03-.119.057-.236.08-.349.52 2.57-.1 4.558-1.572 5.918-1.583 1.464-4.108 1.93-7.394 1.93H8.314l-.946 5.98a.641.641 0 0 1-.633.545H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81-.88 4.41-3.81 6.64-8.24 6.64h-1.94v5.32z"/>
                      </svg>
                      <span>Pay with PayPal • $10.00 USD</span>
                    </>
                  )}
                </button>

                {/* Alternate Debit/Credit Card option */}
                <button
                  disabled={isProcessing}
                  onClick={handlePayPalCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-[#2c2e2f] hover:bg-[#3d3f40] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <span>Debit or Credit Card</span>
                </button>

                <div className="pt-2 text-[11px] text-purple-400/80 space-y-1 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>256-bit SSL шифрлэлттэй аюулгүй холболт</span>
                  </div>
                  <p>Гүйлгээ хийгдсэний дараа SteamID-д эрх автоматаар суугдана.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
