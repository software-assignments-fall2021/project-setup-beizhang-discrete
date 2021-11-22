// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const app = require("../app");

// //assertion style
// chai.should();
// chai.use(chaiHttp);

// describe('Get Friend List and Default route', () => {
//     //Test get friend list route
//     describe("GET /friendList", () => {
//         it("Should respond with status 200", (done) => {
//             chai.request(app)
//                 .get("/friendList")
//                 .end((err, response) => {
//                     if (err) throw err;
//                     response.should.have.status(200);
//                 });
//             done();
//         });
//         it("Friend list response should contain the specified keys", (done) => {
//             chai.request(app)
//                 .get("/friendList")
//                 .end((err, response) => {
//                     if (err) throw err;
//                     response.body[0].should.have.property('name')
//                     response.body[1].should.have.property('avatar')
//                     response.body[2].should.have.property('status')
//                     response.body[3].should.have.property('id')
//                     // response.body.should.have.keys(['name', 'avatar', 'status', 'id'])
//                 });
//             done();
//         });
//     });

//     //Test default route
//     describe("GET /", () => {
//         it("Should respond with status 200", (done) => {
//             chai.request(app)
//                 .get("/")
//                 .end((err, response) => {
//                     if (err) throw err;
//                     response.should.have.status(200);
//                 });
//             done();
//         });
//         it("Response should be a html file", (done) => {
//             chai.request(app)
//                 .get("/")
//                 .end((err, response) => {
//                     if (err) throw err;
//                     response.should.to.be.html;
//                 });
//             done();
//         });
//     });
// });