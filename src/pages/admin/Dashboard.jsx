
import { Link } from "react-router-dom";
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiArrowUpRight,
  FiArrowRight,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiPlus,
  FiEye,
  FiBarChart2,
} from "react-icons/fi";

import StatCard from "../../components/dashboard/StatsCard";
import SalesChart from "../../components/dashboard/SalesChart";
import { formatPrice } from "../../utils/formatPrice";

const demoOrders = [
  {
    id: "NX-1024",
    customer: "Aarohi Sharma",
    initials: "AS",
    product: "Gold Heritage Necklace",
    amount: 12499,
    date: "23 Oct 2026",
    status: "Processing",
  },
  {
    id: "NX-1023",
    customer: "Ananya Verma",
    initials: "AV",
    product: "Pearl Elegance Earrings",
    amount: 3499,
    date: "22 Oct 2026",
    status: "Delivered",
  },
  {
    id: "NX-1022",
    customer: "Meera Singh",
    initials: "MS",
    product: "Classic Gold Bracelet",
    amount: 5999,
    date: "22 Oct 2026",
    status: "Shipped",
  },
  {
    id: "NX-1021",
    customer: "Riya Gupta",
    initials: "RG",
    product: "Minimal Pendant",
    amount: 2199,
    date: "21 Oct 2026",
    status: "Pending",
  },
];

const statusStyles = {
  Processing: "bg-blue-50 text-blue-700 ring-blue-600/10",
  Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  Shipped: "bg-violet-50 text-violet-700 ring-violet-600/10",
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/10",
};

const stats = [
  {
    title: "Total Revenue",
    value: formatPrice(482500),
    change: "Demo data",
    icon: FiDollarSign,
    accent: "gold",
  },
  {
    title: "Total Orders",
    value: "1,284",
    change: "Demo data",
    icon: FiShoppingBag,
    accent: "green",
  },
  {
    title: "Total Customers",
    value: "846",
    change: "Demo data",
    icon: FiUsers,
    accent: "blue",
  },
  {
    title: "Total Products",
    value: "40",
    change: "Demo data",
    icon: FiPackage,
    accent: "rose",
  },
];

const quickActions = [
  {
    title: "Add Product",
    description: "Expand your jewellery collection",
    to: "/admin/products/add",
    icon: FiPlus,
  },
  {
    title: "Manage Orders",
    description: "Review and update customer orders",
    to: "/admin/orders",
    icon: FiShoppingBag,
  },
  {
    title: "Customers",
    description: "Explore your customer list",
    to: "/admin/customers",
    icon: FiUsers,
  },
  {
    title: "Analytics & Profit",
    description: "Review sales and store performance",
    to: "/admin/analytics",
    icon: FiBarChart2,
  },
];

export default function Dashboard() {
  const pendingOrders = demoOrders.filter(
    (order) => order.status === "Pending" ||
      order.status === "Processing"
  ).length;

  return (
    <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">

      {/* Welcome Banner */}
      <section className="relative overflow-hidden bg-[#173F35] p-6 text-white sm:p-9 lg:p-10">
        <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border border-white/10 sm:right-10 sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute -right-2 -top-8 h-48 w-48 rounded-full border border-[#D9BD82]/30 sm:right-24 sm:h-60 sm:w-60" />

        <div className="relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-[#D9BD82]/30 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#D9BD82]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D9BD82]" />
              NexaJewels Administration
            </div>

            <h1 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Every Detail Matters.
              <span className="mt-1 block text-[#D9BD82]">
                Every Jewel Tells a Story.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
              Welcome to your store dashboard. Monitor orders,
              manage your collection and explore your store's
              performance from one elegant workspace.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/admin/products/add"
                className="inline-flex items-center gap-2 bg-[#D9BD82] px-5 py-3 text-sm font-semibold text-[#173F35] transition hover:bg-[#E8D3A5]"
              >
                <FiPlus size={17} />
                Add New Product
              </Link>

              <Link
                to="/admin/orders"
                className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-sm font-medium transition hover:bg-white/10"
              >
                View Orders
                <FiArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative max-w-xs border-l-2 border-[#D9BD82] pl-5 lg:mb-2">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              Store Snapshot
            </p>
            <p className="mt-3 font-serif text-3xl text-[#D9BD82]">
              {pendingOrders.toString().padStart(2, "0")}
            </p>
            <p className="mt-1 text-sm text-white/75">
              Pending or processing orders
            </p>
            <Link
              to="/admin/orders"
              className="mt-4 inline-flex items-center gap-2 text-sm text-white hover:text-[#D9BD82]"
            >
              Review orders <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Section Heading */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A17C3C]">
            Store Overview
          </p>
          <h2 className="mt-2 font-serif text-2xl text-[#173F35] sm:text-3xl">
            Performance at a Glance
          </h2>
        </div>

        <span className="border border-stone-200 bg-white px-3 py-2 text-xs text-stone-500">
          <FiClock className="mr-2 inline" />
          Sample dashboard data
        </span>
      </div>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Sales Chart */}
      <section className="overflow-hidden border border-stone-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 px-5 py-5 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A17C3C]">
              Business Insights
            </p>
            <h2 className="mt-2 font-serif text-2xl text-[#173F35]">
              Sales Performance
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Explore your store's sales trends.
            </p>
          </div>

          <Link
            to="/admin/analytics"
            className="inline-flex items-center gap-2 border border-stone-200 px-4 py-2.5 text-sm font-medium text-[#173F35] transition hover:border-[#A17C3C]"
          >
            View Analytics <FiArrowUpRight />
          </Link>
        </div>

        <div className="p-3 sm:p-5">
          <SalesChart />
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A17C3C]">
            Shortcuts
          </p>
          <h2 className="mt-2 font-serif text-2xl text-[#173F35]">
            Quick Actions
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                to={action.to}
                className="group flex items-start gap-4 border border-stone-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-[#D9BD82] hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#173F35]/5 text-[#A17C3C] transition group-hover:bg-[#173F35] group-hover:text-[#D9BD82]">
                  <Icon size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[#173F35]">
                    {action.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-stone-500">
                    {action.description}
                  </p>
                </div>

                <FiArrowUpRight className="shrink-0 text-stone-400 transition group-hover:text-[#A17C3C]" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Orders */}
      <section className="overflow-hidden border border-stone-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 p-5 sm:p-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A17C3C]">
              Latest Activity
            </p>
            <h2 className="mt-2 font-serif text-2xl text-[#173F35] sm:text-3xl">
              Recent Orders
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              Keep track of your latest customer purchases.
            </p>
          </div>

          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 bg-[#173F35] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#245B4D]"
          >
            All Orders <FiArrowRight />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-[#FAF9F6] text-[11px] uppercase tracking-[0.15em] text-stone-500">
              <tr>
                <th className="px-6 py-4 font-medium">Order</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100">
              {demoOrders.map((order) => (
                <tr
                  key={order.id}
                  className="transition hover:bg-[#FFFEFA]"
                >
                  <td className="whitespace-nowrap px-6 py-5 font-semibold text-[#173F35]">
                    {order.id}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#173F35]/10 text-xs font-semibold text-[#173F35]">
                        {order.initials}
                      </div>
                      <span className="whitespace-nowrap text-stone-700">
                        {order.customer}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-stone-600">
                    {order.product}
                  </td>

                  <td className="whitespace-nowrap px-6 py-5 text-stone-500">
                    {order.date}
                  </td>

                  <td className="whitespace-nowrap px-6 py-5 font-semibold text-[#173F35]">
                    {formatPrice(order.amount)}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 text-xs font-medium ring-1 ring-inset ${
                        statusStyles[order.status] ||
                        "bg-stone-50 text-stone-600 ring-stone-200"
                      }`}
                    >
                      {order.status === "Delivered" && (
                        <FiCheckCircle size={12} />
                      )}
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <Link
                      to="/admin/orders"
                      aria-label={`View orders for ${order.id}`}
                      className="inline-flex items-center justify-center border border-stone-200 p-2 text-[#173F35] transition hover:border-[#A17C3C] hover:text-[#A17C3C]"
                    >
                      <FiEye size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-start gap-3 border-t border-stone-100 bg-[#FAF9F6] px-5 py-4 sm:px-6">
          <FiTrendingUp className="mt-0.5 shrink-0 text-[#A17C3C]" />
          <p className="text-xs leading-5 text-stone-500">
            Demo data is shown for presentation purposes. Connect your
            backend API to display real revenue, orders, customers and
            inventory.
          </p>
        </div>
      </section>
    </div>
  );
}
