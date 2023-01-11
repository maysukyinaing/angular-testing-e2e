

describe('home page', () => {
  beforeEach(() => {
    cy.fixture('courses.json').as("coursesJSON");
    cy.intercept('/api/courses', "@coursesJSON").as("courses")

    cy.visit('/');

  });

  it('should display a list courses', () => {
    cy.contains("All Courses");
    cy.wait('@courses');
  //  cy.get(['mat-tab-body']).should('have.length', 9)
    cy.intercept('http://localhost:4200').should("have.length", 9);
  });

  it('should display the advanced courses', () => {
    cy.get('.mat-card').should("have.length", 2);
  })

})
