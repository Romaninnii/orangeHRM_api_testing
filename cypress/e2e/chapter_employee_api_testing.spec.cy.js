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

    it('Employee Search', () => {
        url = headUrl + '/api/v1/employee/search'
        requests.getRequest(url, access_token, body).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK');
            expect(response.body.data[length]).to.have.keys
            ('code', 'dob', 'driversLicenseNumber', 'employeeId', 'firstName',
                'fullName', 'gender', 'jobTitle', 'lastName', 'licenseExpiryDate',
                'maritalStatus', 'middleName', 'nationality', 'otherId', 'status',
                'supervisor', 'unit'
            )
        })
    })

    it('Employee Picture', () => {
        url = headUrl + '/api/v1/employee/id/photo'
        body = {
            'id': '2'
        }
        requests.getRequest(url, access_token, body).then((response) => {
            console.log(response)
            expect(response.status).to.equal(202);
        })
    })
})