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
            access_token = response.body.access_token;
            expect(response.status).to.equal(200);
        })
    })

    it('Save Leave Type', ()=>{
        url = headUrl + '/api/v1/leave/type'
        body = {
            "name" : "Carter"
        }
        requests.postRequest(url, access_token, body).then((response) =>{
            expect(response.status).to.equal(202);
        })
    })
})