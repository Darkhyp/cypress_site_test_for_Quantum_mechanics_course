/// <reference types="cypress" />


Cypress.Commands.add('CheckWF',{prevSuject:false},()=>{
    // wave function test
    // analytical solution option
    cy.get("#var_isShowAnalyticSolution").then($tick => {
        if ($tick.is(':visible')){
            cy.log($tick.is(':checked'))
            if(!$tick.is(':checked')){
                cy.get('#var_isShowAnalyticSolution').check()
                cy.get('#aDIV10full > .hdivtitle > .Text-hr4').click()
            }
        }
    })
    // wave function test
    cy.get('#Eigenvalues').children().each($option=>{
        cy.get('#Eigenvalues').select($option.val()).should('have.value', $option.val())
    });
    // cy.get('#submitdataWF').click()

    //averaged values test
    cy.get('#avaltype').children().each($option=>{
        cy.get('#avaltype').select($option.val()).should('have.value', $option.val())
    });
    // cy.get('#submitdata2saveO').click() 

})



context('"Cours de la mechanique quantique" tests at Supelec', () => {

    let url = 'http://prd-mecaqu.centralesupelec.fr/EN/'
    for(let exo=1;exo<=1;exo++){
        it('exo'+`${exo}`+' test', () => {
            cy.viewport(1200,1000);
            cy.visit(url+'ex'+`${exo}`+'.html')

            cy.get('#aDIV2full > .hdivtitle > .Text-hr4').click()
            cy.get('#aDIV3full > .hdivtitle > .Text-hr4').click()

            //check profiles
            // choose profile
            cy.get('#var_Pot_Type').children().each($option=>{
                cy.log($option.text())
                cy.get('#var_Pot_Type').select($option.val()).should('have.value', $option.val())//.wait(10000)
                // cy.wait('[&myAppState=true]', {timeout: 10000})

                // change discretization
                cy.get('#var_Type').children().each($option=>{
                    cy.get('#var_Type').select($option.val()).should('have.value', $option.val())//.wait(3000)
    

                    cy.get('#var_isEnergies').uncheck()
                    cy.get('#var_isEnergies').check()
                    cy.get('#var_isProbability').uncheck()
                    cy.get('#var_isProbability').check()

                    // wave function and averaged values tests
                    cy.CheckWF()
                    // check eigenvalues
                    cy.get('#var_Neig').click().focused().clear().type('1')
                    cy.get('#submitdata2').click()
                    cy.CheckWF()
                    cy.get('#var_Neig').click().focused().clear().type('10')



                });
            });


        })
    }
})
