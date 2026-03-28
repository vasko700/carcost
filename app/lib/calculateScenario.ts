export type DistanceUnit = "mi" | "km";

export type ScenarioInput = {
  monthlyDistance: string;
  fuelEconomy: string;
  fuelPrice: string;
  insurancePerMonth: string;
  maintenancePerMonth: string;
  paymentPerMonth: string;
};

export type Result = {
  fuelCostPerMonth: number;
  totalMonthlyCost: number;
  totalYearlyCost: number;
  costPerDistanceUnit: number;
};

export const emptyScenario: ScenarioInput = {
  monthlyDistance: "",
  fuelEconomy: "",
  fuelPrice: "",
  insurancePerMonth: "",
  maintenancePerMonth: "",
  paymentPerMonth: "",
};

export function toSafeNumber(value: string): number {
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed < 0) return 0;
  return parsed;
}

export function calculateScenario(
  input: ScenarioInput,
  distanceUnit: DistanceUnit
): Result | null {
  const distance = toSafeNumber(input.monthlyDistance);
  const economy = toSafeNumber(input.fuelEconomy);
  const price = toSafeNumber(input.fuelPrice);
  const insurance = toSafeNumber(input.insurancePerMonth);
  const maintenance = toSafeNumber(input.maintenancePerMonth);
  const payment = toSafeNumber(input.paymentPerMonth);

  const hasAnyValue =
    distance > 0 ||
    economy > 0 ||
    price > 0 ||
    insurance > 0 ||
    maintenance > 0 ||
    payment > 0;

  if (!hasAnyValue) return null;

  let fuelCostPerMonth = 0;

  if (distance > 0 && economy > 0 && price > 0) {
    if (distanceUnit === "mi") {
      const gallonsPerMonth = distance / economy;
      fuelCostPerMonth = gallonsPerMonth * price;
    } else {
      const litersPerMonth = (distance / 100) * economy;
      fuelCostPerMonth = litersPerMonth * price;
    }
  }

  const totalMonthlyCost =
    fuelCostPerMonth + insurance + maintenance + payment;
  const totalYearlyCost = totalMonthlyCost * 12;
  const costPerDistanceUnit = distance > 0 ? totalMonthlyCost / distance : 0;

  return {
    fuelCostPerMonth,
    totalMonthlyCost,
    totalYearlyCost,
    costPerDistanceUnit,
  };
}