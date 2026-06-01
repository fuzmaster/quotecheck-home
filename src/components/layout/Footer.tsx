export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">
        QuoteCheck Home does not provide legal, construction, engineering, insurance, or financial advice.
      </div>
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500">
            Built by{" "}
            <a
              href="https://jacobbritten.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-900 hover:underline"
            >
              Jacob Britten
            </a>{" "}
            &mdash; Media Systems Architect
          </p>
          <nav className="flex flex-wrap gap-5 text-xs font-mono uppercase tracking-wider text-slate-600" aria-label="Jacob Britten">
            <a href="https://jacobbritten.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">Portfolio</a>
            <a href="https://jacobbritten.com/projects.html" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">Projects</a>
            <a href="https://jacobbritten.com/lab.html" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">The Lab</a>
            <a href="https://ko-fi.com/jacobbritten" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">Ko-fi</a>
            <a href="https://www.paypal.com/donate/?hosted_button_id=47A4JJ4WNBY9U" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">PayPal</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
