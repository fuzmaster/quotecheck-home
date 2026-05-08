import { baseQuestionTemplates } from "../data/questionTemplates"; import type { RiskFlag } from "../types/report";
export function generateQuestions(flags:RiskFlag[]):string[]{const dynamic=flags.slice(0,8).map(f=>`Regarding "${f.title}", can you clarify: ${f.detail}`);return Array.from(new Set([...baseQuestionTemplates,...dynamic])).slice(0,12)}
