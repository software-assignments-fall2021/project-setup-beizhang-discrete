const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

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
                });
            done();
        });
        it("Response body should have user properties username, avatar, joined_since, games_played, games_won, and success", (done) => {
            chai.request(app)
                .post("/login")
                .end((err, response) => {
                    if (err) throw err;
                    response.body.should.have.keys([
                        'username','avatar','joined_since','games_played','games_won','success'
                    ]);
                });
            done();
        });
    });

    //test post signUp route
    describe("POST /signUp", () => {
        it("Should successfully post to database and receive JSON", (done) => {
            chai.request(app)
                .post("/signUp")
                .end((err, response) => {
                    if (err) throw err;
                    response.should.have.status(200);
                    response.should.to.be.json;
                });
            done();
        });
        it("Response body should have user properties username, avatar, joined_since, games_played, games_won, and success", (done) => {
            chai.request(app)
                .post("/signUp")
                .end((err, response) => {
                    if (err) throw err;
                    response.body.should.have.keys([
                        'username','avatar','joined_since','games_played','games_won','success'
                    ]);
                });
            done();
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
                });
            done();
        });
        it("Response body should empty object, as there is not yet database integration", (done) => {
            chai.request(app)
                .get("/user")
                .end((err, response) => {
                    if (err) throw err;
                    response.body.should.satisfy(obj => Object.keys(obj).length === 0);
                });
            done();
        });
    });

    //test logout route
    describe("GET /logout", () => {
        it("Should logout (not yet implemented) and redirect successfully to home page", (done) => {
            chai.request(app)
                .get("/logout")
                .redirects(0)
                .end((err, response) => {
                    if (err) throw err;
                    response.should.have.status(302);
                });
            done();
        });
    });
});