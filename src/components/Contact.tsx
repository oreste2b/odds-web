"use client";

import { useState, type FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function Contact(): React.JSX.Element {
  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const updateField = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!state.email || !state.message) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("success");
    setState(INITIAL_STATE);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-surfaceTint py-28 md:py-40"
      aria-label="Contact"
    >
      <div className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-mutedInk md:left-12 md:top-12">
        Contact — 006
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-16 px-6 md:grid-cols-2 md:px-12">
        <div className="flex flex-col justify-between">
          <h2 className="font-display text-5xl leading-[0.95] text-ink md:text-7xl lg:text-8xl">
            Build what&apos;s
            <br />
            next.
          </h2>

          <div className="mt-12 space-y-6">
            <div>
              <div className="font-body text-xs uppercase tracking-[0.3em] text-mutedInk">
                New business
              </div>
              <a
                href="mailto:hello@odds.media"
                className="font-display mt-2 inline-block text-xl text-ink underline decoration-2 underline-offset-4 transition-colors duration-300 hover:text-[var(--color-primary-accent)]"
              >
                hello@odds.media
              </a>
            </div>

            <div>
              <div className="font-body text-xs uppercase tracking-[0.3em] text-mutedInk">
                Studio
              </div>
              <p className="font-body mt-2 text-base text-ink">Remote — operating across Americas &amp; Europe</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
          <FieldInput
            id="name"
            label="Your name"
            value={state.name}
            onChange={updateField("name")}
            autoComplete="name"
          />
          <FieldInput
            id="email"
            label="Email"
            type="email"
            required
            value={state.email}
            onChange={updateField("email")}
            autoComplete="email"
          />
          <FieldInput
            id="company"
            label="Company"
            value={state.company}
            onChange={updateField("company")}
            autoComplete="organization"
          />
          <FieldTextarea
            id="message"
            label="What are we building?"
            required
            value={state.message}
            onChange={updateField("message")}
          />

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group relative mt-4 inline-flex h-14 items-center justify-center self-start overflow-hidden rounded-full border border-ink px-10 text-sm uppercase tracking-[0.3em] text-ink transition-colors duration-500 hover:text-surfaceTint disabled:opacity-60"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-0 translate-y-full bg-[var(--color-primary-accent)] transition-transform duration-500 ease-out group-hover:translate-y-0"
            />
            <span className="relative z-10">
              {status === "submitting" ? "Sending…" : status === "success" ? "Sent ✓" : "Send"}
            </span>
          </button>

          {status === "error" ? (
            <p className="font-body text-sm" style={{ color: "var(--color-primary-accent)" }}>
              Please add your email and a quick note before sending.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

type FieldInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
};

function FieldInput({ id, label, value, onChange, type = "text", required, autoComplete }: FieldInputProps): React.JSX.Element {
  return (
    <label htmlFor={id} className="group block">
      <span className="font-body block text-xs uppercase tracking-[0.3em] text-mutedInk">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        className="font-body mt-3 w-full border-0 border-b border-ink/20 bg-transparent pb-3 text-lg text-ink outline-none transition-colors duration-300 focus:border-[var(--color-primary-accent)]"
      />
    </label>
  );
}

type FieldTextareaProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
};

function FieldTextarea({ id, label, value, onChange, required }: FieldTextareaProps): React.JSX.Element {
  return (
    <label htmlFor={id} className="group block">
      <span className="font-body block text-xs uppercase tracking-[0.3em] text-mutedInk">
        {label}
        {required ? " *" : ""}
      </span>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        rows={4}
        className="font-body mt-3 w-full resize-none border-0 border-b border-ink/20 bg-transparent pb-3 text-lg text-ink outline-none transition-colors duration-300 focus:border-[var(--color-primary-accent)]"
      />
    </label>
  );
}
