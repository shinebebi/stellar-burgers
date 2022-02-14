describe('modal order', () => {
    before(function () {
        cy.visit('http://localhost:3000/login');
    });
    it('should open and close order pop-up', () => {
        cy.get('[name^=email]').type('test-data@yandex.ru', {force: true})
        cy.get('[name^=password]').type('password', {force: true})
        cy.get('[data-cy^=login-btn]').click()
        const dataTransfer = new DataTransfer()
        cy.get('[data-cy^=60d3b41abdacab0026a733cc]').trigger('dragstart', {
            dataTransfer
        })
        cy.get('[data-cy^=dropField]').trigger('drop', {
            dataTransfer
        })
        cy.get('[data-cy^=order-btn]').click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(15000)
        cy.contains('идентификатор заказа');
        cy.get('[data-cy^=close-btn]').click()
        cy.get('[data-cy^=constructor-page]').should('not.contain', 'идентификатор заказа')
    })
})