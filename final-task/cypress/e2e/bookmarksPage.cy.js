describe("Bookmarks Page", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", (err) => {
      if (err.message.includes("NEXT_REDIRECT")) {
        return true;
      }
      if (err.message.includes("Cannot read properties of undefined")) {
        return true;
      }
    });

    cy.intercept("GET", "/api/auth/session", {
      statusCode: 200,
      body: { user: { email: "bem@gamil.com", name: "Bemnet Adugnaw" } },
    }).as("getSession");
    cy.intercept("GET", "/api/bookmarks", {
      statusCode: 200,
      delay: 1000,
      body: [],
    }).as("getBookmarksDelayed");
  });

  it("should show loading skeleton while fetching bookmarks", () => {
    cy.visit("/bookmarks");
    cy.get(".animate-pulse").should("be.visible");
    cy.wait("@getSession");
    cy.get(".animate-pulse").should("not.exist");
  });

  it("should show error component on fetch failure", () => {
    cy.intercept("GET", "/api/bookmarks", { statusCode: 500 }).as(
      "getBookmarksFailed"
    );

    cy.visit("/bookmarks");
    cy.get(".text-red-500").should("be.visible");
  });
});
