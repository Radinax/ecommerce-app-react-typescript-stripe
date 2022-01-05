import { IFormattedCurrency } from "./common";

export interface IProducts {
  id: string;
  name: string;
  description: string;
  price: IFormattedCurrency;
  image: {
    url: string;
  };
}
