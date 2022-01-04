import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

import useStyles from "./styles";
import logo from "../../assets/commerce.png";

interface Props {
  totalItems: number;
}

const Navbar: React.FC<Props> = ({ totalItems }) => {
  const classes = useStyles();

  const logoImage = (
    <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
  );

  const elementSeparator = <div className={classes.grow} />;

  const cartButton = (
    <div className={classes.menuButton}>
      <IconButton aria-label="Show cart items" color="inherit">
        <Badge badgeContent={totalItems} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
    </div>
  );
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {logoImage}
            {elementSeparator}
            {cartButton}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
