export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  favoritePetTypes: string[];
  password?: string;
}
