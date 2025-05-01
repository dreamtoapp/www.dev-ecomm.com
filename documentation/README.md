# www.ammawag.com

## 📋 Project Overview

A modern e-commerce platform designed for the Saudi Arabian market, focusing on user-friendly interface, cultural relevance, and efficient order management.

## 🎯 Project Scope

An advanced e-commerce platform with three main components:

### 🛍️ Customer Platform
- Product browsing and search with filters
- Shopping cart with local storage
- Order placement and tracking
- Real-time delivery updates
- Payment integration
- User profile management
- Order history
- Favorite products
- Social sharing capabilities
- Real-time notifications

### 📊 Admin Dashboard
- Sales analytics and reporting
- Product management
  - Add/modify/delete products
  - Inventory control
  - Stock management
- Order management
- Customer management
- Promotion and discount management
- Driver assignment
- Real-time order tracking
- User role management
- Performance metrics
- Financial reporting

### 🚗 Driver Platform
- Order pickup and delivery
- Real-time location tracking
- Route optimization
- Delivery status updates
- Earnings tracking
- Profile management
- Order history
- Location-based assignments

## 🏗️ Project Structure

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

## 📝 Coding Standards

### File Naming
- **All Files:** `kebab-case.ts` (e.g., `product-list.tsx`, `order-details.tsx`, `fetch-products.ts`)
- **Components:** `PascalCase.tsx` (e.g., `ProductCard.tsx`, `OrderItem.tsx`)
- **Hooks:** `camelCase.ts` prefixed with 'use' (e.g., `useCart.ts`, `useAuth.ts`)
- **Types:** `PascalCase.ts` suffixed with 'Type' or 'Props' (e.g., `ProductType.ts`, `CardProps.ts`)
- **Constants:** `SCREAMING_SNAKE_CASE.ts` (e.g., `API_ENDPOINTS.ts`, `ROUTE_PATHS.ts`)

### Variable Naming
- **React Components:** PascalCase (e.g., `ProductList`, `OrderDetails`)
- **Variables:** camelCase (e.g., `userName`, `cartItems`)
- **Boolean Variables:** prefixed with 'is', 'has', 'should' (e.g., `isLoading`, `hasItems`)
- **Constants:** SCREAMING_SNAKE_CASE (e.g., `MAX_ITEMS`, `API_KEY`)
- **Private Variables:** prefixed with underscore (e.g., `_privateVar`)
- **Arrays:** plural nouns in camelCase (e.g., `products`, `orderItems`)

### Function Naming
- **Regular Functions:** camelCase, verb + noun (e.g., `getUser`, `calculateTotal`)
- **Event Handlers:** camelCase, prefixed with 'handle' (e.g., `handleSubmit`, `handleClick`)
- **Async Functions:** camelCase, prefixed with verb (e.g., `fetchData`, `updateUser`)
- **React Event Props:** camelCase, prefixed with 'on' (e.g., `onClick`, `onSubmit`)
- **Context Providers:** PascalCase, suffixed with 'Provider' (e.g., `CartProvider`)
- **Custom Hooks:** camelCase, prefixed with 'use' (e.g., `useLocalStorage`)

### Database Schema
- **Models:** PascalCase singular (e.g., `User`, `Product`)
- **Fields:** camelCase (e.g., `firstName`, `createdAt`)
- **Foreign Keys:** camelCase, suffixed with 'Id' (e.g., `userId`, `productId`)
- **Junction Tables:** PascalCase, combined names (e.g., `UserProduct`)

## 🛠️ Tech Stack

- **Framework:** Next.js 15.2.1
- **Language:** TypeScript
- **Database:** Prisma with MongoDb
- **Styling:** TailwindCSS
- **Authentication:** NextAuth
- **UI Components:** 
  - shadcn UI
  - Framer Motion
  - Sonner
  - SweetAlert2
- **Maps:** Google Maps & Leaflet
- **Real-time:** Pusher
- **PDF Generation:** jsPDF, PDFMake
- **State Management:** Zustand

## 🔐 Security

- All API keys should be stored in environment variables
- Authentication is handled through NextAuth
- API routes are protected with appropriate middleware
- Form validation using Zod
- Secure payment processing
- Data encryption for sensitive information
- Rate limiting for API endpoints
- CORS configuration
- XSS protection

## 📱 Features

- Responsive design
- Dark/Light mode
- Real-time updates
- Map integration
- PDF generation
- QR code generation
- Image upload with Cloudinary
- Email notifications
- Social sharing
- Performance optimization
- SEO optimization
- Analytics integration
- Caching strategies

## 🔄 Future Updates

The following features are planned for future implementation:
- Multi-language support (Arabic/English)
- Advanced analytics dashboard
- Mobile app integration
- AI-powered recommendations
- Advanced search with filters
- Data backup and migration procedures
- Performance monitoring
- Automated testing suite

## 🚀 Quality Assurance

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
   - Screen reader support
   - Color contrast
   - Aria labels

---
Project maintained by DreamToApp team
