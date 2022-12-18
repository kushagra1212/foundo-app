export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo?: string;
  countryCode?: string;
  profilePhoto?: string;
  address?: string;
  createdAt: string;
}
export interface Post {
  id: string;
  category: string;
  thumbnail: string;
  itemName: string;
  description: string;
  dateTime: string
  city: string;
  color: string;
  brand: string;
  firstName: string;
}
