describe("Select Product View", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
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
    cy.visit("http://localhost:3000");
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
