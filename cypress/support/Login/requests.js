class Requests {

    getToken(headUrl,user) {
        return cy.request({
            method: 'POST',
            url: headUrl + '/oauth/issueToken',
            body: user
        })
    }


    getRequest(url, token, body) {
        return cy.request({
            method: 'GET',
            url: url,
            failOnStatusCode: false,
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            body: body
        })
    }

    postRequest(url, token, body) {
        return cy.request({
            method: 'POST',
            url: url,
            failOnStatusCode: false,
             headers: {
                'Authorization' : 'Bearer ' + token
            },
            body: body
        })
    }

    deleteRequest(url, token, body) {
        return cy.request({
            method: 'DELETE',
            url: url,
            failOnStatusCode: false,
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            body: body
        })
    }

    putRequest(url, token, body) {
        return cy.request({
            method: 'PUT',
            url: url,
            failOnStatusCode: false,
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            body: body
        })
    }
}

export default Requests