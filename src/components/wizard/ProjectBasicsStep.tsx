import { useState } from "react";
import { projectTypes } from "../../data/projectTypes";
import { useWizardStore } from "../../store/useWizardStore";
import { projectSchema } from "../../schemas/zodProject";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { Field } from "../ui/Field";
import { Icon } from "../ui/Icon";

export function ProjectBasicsStep() {
  const project = useWizardStore((s) => s.project);
  const updateProject = useWizardStore((s) => s.updateProject);
  const setStep = useWizardStore((s) => s.setStep);
  const [error, setError] = useState("");

  function submit() {
    const result = projectSchema.safeParse(project);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Check your project details.");
      return;
    }
    setError("");
    setStep(1);
  }

  return (
    <Card>
      <span className="qc-eyebrow">Step 1 of 4</span>
      <h2 className="qc-section-title" style={{ marginTop: 8 }}>
        Project basics
      </h2>
      <p className="qc-section-sub">A little context sharpens the missing-scope checks later.</p>
      <div className="qc-grid cols-2 qc-mt-6">
        <Field label="ZIP code">
          <Input
            value={project.zipCode}
            maxLength={5}
            placeholder="e.g. 97214"
            onChange={(e) =>
              updateProject({ ...project, zipCode: e.target.value.replace(/[^0-9]/g, "") })
            }
          />
        </Field>
        <Field label="Project type">
          <Select
            value={project.projectType}
            onChange={(e) => updateProject({ ...project, projectType: e.target.value })}
          >
            <option value="">Select…</option>
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
        <Field label="Room or area">
          <Input
            value={project.projectArea}
            placeholder="e.g. Main-floor kitchen, ~180 sq ft"
            onChange={(e) => updateProject({ ...project, projectArea: e.target.value })}
          />
        </Field>
        <Field label="Urgency">
          <Select
            value={project.urgency}
            onChange={(e) =>
              updateProject({ ...project, urgency: e.target.value as typeof project.urgency })
            }
          >
            <option value="flexible">Flexible</option>
            <option value="soon">Soon</option>
            <option value="urgent">Urgent</option>
          </Select>
        </Field>
        <Field label="Permit likely?">
          <Select
            value={project.permitLikely}
            onChange={(e) =>
              updateProject({
                ...project,
                permitLikely: e.target.value as typeof project.permitLikely,
              })
            }
          >
            <option value="not_sure">Not sure</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </Field>
      </div>
      {error && <p className="qc-error qc-mt-4">{error}</p>}
      <div className="qc-row qc-end qc-mt-6">
        <Button onClick={submit}>
          Continue to quotes <Icon.arrowR fill="" />
        </Button>
      </div>
    </Card>
  );
}
