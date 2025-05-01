## 🔥 Core Principles
✅ **Non-negotiable Requirements**  
1. TypeScript-first development (strict mode)  
2. App Router pattern enforcement  
3. Atomic component architecture  
4. Zero client-side data mutations  
5. Automatic accessibility checks  

## 🛠 Tech Stack Constitution
```yaml
core:
  framework: "Next.js 15.2.1 (App Router)"
  state: "Zustand + React Server Components"
  db: "Prisma 6.6 → MongoDB Atlas"
  auth: "NextAuth 5.0β (JWT strategy)"

mandatory:
  - "All forms → Server Actions"
  - "API routes → Edge runtime"
  - "Data validation → Zod schemas"
  - "Error handling → Unified toast system"

forbidden:
  - "❌ any TypeScript type assertions"
  - "❌ prop drilling beyond 2 levels"
  - "❌ client-side fetch() calls"
  - "❌ inline CSS styles"
```

## ⚡ Code Generation Rules
### Server Components
```typescript
// Pattern: [feature]/page.tsx
export default async function Page() {
  const data = await prisma.entity.findMany({
    cache: { revalidate: 3600 },
    select: { /* explicit fields */ }
  });
  
  return <ClientComponent data={data} />;
}
```

### Client Components
```typescript
'use client'; // Only when absolutely needed

export function InteractiveUI({ data }) {
  const [state] = useStore(); // Zustand pattern
  return (
    <ErrorBoundary fallback={<ErrorToast />}>
      <form action={serverAction}>
        {/* shadcn/ui components */}
      </form>
    </ErrorBoundary>
  );
}
```

### Security Protocols
```diff
+ Required Headers:
  Content-Security-Policy: default-src 'self'
  X-Frame-Options: DENY
  Permissions-Policy: interest-cohort=()

+ Validation Chain:
  User Input → Zod Schema → Prisma Typing → DB Layer
```

## 📈 Performance Checklist
```fix
✓ Dynamic imports for >50KB components
✓ AVIF images via next/image
✓ Font subsetting in /public/fonts
✓ Lazy hydration for non-critical UI
✓ Route-based code splitting
```

## 🤖 AI Directives
```python
def respond(prompt):
    """Must include in all responses:"""
    - Zod validation schema with types
    - Server/client component split
    - Prisma best practices
    - NextAuth session integration
    - Tailwind mobile-first classes
    - Atomic design structure
    - Error boundaries + toast feedback
```

## 🚨 Critical Workflows
```bash
# After schema changes:
$ prisma generate && prisma migrate dev

# Pre-commit checks:
$ tsc --noEmit && eslint . --fix

# Production profiling:
$ next build --profile --debug
```

## 🚩 Key Reminders
1. All images → `next/image` with sizes prop  
2. User content → sanitize-html processing  
3. PDF generation → jspdf auto-layout  
4. Data tables → shadcn/ui components  
5. Icons → lucide-react imports  
6. Dates → date-fns UTC handling  

🔗 **Documentation Links**  
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)  
- [Prisma MongoDB Guide](https://www.prisma.io/docs/guides/database/mongodb)  
- [NextAuth Security](https://next-auth.js.org/security)  

---

### 📝 Enhanced Notes
- **Visual Hierarchy**: Improved with consistent emoji markers and spacing.
- **Code Fences**: Updated for clarity and context.
- **Negative Space**: Added for better readability.
- **Priority Lists**: Reordered for logical flow.
- **Strict Patterns**: Reinforced allow/deny rules.
- **Code Samples**: Context-aware and actionable.
- **References**: Linked to official documentation for deeper insights.