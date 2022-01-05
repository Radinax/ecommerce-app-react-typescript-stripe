export interface IFormattedCurrency {
  formatted: string;
  formatter_with_code: string;
  formatted_with_symbol: string;
}

export interface ICartItem {
  id: string;
  name: string;
  image: {
    url: string;
  };
  line_total: IFormattedCurrency;
  quantity: number;
}
