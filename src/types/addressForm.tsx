import { IFormattedCurrency, ICartItem } from "./common";

export interface IShippingOptions {
  id: string;
  description: string;
  line_items: ICartItem[];
  price: IFormattedCurrency;
  total_items: number;
}

export interface IShippingLabel {
  id: string;
  label: string;
}
