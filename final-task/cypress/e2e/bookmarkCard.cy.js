describe("BookmarkCard Component", () => {
  const bookmark = {
    title: "Frontend Developer",
    orgName: "Tech Corp",
    opType: "Full-time",
    location: "Remote",
    logoUrl: "https://example.com/logo.png",
    eventID: "1",
    datePosted: "2023-08-01",
    dateBookmarked: "2023-08-10",
  };

  const token = "test-token";

  beforeEach(() => {
    cy.intercept("DELETE", "https://akil-backend.onrender.com/bookmarks/1", {
      statusCode: 200,
      body: { success: true },
    }).as("deleteBookmark");

    cy.spy(console, "error").as("consoleError");

    cy.mount(
      <BookmarkCard bookmark={bookmark} token={token} refetch={cy.stub()} />
    );
  });

  it("should display bookmark details", () => {
    cy.get("h3").should("contain.text", "Frontend Developer");
    cy.get("p").should("contain.text", "Tech Corp");
    cy.get("p").should("contain.text", "Remote");
  });

  it("should trigger delete bookmark and update the UI", () => {
    cy.get("button").click();

    cy.wait("@deleteBookmark").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.get("@consoleError").should("not.have.been.called");
  });

  it("should show loading spinner during deletion", () => {
    cy.intercept(
      "DELETE",
      "https://akil-backend.onrender.com/bookmarks/1",
      (req) => {
        req.on("response", (res) => {
          res.setDelay(1000);
        });
      }
    ).as("deleteBookmarkDelayed");

    cy.get("button").click();

    cy.get(".animate-spin").should("be.visible");

    cy.wait("@deleteBookmarkDelayed");

    cy.get(".animate-spin").should("not.exist");
  });

  it("should display an error if delete fails", () => {
    cy.intercept("DELETE", "https://akil-backend.onrender.com/bookmarks/1", {
      statusCode: 500,
      body: { error: "Failed to delete bookmark" },
    }).as("deleteBookmarkFailed");

    cy.get("button").click();

    cy.wait("@deleteBookmarkFailed").then((interception) => {
      expect(interception.response.statusCode).to.eq(500);
    });

    cy.get("@consoleError").should(
      "have.been.calledWith",
      "Failed to delete bookmark:"
    );
  });
});
