export interface Product {
  id: string;
  img1: string;
  img2: string;
  img3?: string;
  img4?: string;
  title: string;
  price: number;
  oldPrice?: number;
  isNew?: boolean;
  isTrending?: boolean;
}
