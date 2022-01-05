import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import useStyles from "./styles";
import { ICartItem } from "../../../types/common";

interface Props {
  item: ICartItem;
  handleRemoveFromCart: (productId: string) => void;
  handleUpdateCartQty: (productId: string, quantity: number) => void;
  handleEmptyCart: () => void;
}

const CartItem: React.FC<Props> = ({
  item,
  handleUpdateCartQty,
  handleRemoveFromCart,
}) => {
  const classes = useStyles();

  const onUpdateCartQty = (lineItemId: string, newQuantity: number) =>
    handleUpdateCartQty(lineItemId, newQuantity);

  const onRemoveFromCart = (lineItemId: string) =>
    handleRemoveFromCart(lineItemId);

  console.log(item);

  return (
    <Card className="cart-item">
      <CardMedia
        image={item.image.url}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => onRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
