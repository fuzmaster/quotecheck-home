import type { Quote } from "./quote";
export type RiskLevel = "Missing Information" | "Needs Clarification" | "Higher Risk" | "Ask Before Signing";
export type RiskFlag = { title:string; level:RiskLevel; detail:string; quoteId?:string; };
export type QuoteSpread = { count:number; low:number; high:number; median:number|null; spreadAmount:number; spreadPercentFromLow:number; mathNote:string; };
export type Report = { reportId:string; createdAt:string; spread:QuoteSpread; flags:RiskFlag[]; missingScope:RiskFlag[]; questions:string[]; rankedQuotes:Quote[]; };
