import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { WizardShell } from "./components/wizard/WizardShell";
import { ReportPage } from "./components/report/ReportPage";
import { useWizardStore } from "./store/useWizardStore";

export default function App() {
  const report = useWizardStore((state) => state.report);
  return (
    <div className="qc-app">
      <Header />
      <main className="qc-main">{report ? <ReportPage /> : <WizardShell />}</main>
      <Footer />
    </div>
  );
}
