describe('modal ingredient', () => {
    before(function() {
        cy.visit('http://localhost:3000');
    });
    it('should open and close ingredient pop-up', () => {
        cy.get('[data-cy^=60d3b41abdacab0026a733cc]').click()
        cy.contains('Детали Ингредиента');
        cy.get('[data-cy^=close-btn]').click()
        cy.get('[data-cy^=constructor-page]').should('not.contain', 'Детали Ингредиента')
    })
    it('should show ingredient details', () => {
        cy.visit('http://localhost:3000/ingredients/60d3b41abdacab0026a733cc')
        cy.get('[data-cy^=ingredient-name]').as('name')
        cy.get('[data-cy^=calories]').as('calories')
        cy.get('[data-cy^=proteins]').as('proteins')
        cy.get('[data-cy^=fat]').as('fat')
        cy.get('[data-cy^=carbohydrates]').as('carbohydrates')
        cy.get('@name').should('contain', 'Соус Spicy-X')
        cy.get('@calories').should('contain', '30')
        cy.get('@proteins').should('contain', '30')
        cy.get('@fat').should('contain', '20')
        cy.get('@carbohydrates').should('contain', '40')
    })
})