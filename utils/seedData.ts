import { faker } from "@faker-js/faker/locale/ar"; // Use Arabic locale
import db from "../lib/prisma";
import { generateOrderNumber } from "../app/(e-comm)/checkout/helpers/orderNumber";

// Define an array of real image URLs (from Unsplash or Pexels)
const realImages = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80", // Food
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80", // Drink
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80", // Product
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80", // Tech
  "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80", // Nature
];

// Helper function to randomly pick an image from the list
const getRealImage = (): string => {
  return faker.helpers.arrayElement(realImages);
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

// Clear existing data in proper relational order
async function clearData(): Promise<void> {
  try {
    log("Clearing existing data...");
    // Delete dependent records first
    await db.reply.deleteMany();
    await db.contactSubmission.deleteMany();
    await db.newLetter.deleteMany();
    await db.orderItem.deleteMany();
    await db.order.deleteMany();
    await db.locationHistory.deleteMany();
    await db.driver.deleteMany();
    await db.promotion.deleteMany();
    await db.product.deleteMany();
    await db.supplier.deleteMany();
    await db.user.deleteMany();
    await db.company.deleteMany();
    await db.shift.deleteMany();
    log("Existing data cleared successfully.");
  } catch (error) {
    throw new Error(`Error clearing data: ${error}`);
  }
}

// Seed Shifts and return them for later use
async function seedShifts(): Promise<{ dayShift: any; nightShift: any }> {
  try {
    log("Generating fake shifts...");
    const dayShift = await db.shift.create({
      data: {
        name: "صباح",
        startTime: "06:00",
        endTime: "18:00",
      },
    });
    const nightShift = await db.shift.create({
      data: {
        name: "مساء",
        startTime: "18:00",
        endTime: "06:00",
      },
    });
    log("Generated 2 fake shifts (Day and Night).");
    return { dayShift, nightShift };
  } catch (error) {
    throw new Error(`Error seeding shifts: ${error}`);
  }
}

// Seed a fake company
async function seedCompany(): Promise<void> {
  try {
    log("Generating fake company...");
    await db.company.create({
      data: {
        fullName: "جون دو وشركاه", // Example Arabic company name
        email: "john.doe@example.com",
        phoneNumber: faker.phone.number(),
        profilePicture: getRealImage(), // Use real image URL
        bio: "نحن شركة تطوير برمجيات.",
        taxNumber: "1234567890",
        taxQrImage: "https://example.com/tax-qr.png",
        twitter: "https://twitter.com/company",
        linkedin: "https://linkedin.com/company",
        instagram: "https://instagram.com/company",
        facebook: "https://facebook.com/company",
        website: "https://example.com",
      },
    });
    log("Generated 1 fake company.");
  } catch (error) {
    throw new Error(`Error seeding company: ${error}`);
  }
}

// Seed suppliers
async function seedSuppliers(count: number): Promise<void> {
  try {
    log(`Generating ${count} fake suppliers...`);
    for (let i = 0; i < count; i++) {
      await db.supplier.create({
        data: {
          name: faker.company.name(),
          logo: getRealImage(), // Use real image URL
          publicId: faker.string.uuid(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          address: faker.location.streetAddress(),
        },
      });
    }
    log(`Generated ${count} fake suppliers.`);
  } catch (error) {
    throw new Error(`Error seeding suppliers: ${error}`);
  }
}

// Seed products (now including details and publicId fields)
async function seedProducts(count: number): Promise<void> {
  try {
    log(`Generating ${count} fake products...`);
    const allSuppliers = await db.supplier.findMany({ select: { id: true } });
    if (allSuppliers.length === 0) {
      throw new Error("No suppliers available to assign to products.");
    }
    for (let i = 0; i < count; i++) {
      const supplier = faker.helpers.arrayElement(allSuppliers);
      await db.product.create({
        data: {
          name: faker.commerce.productName(),
          supplierId: supplier.id,
          price: parseFloat(faker.commerce.price()),
          size: faker.helpers.arrayElement(["1L", "500ml", "250ml"]),
          details: faker.lorem.sentence(), // Added details field
          imageUrl: getRealImage(), // Use real image URL
          publicId: faker.string.uuid(), // Added publicId field
          published: faker.datatype.boolean(),
        },
      });
    }
    log(`Generated ${count} fake products.`);
  } catch (error) {
    throw new Error(`Error seeding products: ${error}`);
  }
}

// Seed users (customers) with unique phone numbers
async function seedUsers(count: number): Promise<void> {
  try {
    log(`Generating ${count} fake users...`);
    const usedPhones = new Set<string>(); // Track used phone numbers

    for (let i = 0; i < count; i++) {
      let phone: string;
      let attempts = 0;

      // Generate a unique phone number
      do {
        phone = faker.phone.number();
        attempts++;
        if (attempts > 100) {
          throw new Error(
            "Failed to generate a unique phone number after 100 attempts."
          );
        }
      } while (usedPhones.has(phone));

      usedPhones.add(phone); // Mark phone as used

      try {
        await db.user.create({
          data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone, // Unique phone number
            password: faker.internet.password(), // Remember: hash in production!
            role: faker.helpers.arrayElement(["customer", "admin"]),
          },
        });
      } catch (error) {
        // if (error.code === "P2002" && error.meta?.target?.includes("phone")) {
        //   log(`Duplicate phone number detected: ${phone}. Skipping...`);
        //   continue; // Skip this user and continue seeding
        // }
        throw error; // Re-throw other errors
      }
    }
    log(`Generated ${count} fake users.`);
  } catch (error) {
    throw new Error(`Error seeding users: ${error}`);
  }
}

// Seed drivers and their location histories
async function seedDrivers(count: number): Promise<void> {
  try {
    log(`Generating ${count} fake drivers...`);
    for (let i = 0; i < count; i++) {
      const driver = await db.driver.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          imageUrl: getRealImage(), // Use real image URL
        },
      });
      // Create location history for the driver
      await db.locationHistory.create({
        data: {
          driverId: driver.id,
          latitude: parseFloat(faker.location.latitude().toString()),
          longitude: parseFloat(faker.location.longitude().toString()),
        },
      });
    }
    log(`Generated ${count} fake drivers.`);
  } catch (error) {
    throw new Error(`Error seeding drivers: ${error}`);
  }
}

// Seed orders along with order items
async function seedOrders(
  count: number,
  dayShift: any,
  nightShift: any
): Promise<void> {
  try {
    log(`Generating ${count} fake orders...`);
    const allUsers = await db.user.findMany({ select: { id: true } });
    const allDrivers = await db.driver.findMany({ select: { id: true } });
    const allProducts = await db.product.findMany({
      select: { id: true, price: true },
    });

    if (allUsers.length === 0 || allProducts.length === 0) {
      throw new Error("Not enough users or products to create orders.");
    }

    for (let i = 0; i < count; i++) {
      const customer = faker.helpers.arrayElement(allUsers);
      const driver = faker.helpers.arrayElement(allDrivers);
      const orderNumber = await generateOrderNumber();

      // Create order items
      const itemCount: number = faker.number.int({ min: 1, max: 3 });
      const items = Array.from({ length: itemCount }, () => {
        const product = faker.helpers.arrayElement(allProducts);
        const quantity = faker.number.int({ min: 1, max: 5 });
        const price = product.price;
        return {
          productId: product.id,
          quantity,
          price,
        };
      });

      // Calculate total amount for the order
      const totalAmount = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Create order with relational data
      const order = await db.order.create({
        data: {
          orderNumber,
          customerId: customer.id,
          driverId: driver.id,
          status: faker.helpers.arrayElement([
            "Pending",
            "Delivered",
            "InWay",
            "canceled",
          ]),
          amount: totalAmount,
          shiftId: faker.helpers.arrayElement([dayShift.id, nightShift.id]),
          items: {
            create: items,
          },
        },
      });
      log(`Generated order: ${order.orderNumber}`);
    }
    log(`Generated ${count} fake orders.`);
  } catch (error) {
    throw new Error(`Error seeding orders: ${error}`);
  }
}

// Seed promotions
async function seedPromotions(count: number): Promise<void> {
  try {
    log(`Generating ${count} fake promotions...`);
    const allProducts = await db.product.findMany({ select: { id: true } });
    if (allProducts.length === 0) {
      throw new Error("No products available to assign to promotions.");
    }
    for (let i = 0; i < count; i++) {
      // Get a random set of product IDs
      const promoProductCount = faker.number.int({ min: 1, max: 3 });
      const productIds = Array.from(
        { length: promoProductCount },
        () => faker.helpers.arrayElement(allProducts).id
      );

      await db.promotion.create({
        data: {
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          imageUrl: getRealImage(), // Use real image URL
          active: faker.datatype.boolean(),
          productIds,
        },
      });
    }
    log(`Generated ${count} fake promotions.`);
  } catch (error) {
    throw new Error(`Error seeding promotions: ${error}`);
  }
}

// Seed NewLetters
async function seedNewLetters(count: number): Promise<void> {
  try {
    log(`Generating ${count} fake newsletters...`);
    for (let i = 0; i < count; i++) {
      await db.newLetter.create({
        data: {
          email: faker.internet.email(),
        },
      });
    }
    log(`Generated ${count} fake newsletters.`);
  } catch (error) {
    throw new Error(`Error seeding newsletters: ${error}`);
  }
}

// Seed ContactSubmissions and their Replies
async function seedContactSubmissionsWithReplies(count: number): Promise<void> {
  try {
    log(`Generating ${count} fake contact submissions with replies...`);
    for (let i = 0; i < count; i++) {
      const submission = await db.contactSubmission.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          subject: faker.lorem.words(3),
          message: faker.lorem.sentences(2),
        },
      });
      // Create a random number of replies (between 1 and 3) for each submission
      const replyCount = faker.number.int({ min: 1, max: 3 });
      for (let j = 0; j < replyCount; j++) {
        await db.reply.create({
          data: {
            content: faker.lorem.sentence(),
            contactSubmissionId: submission.id,
          },
        });
      }
    }
    log(`Generated ${count} fake contact submissions with replies.`);
  } catch (error) {
    throw new Error(`Error seeding contact submissions: ${error}`);
  }
}

// Main seeding function
async function main(): Promise<void> {
  log("Starting database seeding process...");

  // Retrieve seed sizes from command-line args or use defaults
  const supplierCount = getArgValue("suppliers", 5);
  const productCount = getArgValue("products", 10);
  const userCount = getArgValue("users", 5);
  const driverCount = getArgValue("drivers", 3);
  const orderCount = getArgValue("orders", 10);
  const promotionCount = getArgValue("promotions", 3);
  const newsletterCount = getArgValue("newsletters", 3);
  const contactSubmissionCount = getArgValue("contactsubmissions", 3);

  log(
    `Seed sizes: Suppliers=${supplierCount}, Products=${productCount}, Users=${userCount}, Drivers=${driverCount}, Orders=${orderCount}, Promotions=${promotionCount}, Newsletters=${newsletterCount}, ContactSubmissions=${contactSubmissionCount}`
  );

  try {
    // Clear existing data
    await clearData();

    // Seed independent and relational data
    const { dayShift, nightShift } = await seedShifts();
    await seedCompany();
    await seedSuppliers(supplierCount);
    await seedProducts(productCount);
    await seedUsers(userCount); // Updated function
    await seedDrivers(driverCount);
    await seedOrders(orderCount, dayShift, nightShift);
    await seedPromotions(promotionCount);

    // Seed additional models from the schema
    await seedNewLetters(newsletterCount);
    await seedContactSubmissionsWithReplies(contactSubmissionCount);

    log("Database seeded successfully!");
  } catch (error) {
    log(`Error seeding database: ${error}`);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

main();
