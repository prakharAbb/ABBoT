
localStorage.debug = 'cypress'

describe('Language Selector Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Change current language from dropdown', () => {
    cy.get('.menu-toggle').click();
    cy.get('.menu-toggle').click();
    cy.get('.language-selector .language-icon').click() 
    cy.contains('Français').click() // French
    cy.get('.language-selector .language-code').should('contain', 'FR') 
    cy.get('.language-selector .language-icon').click() 
    cy.contains('Español').click() //Spanish
    cy.get('.language-selector .language-code').should('contain', 'ES')
    cy.get('.language-selector .language-icon').click() 
    cy.contains('Deutsch').click() //German
    cy.get('.language-selector .language-code').should('contain', 'DE')
    cy.get('.language-selector .language-icon').click()
    cy.contains('Italiano').click() // Italian
    cy.get('.language-selector .language-code').should('contain', 'IT')
    cy.get('.language-selector .language-icon').click() 
    cy.contains('日本語').click() // Japanese
    cy.get('.language-selector .language-code').should('contain', 'JP')
    cy.get('.language-selector .language-icon').click() 
    cy.contains('English').click() // English
    cy.get('.language-selector .language-code').should('contain', 'EN')


  })
 })








