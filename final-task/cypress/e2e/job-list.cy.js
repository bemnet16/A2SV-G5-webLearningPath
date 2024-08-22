describe("Opportunities Page", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", (err) => {
      if (err.message.includes("NEXT_REDIRECT")) {
        return false;
      }
      if (err.message.includes("read properties of undefined (reading '0')")) {
        return false;
      }
    });

    cy.intercept("GET", "/api/auth/session", {
      statusCode: 200,
      body: {
        user: {
          accessToken: "test-access-token",
          email: "bem@gmail.com",
          name: "Bem",
        },
      },
    }).as("getSession");

    cy.intercept(
      "GET",
      "https://akil-backend.onrender.com/opportunities/search",
      {
        statusCode: 200,
        body: {
          data: [
            {
              id: "65509e9353a7667de6ef5a60",
              title: "Volunteer Software Development Mentor",
              description:
                "Join A2SV (Africa to Silicon Valley) as a Volunteer Software Development Mentor and make a meaningful impact on the next generation of African tech talent. As a mentor, you will play a crucial role in guiding and supporting aspiring software developers, helping them navigate the world of technology and gain valuable skills. This is an opportunity to contribute to the growth of the African tech ecosystem and foster innovation.",
              responsibilities:
                "Conduct one-on-one or group mentorship sessions with aspiring software developers.\nProvide guidance on coding practices, problem-solving techniques, and industry trends.\nAssist mentees in setting and achieving learning goals.\nOffer constructive feedback on code reviews and project work.\nShare industry insights and experiences to help mentees navigate the software development landscape.\nCollaborate with other mentors and A2SV organizers to enhance the mentorship program.",
              requirements:
                "Proficiency in a variety of programming languages, including but not limited to Java, Python, JavaScript, or others. ",
              idealCandidate:
                "The ideal candidate for the Volunteer Software Development Mentor role at A2SV possesses a blend of technical expertise, mentoring skills, and a passion for contributing to the development of the African tech community.",
              categories: [
                "Education Access and Quality Improvement",
                "Youth Empowerment and Development",
              ],
              opType: "inPerson",
              startDate: "2006-01-02T15:04:05.999Z",
              endDate: "2006-01-02T15:04:05.999Z",
              deadline: "2006-01-02T15:04:05.999Z",
              location: ["Addis Ababa"],
              requiredSkills: ["Accountant"],
              whenAndWhere: "Abrehot Library, Addis Ababa, Ethiopia",
              orgID: "65509e3f53a7667de6ef5a5b",
              datePosted: "2024-07-17T11:09:29.135Z",
              status: "open",
              applicantsCount: 6,
              viewsCount: 12464,
              orgName: "Africa to Silicon Valley",
              logoUrl:
                "https://res.cloudinary.com/dtt1wnvfb/image/upload/v1701954159/photo_2023-12-07%2016.02.23.jpeg.jpg",
              isBookmarked: false,
              isRolling: false,
              questions: null,
              perksAndBenefits: null,
              createdAt: "0001-01-01T00:00:00Z",
              updatedAt: "0001-01-01T00:00:00Z",
              orgPrimaryPhone: "+251987654321",
              orgEmail: "lensa@a2sv.org",
              isPaid: false,
              average_rating: 0,
              total_reviews: 0,
            },
            {
              id: "657063e2144042c215319530",
              title: "Updated Updated test",
              description:
                "Join A2SV (Africa to Silicon Valley) as a Volunteer Software Development Mentor and make a meaningful impact on the next generation of African tech talent. As a mentor, you will play a crucial role in guiding and supporting aspiring software developers, helping them navigate the world of technology and gain valuable skills. This is an opportunity to contribute to the growth of the African tech ecosystem and foster innovation.",
              responsibilities:
                "Proficiency in a variety of programming lang\nProficiency in a variety of programming lang",
              requirements: "Proficiency in a variety of programming lang",
              idealCandidate:
                "Join A2SV (Africa to Silicon Valley) as a Volunteer Software Development Mentor and make a meaningful impact on the next generation of African tech talent. As a mentor, you will play a crucial role in guiding and supporting aspiring software developers, helping them navigate the world of technology and gain valuable skills. This is an opportunity to contribute to the growth of the African tech ecosystem and foster innovation.",
              categories: ["Education Access and Quality Improvement"],
              opType: "virtual",
              startDate: "2023-12-07T21:00:00Z",
              endDate: "2023-12-08T21:00:00Z",
              deadline: "2023-12-06T12:04:56.958Z",
              location: ["Adama", "Addis Ababa"],
              requiredSkills: ["Problem-solving"],
              whenAndWhere: "Abrehot Library",
              orgID: "65509e3f53a7667de6ef5a5b",
              datePosted: "2024-07-17T11:09:02.207Z",
              status: "open",
              applicantsCount: 1,
              viewsCount: 4585,
              orgName: "Africa to Silicon Valley",
              logoUrl:
                "https://res.cloudinary.com/dtt1wnvfb/image/upload/v1701954159/photo_2023-12-07%2016.02.23.jpeg.jpg",
              isBookmarked: false,
              isRolling: false,
              questions: null,
              perksAndBenefits: null,
              createdAt: "0001-01-01T00:00:00Z",
              updatedAt: "0001-01-01T00:00:00Z",
              orgPrimaryPhone: "+251987654321",
              orgEmail: "lensa@a2sv.org",
              isPaid: false,
              average_rating: 0,
              total_reviews: 0,
            },
          ],
        },
      }
    ).as("getOpportunities");

    cy.intercept("GET", "https://akil-backend.onrender.com/bookmarks", {
      statusCode: 200,
      body: {
        data: ["1"],
      },
    }).as("getBookmarks");

    cy.visit("/job-list");
    cy.wait("@getSession");
    cy.wait("@getOpportunities");
    cy.wait("@getBookmarks");
  });

  it("should display the page title", () => {
    cy.get("h2").should("contain.text", "Opportunities");
  });

  it("should display the opportunities", () => {
    cy.get(".flex.flex-col.gap-7.lg\\:ml-3")
      .find(".card")
      .should("have.length", 2);
  });

  it("should filter opportunities based on search term", () => {
    cy.get('input[placeholder="Search by title"]').type("Volunteer");
    cy.get(".card").should("have.length", 1);
    cy.get(".card")
      .first()
      .should("contain.text", "Volunteer Software Development Mentor");
  });

  it("should show loading skeleton while fetching data", () => {
    cy.intercept(
      "GET",
      "https://akil-backend.onrender.com/opportunities/search",
      {
        statusCode: 200,
        delay: 1000,
        body: {},
      }
    ).as("getOpportunitiesDelayed");

    cy.visit("/job-list");
    cy.get(".animate-pulse").should("be.visible");
    cy.wait("@getOpportunitiesDelayed");
    cy.get(".animate-pulse").should("not.exist");
  });

  it("should show no results found if no opportunities match the search term", () => {
    cy.get('input[placeholder="Search by title"]').type("Nonexistent Job");
    cy.get(
      ".bg-yellow-100.border.border-yellow-300.text-yellow-700.font-semibold.rounded-md.p-4.min-w-96.text-center"
    ).should("contain.text", "No results found");
  });

  it("should display an error message if fetching opportunities fails", () => {
    cy.intercept(
      "GET",
      "https://akil-backend.onrender.com/opportunities/search",
      {
        statusCode: 500,
        body: { message: "Internal Server Error" },
      }
    ).as("getOpportunitiesFailed");

    cy.visit("/job-list");
    cy.wait("@getOpportunitiesFailed");
    cy.get(".error-component").should("contain.text", "Internal Server Error");
  });
});
