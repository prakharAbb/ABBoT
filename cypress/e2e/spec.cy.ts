localStorage.debug = 'cypress*'


describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
})
// to disable debug messages
delete localStorage.debug