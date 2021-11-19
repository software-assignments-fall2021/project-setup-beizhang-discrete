const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

//assertion style
chai.should();
chai.use(chaiHttp);

// //test get all users list route
// describe("GET /allUsersList", () => {
//     it("Should respond with status 200 and recieve a json", (done) => {
//         chai.request(app)
//             .get("/allUsersList")
//             .end((err, response) => {
//                 if (err) throw err;
//                 response.should.have.status(200);
//                 response.should.to.be.json;
//             });
//         done();
//     });
// });
