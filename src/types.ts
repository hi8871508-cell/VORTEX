// src/types.ts

export type PageRoute = "home" | "about" | "contact" | "store" | "leaderboards" | "servers" | "config";

export interface ServerInfo {
  id: string;
  matchNumber: number;
  map: string;
  ip: string;
  port: number;
  mode: "5v5 Competitive" | "Retake" | "Deathmatch" | "1v1 Arena" | "Exec";
  currentScore?: {
    ct: number;
    t: number;
  };
  playersOnline: number;
  maxPlayers: number;
  status: "LIVE" | "WARMUP" | "STARTING";
  ping: number;
  tickrate: number;
  featured?: boolean;
}

export interface PlayerRank {
  rank: number;
  name: string;
  avatar: string;
  elo: number;
  winRate: number;
  kd: number;
  badge: string;
  steamId: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface PayPalTransaction {
  orderId: string;
  transactionId: string;
  status: "COMPLETED" | "PENDING" | "FAILED";
  item: string;
  amount: number;
  currency: string;
  payerEmail: string;
  timestamp: string;
  perks: string[];
}

export interface PlayerConfig {
  id: string;
  name: string;
  team: string;
  role: string;
  resolution: string;
  dpi: number;
  sens: number;
  crosshairCode: string;
  downloads: number;
}
