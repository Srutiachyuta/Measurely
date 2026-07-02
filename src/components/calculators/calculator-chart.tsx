"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Pie, Line } from "react-chartjs-2";
import type { ChartConfig } from "@/types/calculators";

ChartJS.register(
  CategoryScale, LinearScale, BarElement, ArcElement,
  PointElement, LineElement, Title, Tooltip, Legend, Filler
);

interface CalculatorChartProps {
  chart: ChartConfig;
}

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.5,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        padding: 16,
        usePointStyle: true,
        pointStyle: "circle" as const,
        font: { family: "Inter, system-ui, sans-serif", size: 12 },
        color: "#64748b",
      },
    },
    tooltip: {
      backgroundColor: "rgba(15, 23, 42, 0.9)",
      titleFont: { family: "Inter, system-ui, sans-serif", size: 13 },
      bodyFont: { family: "Inter, system-ui, sans-serif", size: 12 },
      padding: 12,
      cornerRadius: 12,
      boxPadding: 4,
      usePointStyle: true,
    },
  },
  animation: {
    duration: 1000,
    easing: "easeInOutQuart" as const,
  },
};

export default function CalculatorChart({ chart }: CalculatorChartProps) {
  const mergedOptions = {
    ...defaultOptions,
    ...chart.options,
    plugins: {
      ...defaultOptions.plugins,
      ...(chart.options?.plugins ?? {}),
    },
  };

  const ChartComponent = (() => {
    switch (chart.type) {
      case "bar": return Bar;
      case "doughnut": return Doughnut;
      case "pie": return Pie;
      case "line": return Line;
      default: return null;
    }
  })();

  if (!ChartComponent) return null;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-sm sm:max-w-md">
        <ChartComponent
          data={chart.data as never}
          options={mergedOptions as never}
          className="w-full"
          style={{ maxWidth: "100%" }}
        />
      </div>
    </div>
  );
}
