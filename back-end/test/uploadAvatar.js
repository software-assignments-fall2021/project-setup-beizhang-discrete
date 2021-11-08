const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

//assertion style
chai.should();
chai.use(chaiHttp);

//test upload avatar
describe("POST /uploadAvatar", () => {
    it("Should respond with status 200.", (done) => {
        chai.request(app)
            .post("/uploadAvatar")
            .end((err, response) => {
                if (err) throw err;
                response.should.have.status(200);
            });
        done();
    });

    it("Should return an image.", (done) => {
        chai.request(app)
            .post("/uploadAvatar")
            .end((err, response) => {
                if (err) throw err;
                expect(response).to.have.header('content-type', 'image/jpeg');
            });
        done();
    });
});
