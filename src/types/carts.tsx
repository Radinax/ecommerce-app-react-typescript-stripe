import IFormattedCurrency from "./common";

export interface ICart {
  currency: {
    code: string;
    symbol: string;
  };
  id: string;
  line_items: any;
  subtotal: IFormattedCurrency;
  total_items: number;
}
