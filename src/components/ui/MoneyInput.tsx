export function MoneyInput({
  value,
  onChange,
  placeholder = "0",
}: {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}) {
  return (
    <div className="qc-affix">
      <span className="pre">$</span>
      <input
        type="text"
        inputMode="numeric"
        value={value ? value.toLocaleString("en-US") : ""}
        placeholder={placeholder}
        onChange={(e) => onChange(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)}
      />
    </div>
  );
}

export function DaysInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="qc-affix">
      <input
        type="text"
        inputMode="numeric"
        value={value || ""}
        placeholder="0"
        onChange={(e) => onChange(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)}
      />
      <span className="suf">days</span>
    </div>
  );
}
