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
  isVerified?: number;
}
export interface Post {
  id?: string;
  category: string;
  thumbnail: string;
  itemName: string;
  description: string;
  dateTime: string;
  city: string;
  color: string;
  brand: string;
  firstName: string;
  fk_userId?: number;
  isFounded?: boolean;
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
export interface ILocation {
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
  fk_userId: number;
  isFounded: boolean;
  pictures: Picture[];
  location: ILocation;
}
export type ChatMessage = {
  id: number;
  fk_senderId: number;
  fk_receiverId: number;
  title: string | null;
  message: string;
  createdAt: string;
  latitude: number | null;
  longitude: number | null;
  fk_messageId: number;
  locationId: number | null;
  isFound: number;
  isPhoneNoShared: number;
  total_count: number;
};
