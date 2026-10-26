
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount));

export default function ProfitChart({ data = [] }) {
  const chartData = data.map((item) => ({
    ...item,
    profit:
      item.profit !== undefined
        ? item.profit
        : Number(item.sales || 0) - Number(item.expenses || 0),
  }));

  return (
    <section className="rounded-2xl border border-[#EAE5D9] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-[#173D32]">
          Sales & Profit Trend
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Compare monthly sales with profit after expenses.
        </p>
      </div>

      <div className="h-72 w-full sm:h-80">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="salesGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#173D32"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="#173D32"
                    stopOpacity={0}
                  />
                </linearGradient>

                <linearGradient
                  id="profitGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#C5A15B"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="#C5A15B"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#EEE9DF"
              />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                stroke="#8A918B"
              />

              <YAxis
                width={65}
                tick={{ fontSize: 11 }}
                stroke="#8A918B"
                tickFormatter={(value) => `₹${value / 1000}k`}
              />

              <Tooltip
                formatter={(value, name) => [
                  formatCurrency(value),
                  name,
                ]}
              />

              <Legend />

              <Area
                type="monotone"
                dataKey="sales"
                name="Sales"
                stroke="#173D32"
                strokeWidth={2.5}
                fill="url(#salesGradient)"
              />

              <Area
                type="monotone"
                dataKey="profit"
                name="Profit"
                stroke="#C5A15B"
                strokeWidth={2.5}
                fill="url(#profitGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No monthly data available.
          </div>
        )}
      </div>
    </section>
  );
}
