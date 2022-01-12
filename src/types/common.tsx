import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import { CheckoutCaptureResponse } from "@chec/commerce.js/types/checkout-capture-response";
import { CheckoutToken } from "chec__commerce.js/types/checkout-token";

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

export interface ICheckoutToken extends CheckoutToken {}

export interface ICheckoutCaptureResponse extends CheckoutCaptureResponse {}

export interface ICheckoutCapture extends CheckoutCapture {}

export interface IError {
  data: {
    error: {
      message: "";
    };
  };
}
