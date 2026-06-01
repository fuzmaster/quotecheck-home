import { Icon } from "../ui/Icon";

export function Header() {
  return (
    <header className="qc-header">
      <div className="qc-header-inner">
        <div className="qc-brand">
          <div className="qc-mark">
            <Icon.home fill="" size={21} sw={2} style={{ color: "#fff" }} />
          </div>
          <div>
            <div className="qc-brand-name">QuoteCheck Home</div>
            <div className="qc-brand-sub">Compare contractor quotes before you sign.</div>
          </div>
        </div>
        <span className="qc-edu-badge">
          <span className="dot" />
          Educational tool
        </span>
      </div>
    </header>
  );
}
