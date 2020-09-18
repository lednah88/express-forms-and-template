const request = require('supertest')
const server = require('../src/express')
var serverInstance
beforeEach((done)=>{
    serverInstance = server.run(done)
})
afterEach((done)=>{
    serverInstance.close(done)
})
describe('/',()=>{
    it('should respond with json',(done)=>{
        request(app)
        .get("/")
        .set('Accept','app/json')
        .expect('Content-Type', 'json')
        .expect(path, done)
    })
})