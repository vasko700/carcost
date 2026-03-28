import { Result, ScenarioInput, toSafeNumber } from "../lib/calculateScenario";

type ResultCardProps = {
  title: string;
  result: Result | null;
  scenario: ScenarioInput;
  distanceUnit: "mi" | "km";
  formatCurrency: (value: number) => string;
  resultTitle: string;
  resultSubtitle: string;
  perMonthSuffix: string;
  yearlyCostLabel: string;
  costPerDistanceLabel: string;
  fuelCostLabel: string;
  insuranceLabel: string;
  maintenanceLabel: string;
  paymentLabel: string;
  milesShort: string;
  kmShort: string;
};

export default function ResultCard({
  title,
  result,
  scenario,
  distanceUnit,
  formatCurrency,
  resultTitle,
  resultSubtitle,
  perMonthSuffix,
  yearlyCostLabel,
  costPerDistanceLabel,
  fuelCostLabel,
  insuranceLabel,
  maintenanceLabel,
  paymentLabel,
  milesShort,
  kmShort,
}: ResultCardProps) {
  if (!result) return null;

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_12px_50px_rgba(0,0,0,0.28)] sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            {resultTitle} — {title}
          </p>
          <p className="mt-3 text-sm text-neutral-400">{resultSubtitle}</p>
          <h3 className="mt-2 text-3xl font-semibold sm:text-5xl">
            {formatCurrency(result.totalMonthlyCost)}
          </h3>
          <p className="mt-2 text-sm text-neutral-400">{perMonthSuffix}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-neutral-900/70 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {yearlyCostLabel}
          </p>
          <p className="mt-2 text-2xl font-semibold">
            {formatCurrency(result.totalYearlyCost)}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4">
          <p className="text-sm text-neutral-400">{fuelCostLabel}</p>
          <p className="mt-2 text-xl font-semibold">
            {formatCurrency(result.fuelCostPerMonth)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4">
          <p className="text-sm text-neutral-400">{insuranceLabel}</p>
          <p className="mt-2 text-xl font-semibold">
            {formatCurrency(toSafeNumber(scenario.insurancePerMonth))}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4">
          <p className="text-sm text-neutral-400">{maintenanceLabel}</p>
          <p className="mt-2 text-xl font-semibold">
            {formatCurrency(toSafeNumber(scenario.maintenancePerMonth))}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4">
          <p className="text-sm text-neutral-400">{paymentLabel}</p>
          <p className="mt-2 text-xl font-semibold">
            {formatCurrency(toSafeNumber(scenario.paymentPerMonth))}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-neutral-900/70 p-4">
        <p className="text-sm text-neutral-400">
          {distanceUnit === "mi"
            ? `${costPerDistanceLabel} (${milesShort})`
            : `${costPerDistanceLabel} (${kmShort})`}
        </p>
        <p className="mt-2 text-xl font-semibold">
          {formatCurrency(result.costPerDistanceUnit)}
        </p>
      </div>
    </div>
  );
}