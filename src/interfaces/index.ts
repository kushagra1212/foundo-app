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
