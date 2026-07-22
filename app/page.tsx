"use client";

import { useCallback, useEffect, useState } from "react";

type Operator = "+" | "−" | "×" | "÷";

const keys: Array<{ label: string; value: string; kind?: string; wide?: boolean }> = [
  { label: "Clear", value: "clear", kind: "utility" },
  { label: "±", value: "sign", kind: "utility" },
  { label: "%", value: "percent", kind: "utility" },
  { label: "÷", value: "÷", kind: "operator" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "×", value: "×", kind: "operator" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "−", value: "−", kind: "operator" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "+", value: "+", kind: "operator" },
  { label: "0", value: "0", wide: true },
  { label: ".", value: "." },
  { label: "=", value: "equals", kind: "equals" },
];

function calculate(a: number, b: number, operator: Operator) {
  if (operator === "+") return a + b;
  if (operator === "−") return a - b;
  if (operator === "×") return a * b;
  return b === 0 ? NaN : a / b;
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "Cannot divide by zero";
  const rounded = Number.parseFloat(value.toPrecision(12));
  if (Math.abs(rounded) >= 1e12 || (Math.abs(rounded) > 0 && Math.abs(rounded) < 1e-8)) {
    return rounded.toExponential(6);
  }
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [expression, setExpression] = useState("Ready to calculate");

  const reset = useCallback(() => {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaiting(false);
    setExpression("Ready to calculate");
  }, []);

  const input = useCallback((value: string) => {
    if (/^\d$/.test(value)) {
      setDisplay((current) => (waiting || current === "0" || current.includes("Cannot") ? value : current.replace(/,/g, "") + value).slice(0, 14));
      if (waiting) setWaiting(false);
      return;
    }

    if (value === ".") {
      setDisplay((current) => {
        if (waiting || current.includes("Cannot")) return "0.";
        const plain = current.replace(/,/g, "");
        return plain.includes(".") ? current : plain + ".";
      });
      if (waiting) setWaiting(false);
      return;
    }

    if (value === "clear") return reset();
    if (value === "sign") {
      setDisplay((current) => current === "0" || current.includes("Cannot") ? current : current.startsWith("-") ? current.slice(1) : `-${current}`);
      return;
    }
    if (value === "percent") {
      setDisplay((current) => formatNumber(Number(current.replace(/,/g, "")) / 100));
      return;
    }

    const currentValue = Number(display.replace(/,/g, ""));
    if (["+", "−", "×", "÷"].includes(value)) {
      const nextOperator = value as Operator;
      if (storedValue !== null && operator && !waiting) {
        const result = calculate(storedValue, currentValue, operator);
        setDisplay(formatNumber(result));
        setStoredValue(result);
        setExpression(`${formatNumber(result)} ${nextOperator}`);
      } else {
        setStoredValue(currentValue);
        setExpression(`${display} ${nextOperator}`);
      }
      setOperator(nextOperator);
      setWaiting(true);
      return;
    }

    if (value === "equals" && storedValue !== null && operator) {
      const result = calculate(storedValue, currentValue, operator);
      setExpression(`${formatNumber(storedValue)} ${operator} ${formatNumber(currentValue)} =`);
      setDisplay(formatNumber(result));
      setStoredValue(null);
      setOperator(null);
      setWaiting(true);
    }
  }, [display, operator, reset, storedValue, waiting]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const map: Record<string, string> = { Enter: "equals", "=": "equals", Escape: "clear", c: "clear", C: "clear", "/": "÷", "*": "×", "-": "−" };
      const value = map[event.key] ?? event.key;
      if (/^\d$/.test(value) || [".", "+", "−", "×", "÷", "equals", "clear"].includes(value)) {
        event.preventDefault();
        input(value);
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        setDisplay((current) => current.length > 1 ? current.slice(0, -1) : "0");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [input]);

  return (
    <main className="page-shell">
      <section className="intro" aria-labelledby="page-title">
        <div className="brand-mark" aria-hidden="true"><span>+</span><span>−</span></div>
        <p className="eyebrow">Simple tools, thoughtfully made</p>
        <h1 id="page-title">Everyday calculations,<br /><em>beautifully simple.</em></h1>
        <p className="intro-copy">A calm, friendly calculator designed to make every number feel easy.</p>
        <div className="hint"><kbd>Enter</kbd><span>to calculate</span><kbd>Esc</kbd><span>to clear</span></div>
      </section>

      <section className="calculator" aria-label="Basic calculator">
        <div className="calculator-top"><span className="status-dot" /> <span>CALCULATOR</span><span className="model">BASIC / 01</span></div>
        <div className="display" aria-live="polite" aria-atomic="true">
          <p>{expression}</p>
          <output title={display}>{display}</output>
        </div>
        <div className="keypad">
          {keys.map((key) => (
            <button
              className={`${key.kind ?? "number"} ${key.wide ? "wide" : ""} ${operator === key.value && waiting ? "active" : ""}`}
              key={key.value}
              onClick={() => input(key.value)}
              aria-label={key.value === "sign" ? "Change sign" : key.value === "percent" ? "Percent" : key.label}
            >
              {key.label}
            </button>
          ))}
        </div>
        <p className="footer-note">Made for the little moments that count.</p>
      </section>
    </main>
  );
}
