/// <reference types="cypress" />

context('"Cours de la mechanique quantique" tests at Supelec', () => {

    let url = 'http://prd-mecaqu.centralesupelec.fr/EN/'
    for(let profile=0;profile<30;profile++){
        it('exo1 profile='+`${profile}`+' test', () => {
            cy.visit(url+'ex1.html')

            //check profiles
            // choose profile
            // cy.get('#var_Pot_Type').select("0")
            // cy.get('#var_Pot_Type').should('have.value', '0')
            cy.get('#var_Pot_Type').then($body => {
                if ($body.find("option[value="+`${profile}`+"]").length > 0 ) {   //evaluates as true
                    cy.get('#var_Pot_Type').select(`${profile}`)
                    cy.get('#var_Pot_Type').should('have.value',`${profile}`)

                    cy.get('#aDIV2full > .hdivtitle > .Text-hr4').click()
                    cy.get('#aDIV3full > .hdivtitle > .Text-hr4').click()

                    // change discretization
                    for(let i=0;i<4;i++){
                        cy.get('#var_Type').then($body => {
                            if ($body.find("option[value="+`${i}`+"]").length > 0 ) {   //evaluates as true
                                cy.get('#var_Type').select(`${i}`)
                                cy.get('#var_Type').should('have.value',`${i}`)
                            }
                        });
                    }

                    cy.get('#var_isEnergies').uncheck()
                    cy.get('#var_isEnergies').check()
                    cy.get('#var_isProbability').uncheck()
                    cy.get('#var_isProbability').check()

                    // wave function test
                    // analytical solution option
                    cy.get("#var_isShowAnalyticSolution").then($tick => {
                        if ($tick.is(':visible')){
                            cy.get('#var_isShowAnalyticSolution').check()
                        }
                    })
                    // wave function test
                    for(let i=0;i<10;i++){
                        cy.get('#Eigenvalues').then($body => {
                            if ($body.find("option[value="+`${i}`+"]").length > 0 ) {   //evaluates as true
                                cy.get('#Eigenvalues').select(`${i}`)
                                cy.get('#Eigenvalues').should('have.value',`${i}`)
                            }
                        });
                    }
                    // cy.get('#submitdataWF').click()

                    //averaged values test
                    for(let i=0;i<10;i++){
                        cy.get('#avaltype').then($body => {
                            if ($body.find("option[value="+`${i}`+"]").length > 0 ) {   //evaluates as true
                                cy.get('#avaltype').select(`${i}`)
                                cy.get('#avaltype').should('have.value',`${i}`)
                            }
                        });
                    }
                    // cy.get('#submitdata2saveO').click() 

                    // check eigenvalues
                    cy.get('#var_Neig').click().focused().clear().type('1')
                    cy.get('#submitdata2').click()

                }
            });
        })
    }
})
