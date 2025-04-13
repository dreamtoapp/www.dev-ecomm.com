// types/user.ts
export interface User {
  id: string;
  phone: string;
  name: string;
  email: string | null;
  address: string | null;
  password: string;
  role: string;
  avatar: string | null;
  latitude: string;
  longitude: string;
}

export type UserFormState = Omit<
  Partial<User>,
  "id" | "phone" | "password" | "role"
> & {
  avatar?: File | string | null;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
