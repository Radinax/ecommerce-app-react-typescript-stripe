import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe, PaymentMethod } from "@stripe/stripe-js";

import Review from "./Review";
import { ICheckoutCapture, ICheckoutToken } from "../../types";
import {
  Stripe,
  StripeCardElement,
  StripeElements,
} from "@stripe/stripe-js/types/stripe-js";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY as string
);

interface Props {
  checkoutToken: ICheckoutToken;
  nextStep: () => void;
  backStep: () => void;
  shippingData: any;
  onCaptureCheckout: (tokenId: string, order: ICheckoutCapture) => void;
  timeout: () => void;
}

const PaymentForm: React.FC<Props> = ({
  checkoutToken,
  nextStep,
  backStep,
  shippingData,
  onCaptureCheckout,
}) => {
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    elements: StripeElements | null,
    stripe: Stripe | null
  ) => {
    event.preventDefault();

    if (!stripe || !elements || stripe === null) return;

    const cardElement = elements.getElement(CardElement) as StripeCardElement;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "International",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod && paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
