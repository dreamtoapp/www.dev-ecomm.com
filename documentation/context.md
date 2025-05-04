# Project Context for AI Assistant

## 🎯 Core Objectives
1. Prioritize **type-safe implementations** with TypeScript
2. Maintain **SEO optimization** in all components
3. Enforce **code splitting** best practices
4. Ensure **component dependency checks** during updates
5. Keep code **clean and maintainable** with clear structure

## 🛠️ Tech Stack
### Core Frameworks
- Next.js 15.2.1 (App Router) - [Server Actions Docs](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- React 19 / TypeScript 5 - [React Server Components](https://react.dev/reference/react/server)
- Prisma 6.6.0 (MongoDB) - [Prisma Best Practices](https://www.prisma.io/docs/guides/best-practices)
- NextAuth 5.0.0-beta.25 - [Security Guide](https://next-auth.js.org/security)

### Backend
- Server Actions (built-in)
- API Routes (`app/api/*`)
- MongoDB (via Prisma)

### Key Libraries
| Category       | Packages & Docs                                                                 |
|----------------|---------------------------------------------------------------------------------|
| State          | [Zustand](https://zustand-demo.pmnd.rs/) / React Context                        |
| UI             | [shadcn](https://ui.shadcn.com/) / [Tailwind](https://tailwindcss.com/) / [Lucide](https://lucide.dev/) / [SweetAlert2](https://sweetalert2.github.io/) |
| Utilities      | [Date-fns](https://date-fns.org/) / [clsx](https://github.com/lukeed/clsx) / [Zod](https://zod.dev/) |
| File Handling  | [Sharp](https://sharp.pixelplumbing.com/) |

## 🔧 Development Standards
### Server Actions (Primary Data Handling)
1. Use for:
   - Form submissions
   - Database mutations
   - Sensitive operations
2. Structure in `app/actions/*` directory
3. Validate inputs with Zod
4. Handle errors with try/catch + error boundaries
5. Use Prisma transactions for atomic operations

### API Routes
- Keep routes simple (thin controllers)
- Validate input with Zod
- Use `export const runtime = 'edge'` for global APIs

### Component Structure
- Atomic design pattern (atoms/molecules/organisms)
- Prefer server components
- Use `'use client'` only when necessary
- Keep components <50 LOC

## 🛡️ Security Standards
1. Validate all inputs with Zod
2. Use Prisma parameterized queries
3. Sanitize user-generated content
4. Validate JWT tokens in API routes
5. Set proper security headers (CSRF protection via origin checks)

## 🤖 AI Instructions
1. **Data Handling**:
   - Use Server Actions instead of client-side fetch
   - Demonstrate input validation with Zod
   - Show proper error handling patterns
   - Reference [Next.js Server Actions docs](https://nextjs.org/docs/app/api-reference/functions/server-actions)

2. **Best Practices**:
   - Prefer server components for data fetching
   - Use `fetch()` with caching headers
   - Optimize images with `next/image`
   - Add accessibility features by default

3. **Error Handling**:
   - Implement global error boundaries
   - Return specific error messages from Server Actions
   - Show toast notifications for user feedback

## 🚨 Important Reminders
- Database changes: `prisma migrate dev`
- Seed data: `npm run seed`
- Test responsiveness: `npm run dev`
- Validate types: `tsc --noEmit`
- Check server actions: `next build && next start`