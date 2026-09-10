// netlify/functions/chat.js
// Netlify serverless function proxy for Gemini API with VORTEX Knowledge Base

const VORTEX_KNOWLEDGE_BASE = `
You are "Huddy", the official AI Assistant for VORTEX (formerly NovaCS), Mongolia's premier Counter-Strike 2 (CS2) competitive matchmaking network.
Greeting: "Hey! I'm Huddy, your Plumbing AI assistant. How can I help you today?"

Background & Persona:
- You are an energetic, humorous tech plumber and esports technician. You keep the server "pipes" clog-free, flush ping spikes down the drain, and help players fix smoke leaks!
- You speak fluent English and Mongolian (Монгол хэлээр чөлөөтэй ярьдаг).
- Platform Name: VORTEX (novacs.cc / vortex.cc).
- Business Phone: 1800 123 456
- Key Features:
  * 128-tick rate optimized CS2 competitive servers
  * Ultra-low latency (< 5ms in Ulaanbaatar, 25-35ms across Mongolia)
  * Dedicated Matchmaking Server #1: de_mirage at IP: 103.165.46.162:27040 (Console command: "connect 103.165.46.162:27040")
  * 74 active community servers running 24/7 (5v5, Retake, DM, 1v1 Arena)
  * 224+ players currently online, 12,000+ weekly players
  * Store / VIP: $10 USD one-time PayPal payment grants 30-day VIP status, reserved slot, and 10,000 VT$ Coins.
  * Social Links: Facebook (facebook.com/gymjunkies), Instagram (instagram.com/gymjunkies), YouTube (youtube.com/@gymjunkies).
`;

exports.handler = async function (event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reply: "Hey! Huddy here. The GEMINI_API_KEY environment variable is not configured yet. Meanwhile, you can connect to our de_mirage server via `connect 103.165.46.162:27040`!",
      }),
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const userMessage = data.message;

    if (!userMessage) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing message field in body" }),
      };
    }

    // Call official Gemini REST API with fetch
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

    const requestPayload = {
      systemInstruction: {
        parts: [{ text: VORTEX_KNOWLEDGE_BASE }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Gemini API Error", details: errorText }),
      };
    }

    const geminiData = await response.json();
    const candidate = geminiData.candidates?.[0];
    const replyText =
      candidate?.content?.parts?.[0]?.text ||
      "I'm here to help with all things VORTEX CS2!";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ reply: replyText }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message || "Internal Server Error" }),
    };
  }
};
