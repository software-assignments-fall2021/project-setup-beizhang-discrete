const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

//assertion style
chai.should();
chai.use(chaiHttp);

describe('Get Friend List', () => {
    //test get friend list route
    describe("GET /friendList", () => {
        it("Should respond with status 200", (done) => {
            chai.request(app)
                .get("/friendList")
                .end((err, response) => {
                    if (err) throw err;
                    response.should.have.status(200);
                });
            done();
        });
        it("Response body should empty object, as there is not yet database integration", (done) => {
            chai.request(app)
                .get("/friendList")
                .end((err, response) => {
                    if (err) throw err;
                    response.body.should.satisfy(obj => Object.keys(obj).length > 0);
                });
            done();
        });
    });
});