//Preencher Formulário
export function preencherFormulario(nome, sobrenome, email, telefone) {
    const longText = Cypress._.repeat('Testes de Software', 10);
    cy.get('#firstName').type(nome);
    cy.get('#lastName').type(sobrenome);
    cy.get('#email').type(email);
    //cy.get('#phone').type(telefone);
    if (telefone) {
        cy.get('#phone').type(telefone);
    }
    
    cy.get('#open-text-area').type(longText, {delay: 0});
}

//Clicar em Enviar e Validar  Mensagem de Sucesso
export function clicarEVerificarMensagemDeSucesso() {
    cy.get('button[type="submit"]').click(); 
    cy.get('.success > strong').should('be.visible');
}

//Clicar em Enviar e Validar Mensagem de Erro
export function clicarEVerificarMensagemDeErro() {
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');
}

//Limpar os campos com um tempo para vizualizar o teste (Essa o chat me ajudou)
export function limparCamposComEspera(Espera = 500) {
  cy.get('#firstName').clear();
  cy.wait(Espera);
  cy.get('#lastName').clear();
  cy.wait(Espera);
  cy.get('#email').clear();
  cy.wait(Espera);
  cy.get('#phone').clear();
  cy.wait(Espera);
  cy.get('#open-text-area').clear();
}