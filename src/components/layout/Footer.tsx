const LINKS: Array<[string, string]> = [
  ["Portfolio", "https://jacobbritten.com"],
  ["Projects", "https://jacobbritten.com/projects.html"],
  ["The Lab", "https://jacobbritten.com/lab.html"],
  ["Ko-fi", "https://ko-fi.com/jacobbritten"],
  ["PayPal", "https://www.paypal.com/donate/?hosted_button_id=47A4JJ4WNBY9U"],
];

export function Footer() {
  return (
    <footer className="qc-footer">
      <div className="qc-footer-top">
        QuoteCheck Home does not provide legal, construction, engineering, insurance, or financial advice.
      </div>
      <div className="qc-footer-bot">
        <div className="qc-footer-bot-inner">
          <p className="qc-footer-by">
            Built by{" "}
            <a href="https://jacobbritten.com" target="_blank" rel="noopener noreferrer">
              Jacob Britten
            </a>{" "}
            &mdash; Media Systems Architect
          </p>
          <nav className="qc-footer-nav" aria-label="Jacob Britten">
            {LINKS.map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
