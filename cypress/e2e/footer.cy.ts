describe('footer', () => {
   beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('footer', () => {
    cy.get('.footer-links a').should('have.length', 4); 
    cy.get('.footer-links a').eq(0).should('have.attr', 'href', '/concerns').click()
    cy.get('.footer-links a').eq(1).should('have.attr', 'href', '/contact').click()
    cy.get('.footer-links a').eq(2).should('have.attr', 'href', '/feedback').click()
    cy.get('.footer-links a').eq(3).should('have.attr', 'href', '/terms').click()
  });

  
});





