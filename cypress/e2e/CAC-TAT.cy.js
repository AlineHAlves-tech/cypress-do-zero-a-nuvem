import { preencherFormulario } from"../support/formulario.cy.js";
import { clicarEVerificarMensagemDeSucesso } from "../support/formulario.cy.js";
import { clicarEVerificarMensagemDeErro } from "../support/formulario.cy.js";
import { limparCamposComEspera } from "../support/formulario.cy.js";

describe('Central de Atendimento ao Cliente', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
  })

  //TESTE 01
  it('Verificar título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  //TESTE 02
  it('Preenche os campos obrigatório e envia o formulário', () => {
    preencherFormulario('Aline', 'Alves', 'aline@teste.com', '000000000'); 
    clicarEVerificarMensagemDeSucesso();
  });

  //TESTE 03
  it('Preenche o campo de email com um email invalido', () => {
    preencherFormulario('Aline', 'Alves', 'testee@@hotmai,com', '000000000');
    clicarEVerificarMensagemDeErro();
  });

  //TESTE 04
  it('Exibe mensagem de erro quando o valor não númerico for digitado', () => {
    preencherFormulario('Aline', 'Alves', 'testee@@hotmai,com', '----weew4');
    clicarEVerificarMensagemDeErro();

  });

  //TESTE 05
  it('Exibe mensagem de erro quando o campo de telefone não é preenchido', () => {
    preencherFormulario('Aline', 'Alves', 'testee@@hotmai,com', '');
    clicarEVerificarMensagemDeErro();
  })

  //TESTE 06
  it('Exibe mensgame de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    preencherFormulario('Aline', 'Alves', 'testee@@hotmai,com', '');
    cy.contains('Qual seu meio de contato preferencial?').should('be.visible');
    cy.get('#phone-checkbox').click();
    clicarEVerificarMensagemDeErro();
  });

  //TESTE 07
  it('Limpa campos do formulário', () => {
    preencherFormulario('Aline', 'Alves', 'aline@teste.com', '000000000');
    limparCamposComEspera(); // com espera padrão de 500ms
  });

  //TESTE 08
  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
    clicarEVerificarMensagemDeErro();
  });

  //TESTE 09
  it('Exibe mensagem de sucesso ao enviar o formulário todo preenchido', () => {
    preencherFormulario('Aline', 'Alves', 'aline@teste.com', '000000000');
    cy.contains('Produto').should('be.visible');
    cy.get('#product').select('Cursos');
    cy.contains('Tipo de atendimento').should('be.visible');
    cy.get('input[type="radio"][value="feedback"]').check();
    cy.get('input[type="radio"][value="feedback"]').should('be.checked');
    cy.contains('Qual seu meio de contato preferencial?').should('be.visible');
    cy.get('#phone-checkbox').check();
    cy.get('#phone-checkbox').uncheck();
    cy.get('#email-checkbox').check();
    clicarEVerificarMensagemDeSucesso();
  })

  //TESTE 10
  it('Fazendo Upload de arquivo', () => {
    preencherFormulario('Aline', 'Alves', 'aline@teste.com', '000000000');
    cy.contains('Adicone um anexo').should('be.visible');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/Teste_QA.png');
    clicarEVerificarMensagemDeSucesso();
  });

  //TESTE 11
  it('Verifica a Política de Privacidade da Aplicação', () => {
    cy.contains('a','Política de Privacidade').should('have.attr', 'href', 'privacy.html').and('have.attr', 'target', '_blank');
  });

  //TESTE 12
  it('Acessa a página de política de privacidade removendo o target e então clicando ', () => {
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click();

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible');
  });

});