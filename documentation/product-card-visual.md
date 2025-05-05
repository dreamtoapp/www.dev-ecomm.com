# Product Card with Rating and Wishlist - Visual Design

```
┌─────────────────────────────────────┐
│                                ♥︎  ✓ │
│                                     │
│                                     │
│                                     │
│          PRODUCT IMAGE              │
│                                     │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ فستان أنيق للسهرات                  │
│                                     │
│ فستان أنيق مناسب للحفلات والمناسبات │
│ الخاصة، متوفر بعدة ألوان وأحجام     │
│                                     │
│ ★★★★☆  4.2 (24 تقييم)              │
│                                     │
│ $99.99                              │
│                                     │
│        [-]    2    [+]              │
│                                     │
├─────────────────────────────────────┤
│       [أضف إلى السلة]               │
└─────────────────────────────────────┘
```

## Key Features Added

### 1. Wishlist Heart Icon (♥︎)
- Located in the top-right corner
- Toggles between outlined (♡) and filled (♥) states
- Red color when active, gray when inactive
- Subtle animation on click

### 2. Rating System
- Five stars showing the average product rating
- Filled stars (★) for whole ratings
- Half-filled star (★) for partial ratings
- Empty stars (☆) for remaining positions
- Numerical rating (4.2) displayed next to stars
- Review count (24 تقييم) in parentheses

## User Interactions

### Wishlist Functionality:
- Click heart icon to add/remove from wishlist
- Heart fills with red color when added
- Subtle pulse animation confirms action
- Wishlist items persist between sessions
- Syncs with user account when logged in

### Rating Functionality:
- Users can view the average rating at a glance
- Clicking on stars opens review modal (optional)
- Rating summary shows distribution of ratings
- Users can filter products by rating

## Mobile Responsiveness

The design adapts to smaller screens:
- Heart icon remains accessible
- Stars scale proportionally
- Text maintains readability
- Touch targets remain adequately sized

## Color Scheme

- Heart icon: Gray (inactive), Red #e11d48 (active)
- Stars: Gold/Amber #f59e0b (filled), Light Gray #d1d5db (empty)
- Text: Dark for product name, Medium for description, Light for secondary info
- Buttons: Primary brand color with appropriate contrast

## Animation Details

- Heart icon: Subtle pulse and fill transition (300ms)
- Add to cart: Slight scale and shadow increase
- Hover effects: Gentle brightness increase for interactive elements
