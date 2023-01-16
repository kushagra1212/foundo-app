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
export interface FilterItemOn {
  category?: string;
  brand?: string;
  color?: string;
  college?: string;
  latest?: string;
}
export interface Picture {
  image: string;
}
export interface Location {
  latitude: number;
  longitude: number;
}
export interface AddPost {
  itemName: string;
  color: string;
  dateTime: string;
  description: string;
  brand: string;
  city: string;
  category: string;
  userId: number;
  isFounded: boolean;
  pictures: Array<Picture>;
  location: Location;
}