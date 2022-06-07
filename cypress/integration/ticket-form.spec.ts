describe('Ticket form', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
      cy.get('input#name').type('Paulina')
      cy.get('input#email').type('paulina.zawadzka1412@gmail.com')
      cy.get('input#subject').type('my subject')
      cy.get('textarea#message').type('This is my first Cypress test')
    })
      it('Successful form submission', () => { 
          cy.intercept('POST', 'https://api.livechatinc.com/v2/tickets/new', (req) => {
              req.reply({
                statusCode: 200
              })
            }).as('submitForm')
            cy.get('form').submit()
            cy.wait('@submitForm')
              .its('response.statusCode').should('eq', 200)
            cy.contains('Thank you')
      })
      it('Unsuccessful form submission', () => {
         cy.intercept('POST', 'https://api.livechatinc.com/v2/tickets/new', (req) => {
             req.reply({
               statusCode: 500
             })
           }).as('submitForm')
           cy.get('form').submit()
           cy.wait('@submitForm')
              .its('response.statusCode').should('eq', 500)
           cy.contains('Error')
     }) 
  })
  
  
  