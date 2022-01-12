describe("Select Product View", () => {
  beforeEach(() => {
    cy.visitSite();
  });

  // Opens
  it("opens the application", () => {
    cy.contains("Commerce.js");
  });

  // We click add product icon button and cart number raises
  it("Click a product and raise badge", () => {
    cy.get(`.MuiBadge-badge`).as("badgeValue");
    cy.get("@badgeValue").should("contain", 0);
    cy.get(`[aria-label="Add to Card"]`)
      .first()
      .click();
    cy.get("@badgeValue").should("contain", 1);
  });
});

describe("Cart view", () => {
  before(() => {
    cy.visitSite();
    cy.get(`.MuiBadge-badge`).as("badgeValue");
    cy.get(`[aria-label="Add to Card"]`)
      .first()
      .click()
      .then(() => {
        cy.visit("/cart");
        cy.get(`.MuiGrid-container`).as("container");
      });
  });

  it("Visits the right url", () => {
    cy.url("/cart");
  });

  it("Contains one product", () => {
    // MuiGrid-container
    cy.get(`.MuiGrid-container`).as("container");
    cy.get("@container")
      .children()
      .should("have.length", 1);
  });

  it("When clicking on + it raises the product quantity", () => {
    cy.get(".MuiTypography-body1").contains("1");
    cy.contains(".MuiButton-text", "+")
      .click()
      .then(() => cy.contains(".MuiTypography-body1", "2"));
  });

  it("When clicking on - it removes product if quantity is 1", () => {
    cy.get(".MuiTypography-body1").contains("2");
    cy.contains(".MuiButton-text", "-")
      .click()
      .then(() => cy.contains(".MuiTypography-body1", "1"));
    cy.contains(".MuiButton-text", "-")
      .click()
      .then(() =>
        cy
          .get(`.MuiGrid-container`)
          .children()
          .should("have.length", 0)
      );
  });
});

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe.only("checkout workflow", () => {
  before(() => {
    cy.visitSite();
    cy.get(`.MuiBadge-badge`).as("badgeValue");
    cy.get(`[aria-label="Add to Card"]`)
      .first()
      .click()
      .then(() => cy.visit("/cart"));
    cy.contains(".MuiButton-text", "+").click();
    cy.visit("/checkout");
    cy.wait(10000);
  });

  it("loads the view", () => {
    cy.contains("h6", "Shipping Address");
  });

  it("user can fill form", () => {
    cy.get('input[name="firstName"]').type("Jhon");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="address1"]').type("Street neverland");
    cy.get('input[name="email"]').type("Jhon@doe.com");
    cy.get('input[name="city"]').type("Neverland");
    cy.get('input[name="zip"]').type("1234");

    cy.clickSelectInputOption("Shipping Country");
    cy.clickSelectInputOption("Shipping Subdivision");
    cy.clickSelectInputOption("Shipping Options");
  });
});
