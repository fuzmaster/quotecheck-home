import { create } from "zustand";
import type { Project } from "../types/project";
import type { Quote } from "../types/quote";
import type { Report } from "../types/report";
import { generateReport } from "../lib/generateReport";
import { loadJSON, saveJSON } from "../lib/storage";
import { quotesSchema } from "../schemas/zodQuotes";

type WizardState = {
  step: number;
  project: Project;
  quotes: Quote[];
  report: Report | null;
  setStep: (step: number) => void;
  updateProject: (project: Project) => void;
  updateQuote: (id: string, patch: Partial<Quote>) => void;
  addQuote: () => void;
  removeQuote: (id: string) => void;
  createReport: () => void;
  reset: () => void;
};

const emptyProject: Project = {
  zipCode: "",
  projectType: "",
  projectArea: "",
  urgency: "flexible",
  permitLikely: "not_sure",
};

const makeQuote = (index: number): Quote => ({
  id: crypto.randomUUID(),
  contractorName: `Contractor ${index}`,
  totalPrice: 0,
  depositAmount: 0,
  timelineDays: 14,
  laborIncluded: "not_sure",
  materialsIncluded: "not_sure",
  permitsIncluded: "not_sure",
  cleanupIncluded: "not_sure",
  warrantyIncluded: "not_sure",
  materialQuality: "not_sure",
  notes: "",
});

const saved = loadJSON("quotecheck:draft", {
  step: 0,
  project: emptyProject,
  quotes: [makeQuote(1), makeQuote(2)],
});

export const useWizardStore = create<WizardState>((set, get) => ({
  step: saved.step,
  project: saved.project,
  quotes: saved.quotes,
  report: null,
  setStep: (step) => {
    set({ step });
    saveJSON("quotecheck:draft", { ...get(), step, report: null });
  },
  updateProject: (project) => {
    set({ project });
    saveJSON("quotecheck:draft", { ...get(), project, report: null });
  },
  updateQuote: (id, patch) => {
    const quotes = get().quotes.map((q) => (q.id === id ? { ...q, ...patch } : q));
    set({ quotes });
    saveJSON("quotecheck:draft", { ...get(), quotes, report: null });
  },
  addQuote: () => {
    const current = get().quotes;
    if (current.length >= 5) return;
    const quotes = [...current, makeQuote(current.length + 1)];
    set({ quotes });
    saveJSON("quotecheck:draft", { ...get(), quotes, report: null });
  },
  removeQuote: (id) => {
    const current = get().quotes;
    if (current.length <= 2) return;
    const quotes = current.filter((q) => q.id !== id);
    set({ quotes });
    saveJSON("quotecheck:draft", { ...get(), quotes, report: null });
  },
  createReport: () => {
    const parsed = quotesSchema.safeParse(get().quotes);
    if (!parsed.success) return;
    set({ report: generateReport(parsed.data) });
  },
  reset: () => {
    const fresh = {
      step: 0,
      project: emptyProject,
      quotes: [makeQuote(1), makeQuote(2)],
      report: null,
    };
    set(fresh);
    saveJSON("quotecheck:draft", fresh);
  },
}));
