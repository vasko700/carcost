"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import LeadForm from "./components/LeadForm";

type Language = "en" | "ru";
type DistanceUnit = "mi" | "km";
type CurrencyCode = "USD" | "EUR" | "RUB";

type ScenarioInput = {
  monthlyDistance: string;
  fuelEconomy: string;
  fuelPrice: string;
  insurancePerMonth: string;
  maintenancePerMonth: string;
  paymentPerMonth: string;
};

type Result = {
  fuelCostPerMonth: number;
  totalMonthlyCost: number;
  totalYearlyCost: number;
  costPerDistanceUnit: number;
};

const emptyScenario: ScenarioInput = {
  monthlyDistance: "",
  fuelEconomy: "",
  fuelPrice: "",
  insurancePerMonth: "",
  maintenancePerMonth: "",
  paymentPerMonth: "",
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("mi");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  const [scenarioA, setScenarioA] = useState<ScenarioInput>(emptyScenario);
  const [scenarioB, setScenarioB] = useState<ScenarioInput>(emptyScenario);

  const [resultA, setResultA] = useState<Result | null>(null);
  const [resultB, setResultB] = useState<Result | null>(null);

  const [showCompare, setShowCompare] = useState(false);

  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const t = {
    en: {
      brand: "CarCost",
      badge: "Car ownership cost calculator",
      title: "See what your car really costs every month",
      description:
        "Estimate fuel, insurance, maintenance, and financing in seconds.",
      primary: "Open calculator",
      secondary: "See how it works",
      stat1: "Fast input",
      stat1Value: "Built for 30 sec checks",
      stat2: "Real numbers",
      stat2Value: "Monthly and yearly cost",
      stat3: "No signup",
      stat3Value: "Use it instantly",
      lang: "Language",
      calculatorTitle: "Estimate your monthly ownership cost",
      calculatorText:
        "Start with Scenario A. Add Scenario B only when you want a comparison.",
      unitsTitle: "Units",
      distanceUnit: "Distance",
      currencyUnit: "Currency",
      monthlyDistance: "Monthly distance",
      fuelEconomy: "Fuel economy",
      fuelPrice: "Fuel price",
      insurancePerMonth: "Insurance / month",
      maintenancePerMonth: "Maintenance / month",
      paymentPerMonth: "Payment / month",
      sampleButton: "Use sample data",
      calculateButton: "Calculate A",
      clearButton: "Clear all",
      compareShow: "Add comparison scenario",
      compareHide: "Hide comparison scenario",
      calculateBButton: "Calculate B",
      compareButton: "Compare A vs B",
      resultTitle: "Estimated result",
      resultSubtitle: "This scenario costs you",
      perMonthSuffix: "per month",
      yearlyCost: "Yearly cost",
      costPerDistance: "Cost per distance",
      fuelCost: "Fuel / month",
      noResultText:
        "Enter a few values above to see your estimated monthly ownership cost.",
      scenarioA: "Scenario A",
      scenarioB: "Scenario B",
      comparisonTitle: "Comparison",
      cheaperLabel: "Cheaper option",
      savingsMonth: "Savings / month",
      savingsYear: "Savings / year",
      sameCost: "Both scenarios cost the same.",
      milesShort: "mi",
      kmShort: "km",
      mpgLabel: "mpg",
      l100Label: "L/100 km",
      gallonShort: "/ gallon",
      literShort: "/ liter",
      drivingGroup: "Driving",
      costGroup: "Monthly costs",
      emailTitle: "Save your result + get smarter car cost tips",
      emailText:
        "Leave your email and we’ll keep your result path for future updates.",
      emailPlaceholder: "Enter your email",
      emailButton: "Save",
      emailSaved: "Saved. You’re on the list.",
      emailError: "Something went wrong. Please try again.",
      nudge:
        "You could save money by optimizing insurance, financing, or fuel efficiency.",
    },
    ru: {
      brand: "CarCost",
      badge: "Калькулятор стоимости владения авто",
      title: "Посмотри, сколько на самом деле стоит твоя машина в месяц",
      description:
        "Быстро оцени топливо, страховку, обслуживание и платежи.",
      primary: "Открыть калькулятор",
      secondary: "Как это работает",
      stat1: "Быстрый ввод",
      stat1Value: "Проверка за 30 секунд",
      stat2: "Реальные цифры",
      stat2Value: "Стоимость в месяц и в год",
      stat3: "Без регистрации",
      stat3Value: "Можно пользоваться сразу",
      lang: "Язык",
      calculatorTitle: "Оцени свою стоимость владения в месяц",
      calculatorText:
        "Начни со Сценария A. Сценарий B добавляй только для сравнения.",
      unitsTitle: "Единицы измерения",
      distanceUnit: "Расстояние",
      currencyUnit: "Валюта",
      monthlyDistance: "Пробег в месяц",
      fuelEconomy: "Расход топлива",
      fuelPrice: "Цена топлива",
      insurancePerMonth: "Страховка / мес",
      maintenancePerMonth: "Обслуживание / мес",
      paymentPerMonth: "Платеж / мес",
      sampleButton: "Подставить пример",
      calculateButton: "Рассчитать A",
      clearButton: "Очистить всё",
      compareShow: "Добавить сценарий сравнения",
      compareHide: "Скрыть сценарий сравнения",
      calculateBButton: "Рассчитать B",
      compareButton: "Сравнить A и B",
      resultTitle: "Оценка результата",
      resultSubtitle: "Этот сценарий обходится в",
      perMonthSuffix: "в месяц",
      yearlyCost: "Стоимость в год",
      costPerDistance: "Стоимость за единицу расстояния",
      fuelCost: "Топливо / мес",
      noResultText:
        "Введи несколько значений выше, чтобы увидеть примерную стоимость владения в месяц.",
      scenarioA: "Сценарий A",
      scenarioB: "Сценарий B",
      comparisonTitle: "Сравнение",
      cheaperLabel: "Более дешевый вариант",
      savingsMonth: "Экономия / мес",
      savingsYear: "Экономия / год",
      sameCost: "Оба сценария стоят одинаково.",
      milesShort: "ми",
      kmShort: "км",
      mpgLabel: "mpg",
      l100Label: "л/100 км",
      gallonShort: "/ галлон",
      literShort: "/ литр",
      drivingGroup: "Движение",
      costGroup: "Ежемесячные расходы",
      emailTitle: "Сохрани расчёт + получай полезные советы",
      emailText:
        "Оставь email, и мы сохраним твой результат для будущих обновлений.",
      emailPlaceholder: "Введите email",
      emailButton: "Сохранить",
      emailSaved: "Сохранено. Ты в списке.",
      emailError: "Что-то пошло не так. Попробуй ещё раз.",
      nudge:
        "Ты можешь снизить расходы за счёт страховки, финансирования или расхода топлива.",
    },
  }[language];

  function formatCurrency(value: number) {
    return new Intl.NumberFormat(language === "en" ? "en-US" : "ru-RU", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  }

  function toSafeNumber(value: string) {
    const parsed = Number(value);
    if (Number.isNaN(parsed) || parsed < 0) return 0;
    return parsed;
  }

  function updateScenario(
    which: "A" | "B",
    field: keyof ScenarioInput,
    value: string
  ) {
    if (which === "A") {
      setScenarioA((prev) => ({ ...prev, [field]: value }));
    } else {
      setScenarioB((prev) => ({ ...prev, [field]: value }));
    }
  }

  function monthlyDistanceLabel() {
    return distanceUnit === "mi"
      ? `${t.monthlyDistance} (${t.milesShort})`
      : `${t.monthlyDistance} (${t.kmShort})`;
  }

  function fuelEconomyLabel() {
    return distanceUnit === "mi"
      ? `${t.fuelEconomy} (${t.mpgLabel})`
      : `${t.fuelEconomy} (${t.l100Label})`;
  }

  function fuelPriceLabel() {
    return distanceUnit === "mi"
      ? `${t.fuelPrice} (${currency} ${t.gallonShort})`
      : `${t.fuelPrice} (${currency} ${t.literShort})`;
  }

  function calc(input: ScenarioInput): Result | null {
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

  function handleCalculateA() {
    track("calculate_A");
    setResultA(calc(scenarioA));
  }

  function handleCalculateB() {
    track("calculate_B");
    setResultB(calc(scenarioB));
  }

  function handleCompare() {
    track("compare");
    setResultA(calc(scenarioA));
    setResultB(calc(scenarioB));
  }

  function handleClear() {
    setScenarioA(emptyScenario);
    setScenarioB(emptyScenario);
    setResultA(null);
    setResultB(null);
    setShowCompare(false);
    setEmail("");
    setEmailSaved(false);
    setEmailLoading(false);
    setEmailError("");
  }

  function handleUseSampleData() {
    track("sample_data");

    if (distanceUnit === "mi") {
      setScenarioA({
        monthlyDistance: "900",
        fuelEconomy: "28",
        fuelPrice: "4.2",
        insurancePerMonth: "140",
        maintenancePerMonth: "70",
        paymentPerMonth: "320",
      });
      setScenarioB({
        monthlyDistance: "900",
        fuelEconomy: "22",
        fuelPrice: "4.2",
        insurancePerMonth: "170",
        maintenancePerMonth: "120",
        paymentPerMonth: "420",
      });
    } else {
      setScenarioA({
        monthlyDistance: "1500",
        fuelEconomy: "8.4",
        fuelPrice: "1.85",
        insurancePerMonth: "140",
        maintenancePerMonth: "70",
        paymentPerMonth: "320",
      });
      setScenarioB({
        monthlyDistance: "1500",
        fuelEconomy: "11.5",
        fuelPrice: "1.85",
        insurancePerMonth: "170",
        maintenancePerMonth: "120",
        paymentPerMonth: "420",
      });
    }

    setResultA(null);
    setResultB(null);
  }

  async function handleEmailSubmit() {
    const clean = email.trim();

    if (!clean) {
      setEmailError("");
      return;
    }

    setEmailLoading(true);
    setEmailError("");

    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: clean }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit email");
      }

      track("email_submitted");
      setEmailSaved(true);
      setEmail("");
    } catch (error) {
      console.error("Email submit error:", error);
      setEmailError(t.emailError);
    } finally {
      setEmailLoading(false);
    }
  }

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
          className="w-full rounded-2xl border border-white/10 bg-neutral-900/80 px-4 py-3 text-white outline-none transition focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
        />
      </div>
    );
  }

  function renderScenarioCard(
    title: string,
    which: "A" | "B",
    data: ScenarioInput
  ) {
    return (
      <div className="rounded-[26px] border border-white/10 bg-neutral-900/70 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
            {which}
          </span>
        </div>

        <div className="mt-5">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-neutral-500">
            {t.drivingGroup}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {renderField(monthlyDistanceLabel(), data.monthlyDistance, (v) =>
              updateScenario(which, "monthlyDistance", v)
            )}
            {renderField(fuelEconomyLabel(), data.fuelEconomy, (v) =>
              updateScenario(which, "fuelEconomy", v)
            )}
            {renderField(fuelPriceLabel(), data.fuelPrice, (v) =>
              updateScenario(which, "fuelPrice", v)
            )}
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-neutral-500">
            {t.costGroup}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {renderField(
              `${t.insurancePerMonth} (${currency})`,
              data.insurancePerMonth,
              (v) => updateScenario(which, "insurancePerMonth", v)
            )}
            {renderField(
              `${t.maintenancePerMonth} (${currency})`,
              data.maintenancePerMonth,
              (v) => updateScenario(which, "maintenancePerMonth", v)
            )}
            {renderField(
              `${t.paymentPerMonth} (${currency})`,
              data.paymentPerMonth,
              (v) => updateScenario(which, "paymentPerMonth", v)
            )}
          </div>
        </div>
      </div>
    );
  }

  function renderMetricCard(label: string, value: string, accent = false) {
    return (
      <div
        className={`rounded-2xl border p-4 ${
          accent
            ? "border-amber-400/25 bg-amber-400/10"
            : "border-white/10 bg-neutral-900/70"
        }`}
      >
        <p className="text-sm text-neutral-400">{label}</p>
        <p
          className={`mt-2 text-xl font-semibold ${
            accent ? "text-amber-300" : ""
          }`}
        >
          {value}
        </p>
      </div>
    );
  }

  function renderResultCard(
    title: string,
    result: Result | null,
    data: ScenarioInput
  ) {
    if (!result) return null;

    return (
      <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_16px_60px_rgba(0,0,0,0.25)] sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              {t.resultTitle} — {title}
            </p>
            <p className="mt-3 text-sm text-neutral-400">{t.resultSubtitle}</p>
            <h3 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
              {formatCurrency(result.totalMonthlyCost)}
            </h3>
            <p className="mt-2 text-sm text-neutral-500">{t.perMonthSuffix}</p>
          </div>

          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-amber-300/80">
              {t.yearlyCost}
            </p>
            <p className="mt-2 text-2xl font-semibold text-amber-300">
              {formatCurrency(result.totalYearlyCost)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {renderMetricCard(t.fuelCost, formatCurrency(result.fuelCostPerMonth))}
          {renderMetricCard(
            t.insurancePerMonth,
            formatCurrency(toSafeNumber(data.insurancePerMonth))
          )}
          {renderMetricCard(
            t.maintenancePerMonth,
            formatCurrency(toSafeNumber(data.maintenancePerMonth))
          )}
          {renderMetricCard(
            t.paymentPerMonth,
            formatCurrency(toSafeNumber(data.paymentPerMonth))
          )}
        </div>

        <div className="mt-4">
          {renderMetricCard(
            distanceUnit === "mi"
              ? `${t.costPerDistance} (${t.milesShort})`
              : `${t.costPerDistance} (${t.kmShort})`,
            formatCurrency(result.costPerDistanceUnit),
            true
          )}
        </div>

        <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm font-medium text-amber-300">
          {t.nudge}
        </div>
      </div>
    );
  }
<div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
  <p className="text-sm text-neutral-300">
    💡 You may be overpaying for insurance or financing.
  </p>

  <p className="mt-2 text-xs text-neutral-500">
    Compare real offers and see if you can lower your monthly cost.
  </p>

  <a
    href="https://www.google.com/search?q=car+insurance+comparison"
    target="_blank"
    className="mt-3 inline-block rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
  >
    Compare options →
  </a>
</div>

  const canCompare = resultA && resultB;

  let cheaperScenarioLabel = "";
  let monthlySavings = 0;
  let yearlySavings = 0;

  if (canCompare) {
    if (resultA.totalMonthlyCost < resultB.totalMonthlyCost) {
      cheaperScenarioLabel = t.scenarioA;
      monthlySavings = resultB.totalMonthlyCost - resultA.totalMonthlyCost;
      yearlySavings = monthlySavings * 12;
    } else if (resultB.totalMonthlyCost < resultA.totalMonthlyCost) {
      cheaperScenarioLabel = t.scenarioB;
      monthlySavings = resultA.totalMonthlyCost - resultB.totalMonthlyCost;
      yearlySavings = monthlySavings * 12;
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.10),transparent_30%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(255,255,255,0.05),transparent_25%)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-400">
              {t.brand}
            </p>

            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-neutral-400 sm:block">
                {language === "en" ? "Language" : "Язык"}
              </span>

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    language === "en"
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  EN
                </button>

                <button
                  type="button"
                  onClick={() => setLanguage("ru")}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    language === "ru"
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  RU
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
                {t.badge}
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                {t.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
                {t.description}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  {t.primary}
                </a>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  {t.secondary}
                </a>
              </div>
            </div>

            <div className="grid gap-4 self-end">
              {renderMetricCard(t.stat1, t.stat1Value)}
              {renderMetricCard(t.stat2, t.stat2Value, true)}
              {renderMetricCard(t.stat3, t.stat3Value)}
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-6xl px-6 py-16 text-neutral-400"
      >
        Step 2: comparison
      </section>

      <section
        id="calculator"
        className="border-t border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_16px_60px_rgba(0,0,0,0.25)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight">
                    {t.calculatorTitle}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-300 sm:text-base">
                    {t.calculatorText}
                  </p>
                </div>

                <div className="hidden rounded-2xl border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs font-medium text-amber-300 sm:block">
                  beta
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={handleUseSampleData}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  {t.sampleButton}
                </button>

                <button
                  onClick={() => setShowCompare((prev) => !prev)}
                  className="inline-flex items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/15"
                >
                  {showCompare ? t.compareHide : t.compareShow}
                </button>
              </div>

              <div className="mt-8 rounded-[24px] border border-white/10 bg-neutral-900/60 p-5">
                <p className="mb-4 text-sm font-medium text-neutral-300">
                  {t.unitsTitle}
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-300">
                      {t.distanceUnit}
                    </label>
                    <select
                      value={distanceUnit}
                      onChange={(e) =>
                        setDistanceUnit(e.target.value as DistanceUnit)
                      }
                      className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
                    >
                      <option value="mi">Miles / MPG</option>
                      <option value="km">Kilometers / L/100 km</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-300">
                      {t.currencyUnit}
                    </label>
                    <select
                      value={currency}
                      onChange={(e) =>
                        setCurrency(e.target.value as CurrencyCode)
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

              <div className="mt-6">{renderScenarioCard(t.scenarioA, "A", scenarioA)}</div>

              {showCompare && (
                <div className="mt-4">
                  {renderScenarioCard(t.scenarioB, "B", scenarioB)}
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  onClick={handleCalculateA}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  {t.calculateButton}
                </button>

                {showCompare && (
                  <>
                    <button
                      onClick={handleCalculateB}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                    >
                      {t.calculateBButton}
                    </button>

                    <button
                      onClick={handleCompare}
                      className="inline-flex items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 px-6 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/15"
                    >
                      {t.compareButton}
                    </button>
                  </>
                )}

                <button
                  onClick={handleClear}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  {t.clearButton}
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {!resultA && !resultB && (
                <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_16px_60px_rgba(0,0,0,0.25)] sm:p-8">
                  <p className="text-sm leading-6 text-neutral-300">
                    {t.noResultText}
                  </p>
                </div>
              )}

              {renderResultCard(t.scenarioA, resultA, scenarioA)}
              {showCompare && renderResultCard(t.scenarioB, resultB, scenarioB)}

              {showCompare && resultA && resultB && (
                <div className="rounded-[30px] border border-amber-400/20 bg-amber-400/10 p-6 shadow-[0_16px_60px_rgba(0,0,0,0.25)] sm:p-8">
                  <h3 className="text-2xl font-semibold">{t.comparisonTitle}</h3>

                  {cheaperScenarioLabel ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      {renderMetricCard(t.cheaperLabel, cheaperScenarioLabel, true)}
                      {renderMetricCard(
                        t.savingsMonth,
                        formatCurrency(monthlySavings),
                        true
                      )}
                      {renderMetricCard(
                        t.savingsYear,
                        formatCurrency(yearlySavings),
                        true
                      )}
                    </div>
                  ) : (
                    <p className="mt-4 text-neutral-200">{t.sameCost}</p>
                  )}
                </div>
              )}

              {(resultA || resultB) && (
                <LeadForm
                  title={t.emailTitle}
                  text={t.emailText}
                  email={email}
                  setEmail={setEmail}
                  buttonText={t.emailButton}
                  placeholder={t.emailPlaceholder}
                  successText={t.emailSaved}
                  submitted={emailSaved}
                  onSubmit={handleEmailSubmit}
                  loading={emailLoading}
                  errorText={emailError}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}