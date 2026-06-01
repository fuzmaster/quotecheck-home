import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";

export function PrintReportButton() {
  return (
    <Button onClick={() => window.print()}>
      <Icon.print fill="" /> Print / Save PDF
    </Button>
  );
}
