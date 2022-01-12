Cypress.Commands.add("visitSite", () => {
  cy.visit("http://localhost:3000");
  cy.server();
  cy.route("GET", "https://api.chec.io/v1/products").as("productRoute");
  cy.route("GET", "https://api.chec.io/v1/carts").as("cartRoute");
  cy.wait(["@productRoute", "@cartRoute"], { responseTimeout: 15000 });
});

Cypress.Commands.add("clickSelectInputOption", (labelName) => {
  cy.contains("label", labelName)
    .siblings(".MuiInput-root")
    .click();
  cy.get(".MuiMenu-list")
    .children()
    .first()
    .click();
});
