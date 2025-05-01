# Project Type Safety Instructions

## Handling Null vs Undefined in API Data

When fetching data from an API, you may receive fields with `null` values, but your TypeScript type definitions often expect `undefined` instead of `null`. This mismatch can cause build or runtime errors.

### Best Practice
Always preprocess fetched data to convert `null` fields to `undefined` before updating React state or passing data to components.

#### Example: Supplier Logo Field
If the `Supplier` type is defined as:
```ts
interface Supplier {
  id: string;
  name: string;
  logo?: string; // expects string or undefined
  type?: string;
}
```
But the backend/API may return `logo: null`, you should map the data like this:
```ts
fetchSuppliers().then((data) => {
  const fixedData = data.map((s) => ({
    ...s,
    logo: s.logo ?? undefined,
  }));
  setSuppliers(fixedData);
});
```

This ensures type compatibility and prevents TypeScript errors.

---

**Summary:**
- Always sanitize API data to match your frontend types.
- Prefer `undefined` over `null` for optional fields in TypeScript interfaces.
- Use mapping to convert `null` to `undefined` as shown above.

> Keep your codebase type-safe and error-free by following this pattern throughout your project.
