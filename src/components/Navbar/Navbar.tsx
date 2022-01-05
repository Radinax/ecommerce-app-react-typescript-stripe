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
import { Link, useLocation } from "react-router-dom";

interface Props {
  totalItems: number;
}

const Navbar: React.FC<Props> = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();

  if (location.pathname === "/") return;

  const logoImage = (
    <Typography variant="h6" className={classes.title}>
      <img
        src={logo}
        alt="Commerce.js"
        height="25px"
        className={classes.image}
      />
      Commerce.js
    </Typography>
  );

  const elementSeparator = <div className={classes.grow} />;
  // There is supposed to be a classes.button but there isnt
  const cartButton = (
    <div>
      <IconButton
        component={Link}
        to="/cart"
        aria-label="Show cart items"
        color="inherit"
      >
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
          {logoImage}
          {elementSeparator}
          {location.pathname === "/" && cartButton}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
