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
