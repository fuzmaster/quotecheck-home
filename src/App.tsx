import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { WizardShell } from "./components/wizard/WizardShell";
import { ReportPage } from "./components/report/ReportPage";
import { useWizardStore } from "./store/useWizardStore";

export default function App() {
  const report = useWizardStore((state) => state.report);
  return <div className="min-h-screen bg-slate-50 text-slate-950"><Header /><main className="mx-auto w-full max-w-6xl px-4 py-8">{report ? <ReportPage /> : <WizardShell />}</main><Footer /></div>;
}
