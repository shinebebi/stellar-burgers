describe('drag-n-drops', () => {
    before(function() {
        cy.visit('http://localhost:3000');
    });
    it('should drag item from ingredient to constructor', () => {
        const dataTransfer = new DataTransfer()
        cy.get('[data-cy^=60d3b41abdacab0026a733cc]').trigger('dragstart', {
            dataTransfer
        })
        cy.get('[data-cy^=dropField]').trigger('drop', {
            dataTransfer
        })
    })
})