import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import { IShippingOptions, IShippingLabel } from "../../types";

import { commerce } from "../../lib/commerce";

type Token = {
  id: string;
};

interface Props {
  checkoutToken: Token;
  next: (data: any) => void;
}

const AddressForm: React.FC<Props> = ({ checkoutToken, next }) => {
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState<IShippingLabel[]>(
    []
  );
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState<
    IShippingLabel[]
  >([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState<IShippingLabel[]>([]);
  const [shippingOption, setShippingOption] = useState("");

  const fetchShippingCountries = async (checkoutTokenId: string) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    const countriesById = Object.entries(countries).map(([code, name]) => ({
      id: code,
      label: name,
    }));

    setShippingCountries(countriesById);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchShippingDivisons = async (countryCode: string) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    const subdivisionsById = Object.entries(subdivisions).map(
      ([code, name]) => ({
        id: code,
        label: name,
      })
    );

    setShippingSubdivisions(subdivisionsById);
    setShippingSubdivision(subdivisionsById[0].id);
  };

  const fetchShippingOptions = async (
    checkoutTokenId: string,
    country: string,
    region: string = ""
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    const optionsById = options.map((option) => ({
      id: option.id,
      label: `${option.description} - (${option.price.formatted_with_symbol})`,
    }));

    setShippingOptions(optionsById);
    setShippingOption(optionsById[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchShippingDivisons(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  const onChangeShippingCountry = (e: React.ChangeEvent<{ value: unknown }>) =>
    setShippingCountry(e.target.value as string);

  const onChangeShippingSubdivision = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => setShippingSubdivision(e.target.value as string);

  const onChangeShippingOption = (e: React.ChangeEvent<{ value: unknown }>) =>
    setShippingOption(e.target.value as string);

  if (
    shippingCountry === "" ||
    shippingOption === "" ||
    shippingSubdivision === ""
  )
    return <div>Loading,,,</div>;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput name="lastName" label="Last name" />
            <FormInput name="address1" label="Address" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="Postal Code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={onChangeShippingCountry}
              >
                {shippingCountries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={onChangeShippingSubdivision}
              >
                {shippingSubdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={onChangeShippingOption}
              >
                {shippingOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
