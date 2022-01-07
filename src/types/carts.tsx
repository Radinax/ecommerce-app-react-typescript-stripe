import { IFormattedCurrency, ICartItem } from "./common";
import { Cart } from "chec__commerce.js/types/cart";
import { LineItem } from "chec__commerce.js/types/line-item";

export interface ICart extends Cart {}
export interface ILineItem extends LineItem {}
