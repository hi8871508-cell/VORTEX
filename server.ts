import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const PORT = 3000;

// Knowledge base for VORTEX CS2 competitive platform & Huddy
const VORTEX_KNOWLEDGE_BASE = `
You are "Huddy", the official AI Assistant for VORTEX (formerly NovaCS), Mongolia's premier Counter-Strike 2 (CS2) competitive matchmaking network.
Greeting: "Hey! I'm Huddy, your Plumbing AI assistant. How can I help you today?"

Background & Persona:
- You are a witty, ultra-knowledgeable tech plumber and CS2 esports specialist. You keep the server "pipes" clog-free, flush high latency out of the network, and patch up smoke-lineup leaks!
- You speak fluent English and Mongolian (Монгол хэлээр чөлөөтэй ярьдаг). You seamlessly answer in whichever language the user writes in, or bilingual when helpful.
- Platform Name: VORTEX (novacs.cc / vortex.cc).
- Business Phone: 1800 123 456
- Key Features:
  * 128-tick rate optimized CS2 competitive 5v5 servers
  * Direct fiber optic routing in Ulaanbaatar with ultra-low latency (< 5ms in UB, 25-35ms across Mongolia)
  * Dedicated Matchmaking Server #1: de_mirage at IP: 103.165.46.162:27040 (Console command: "connect 103.165.46.162:27040")
  * Over 74 active community servers running 24/7 (5v5 Competitive, Retake, DM Free-For-All, Duels 1v1, Danger Zone)
  * Over 224+ players currently online, 12,000+ weekly active players
  * Features: Live match tracker, Steam integration, Leaderboards, Clan system, Skinchanger, Anti-cheat scanner, Config share, Free VT$ quests
  * Store / VIP: $10 USD one-time PayPal payment grants 30-day VIP status, reserved slot in full servers, custom chat badge [VIP], and 10,000 VT$ Coins for skins/cases.
  * FormSubmit contact form and customer support available 24/7.
  * Social Links: Facebook (facebook.com/gymjunkies), Instagram (instagram.com/gymjunkies), YouTube (youtube.com/@gymjunkies).

Instructions:
- Keep answers helpful, fast, concise, and enthusiastic.
- When users ask about server connection, provide the console command: "connect 103.165.46.162:27040".
- If users ask why you are a "plumbing AI assistant", joke that you were hired to fix the smoke leaks and flush ping spikes down the drain, but you're also an elite Global Elite tactician!
`;

let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API: Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      platform: "VORTEX",
      version: "2.4.0",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // API: Chatbot endpoint (Gemini API proxy)
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history = [] } = req.body;
      if (!message || typeof message !== "string") {
        res.status(400).json({ error: "Missing 'message' in request body" });
        return;
      }

      const ai = getAi();
      if (!ai) {
        // Fallback intelligent offline assistant if GEMINI_API_KEY is not configured yet
        const lower = message.toLowerCase();
        let fallbackResponse = "";
        if (lower.includes("connect") || lower.includes("server") || lower.includes("сервер") || lower.includes("ip")) {
          fallbackResponse = "To connect to our primary VORTEX Match #1 server (de_mirage), open your CS2 console (`~`) and enter:\n\n`connect 103.165.46.162:27040`\n\nOur latency in Ulaanbaatar is <5ms with 128-tick rate precision!";
        } else if (lower.includes("vip") || lower.includes("үнэ") || lower.includes("төлбөр") || lower.includes("paypal")) {
          fallbackResponse = "VORTEX VIP Pass is available for $10 USD (one-time payment via PayPal). It unlocks reserved server slots, [VIP] chat badge, custom MVP music, and 10,000 VT$ Coins!";
        } else if (lower.includes("plumb") || lower.includes("huddy") || lower.includes("хэн бэ")) {
          fallbackResponse = "Hey! I'm Huddy! While other bots are reading patch notes, I'm down in the server trenches fixing line leaks, unclogging network latency, and making sure your AWP shots register clean!";
        } else {
          fallbackResponse = `Thanks for messaging VORTEX! I received: "${message}". You can browse all 74 active servers, copy direct-connect IPs, or grab the $10 VIP pass from our Store page. (Note: To enable live Gemini AI generation, set GEMINI_API_KEY in the environment).`;
        }

        res.json({
          reply: fallbackResponse,
          model: "huddy-smart-rules",
        });
        return;
      }

      // Format conversation for Gemini
      const contents: Array<{ role?: "user" | "model"; parts: Array<{ text: string }> }> = [];

      // Add recent history if provided (up to last 6 turns)
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item.sender === "user" || item.sender === "assistant") {
            contents.push({
              role: item.sender === "user" ? "user" : "model",
              parts: [{ text: String(item.text) }],
            });
          }
        }
      }

      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction: VORTEX_KNOWLEDGE_BASE,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I processed your request, but received an empty response. How else can I assist with VORTEX?";
      res.json({
        reply: replyText,
        model: "gemini-3.8-flash",
      });
    } catch (error: any) {
      console.error("Gemini Chat API Error:", error);
      res.status(500).json({
        error: error.message || "Failed to process chat message",
        reply: "Sorry, I hit a pipe blockage! Please try asking again in a moment.",
      });
    }
  });

  // API: PayPal Mock / Sandbox Server Endpoints
  app.post("/api/paypal/create-order", (req, res) => {
    const { amount = 10, currency = "USD", item = "VORTEX VIP Pass" } = req.body;
    const orderId = "VORTEX-ORD-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(Math.random() * 1000);
    res.json({
      orderId,
      status: "CREATED",
      amount,
      currency,
      item,
      createdTime: new Date().toISOString(),
    });
  });

  app.post("/api/paypal/capture-order", (req, res) => {
    const { orderId, payerEmail = "gamer@vortex.cc" } = req.body;
    const transactionId = "TX-" + Math.random().toString(36).substring(2, 10).toUpperCase() + "-PAYPAL";
    res.json({
      orderId,
      transactionId,
      status: "COMPLETED",
      payer: {
        email: payerEmail,
        name: "VORTEX Elite Member",
      },
      amount: "10.00",
      currency: "USD",
      timestamp: new Date().toISOString(),
      activationStatus: "INSTANT_ACTIVE",
      perks: [
        "VORTEX VIP Server Slot (Immunity to Full Servers)",
        "10,000 VT$ Coins credited to account",
        "Gold [VIP] Chat Tag & Animated Nickname",
        "Exclusive CS2 MVP Anthem Packs",
      ],
    });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[VORTEX] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
