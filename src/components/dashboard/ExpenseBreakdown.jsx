
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { FiCreditCard } from "react-icons/fi";

const COLORS = ["#173D32", "#C5A15B", "#789681", "#D6B875", "#B96D56"];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount));

const defaultExpenses = [
  { name: "Product Cost", amount: 85000 },
  { name: "Packaging", amount: 12000 },
  { name: "Shipping", amount: 18000 },
  { name: "Marketing", amount: 25000 },
  { name: "Other Expenses", amount: 45000 },
];

export default function ExpenseBreakdown({
  expenses = defaultExpenses,
}) {
  const chartData = expenses
    .map((item) => ({
      name: item.name,
      value: Number(item.amount ?? item.value ?? 0),
    }))
    .filter((item) => item.value > 0);

  const totalExpenses = chartData.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <section className="rounded-2xl border border-[#EAE5D9] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#173D32]">
            Expense Breakdown
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Understand where your business money goes.
          </p>
        </div>

        <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
          <FiCreditCard size={21} />
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-[#F7F5EF] p-4">
        <p className="text-sm text-gray-500">Total Expenses</p>
        <p className="mt-1 text-2xl font-bold text-[#173D32]">
          {formatCurrency(totalExpenses)}
        </p>
      </div>

      {chartData.length > 0 ? (
        <>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {chartData.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [
                    formatCurrency(value),
                    "Expense",
                  ]}
                />

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-3">
            {chartData.map((item, index) => {
              const percentage =
                totalExpenses > 0
                  ? (item.value / totalExpenses) * 100
                  : 0;

              return (
                <div key={item.name}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            COLORS[index % COLORS.length],
                        }}
                      />
                      <span className="text-gray-600">
                        {item.name}
                      </span>
                    </div>

                    <span className="font-semibold text-[#173D32]">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor:
                          COLORS[index % COLORS.length],
                      }}
                    />
                  </div>

                  <p className="mt-1 text-right text-xs text-gray-500">
                    {formatCurrency(item.value)}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex h-48 items-center justify-center text-sm text-gray-500">
          No expense records available.
        </div>
      )}
    </section>
  );
}
