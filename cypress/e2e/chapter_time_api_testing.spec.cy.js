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

    it('Get Customers', ()=>{
        url = headUrl + '/api/v1/customer'
        requests.getRequest(url, access_token).then((response) =>{
            expect(response.status).to.equal(200);
            expect(response.body.data[length]).to.have.keys(
                'customerId', 'description', 'isDeleted', 'name'
            )
        })
    })

    it('Save Customer', ()=>{
        url = headUrl + '/api/v1/customer'
        body = {
            'name' : 'Roman',
            'description' : 'Desc'
        }
        requests.postRequest(url, access_token, body).then((response) =>{
            expect(response.status).to.equal(202);
        })
    })


    it('Update Customer', ()=>{ /// assertion, error 202 fix
        url = headUrl + '/api/v1/customer'
        body = {
            'customerId' : '4',
            'name' : 'Cater',
            'description' : 'Description'
        }
        requests.putRequest(url, access_token, body).then((response) =>{
            expect(response.status).to.equal(202);
        })
    })


    it('Delete  Customer', ()=>{ /// assertion, error 202 fix
        url = headUrl + '/api/v1/customer'
        body = {
            'customerId' : '4',
        }
        requests.deleteRequest(url, access_token, body).then((response) =>{
            expect(response.status).to.equal(202);
        })
    })

    it('Get Activities', ()=>{
        url = headUrl + '/api/v1/activity'
        body = {
            'id' : '4',
        }
        requests.getRequest(url, access_token, body).then((response) =>{
            expect(response.status).to.equal(202);
        })
    })

    it('Save Activity', ()=>{
        url = headUrl + '/api/v1/activity'
        body = {
            'projectId' : '344',
            'name': 'Project'
        }
        requests.postRequest(url, access_token, body).then((response) =>{
            expect(response.status).to.equal(202);
        })
    })

    it('Update Activity', ()=>{
        url = headUrl + '/api/v1/activity'
        body = {
            'projectId' : '344',
            'activityId' : '43',
            'name': 'Project'
        }
        requests.putRequest(url, access_token, body).then((response) =>{
            expect(response.status).to.equal(202);
        })
    })


    it('Delete Activity', ()=>{
        url = headUrl + '/api/v1/activity'
        body = {
            'projectId' : '344',
            'activityId' : '43',
            'name': 'Project'
        }
        requests.deleteRequest(url, access_token, body).then((response) =>{
            expect(response.status).to.equal(202);
        })
    })

    it('Get Projects', ()=>{
        url = headUrl + '/api/v1/project'
        body = {
            'id' : '4'
        }
        requests.deleteRequest(url, access_token, body).then((response) =>{
            expect(response.status).to.equal(202);
        })
    })

    it('Save Project', ()=>{
        url = headUrl + '/api/v1/project'
        body = {
            'customerId' : '56',
            'name' : 'name93939',
            'description' : 'description',
            'adminIds' : 'adminIds',
        }
        requests.postRequest(url, access_token, body).then((response) =>{
            expect(response.status).to.equal(202);
        })
    })

    it('Update Project', ()=>{
        url = headUrl + '/api/v1/project'
        body = {
            'projectId' : '56',
            'customerId' : '939',
            'name' : 'Name',
            'description' : 'description',
            'adminIds' : 'adminIds',
        }
        requests.putRequest(url, access_token, body).then((response) =>{
            expect(response.status).to.equal(202);
        })
    })


    it('Delete Project', ()=>{
        url = headUrl + '/api/v1/project'
        body = {
            'projectId' : '56',
        }
        requests.deleteRequest(url, access_token, body).then((response) =>{
            expect(response.status).to.equal(202);
        })
    })
})