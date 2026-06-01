import { Icon } from "../ui/Icon";

export function DisclaimerBanner() {
  return (
    <div className="qc-disclaimer">
      <span className="ico">
        <Icon.shield fill="" size={13} sw={2.2} />
      </span>
      <span>
        <strong>Important:</strong> This is an educational decision-support tool. It does not verify
        contractor accuracy, detect fraud, certify construction scope, or replace legal, engineering,
        insurance, financial, or professional advice.
      </span>
    </div>
  );
}
