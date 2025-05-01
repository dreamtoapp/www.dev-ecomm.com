import { faker } from '@faker-js/faker/locale/ar'; // Use Arabic locale

import { generateOrderNumber } from '../app/(e-comm)/checkout/helpers/orderNumber';
import db from '../lib/prisma';

// Create multiple fashion suppliers for more realistic data
async function createFashionSuppliers() {
  const suppliers = [
    {
      name: "Fashion Arabia",
      slug: "fashion-arabia",
      logo: "https://images.unsplash.com/photo-1614403188927-5f183f0ed756?w=500&q=80",
      email: "contact@fashionarabia.com",
      phone: "+966500000000",
      address: "Riyadh, Saudi Arabia",
      type: "company"
    },
    {
      name: "Elegance Boutique",
      slug: "elegance-boutique",
      logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80",
      email: "info@eleganceboutique.com",
      phone: "+966511111111",
      address: "Jeddah, Saudi Arabia",
      type: "boutique"
    },
    {
      name: "Urban Style",
      slug: "urban-style",
      logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80",
      email: "support@urbanstyle.com",
      phone: "+966522222222",
      address: "Dammam, Saudi Arabia",
      type: "company"
    },
    {
      name: "Luxury Trends",
      slug: "luxury-trends",
      logo: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&q=80",
      email: "hello@luxurytrends.com",
      phone: "+966533333333",
      address: "Mecca, Saudi Arabia",
      type: "premium"
    }
  ];

  const createdSuppliers = [];
  for (const supplier of suppliers) {
    const createdSupplier = await db.supplier.create({ data: supplier });
    createdSuppliers.push(createdSupplier);
  }

  log(`Created ${createdSuppliers.length} fashion suppliers`);
  return createdSuppliers;
}

// High-quality fashion product images from Unsplash - expanded collection
const fashionImages = {
  menClothing: [
    // Formal Wear
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80", // Men's Suit
    "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=500&q=80", // Formal Shirt
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80", // Dress Pants
    "https://images.unsplash.com/photo-1594938374182-a57061dba5a3?w=500&q=80", // Blazer
    "https://images.unsplash.com/photo-1611505908502-5b67e53e3a76?w=500&q=80", // Tie

    // Casual Wear
    "https://images.unsplash.com/photo-1618001789159-ffffe6f96ef2?w=500&q=80", // Casual Shirt
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80", // Premium T-shirt
    "https://images.unsplash.com/photo-1584865288642-42078afe6942?w=500&q=80", // Jeans
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80", // Jacket
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80", // Hoodie

    // Sportswear
    "https://images.unsplash.com/photo-1581612129334-551ccd2c6a8a?w=500&q=80", // Athletic Shirt
    "https://images.unsplash.com/photo-1565115021788-6d3f1ade4980?w=500&q=80", // Sports Shorts
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80", // Running Shoes
    "https://images.unsplash.com/photo-1616877562265-ef7b99c8b780?w=500&q=80", // Track Pants
    "https://images.unsplash.com/photo-1547638375-ebf04735d792?w=500&q=80", // Sports Jacket

    // Traditional Wear
    "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?w=500&q=80", // Thobe
    "https://images.unsplash.com/photo-1589623033547-8f5a9f9b7e1e?w=500&q=80", // Bisht
    "https://images.unsplash.com/photo-1588953936179-5a7a0e730a1d?w=500&q=80", // Shemagh
    "https://images.unsplash.com/photo-1591222566903-f9c4b9edf8ec?w=500&q=80", // Agal
    "https://images.unsplash.com/photo-1598449426314-8b02525e8733?w=500&q=80", // Embroidered Vest
  ],
  womenClothing: [
    // Dresses
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&q=80", // Elegant Dress
    "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500&q=80", // Cocktail Dress
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80", // Summer Dress
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&q=80", // Evening Gown
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80", // Maxi Dress

    // Tops & Blouses
    "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=500&q=80", // Blouse
    "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500&q=80", // Silk Top
    "https://images.unsplash.com/photo-1559334417-a57bd929f003?w=500&q=80", // Casual Top
    "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=500&q=80", // Printed Shirt
    "https://images.unsplash.com/photo-1533659828870-95ee305cee3e?w=500&q=80", // Cardigan

    // Bottoms
    "https://images.unsplash.com/photo-1587855049254-351f4e55fe02?w=500&q=80", // Skirt
    "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=500&q=80", // Pants
    "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&q=80", // Jeans
    "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80", // Shorts
    "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=500&q=80", // Leggings

    // Traditional & Modest Wear
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&q=80", // Hijab
    "https://images.unsplash.com/photo-1548624149-f9293404c2da?w=500&q=80", // Abaya
    "https://images.unsplash.com/photo-1578895101408-1a6a4f23795a?w=500&q=80", // Modest Dress
    "https://images.unsplash.com/photo-1605025207886-1d741d3a4f1d?w=500&q=80", // Kaftan
    "https://images.unsplash.com/photo-1577535967695-2c48bb5afae5?w=500&q=80", // Embroidered Shawl
  ],
  accessories: [
    // Bags
    "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=500&q=80", // Handbag
    "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&q=80", // Tote Bag
    "https://images.unsplash.com/photo-1575891467811-070df21bd04a?w=500&q=80", // Backpack
    "https://images.unsplash.com/photo-1601369581450-d8a57076f2cb?w=500&q=80", // Clutch
    "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&q=80", // Crossbody Bag

    // Jewelry
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80", // Necklace
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80", // Earrings
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&q=80", // Bracelet
    "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=500&q=80", // Ring
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&q=80", // Gold Jewelry

    // Watches & Eyewear
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&q=80", // Watch
    "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&q=80", // Sunglasses
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80", // Glasses
    "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=500&q=80", // Luxury Watch
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80", // Designer Sunglasses

    // Other Accessories
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80", // Scarf
    "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=500&q=80", // Belt
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", // Hat
    "https://images.unsplash.com/photo-1613525850352-1e6f3fdf4b59?w=500&q=80", // Wallet
    "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80", // Hair Accessories
  ],
  footwear: [
    // Men's Footwear
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80", // Formal Shoes
    "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&q=80", // Sneakers
    "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&q=80", // Boots
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80", // Athletic Shoes
    "https://images.unsplash.com/photo-1564482565306-7b5aa35d2d9d?w=500&q=80", // Sandals

    // Women's Footwear
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80", // Heels
    "https://images.unsplash.com/photo-1518049362265-d5b2a6b00b37?w=500&q=80", // Flats
    "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&q=80", // Boots
    "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=500&q=80", // Sandals
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&q=80", // Sneakers
  ]
};

// Fashion categories with Arabic translations
type CategoryType = "menClothing" | "womenClothing" | "accessories" | "footwear";

interface Category {
  name: string;
  nameEn: string;
  type: CategoryType;
}

const categories: Category[] = [
  { name: "ملابس رجالية", nameEn: "Men's Clothing", type: "menClothing" },
  { name: "ملابس نسائية", nameEn: "Women's Clothing", type: "womenClothing" },
  { name: "إكسسوارات", nameEn: "Accessories", type: "accessories" },
  { name: "أحذية", nameEn: "Footwear", type: "footwear" }
];

// Brand names (mix of international and local)
const fashionBrands = [
  // International Luxury Brands
  "جوتشي", // Gucci
  "لويس فيتون", // Louis Vuitton
  "برادا", // Prada
  "شانيل", // Chanel
  "ديور", // Dior
  "فيرساتشي", // Versace
  "بربري", // Burberry
  "فندي", // Fendi

  // International Casual Brands
  "زارا", // Zara
  "H&M",
  "نايك", // Nike
  "أديداس", // Adidas
  "بوما", // Puma
  "ريبوك", // Reebok
  "مانجو", // Mango
  "جاب", // Gap

  // Local/Regional Brands
  "نسك", // Nask
  "فتيحي", // Fatihi
  "الصايغ", // Al Sayegh
  "بيت الكندورة", // Bait Al Kandora
  "حجاب ستايل", // Hijab Style
  "عبايتي", // Abayati
  "الجابر", // Al Jaber
  "الشماغ الملكي" // Royal Shemagh
];

// Get random image based on category type
const getFashionImage = (type: CategoryType): string => {
  return faker.helpers.arrayElement(fashionImages[type]);
};

// Generate realistic price ranges based on category and quality
const generatePrice = (category: string, isLuxury: boolean): number => {
  const luxuryMultiplier = isLuxury ? 2.5 : 1;

  switch (category) {
    case "accessories":
      return faker.number.int({ min: 50, max: 800 }) * luxuryMultiplier;
    case "menClothing":
      return faker.number.int({ min: 100, max: 1200 }) * luxuryMultiplier;
    case "womenClothing":
      return faker.number.int({ min: 150, max: 1500 }) * luxuryMultiplier;
    case "footwear":
      return faker.number.int({ min: 200, max: 1000 }) * luxuryMultiplier;
    default:
      return faker.number.int({ min: 80, max: 500 }) * luxuryMultiplier;
  }
};

// Generate realistic product sizes based on category
const generateSizes = (category: CategoryType): string => {
  switch (category) {
    case "menClothing":
    case "womenClothing":
      return faker.helpers.arrayElement(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
    case "footwear":
      return faker.helpers.arrayElement(['36', '37', '38', '39', '40', '41', '42', '43', '44', '45']);
    case "accessories":
      return faker.helpers.arrayElement(['One Size', 'S', 'M', 'L']);
    default:
      return 'One Size';
  }
};

// Generate detailed product description
const generateProductDetails = (category: CategoryType, brand: string, isLuxury: boolean): string => {
  const quality = isLuxury ?
    faker.helpers.arrayElement(['Premium', 'Luxury', 'High-end', 'Designer', 'Exclusive']) :
    faker.helpers.arrayElement(['Quality', 'Standard', 'Classic', 'Everyday', 'Casual']);

  const material = category === "footwear" ?
    faker.helpers.arrayElement(['Leather', 'Suede', 'Canvas', 'Synthetic', 'Textile']) :
    faker.helpers.arrayElement(['Cotton', 'Silk', 'Linen', 'Polyester', 'Wool', 'Cashmere', 'Denim']);

  const care = faker.helpers.arrayElement([
    'Machine washable',
    'Hand wash only',
    'Dry clean only',
    'Wipe with damp cloth'
  ]);

  const features = [];
  for (let i = 0; i < faker.number.int({ min: 2, max: 5 }); i++) {
    features.push(faker.commerce.productAdjective());
  }

  return `${quality} ${material} ${category === "footwear" ? "footwear" : "garment"} by ${brand}.
Features: ${features.join(', ')}.
${faker.commerce.productDescription()}
Care instructions: ${care}.`;
};

// Utility logging function with timestamps
const log = (message: string): void => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

// Helper: Parse command-line arguments with default values
function getArgValue(argName: string, defaultValue: number): number {
  const arg = process.argv.find((arg) => arg.startsWith(`--${argName}=`));
  if (arg) {
    const value = parseInt(arg.split("=")[1], 10);
    if (!isNaN(value) && value > 0) {
      return value;
    }
  }
  return defaultValue;
}

// Generate fashion products with multiple suppliers
async function generateFashionProducts(count: number, supplierId: string) {
  log(`Generating ${count} fashion products...`);

  // Get all suppliers if we want to distribute products among them
  const suppliers = await db.supplier.findMany();

  const products = [];
  for (let i = 0; i < count; i++) {
    const category = faker.helpers.arrayElement(categories);
    const brand = faker.helpers.arrayElement(fashionBrands);
    const isLuxury = fashionBrands.indexOf(brand) < 8; // First 8 brands are luxury
    const price = generatePrice(category.type, isLuxury);

    // Create product name with brand and category
    const adjective = faker.commerce.productAdjective();
    const name = `${brand} ${adjective} ${category.nameEn}`;

    // Randomly assign to a supplier (or use the provided supplierId)
    const productSupplierId = suppliers.length > 1 ?
      faker.helpers.arrayElement(suppliers).id :
      supplierId;

    products.push({
      name: name,
      slug: name.toLowerCase().replace(/ /g, '-'),
      price: price,
      size: generateSizes(category.type),
      details: generateProductDetails(category.type, brand, isLuxury),
      imageUrl: getFashionImage(category.type),
      supplierId: productSupplierId,
      type: category.type,
      published: faker.datatype.boolean(0.9), // 90% chance to be published
      outOfStock: faker.datatype.boolean(0.15), // 15% chance to be out of stock
    });

    if ((i + 1) % 100 === 0) {
      log(`Generated ${i + 1} products`);
    }
  }

  try {
    await db.product.createMany({ data: products });
    log(`Successfully created ${count} fashion products`);
  } catch (error) {
    log(`Error creating products: ${error}`);
    throw error;
  }
}

// Generate orders with realistic fashion shopping patterns
async function generateFashionOrders(count: number, shiftId: string) {
  log(`Generating ${count} fashion orders...`);

  const users = await db.user.findMany();
  const products = await db.product.findMany();
  const drivers = await db.driver.findMany();

  if (!users.length || !products.length) {
    throw new Error("No users or products found. Please seed users and products first.");
  }

  // Group products by category to create realistic shopping patterns
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.type || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {} as Record<string, any[]>);

  for (let i = 0; i < count; i++) {
    const orderDate = faker.date.past({ years: 1 });

    // Determine shopping pattern (e.g., single category or mixed)
    const isSingleCategoryOrder = faker.datatype.boolean(0.7); // 70% chance of buying from same category

    let selectedProducts = [];
    if (isSingleCategoryOrder) {
      // Select a random category and pick items from it
      const category = faker.helpers.arrayElement(Object.keys(productsByCategory));
      const categoryProducts = productsByCategory[category];
      if (categoryProducts && categoryProducts.length) {
        const itemCount = faker.number.int({ min: 1, max: 4 });
        selectedProducts = faker.helpers.arrayElements(categoryProducts, Math.min(itemCount, categoryProducts.length));
      }
    } else {
      // Mixed category order - pick random products
      const itemCount = faker.number.int({ min: 2, max: 6 });
      selectedProducts = faker.helpers.arrayElements(products, itemCount);
    }

    // If no products were selected (unlikely), skip this iteration
    if (selectedProducts.length === 0) {
      log(`Warning: No products selected for order ${i + 1}. Skipping.`);
      continue;
    }

    // Create order items with realistic quantities
    const items = selectedProducts.map(product => {
      // People often buy multiple of the same item in fashion (different sizes, colors, etc.)
      const isMultipleQuantity = faker.datatype.boolean(0.3); // 30% chance of buying multiple
      const quantity = isMultipleQuantity ? faker.number.int({ min: 2, max: 4 }) : 1;

      return {
        productId: product.id,
        quantity: quantity,
        price: product.price
      };
    });

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    try {
      const orderNumber = await generateOrderNumber();
      const user = faker.helpers.arrayElement(users);

      // Assign a driver randomly (if available)
      const driverId = drivers.length > 0 ?
        faker.helpers.arrayElement(drivers).id :
        undefined;

      // Create more realistic order status distribution
      const orderStatus = faker.helpers.weightedArrayElement([
        { weight: 0.2, value: "Pending" },
        { weight: 0.15, value: "InWay" },
        { weight: 0.5, value: "Delivered" },
        { weight: 0.15, value: "canceled" }
      ]);

      await db.order.create({
        data: {
          orderNumber,
          customerId: user.id,
          customerName: user.name || undefined,
          driverId: driverId,
          status: orderStatus,
          amount: totalAmount,
          items: {
            create: items
          },
          latitude: faker.location.latitude().toString(),
          longitude: faker.location.longitude().toString(),
          isTripStart: orderStatus === "InWay",
          resonOfcancel: orderStatus === "canceled" ? faker.helpers.arrayElement([
            "Customer requested cancellation",
            "Items out of stock",
            "Delivery address issue",
            "Payment problem",
            "Order placed by mistake"
          ]) : undefined,
          shiftId: shiftId,
          createdAt: orderDate,
          updatedAt: faker.date.between({ from: orderDate, to: new Date() })
        }
      });

      if ((i + 1) % 50 === 0) {
        log(`Generated ${i + 1} orders`);
      }
    } catch (error) {
      log(`Error creating order ${i + 1}: ${error}`);
      continue;
    }
  }

  log(`Successfully generated ${count} fashion orders`);
}

// Create shifts for orders
async function createShifts() {
  log('Creating shifts...');
  try {
    const shifts = await db.shift.findMany();

    if (shifts.length > 0) {
      log(`Using existing shifts (${shifts.length} found)`);
      return shifts[0];
    }

    const morningShift = await db.shift.create({
      data: {
        name: 'صباح',
        startTime: '09:00',
        endTime: '17:00',
      }
    });

    await db.shift.create({
      data: {
        name: 'مساء',
        startTime: '17:00',
        endTime: '01:00',
      }
    });

    log(`Created shifts successfully`);
    return morningShift;
  } catch (error) {
    log(`Error creating shifts: ${error}`);
    throw error;
  }
}

// High-quality slider/banner images for the e-commerce homepage
const sliderImages = [
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80", // Fashion banner with models
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80", // Shopping mall with fashion stores
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80", // Fashion model in urban setting
  "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&q=80", // Luxury fashion items
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80", // Fashion accessories display
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80", // Clothing rack with colorful items
  "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=1200&q=80", // Seasonal fashion sale
  "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=1200&q=80", // Luxury shopping bags
];

// Generate slider images for the homepage
async function generateSliderImages() {
  log(`Generating slider images for the homepage...`);

  try {
    const promotions = [];

    for (const imageUrl of sliderImages) {
      promotions.push({
        title: faker.commerce.productAdjective() + " " + faker.commerce.department() + " Collection",
        description: faker.commerce.productDescription(),
        imageUrl: imageUrl,
        active: true,
      });
    }

    await db.promotion.createMany({ data: promotions });
    log(`Successfully created ${promotions.length} slider images`);
  } catch (error) {
    log(`Error creating slider images: ${error}`);
    throw error;
  }
}

// Clean up existing data before seeding
async function cleanupExistingData(shouldCleanup: boolean) {
  if (!shouldCleanup) {
    log("Skipping data cleanup as requested");
    return;
  }

  log("Cleaning up existing data before seeding...");

  try {
    // Delete in the correct order to respect foreign key constraints
    log("Deleting existing orders and order items...");
    await db.orderItem.deleteMany({});
    await db.order.deleteMany({});

    log("Deleting existing products...");
    await db.product.deleteMany({});

    log("Deleting existing suppliers...");
    await db.supplier.deleteMany({});

    log("Deleting existing promotions...");
    await db.promotion.deleteMany({});

    log("Data cleanup completed successfully");
  } catch (error) {
    log(`Error during data cleanup: ${error}`);
    throw error;
  }
}

// Main seeding function
async function main() {
  // Parse command line arguments
  const productCount = getArgValue("products", 1000);
  const orderCount = getArgValue("orders", 500);
  const shouldCleanup = process.argv.includes("--cleanup") || process.argv.includes("-c");

  try {
    // Clean up existing data if requested
    await cleanupExistingData(shouldCleanup);

    // Create or get existing shift
    const shift = await db.shift.findFirst() || await createShifts();
    log(`Using shift: ${shift.name} (${shift.id})`);

    // Create suppliers
    const suppliers = await createFashionSuppliers();
    const mainSupplier = suppliers[0];

    // Generate products
    await generateFashionProducts(productCount, mainSupplier.id);

    // Generate slider images for the homepage
    await generateSliderImages();

    // Generate orders
    await generateFashionOrders(orderCount, shift.id);

    log("Fashion seed data generation completed successfully!");
  } catch (error) {
    log(`Seed data generation failed: ${error}`);
    process.exit(1);
  }
}

// Run the seeding
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { cleanupExistingData, generateFashionOrders, generateFashionProducts, generateSliderImages };
