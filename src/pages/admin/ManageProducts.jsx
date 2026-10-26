
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiPlus,
  FiSearch,
  FiTrash2,
  FiEdit2,
  FiPackage,
  FiAlertTriangle,
  FiDollarSign,
  FiDownload,
  FiSliders,
  FiX,
  FiArrowUpRight,
} from "react-icons/fi";
import { toast } from "sonner";
import productsData from "../../data/products";
import { formatPrice } from "../../utils/formatPrice";

export default function ManageProducts() {
  const [products, setProducts] = useState(productsData);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const categories = [
    ...new Set(productsData.map((product) => product.category).filter(Boolean)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        String(product.id).toLowerCase().includes(query);

      const matchesCategory =
        category === "all" || product.category === category;

      const stock = Number(product.stock ?? 0);
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "low" && stock <= 5) ||
        (stockFilter === "available" && stock > 5) ||
        (stockFilter === "out" && stock === 0);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, category, stockFilter]);

  const totalInventoryValue = products.reduce(
    (sum, product) =>
      sum + Number(product.price || 0) * Number(product.stock || 0),
    0
  );

  const lowStockCount = products.filter(
    (product) => Number(product.stock ?? 0) > 0 && Number(product.stock) <= 5
  ).length;

  const outOfStockCount = products.filter(
    (product) => Number(product.stock ?? 0) === 0
  ).length;

  function handleDelete(product) {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${product.name}" from this demo listing?`
    );

    if (!confirmed) return;

    setProducts((current) =>
      current.filter((item) => item.id !== product.id)
    );

    toast.success("Product removed from this demo listing.");
  }

  function exportCSV() {
    const headers = ["Product ID", "Name", "Category", "Price", "Stock"];
    const rows = filteredProducts.map((product) => [
      product.id,
      product.name,
      product.category || "",
      product.price,
      product.stock ?? "",
    ]);

    const escapeCSV = (value) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "nexajewels-products.csv";
    link.click();

    URL.revokeObjectURL(url);
    toast.success("Product inventory exported.");
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
      {/* Page header */}
      <section className="relative overflow-hidden rounded-2xl bg-[#12372F] p-6 text-white shadow-sm sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-[#D9BD82]/20" />
        <div className="pointer-events-none absolute -right-2 -top-10 h-44 w-44 rounded-full border border-[#D9BD82]/20" />

        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[#D9BD82]">
              <span className="h-px w-7 bg-[#D9BD82]" />
              Inventory Management
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl">
              Manage Products
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
              Manage your jewellery collection, monitor stock levels and
              keep your product catalogue organised.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <FiDownload size={16} />
              Export
            </button>

            <Link
              to="/admin/products/add"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D9BD82] px-5 py-3 text-sm font-semibold text-[#173F35] transition hover:bg-[#E8D3A5]"
            >
              <FiPlus size={17} />
              Add Product
            </Link>
          </div>
        </div>
      </section>

      {/* Inventory summary */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={FiPackage}
          label="Total Products"
          value={products.length}
          note="Products in this demo catalogue"
          color="green"
        />
        <SummaryCard
          icon={FiDollarSign}
          label="Inventory Value"
          value={formatPrice(totalInventoryValue)}
          note="Price multiplied by recorded stock"
          color="gold"
        />
        <SummaryCard
          icon={FiAlertTriangle}
          label="Low Stock"
          value={lowStockCount}
          note="Between 1 and 5 units remaining"
          color="gold"
        />
        <SummaryCard
          icon={FiPackage}
          label="Out of Stock"
          value={outOfStockCount}
          note="Products with zero recorded stock"
          color="green"
        />
      </section>

      {/* Product inventory */}
      <section className="overflow-hidden rounded-2xl border border-[#EAE5D9] bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#F0ECE4] p-5 sm:p-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[#173F35]">
              Product Inventory
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Search products, check stock and manage listings.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <div className="flex min-w-0 items-center gap-2 rounded-lg border border-stone-200 bg-[#FFFEFA] px-3 sm:w-64">
              <FiSearch size={18} className="shrink-0 text-stone-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name or product ID..."
                aria-label="Search products"
                className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-stone-400"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="text-stone-400 hover:text-[#173F35]"
                >
                  <FiX size={17} />
                </button>
              )}
            </div>

            <label className="flex items-center gap-2 rounded-lg border border-stone-200 px-3">
              <FiSliders size={16} className="text-stone-500" />
              <span className="sr-only">Filter category</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-11 max-w-40 bg-transparent text-sm text-stone-600 outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-2 rounded-lg border border-stone-200 px-3">
              <span className="sr-only">Filter stock</span>
              <select
                value={stockFilter}
                onChange={(event) => setStockFilter(event.target.value)}
                className="h-11 bg-transparent text-sm text-stone-600 outline-none"
              >
                <option value="all">All Stock</option>
                <option value="available">In Stock</option>
                <option value="low">Low Stock</option>
                <option value="out">Out of Stock</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF9F6] px-5 py-3 sm:px-6">
          <p className="text-sm text-stone-500">
            Showing{" "}
            <span className="font-semibold text-[#173F35]">
              {filteredProducts.length}
            </span>{" "}
            of {products.length} products
          </p>
          <span className="rounded-full border border-[#E7E0D2] bg-white px-3 py-1 text-xs font-medium text-stone-500">
            Demo inventory
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-white text-[11px] uppercase tracking-[0.13em] text-stone-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-5 py-4 font-semibold">Category</th>
                <th className="px-5 py-4 font-semibold">Price</th>
                <th className="px-5 py-4 font-semibold">Stock</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F0ECE4]">
              {filteredProducts.map((product) => {
                const stock = Number(product.stock ?? 0);
                const isOutOfStock = stock === 0;
                const isLowStock = stock > 0 && stock <= 5;

                const stockStyle = isOutOfStock
                  ? "border-red-200 bg-red-50 text-red-700"
                  : isLowStock
                    ? "border-amber-200 bg-amber-50 text-amber-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700";

                const stockLabel = isOutOfStock
                  ? "Out of Stock"
                  : isLowStock
                    ? "Low Stock"
                    : "In Stock";

                return (
                  <tr
                    key={product.id}
                    className="transition hover:bg-[#FCFBF7]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-16 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F3EDE2]">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <FiPackage size={22} className="text-stone-400" />
                          )}
                        </div>

                        <div>
                          <p className="font-semibold text-[#173F35]">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-stone-400">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-md bg-[#F7F5EF] px-2.5 py-1.5 text-xs capitalize text-stone-600">
                        {product.category || "Uncategorised"}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-semibold text-[#173F35]">
                      {formatPrice(product.price)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`font-medium ${
                          isOutOfStock
                            ? "text-red-600"
                            : isLowStock
                              ? "text-amber-700"
                              : "text-stone-600"
                        }`}
                      >
                        {product.stock ?? "—"}
                      </span>
                      <p className="mt-1 text-[11px] text-stone-400">
                        units
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${stockStyle}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {stockLabel}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/products/add?edit=${product.id}`}
                          title="Edit product"
                          aria-label={`Edit ${product.name}`}
                          className="rounded-lg border border-stone-200 p-2.5 text-stone-500 transition hover:border-[#173F35] hover:bg-[#EAF1EB] hover:text-[#173F35]"
                        >
                          <FiEdit2 size={16} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(product)}
                          title="Remove from demo listing"
                          aria-label={`Delete ${product.name}`}
                          className="rounded-lg border border-stone-200 p-2.5 text-stone-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <FiTrash2 size={16} />
                        </button>

                        <Link
                          to={`/admin/products/add?edit=${product.id}`}
                          title="Open product editor"
                          aria-label={`View ${product.name}`}
                          className="rounded-lg p-2.5 text-stone-400 transition hover:bg-[#F7F5EF] hover:text-[#173F35]"
                        >
                          <FiArrowUpRight size={17} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F5EF] text-stone-400">
                      <FiSearch size={21} />
                    </div>
                    <p className="mt-3 font-medium text-[#173F35]">
                      No products found
                    </p>
                    <p className="mt-1 text-sm text-stone-500">
                      Try a different search term or filter.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setCategory("all");
                        setStockFilter("all");
                      }}
                      className="mt-4 text-sm font-semibold text-[#28644F] underline underline-offset-4"
                    >
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-[#F0ECE4] px-5 py-4 sm:px-6">
          <p className="text-xs leading-5 text-stone-400">
            Demo inventory. Add, edit and delete operations are not persisted
            to a backend and may reset after refreshing the page.
          </p>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, note, color }) {
  const isGold = color === "gold";

  return (
    <article className="rounded-2xl border border-[#EAE5D9] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            isGold
              ? "bg-[#F7EED9] text-[#9B7736]"
              : "bg-[#E3EEE6] text-[#28644F]"
          }`}
        >
          <Icon size={21} />
        </div>
        <span className="rounded-full bg-[#F7F5EF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
          Demo
        </span>
      </div>

      <p className="mt-5 text-sm text-stone-500">{label}</p>
      <p className="mt-2 break-words font-serif text-2xl text-[#173F35] sm:text-3xl">
        {value}
      </p>
      <p className="mt-2 text-xs leading-5 text-stone-400">{note}</p>
    </article>
  );
}
