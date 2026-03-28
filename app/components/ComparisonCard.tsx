type ComparisonCardProps = {
  title: string;
  cheaperLabel: string;
  savingsMonthLabel: string;
  savingsYearLabel: string;
  sameCostText: string;
  cheaperScenarioLabel: string;
  monthlySavings: string;
  yearlySavings: string;
};

export default function ComparisonCard({
  title,
  cheaperLabel,
  savingsMonthLabel,
  savingsYearLabel,
  sameCostText,
  cheaperScenarioLabel,
  monthlySavings,
  yearlySavings,
}: ComparisonCardProps) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_12px_50px_rgba(0,0,0,0.28)] sm:p-8">
      <h3 className="text-2xl font-semibold">{title}</h3>

      {cheaperScenarioLabel ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4">
            <p className="text-sm text-neutral-400">{cheaperLabel}</p>
            <p className="mt-2 text-xl font-semibold">{cheaperScenarioLabel}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4">
            <p className="text-sm text-neutral-400">{savingsMonthLabel}</p>
            <p className="mt-2 text-xl font-semibold">{monthlySavings}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4">
            <p className="text-sm text-neutral-400">{savingsYearLabel}</p>
            <p className="mt-2 text-xl font-semibold">{yearlySavings}</p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-neutral-300">{sameCostText}</p>
      )}
    </div>
  );
}