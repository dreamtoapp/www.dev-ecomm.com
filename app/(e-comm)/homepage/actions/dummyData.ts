// app/data/dummyData.ts

export const dummySuppliers = [
  {
    id: "1",
    name: "Water Supplier Co.",
    logo: "https://via.placeholder.com/150",
    email: "water@example.com",
    phone: "+1234567890",
    address: "123 Water Street",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Juice Supplier Co.",
    logo: "https://via.placeholder.com/150",
    email: "juice@example.com",
    phone: "+0987654321",
    address: "456 Juice Avenue",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const dummyProducts = [
  {
    id: "1",
    name: "Bottled Water",
    price: 1.99,
    size: "500ml",
    imageUrl: "https://via.placeholder.com/150",
    supplierId: "1",
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Orange Juice",
    price: 2.99,
    size: "1L",
    imageUrl: "https://via.placeholder.com/150",
    supplierId: "2",
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const dummyPromotions = [
  {
    id: "1",
    title: "Summer Sale",
    description: "Get 20% off on all bottled water!",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-08-31"),
    discount: 20,
    active: true,
    productIds: ["1"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const dummyOrders = [
  {
    id: "1",
    orderNumber: "ORD123456",
    customerId: "1",
    customerName: "John Doe",
    status: "Pending",
    amount: 19.99,
    items: [
      { productId: "1", quantity: 5, price: 1.99 },
      { productId: "2", quantity: 3, price: 2.99 },
    ],
    shiftId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const dummyCompany = {
  id: "1",
  fullName: "Ecommerce Company",
  email: "info@ecommerce.com",
  phoneNumber: "+1234567890",
  profilePicture: "https://via.placeholder.com/150",
  bio: "We are a leading e-commerce platform for beverages.",
  taxNumber: "TX123456789",
  taxQrImage: "https://via.placeholder.com/150",
  twitter: "https://twitter.com/ecommerce",
  linkedin: "https://linkedin.com/company/ecommerce",
  instagram: "https://instagram.com/ecommerce",
  tiktok: "https://tiktok.com/@ecommerce",
  facebook: "https://facebook.com/ecommerce",
  snapchat: "https://snapchat.com/add/ecommerce",
  website: "https://ecommerce.com",
  createdAt: new Date(),
  updatedAt: new Date(),
};
