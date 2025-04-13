export type Notification = {
  id: string;
  type: "message" | "order";
  title: string;
  content: string;
  createdAt: Date;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
};

export type OrderSubmission = {
  id: string;
  product: string;
  quantity: number;
  customer: string;
  createdAt: Date;
};
