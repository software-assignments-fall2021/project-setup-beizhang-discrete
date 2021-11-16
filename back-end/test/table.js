const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

//assertion style
chai.should();
chai.use(chaiHttp);

describe('table create system API', () => {
    //test post table route
    describe("POST /createTable", () => {
        it("Should successfully post to database and receive JSON", (done) => {
            chai.request(app)
                .post("/createTable")
                .end((err, response) => {
                    if (err) throw err;
                    response.should.have.status(200);
                    response.should.to.be.json;
                });
            done();
        });
        it("Response body should have appropriate table properties", (done) => {
            chai.request(app)
                .post("/createTable")
                .end((err, response) => {
                    if (err) throw err;
                    response.body.should.have.keys([
                        'id','name','curPlayers','numPlayers','startingValue','smallBlind','bigBlind','status'
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
        it("Response body should be an array", (done) => {
            chai.request(app)
                .get("/tableList")
                .end((err, response) => {
                    if (err) throw err;
                    response.body.should.be.an('array');
                });
            done();
        });
        it("Array items should be objects representing a table", (done) => {
            chai.request(app)
                .post("/createTable")
                .end((err, response) => {
                    if (err) throw err;
                    for (let i = 0; i < response.body.length; i++) {
                        response.body[i].should.have.keys([
                            'id','name','curPlayers','numPlayers','startingValue','smallBlind','bigBlind','status'
                        ]);
                    }
                });
            done();
        });
    });
});