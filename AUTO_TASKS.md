# 🛠️ AUTO_TASKS & LOCAL MEMORY SYNC

This file is automatically updated to reflect any major changes to Cascade's local memory, coding conventions, or best practices that affect your project. Please review regularly for up-to-date guidance!

---

## [2025-04-30] Next.js 15: params & searchParams Best Practice

**Reference:** https://nextjs.org/docs/app/guides/upgrading/version-15#params--searchparams

**Summary:**
- For async server components: `params` and `searchParams` are Promises and must be awaited.
- For client components: use the React `use()` hook to unwrap Promises.
- This is a breaking change from previous versions where these were plain objects.

**Example (server/async):**
```tsx
export default async function Page(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  // ...
}
```

**Example (client):**
```tsx
'use client'
import { use } from 'react';
export default function Page(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = use(props.params);
  const searchParams = use(props.searchParams);
  // ...
}
```
---

**All new or refactored code must follow this convention.**

---

## How this file is updated
- Any time Cascade's memory is updated with a new convention, best practice, or project-wide decision, an entry will be added here.
- This ensures your team always has a single source of truth for technical/project standards.
