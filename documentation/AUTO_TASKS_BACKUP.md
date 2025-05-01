# 🛠️ AUTO_TASKS & LOCAL MEMORY BACKUP

This is a full backup of all current Cascade local instructions, conventions, and best practices affecting your project as of 2025-04-30.

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

---

# [2025-04-30] Project Folder Structure & Coding Standards

- Each route folder (e.g., /app/dashboard/{routeName}/) must have:
  - an actions/ folder for all server actions (data fetching, mutations, etc.)
  - a components/ folder for all UI components specific to that route
  - the main page.tsx should import from these folders and remain clean and modular
- This rule applies to all new and refactored routes for consistency, maintainability, and scalability across the project.

---

# [2025-04-30] UI/UX Professionalism Principle

- All UI components and flows must be designed for professional appearance and optimal user experience (UX).
- Always consider the end user may not be technical; interfaces should be clear, intuitive, visually appealing, and require no technical knowledge to use.
- Use modern UI patterns, accessible color contrast, and logical grouping of controls.
- Favor clarity and ease of use over technical complexity or developer convenience.
- All new UI features should be reviewed for: clarity, accessibility, responsiveness, and minimal cognitive load for non-technical users.

---

# [2025-04-30] Testing Without Budget

- Set up automated tests (unit, integration, E2E) using Jest, React Testing Library, Playwright, or Cypress.
- Regularly perform manual testing as a developer (try to break things, test edge cases, use different browsers/devices).
- Ask friends, family, or colleagues to try the app and report bugs or usability issues.
- Add a feedback button/form in the app for users to report issues.
- Consider running an open beta or test group with early users.
- Use free tools for linting, accessibility, and error monitoring (ESLint, Prettier, Lighthouse, Sentry, etc.).

Purpose: Ensure app reliability and usability without the cost of hiring a dedicated tester.

---

# [2025-04-30] Security & Coding Standards

- All API keys should be stored in environment variables
- Authentication is handled through NextAuth
- API routes are protected with appropriate middleware
- Form validation using Zod
- Secure payment processing
- Data encryption for sensitive information
- Rate limiting for API endpoints
- CORS configuration
- XSS protection

---

# [2025-04-30] Quality Assurance

1. Code Quality
   - ESLint configuration
   - Prettier formatting
   - TypeScript strict mode
   - Unit testing
   - Integration testing
   - E2E testing

2. Performance
   - Lighthouse scores > 90
   - Core Web Vitals optimization
   - Image optimization
   - Code splitting
   - Bundle size optimization

3. Accessibility
   - WCAG 2.1 compliance
   - Keyboard navigation

---

# [2025-04-30] Project Structure Example

```
www.ammawag.com/
├── app/                    # Next.js app directory with pages and API routes
├── components/            # Reusable React components
├── constant/              # Application constants and configurations
├── fonts/                # Custom font files
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and shared logic
├── prisma/               # Database schema and migrations
├── provider/             # React context providers
├── public/               # Static assets (images, icons)
├── store/                # State management (Zustand)
├── types/                # TypeScript type definitions
├── utils/                # Helper functions and utilities
└── config files:
    ├── .env              # Environment variables
    ├── auth-config.ts    # NextAuth configuration
    ├── components.json   # shadcn UI configuration
    ├── next-config.ts    # Next.js configuration
    ├── tailwind-config.ts # Tailwind CSS configuration
    └── tsconfig.json     # TypeScript configuration
```

---

# [2025-04-30] How to use this file
- This file is a full backup of all current conventions and best practices as known by Cascade.
- It is updated automatically as major changes occur.
- Use this as a reference for onboarding, code reviews, and technical planning.
