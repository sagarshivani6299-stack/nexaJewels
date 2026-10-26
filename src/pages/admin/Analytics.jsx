
import { useMemo, useState } from "react";
import {
  FiTrendingUp,
  FiDollarSign,
  FiShoppingBag,
  FiCreditCard,
  FiDownload,
  FiCalendar,
} from "react-icons/fi";

import ProfitChart from "../../components/dashboard/ProfitChart";
import ExpenseBreakdown from "../../components/dashboard/ExpenseBreakdown";

const monthlyData = [
  {
    month: "Jan",
    sales: 120000,
    expenses: [
      { name: "Product Cost", amount: 45000 },
      { name: "Packaging", amount: 8000 },
      { name: "Shipping", amount: 12000 },
      { name: "Marketing", amount: 10000 },
      { name: "Other Expenses", amount: 10000 },
    ],
  },
  {
    month: "Feb",
    sales: 145000,
    expenses: [
      { name: "Product Cost", amount: 50000 },
      { name: "Packaging", amount: 9000 },
      { name: "Shipping", amount: 14000 },
      { name: "Marketing", amount: 13000 },
      { name: "Other Expenses", amount: 12000 },
    ],
  },
  {
    month: "Mar",
    sales: 132000,
    expenses: [
      { name: "Product Cost", amount: 46000 },
      { name: "Packaging", amount: 8000 },
      { name: "Shipping", amount: 12000 },
      { name: "Marketing", amount: 12000 },
      { name: "Other Expenses", amount: 12000 },
    ],
  },
  {
    month: "Apr",
    sales: 180000,
    expenses: [
      { name: "Product Cost", amount: 65000 },
      { name: "Packaging", amount: 10000 },
      { name: "Shipping", amount: 16000 },
      { name: "Marketing", amount: 18000 },
      { name: "Other Expenses", amount: 16000 },
    ],
  },
  {
    month: "May",
    sales: 165000,
    expenses: [
      { name: "Product Cost", amount: 58000 },
      { name: "Packaging", amount: 10000 },
      { name: "Shipping", amount: 15000 },
      { name: "Marketing", amount: 16000 },
      { name: "Other Expenses", amount: 13000 },
    ],
  },
  {
    month: "Jun",
    sales: 210000,
    expenses: [
      { name: "Product Cost", amount: 75000 },
      { name: "Packaging", amount: 12000 },
      { name: "Shipping", amount: 18000 },
      { name: "Marketing", amount: 22000 },
      { name: "Other Expenses", amount: 21000 },
    ],
  },
  {
    month: "Jul",
    sales: 195000,
    expenses: [
      { name: "Product Cost", amount: 68000 },
      { name: "Packaging", amount: 11000 },
      { name: "Shipping", amount: 16000 },
      { name: "Marketing", amount: 18000 },
      { name: "Other Expenses", amount: 17000 },
    ],
  },
  {
    month: "Aug",
    sales: 225000,
    expenses: [
      { name: "Product Cost", amount: 80000 },
      { name: "Packaging", amount: 13000 },
      { name: "Shipping", amount: 19000 },
      { name: "Marketing", amount: 22000 },
      { name: "Other Expenses", amount: 21000 },
    ],
  },
  {
    month: "Sep",
    sales: 240000,
    expenses: [
      { name: "Product Cost", amount: 90000 },
      { name: "Packaging", amount: 14000 },
      { name: "Shipping", amount: 20000 },
      { name: "Marketing", amount: 24000 },
      { name: "Other Expenses", amount: 22000 },
    ],
  },
  {
    month: "Oct",
    sales: 250000,
    expenses: [
      { name: "Product Cost", amount: 85000 },
      { name: "Packaging", amount: 12000 },
      { name: "Shipping", amount: 18000 },
      { name: "Marketing", amount: 25000 },
      { name: "Other Expenses", amount: 45000 },
    ],
  },
  {
    month: "Nov",
    sales: 0,
    expenses: [],
  },
  {
    month: "Dec",
    sales: 0,
    expenses: [],
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function Analytics() {
  const [selectedMonth, setSelectedMonth] = useState("Oct");

  const data = useMemo(
    () =>
      monthlyData.map((item) => {
        const totalExpenses = item.expenses.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );

        return {
          ...item,
          totalExpenses,
          profit: item.sales - totalExpenses,
        };
      }),
    []
  );

  const current = data.find((item) => item.month === selectedMonth);

  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalExpenses = data.reduce(
    (sum, item) => sum + item.totalExpenses,
    0
  );
  const totalProfit = totalSales - totalExpenses;

  const profitMargin =
    totalSales > 0 ? (totalProfit / totalSales) * 100 : 0;

  const stats = [
    {
      title: "Total Sales",
      value: formatCurrency(totalSales),
      note: "Year-to-date sample data",
      icon: FiShoppingBag,
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(totalExpenses),
      note: "Recorded sample costs",
      icon: FiCreditCard,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      title: "Net Profit",
      value: formatCurrency(totalProfit),
      note: "Sales minus expenses",
      icon: FiDollarSign,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
    },
    {
      title: "Profit Margin",
      value: `${profitMargin.toFixed(1)}%`,
      note: "Profit as a share of sales",
      icon: FiTrendingUp,
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
  ];

  const exportCSV = () => {
    const rows = [
      ["Month", "Sales (INR)", "Expenses (INR)", "Net Profit (INR)"],
      ...data.map((item) => [
        item.month,
        item.sales,
        item.totalExpenses,
        item.profit,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "nexajewels-analytics.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const chartData = data.map((item) => ({
    month: item.month,
    sales: item.sales,
    expenses: item.totalExpenses,
    profit: item.profit,
  }));

  return (
    <div className="min-h-full bg-[#FFFEFA] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium tracking-widest text-[#A88746]">
              BUSINESS OVERVIEW
            </p>

            <h1 className="mt-1 text-2xl font-bold text-[#173D32] sm:text-3xl">
              Analytics & Profit
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Monitor your monthly revenue, costs and profitability.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173D32] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#245746]"
          >
            <FiDownload size={18} />
            Export CSV
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-[#EAE5D9] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <div className={`rounded-xl p-3 ${stat.bg} ${stat.color}`}>
                    <Icon size={21} />
                  </div>
                </div>

                <h2 className="mt-4 break-words text-2xl font-bold text-[#173D32]">
                  {stat.value}
                </h2>

                <p className="mt-2 text-xs text-gray-500">{stat.note}</p>
              </div>
            );
          })}
        </div>

        {/* Month filter */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#EAE5D9] bg-white p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-[#173D32]">
              Monthly Performance
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Choose a month to view its breakdown.
            </p>
          </div>

          <label className="flex items-center gap-3">
            <FiCalendar className="text-[#A88746]" />

            <select
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
              className="rounded-xl border border-[#DCD6C8] bg-[#FFFEFA] px-4 py-2.5 text-sm text-[#173D32] outline-none focus:border-[#A88746]"
            >
              {data.map((item) => (
                <option key={item.month} value={item.month}>
                  {item.month}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Selected month cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-[#173D32] p-5 text-white">
            <p className="text-sm text-white/70">{current.month} Sales</p>
            <p className="mt-2 text-2xl font-bold">
              {formatCurrency(current.sales)}
            </p>
          </div>

          <div className="rounded-2xl border border-[#EAE5D9] bg-white p-5">
            <p className="text-sm text-gray-500">
              {current.month} Expenses
            </p>
            <p className="mt-2 text-2xl font-bold text-amber-700">
              {formatCurrency(current.totalExpenses)}
            </p>
          </div>

          <div className="rounded-2xl border border-[#EAE5D9] bg-white p-5">
            <p className="text-sm text-gray-500">
              {current.month} Net Profit
            </p>
            <p
              className={`mt-2 text-2xl font-bold ${
                current.profit >= 0 ? "text-emerald-700" : "text-red-600"
              }`}
            >
              {formatCurrency(current.profit)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Profit margin:{" "}
              {current.sales > 0
                ? ((current.profit / current.sales) * 100).toFixed(1)
                : "0.0"}
              %
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
          <ProfitChart data={chartData} />

          <ExpenseBreakdown expenses={current.expenses} />
        </div>

        {/* Monthly report */}
        <div className="overflow-hidden rounded-2xl border border-[#EAE5D9] bg-white">
          <div className="border-b border-[#EAE5D9] p-5">
            <h2 className="text-lg font-bold text-[#173D32]">
              Monthly Financial Report
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Compare sales, expenses and profit throughout the year.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-[#F7F5EF] text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4">Month</th>
                  <th className="px-5 py-4 text-right">Sales</th>
                  <th className="px-5 py-4 text-right">Expenses</th>
                  <th className="px-5 py-4 text-right">Net Profit</th>
                  <th className="px-5 py-4 text-right">Margin</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F0ECE3]">
                {data.map((item) => {
                  const margin =
                    item.sales > 0
                      ? ((item.profit / item.sales) * 100).toFixed(1)
                      : null;

                  return (
                    <tr
                      key={item.month}
                      className={
                        item.month === selectedMonth
                          ? "bg-[#F5F7F1]"
                          : "transition hover:bg-[#FFFEFA]"
                      }
                    >
                      <td className="px-5 py-4 font-medium text-[#173D32]">
                        {item.month}
                        {item.month === selectedMonth && (
                          <span className="ml-2 text-xs text-[#A88746]">
                            Selected
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4 text-right">
                        {formatCurrency(item.sales)}
                      </td>

                      <td className="px-5 py-4 text-right text-amber-700">
                        {formatCurrency(item.totalExpenses)}
                      </td>

                      <td
                        className={`px-5 py-4 text-right font-semibold ${
                          item.profit >= 0
                            ? "text-emerald-700"
                            : "text-red-600"
                        }`}
                      >
                        {formatCurrency(item.profit)}
                      </td>

                      <td className="px-5 py-4 text-right">
                        {margin === null ? "—" : `${margin}%`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

       
        
      </div>
    </div>
  );
}
