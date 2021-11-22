const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const faker = require('faker');

//assertion style
chai.should();
chai.use(chaiHttp);

describe('Change profile information API', () => {
    //test changeUsername login route
    describe("POST /changeUsername", () => {
        it("Should successfully post to database and receive JSON", (done) => {
            chai.request(app)
                .post("/changeUsername")
                .end((err, response) => {
                    if (err) throw err;
                    response.should.have.status(200);
                    response.should.to.be.json;
                    done();
                });
        });
        it("Response body should have user properties auth, message if no JWT", (done) => {
            chai.request(app)
                .post("/changeUsername")
                .end((err, response) => {
                    if (err) throw err;
                    response.body.should.have.keys([
                        'auth', 'message'
                    ]);
                    done();
                });
        });
    });

    //test post signUp route
    describe("POST /changePassword", () => {
        it("Should successfully post to database and receive JSON", (done) => {
            chai.request(app)
                .post("/changePassword")
                .send({ username: faker.internet.userName(), password: faker.internet.password() })
                .end((err, response) => {
                    if (err) throw err;
                    response.should.have.status(200);
                    response.should.to.be.json;
                    done();
                });
        });
        it("Response body should have user properties auth, user, and token", (done) => {
            chai.request(app)
                .post("/changePassword")
                .send({ username: faker.internet.userName(), password: faker.internet.password() })
                .end((err, response) => {
                    if (err) throw err;
                    response.body.should.have.keys([
                        'auth','user','token'
                    ]);
                    done();
                });
        });
    });
});