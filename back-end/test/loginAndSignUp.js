const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const faker = require('faker');
const { expect } = require("chai");

//assertion style
chai.should();
chai.use(chaiHttp);

describe('login system API', () => {
    //test post login route
    describe("POST /login", () => {
        it("Should successfully post to database and receive JSON", (done) => {
            chai.request(app)
                .post("/login")
                .end((err, response) => {
                    if (err) throw err;
                    response.should.have.status(200);
                    response.should.to.be.json;
                    done();
                });
        });
        it("Response body should have user properties auth, message if no JWT", (done) => {
            chai.request(app)
                .post("/login")
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
    describe("POST /register", () => {
        it("Should successfully post to database and receive JSON", (done) => {
            chai.request(app)
                .post("/register")
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
                .post("/register")
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

    //test post userSearch route
    describe("POST /userSearch", () => {
        it("Should send searched username to database and return array of results", (done) => {
            chai.request(app)
                .post("/userSearch")
                .send({ searched: faker.internet.userName() })
                .end((err, response) => {
                    if (err) throw err;
                    response.should.have.status(200);
                    response.should.to.be.json;
                    expect(response.body).to.be.an('array');
                    done();
                });
        });
    });

    //test get user route
    describe("GET /user", () => {
        it("Should respond with status 200", (done) => {
            chai.request(app)
                .get("/user")
                .end((err, response) => {
                    if (err) throw err;
                    response.should.have.status(200);
                    done();
                });
        });
        it("Response body should be falsy (empty object) if there is no valid JWT", (done) => {
            chai.request(app)
                .get("/user")
                .end((err, response) => {
                    if (err) throw err;
                    response.body.should.satisfy(obj => Object.keys(obj).length === 0);
                    done();
                });
        });
    });
});