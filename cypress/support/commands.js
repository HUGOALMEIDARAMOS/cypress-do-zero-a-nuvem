Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').as('nome').should('be.visible').type('Hugo');
    cy.get('#lastName').as('sobrenome').should('be.visible').type('Almeida');
    cy.get('#email').as('email').should('be.visible').type('hugo.undb@gmail.com');
    cy.get('#open-text-area').as('texto').should('be.visible').type('Quero abrir um protocolo de falha');
    
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitDesacoply', data => {
    cy.get('#firstName').as('nome').should('be.visible').type(data.firstName);
    cy.get('#lastName').as('sobrenome').should('be.visible').type(data.lastName);
    cy.get('#email').as('email').should('be.visible').type(data.email);
    cy.get('#open-text-area').as('texto').should('be.visible').type(data.text);
    
    cy.get('button[type="submit"]').click()
})


Cypress.Commands.add('fillMandatoryFieldsAndSubmitDesacoplyDefault', (data = {
    firstName: 'carol',
    lastName : 'Almeida',
    email: 'hugo.undb@gmail.com',
    text: 'teste1'
}) => {
    cy.get('#firstName').as('nome').should('be.visible').type(data.firstName);
    cy.get('#lastName').as('sobrenome').should('be.visible').type(data.lastName);
    cy.get('#email').as('email').should('be.visible').type(data.email);
    cy.get('#open-text-area').as('texto').should('be.visible').type(data.text);
    
    cy.get('button[type="submit"]').click()
})

