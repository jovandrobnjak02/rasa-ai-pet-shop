export interface Item {
  id: number;
  name: string;
  type: string;
  size: string;
  manufacturer: string;
  productDate: Date;
  price: number;
  reviews: Review[];
  status: 'in progress' | 'completed' | 'cancelled';
  image: string;
  rating: number;
}

export interface Review {
  reviewer: string;
  comment: string;
  rating: number;
}
