
const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export function formatPrice(amount) {
  const price = Number(amount);

  if (!Number.isFinite(price) || price < 0) {
    return currencyFormatter.format(0);
  }

  return currencyFormatter.format(price);
}

export function formatCompactPrice(amount) {
  const price = Number(amount);

  if (!Number.isFinite(price) || price < 0) {
    return "₹0";
  }

  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)}L`;
  }

  if (price >= 1000) {
    return `₹${(price / 1000).toFixed(1)}K`;
  }

  return formatPrice(price);
}
