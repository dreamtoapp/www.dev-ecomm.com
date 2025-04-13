// app/edit-profile/types.ts
export interface User {
  id: string;
  phone: string;
  name: string;
  email: string | null;
  address: string | null;
  password: string;
  role: string;
  avatar: string;
  latitude: string;
  longitude: string;
}
