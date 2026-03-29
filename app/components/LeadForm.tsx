"use client";

type LeadFormProps = {
  title: string;
  text: string;
  email: string;
  setEmail: (value: string) => void;
  buttonText: string;
  placeholder: string;
  successText: string;
  submitted: boolean;
  onSubmit: () => void;
  loading?: boolean;
  errorText?: string;
};

export default function LeadForm({
  title,
  text,
  email,
  setEmail,
  buttonText,
  placeholder,
  successText,
  submitted,
  onSubmit,
  loading = false,
  errorText = "",
}: LeadFormProps) {
  const handleSubmit = () => {
    if (loading) return;
    onSubmit();
  };

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_12px_50px_rgba(0,0,0,0.28)] sm:p-8">
      <h3 className="text-2xl font-semibold text-white">{title}</h3>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-300 sm:text-base">
        {text}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={placeholder}
          className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-neutral-900/80 px-4 py-3 text-white outline-none placeholder:text-neutral-500"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : buttonText}
        </button>
      </div>

      {submitted && (
        <p className="mt-4 text-sm text-green-400">{successText}</p>
      )}

      {!submitted && errorText && (
        <p className="mt-4 text-sm text-red-400">{errorText}</p>
      )}
    </div>
  );
}