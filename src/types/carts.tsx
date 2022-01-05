import { IFormattedCurrency, ICartItem } from "./common";

export interface ICart {
  currency: {
    code: string;
    symbol: string;
  };
  id: string;
  line_items: ICartItem[];
  subtotal: IFormattedCurrency;
  total_items: number;
}
