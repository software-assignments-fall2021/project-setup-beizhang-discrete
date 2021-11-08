const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

//assertion style
chai.should();
chai.use(chaiHttp);

describe('table create system API', () => {
    //test post table route
    describe("POST /tableCreate", () => {
        it("Should successfully post to database and receive JSON", (done) => {
            chai.request(app)
                .post("/tableCreate")
                .end((err, response) => {
                    if (err) throw err;
                    response.should.have.status(200);
                    response.should.to.be.json;
                });
            done();
        });
        it("Response body should have user properties tableName, numPlayers, startingValue, smallBlind, bigBlind, and success", (done) => {
            chai.request(app)
                .post("/login")
                .end((err, response) => {
                    if (err) throw err;
                    response.body.should.have.keys([
                        'tableName','numPlayers','startingValue','smallBlind','bigBlind','success'
                    ]);
                });
            done();
        });
    });

    //test get table route
    describe("GET /tableList", () => {
        it("Should respond with status 200", (done) => {
            chai.request(app)
                .get("/tableList")
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
});