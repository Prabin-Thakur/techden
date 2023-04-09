export interface Product {
  id: string;
  title: string;
  type: "Camera" | "SmartPhone" | "Audio" | "Pc" | "Wearable";
  img1: string;
  img2: string;
  img3?: string;
  img4?: string;
  price: number;
  oldPrice?: number;
  new?: boolean;
  trending?: boolean;
}
