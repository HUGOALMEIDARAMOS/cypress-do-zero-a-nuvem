describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {   
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {   
    cy.get('#firstName').as('nome').should('be.visible').type('Hugo');
    cy.get('#lastName').as('sobrenome').should('be.visible').type('Almeida');
    cy.get('#email').as('email').should('be.visible').type('hugo.undb@gmail.com');
    cy.get('#open-text-area').as('texto').should('be.visible').type('Quero abrir um protocolo de falha');
    
    cy.get('@nome').should('have.value', 'Hugo');
    cy.get('@sobrenome').should('have.value', 'Almeida');
    cy.get('@email').should('have.value', 'hugo.undb@gmail.com');
    cy.get('@texto').should('have.value', 'Quero abrir um protocolo de falha');

    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')

    //Caso no campo texto eu quissese copiat um texto grande, odemos chamar a biblioteca Cypress._repeat e definif a quantidade
    //de repeticao:
    //const longtext = Cypress._.repeat('abcdefgh', 10)
    //cy.get('#open-text-area').as('texto').should('be.visible').type(longtext);
    //tambem posso alterar como a velocidade do texto é feita, posso colocar um delay 0, pq dai fica como se 
    //fosse um copia e cola 
    //cy.get('#open-text-area').as('texto').should('be.visible').type(longtext, {delay: 0});   
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longtext = Cypress._.repeat('abcdefgh', 10)
    
    cy.get('#firstName').as('nome').should('be.visible').type('Hugo');
    cy.get('#lastName').as('sobrenome').should('be.visible').type('Almeida');
    cy.get('#email').as('email').should('be.visible').type('hugo.undb@gmail,com');
    cy.get('#open-text-area').as('texto').should('be.visible').type(longtext, {delay: 0})


    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('exibe Campo telefone continua vazio, quando preenchido com valor não numerico', ()=>{
    cy.get('#phone')
      .type('abcd')
         .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').as('nome').should('be.visible').type('Hugo');
    cy.get('#lastName').as('sobrenome').should('be.visible').type('Almeida');
    cy.get('#email').as('email').should('be.visible').type('hugo.undb@gmail.com');
    cy.get('#open-text-area').as('texto').should('be.visible').type('Quero abrir um protocolo de falha');
    
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type('hugo')
    .should('have.value', 'hugo')
    .clear()
    .should('have.value', '')

    cy.get('#lastName')
    .type('lastName')
    .should('have.value', 'lastName')
    .clear()
    .should('have.value', '')

    cy.get('#email')
    .type('email')
    .should('have.value', 'email')
    .clear()
    .should('have.value', '')
        
    cy.get('#phone')
    .type('1235')
    .should('have.value', '1235')
    .clear()
    .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.get('button[type="submit"]').click()
      cy.get('.error').should('be.visible')
  })

  it('Envia formulário com sucesso com comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible')
  })

  it('Envia formulário com sucesso com comando customizado desacoplado', () => {
    const data = {
      firstName: 'carol',
      lastName : 'Almeida',
      email: 'hugo.undb@gmail.com',
      text: 'teste1'
    }
    cy.fillMandatoryFieldsAndSubmitDesacoply(data);
    cy.get('.success').should('be.visible')
  })

  it('Envia formulário com sucesso com comando customizado desacoplado e valor default', () => {
    cy.fillMandatoryFieldsAndSubmitDesacoplyDefault();
    cy.get('.success').should('be.visible')
  })

  it('Substituir o .get pelo.container, onde informamos o seletor e o texto', () =>{
    //vai exibir erro pois os campos obrigatorios nao estao preenchidos
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Selecionar um produto (Youtube) pelo texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('Selecionar o produto (Mentoria) pelo seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('be.visible', 'Mentoria')
  })

  it('Selecionar o produto (Blog) pelo seu indice', () => {
    cy.get('#product').select(1).should('have.value', 'blog').should('be.visible', 'Blog')
  })

  it('Selecionar o tipo de atendinto feedback', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService =>{
        cy.wrap(typeOfService)
          .check()
            .should('be.checked')

      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check() 
        .should('be.checked')
          .last() //pega o ultimo 
            .uncheck() //desmarca
              .should('not.be.checked')

  })

  it('Seleciona um arquivo da pasta fixture', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
      .should(input => {
        //console.log(input[0].files[0].name)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
 
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
        //console.log(input[0].files[0].name)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada uma alias', () => {
     cy.fixture('example.json').as('sampleFile') //aqui o cypress ja sabe que o arquivo esta dentro da pasta fixture
    cy.get('#file-upload').selectFile('@sampleFile')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target','_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
        .click()
    
        cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  it.only('congelar o relogio do browser e depois avancar', () => {  
    cy.clock();
    cy.get('#firstName').as('nome').should('be.visible').type('Hugo');
    cy.get('#lastName').as('sobrenome').should('be.visible').type('Almeida');
    cy.get('#email').as('email').should('be.visible').type('hugo.undb@gmail.com');
    cy.get('#open-text-area').as('texto').should('be.visible').type('Quero abrir um protocolo de falha');    
   
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible') // como a mensagem continua no dom e apenas foi dado um diplay nome, se fosse removido teria que usat not.be.exists
  })

  
})
