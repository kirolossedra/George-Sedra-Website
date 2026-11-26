import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';

type FieldFrameProps = {
  label: string;
  hint?: string;
  children: (id: string, describedBy: string | undefined) => ReactNode;
};

function FieldFrame({ label, hint, children }: FieldFrameProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        <span>{label}</span>
        {hint && <span className="field__hint" id={hintId}>{hint}</span>}
      </label>
      {children(id, hintId)}
    </div>
  );
}

type Labelled = { label: string; hint?: string };

export function TextField({ label, hint, ...input }: Labelled & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldFrame label={label} hint={hint ?? (input.required ? undefined : 'Optional')}>
      {(id, describedBy) => <input id={id} aria-describedby={describedBy} className="field__control" {...input} />}
    </FieldFrame>
  );
}

export function TextAreaField({ label, hint, ...textarea }: Labelled & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldFrame label={label} hint={hint ?? (textarea.required ? undefined : 'Optional')}>
      {(id, describedBy) => <textarea id={id} aria-describedby={describedBy} className="field__control" {...textarea} />}
    </FieldFrame>
  );
}

export function SelectField({ label, hint, children, ...select }: Labelled & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldFrame label={label} hint={hint ?? (select.required ? undefined : 'Optional')}>
      {(id, describedBy) => <select id={id} aria-describedby={describedBy} className="field__control" {...select}>{children}</select>}
    </FieldFrame>
  );
}
