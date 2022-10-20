import Requests from "../support/Login/requests";
import oyablonskyi from "../fixtures/users/oyablonskyi.json"


const requests = new Requests()


describe('Testing api', () => {


    let access_token = '';
    let url
    let body
    const headUrl = 'http://test.biz.ua/symfony/web/index.php'


    before('Get token', () => {
        cy.visit('http://test.biz.ua/symfony/web/index.php/dashboard')
        requests.getToken(headUrl, oyablonskyi).then((response) => {
            cy.log(response.body.access_token);
            access_token = response.body.access_token;
            expect(response.status).to.equal(200);
        })
    })

    it('Get users', () => {
        url = headUrl + '/api/v1/user'
        requests.getRequest(url, access_token).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK');
            expect(response.body.data[length]).to.have.keys(
                'userName', 'employeeName', 'status', 'userName', 'userRole'
            )
        })
    })

    it('User Login', () => {
        url = headUrl + '/api/v1/login'
        body = {
            "username": oyablonskyi.username,
            "password": oyablonskyi.password
        }
        requests.postRequest(url, access_token, body).then((response) => {
            expect(response.status).to.equal(202);
            expect(response.statusText).to.equal('Accepted');
            expect(response.body.error.text).to.eq('Credentials Are Wrong Please Try Again')
        })
    })

    it('Get Organization Information', () => {
        url = headUrl + '/api/v1/organization'
        requests.getRequest(url, access_token).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK');
            expect(response.body.data).to.have.keys
            ('city', 'country', 'email', 'fax', 'id', 'name',
                'note', 'numberOfEmployees', 'phone', 'province', 'registraionNumber',
                'street1', 'street2', 'taxId', 'zipCode'
            )
        })
    })
})