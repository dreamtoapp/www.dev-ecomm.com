export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "SAR",
    currencyDisplay: "symbol", // This ensures the SAR symbol is used
  }).format(value);
