# Next.js 15 & Prisma Best Practices Checklist

This document provides a comprehensive checklist for modern Next.js 15 and Prisma projects. It includes:
- ✅ Checklist for best practices
- ⚡ Current state (Pros/Cons of your implementation)
- ⭐ Advantages (if you apply the checklist)
- ⚠️ Disadvantages (if you don't)

---

## ✅ Checklist

### 1. Project Structure
- [ ] Each route in `/app` uses its own `actions/` and `components/` subfolders
- [ ] Shared logic is in `/lib`, custom hooks in `/hooks`, types in `/types`
- [ ] Static assets (fonts, images) are in `/public`
- [ ] No business logic or data fetching in UI components

### 2. Server & Client Components
- [ ] Server components are used by default for data fetching and rendering
- [ ] Client components are used only for interactivity (forms, modals, etc.)
- [ ] In server components, `params` and `searchParams` are awaited (Next.js 15+)
- [ ] In client components, use the `use()` hook for `params` and `searchParams`

### 3. Data Fetching & Actions
- [ ] All server actions are in `actions/` folders, not mixed with UI code
- [ ] Prisma is only used in server actions, never in client components
- [ ] All user input is validated (e.g., with Zod) before database operations
- [ ] Dates are returned as ISO strings to the client

### 4. Prisma Schema & Usage
- [ ] Models use PascalCase, fields use camelCase
- [ ] All relations are explicit and use foreign keys
- [ ] Enums are used for status/choice fields
- [ ] Migrations are managed with Prisma Migrate, not manual SQL
- [ ] All sensitive data and DB credentials are in `.env`, not hardcoded

### 5. Styling & Fonts
- [ ] Tailwind CSS is used for all styling
- [ ] Fonts are loaded with `next/font` (`next/font/google` or `next/font/local`), not via CDN `<link>`
- [ ] Font families are defined in `tailwind.config.js` and used globally
- [ ] Only `.woff2` font files are used for best performance

### 6. State Management
- [ ] Zustand or React context is used for global state
- [ ] No prop drilling for deep state
- [ ] State logic is in `/store` or `/provider`

### 7. Security & Environment
- [ ] NextAuth is used for authentication
- [ ] All secrets and API keys are stored in `.env`
- [ ] No secrets are exposed to the client
- [ ] API routes are protected with middleware
- [ ] All form inputs are validated on the server
- [ ] HTTPS is enforced in production

### 8. Performance & Accessibility
- [ ] Next.js `<Image />` is used for all images
- [ ] Lazy loading is enabled for images and heavy components
- [ ] Lighthouse audits are run; scores > 90 for performance and accessibility
- [ ] Semantic HTML and ARIA attributes are used
- [ ] Color contrast and keyboard navigation are tested

### 9. Testing & Code Quality
- [ ] ESLint and Prettier are configured and enforced
- [ ] TypeScript is in strict mode (`tsconfig.json`)
- [ ] Unit and integration tests are written for core logic (Jest, Testing Library)
- [ ] No lint or type errors in CI

### 10. Documentation & Maintainability
- [ ] `README.md` is up to date with setup, usage, and conventions
- [ ] All major modules, actions, and components are documented
- [ ] Workflow/process changes are tracked in `AUTO_TASKS_BACKUP.md` or similar

---

## ⚡ Current State (Pros/Cons)

### Pros (Current Implementation)
- Good use of modular folders (`/app`, `/components`, `/lib`, `/types`, `/prisma`)
- Uses Tailwind CSS and Zustand for styling and state management
- NextAuth and `.env` for authentication and secrets
- ESLint, Prettier, and TypeScript are present
- Prisma schema is mostly clean and uses migrations
- Documentation files are present and maintained

### Cons (Current Implementation)
- Fonts are not loaded using `next/font` (missing optimization)
- Some routes/components may not strictly follow the `actions/` and `components/` subfolder convention
- Need to audit server/client component separation for Next.js 15 (params/searchParams usage)
- Some Prisma models/fields may need naming or enum improvements
- Dates may not always be returned as ISO strings
- Need to ensure all user input is validated with Zod
- Performance and accessibility audits (Lighthouse) may not be regularly run
- Testing coverage may be incomplete

---

## ⭐ Advantages (If You Apply All Checklist Items)
- Maximum performance, security, and scalability
- No layout shift or FOUT for fonts
- Easier onboarding and maintainability for new developers
- Consistent codebase structure and conventions
- Fewer bugs and better test coverage
- Improved accessibility and UX for all users
- Easier upgrades to future Next.js/Prisma versions

## ⚠️ Disadvantages (If You Don't Apply Checklist)
- Risk of layout shift, slow font loading, or FOUT
- Potential security issues (exposed secrets, unvalidated input)
- Harder to maintain and scale the codebase
- Increased technical debt and onboarding friction
- Lower performance and accessibility scores
- More bugs and inconsistent user experience

---

> **Use this file as your living best-practices reference. Update as you refactor your project!**
