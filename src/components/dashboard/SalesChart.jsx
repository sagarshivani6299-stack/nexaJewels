
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const currency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function SalesChart({ data = [] }) {
  return (
    <section className="border border-stone-200 bg-white p-5 sm:p-6">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A9854D]">
          Performance
        </p>
        <h2 className="mt-2 font-serif text-2xl text-[#173F35]">
          Sales Overview
        </h2>
        <p className="mt-2 text-sm text-stone-500">
          Revenue across the selected reporting period.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex min-h-[280px] items-center justify-center text-center text-sm text-stone-500">
          Sales data will appear here when available.
        </div>
      ) : (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 5, bottom: 0 }}
            >
              <defs>
                <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B18B4B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#B18B4B" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#E9E4DA" strokeDasharray="4 4" vertical={false} />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#78716C" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tickFormatter={(value) => `₹${value}`}
                tick={{ fontSize: 11, fill: "#78716C" }}
                axisLine={false}
                tickLine={false}
                width={65}
              />

              <Tooltip
                formatter={(value) => [currency(Number(value)), "Sales"]}
                contentStyle={{
                  border: "1px solid #E9E4DA",
                  borderRadius: 0,
                  fontSize: 12,
                }}
              />

              <Area
                type="monotone"
                dataKey="sales"
                stroke="#173F35"
                strokeWidth={2}
                fill="url(#salesFill)"
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
