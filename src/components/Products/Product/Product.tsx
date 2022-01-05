import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { IProducts } from "../../../types";

import useStyles from "./styles";

interface Props {
  product: IProducts;
  onAddToCart: (productId: string, quantity: number) => void;
}

const Product: React.FC<Props> = ({ product, onAddToCart }) => {
  const { name, price, description, image, id } = product;
  const classes = useStyles();

  const handleAddToCart = () => onAddToCart(id, 1);

  const ProductName = (
    <Typography variant="h5" gutterBottom>
      {name}
    </Typography>
  );

  const ProductPrice = (
    <Typography variant="h5">{price.formatted_with_symbol}</Typography>
  );

  const ProductDescription = (
    <Typography
      dangerouslySetInnerHTML={{ __html: description }}
      variant="body2"
      color="textSecondary"
    />
  );

  const ProductAdd = (
    <IconButton aria-label="Add to Card" onClick={handleAddToCart}>
      <AddShoppingCart />
    </IconButton>
  );

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={image.url} title={name} />
      <CardContent>
        <div className={classes.cardContent}>
          {ProductName}
          {ProductPrice}
        </div>
        {ProductDescription}
      </CardContent>

      <CardActions disableSpacing className={classes.cardActions}>
        {ProductAdd}
      </CardActions>
    </Card>
  );
};

export default Product;
