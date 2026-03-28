import { ScenarioInput } from "../lib/calculateScenario";

type CalculatorFormProps = {
  title: string;
  text: string;
  unitsTitle: string;
  distanceUnitLabel: string;
  currencyUnitLabel: string;
  distanceUnit: "mi" | "km";
  setDistanceUnit: (value: "mi" | "km") => void;
  currency: "USD" | "EUR" | "RUB";
  setCurrency: (value: "USD" | "EUR" | "RUB") => void;
  scenarioATitle: string;
  scenarioBTitle: string;
  scenarioA: ScenarioInput;
  scenarioB: ScenarioInput;
  updateScenarioA: (field: keyof ScenarioInput, value: string) => void;
  updateScenarioB: (field: keyof ScenarioInput, value: string) => void;
  monthlyDistanceLabel: string;
  fuelEconomyLabel: string;
  fuelPriceLabel: string;
  insuranceLabel: string;
  maintenanceLabel: string;
  paymentLabel: string;
  compareShow: string;
  compareHide: string;
  showCompare: boolean;
  setShowCompare: (value: boolean) => void;
  calculateAButton: string;
  calculateBButton: string;
  compareButton: string;
  clearButton: string;
  sampleButton: string;
  onCalculateA: () => void;
  onCalculateB: () => void;
  onCompare: () => void;
  onClear: () => void;
  onUseSampleData: () => void;
};

export default function CalculatorForm({
  title,
  text,
  unitsTitle,
  distanceUnitLabel,
  currencyUnitLabel,
  distanceUnit,
  setDistanceUnit,
  currency,
  setCurrency,
  scenarioATitle,
  scenarioBTitle,
  scenarioA,
  scenarioB,
  updateScenarioA,
  updateScenarioB,
  monthlyDistanceLabel,
  fuelEconomyLabel,
  fuelPriceLabel,
  insuranceLabel,
  maintenanceLabel,
  paymentLabel,
  compareShow,
  compareHide,
  showCompare,
  setShowCompare,
  calculateAButton,
  calculateBButton,
  compareButton,
  clearButton,
  sampleButton,
  onCalculateA,
  onCalculateB,
  onCompare,
  onClear,
  onUseSampleData,
}: CalculatorFormProps) {
  function renderField(
    label: string,
    value: string,
    onChange: (value: string) => void
  ) {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-300">
          {label}
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-neutral-900/80 px-4 py-3 text-white outline-none transition focus:border-white/25"
        />
      </div>
    );
  }

  function renderScenarioCard(
    scenarioTitle: string,
    scenario: ScenarioInput,
    update: (field: keyof ScenarioInput, value: string) => void
  ) {
    return (
      <div className="rounded-[24px] border border-white/10 bg-neutral-900/70 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
        <h3 className="text-lg font-semibold">{scenarioTitle}</h3>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {renderField(monthlyDistanceLabel, scenario.monthlyDistance, (v) =>
            update("monthlyDistance", v)
          )}
          {renderField(fuelEconomyLabel, scenario.fuelEconomy, (v) =>
            update("fuelEconomy", v)
          )}
          {renderField(fuelPriceLabel, scenario.fuelPrice, (v) =>
            update("fuelPrice", v)
          )}
          {renderField(insuranceLabel, scenario.insurancePerMonth, (v) =>
            update("insurancePerMonth", v)
          )}
          {renderField(maintenanceLabel, scenario.maintenancePerMonth, (v) =>
            update("maintenancePerMonth", v)
          )}
          {renderField(paymentLabel, scenario.paymentPerMonth, (v) =>
            update("paymentPerMonth", v)
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_16px_60px_rgba(0,0,0,0.25)] sm:p-8">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-300 sm:text-base">
        {text}
      </p>

      <div className="mt-5">
        <button
          onClick={onUseSampleData}
          className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
        >
          {sampleButton}
        </button>
      </div>

      <div className="mt-8 rounded-[24px] border border-white/10 bg-neutral-900/60 p-5">
        <p className="mb-4 text-sm font-medium text-neutral-300">{unitsTitle}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-300">
              {distanceUnitLabel}
            </label>
            <select
              value={distanceUnit}
              onChange={(e) => setDistanceUnit(e.target.value as "mi" | "km")}
              className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
            >
              <option value="mi">Miles / MPG</option>
              <option value="km">Kilometers / L/100 km</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-300">
              {currencyUnitLabel}
            </label>
            <select
              value={currency}
              onChange={(e) =>
                setCurrency(e.target.value as "USD" | "EUR" | "RUB")
              }
              className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="RUB">RUB</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6">{renderScenarioCard(scenarioATitle, scenarioA, updateScenarioA)}</div>

      <div className="mt-4">
        <button
          onClick={() => setShowCompare(!showCompare)}
          className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
        >
          {showCompare ? compareHide : compareShow}
        </button>
      </div>

      {showCompare && (
        <div className="mt-4">
          {renderScenarioCard(scenarioBTitle, scenarioB, updateScenarioB)}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          onClick={onCalculateA}
          className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
        >
          {calculateAButton}
        </button>

        {showCompare && (
          <>
            <button
              onClick={onCalculateB}
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              {calculateBButton}
            </button>

            <button
              onClick={onCompare}
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              {compareButton}
            </button>
          </>
        )}

        <button
          onClick={onClear}
          className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
        >
          {clearButton}
        </button>
      </div>
    </div>
  );
}