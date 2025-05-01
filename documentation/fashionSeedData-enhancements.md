# FashionSeedData.ts Enhancements

## Overview

The `fashionSeedData.ts` file has been enhanced to provide high-quality fashion e-commerce test data with proper relationships according to the Prisma schema. The enhancements focus on creating realistic fashion products, orders, and slider images for the homepage.

## Key Enhancements

### 1. Data Cleanup Functionality

- Added a `cleanupExistingData()` function that removes existing data before seeding
- Implemented proper deletion order to respect foreign key constraints
- Added command-line flag `--cleanup` or `-c` to control whether to clean up existing data

### 2. Enhanced Fashion Product Data

- Expanded the collection of high-quality fashion product images from Unsplash
- Added more diverse product categories including footwear
- Improved product details with realistic descriptions, materials, and care instructions
- Enhanced price generation based on category and luxury status
- Added proper size generation based on product type

### 3. Multiple Suppliers

- Created multiple fashion suppliers instead of just one
- Added variety in supplier types (company, boutique, premium)
- Distributed products among suppliers for more realistic data

### 4. Realistic Order Generation

- Implemented shopping patterns (single category vs. mixed category orders)
- Added more realistic order status distribution
- Included cancellation reasons for canceled orders
- Created proper relationships between orders, products, and users

### 5. Slider Images for Homepage

- Added generation of high-quality slider/banner images for the homepage
- Created proper entries in the Promotion model used by the slider component
- Ensured images are properly sized and optimized for the slider

### 6. Command-Line Arguments

- Enhanced command-line argument handling for better control
- Added options to specify product count, order count, and cleanup behavior
- Improved logging with timestamps for better visibility

## Usage

Run the script with the following options:

```bash
# Basic usage (uses defaults: 1000 products, 500 orders, no cleanup)
npx tsx utils/fashionSeedData.ts

# With cleanup (removes existing data first)
npx tsx utils/fashionSeedData.ts --cleanup

# Specify product and order counts
npx tsx utils/fashionSeedData.ts --products=100 --orders=50

# Combined options
npx tsx utils/fashionSeedData.ts --cleanup --products=100 --orders=50
```

## Data Quality

The enhanced seed data provides:

1. **High-quality images** - All product and slider images are high-resolution photos from Unsplash
2. **Realistic product details** - Products have proper descriptions, materials, and care instructions
3. **Proper relationships** - All data follows the Prisma schema relationships
4. **Diverse categories** - Products span multiple fashion categories
5. **Realistic pricing** - Prices vary based on category and luxury status
6. **Proper order patterns** - Orders reflect realistic shopping behaviors

This enhanced data is ideal for testing the e-commerce platform's performance, UI components, and business logic with realistic fashion products and orders.
