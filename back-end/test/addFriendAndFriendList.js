const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

//assertion style
chai.should();
chai.use(chaiHttp);

// describe('add friend routes', () => {


describe('friend request and default routes', () => {

    //Test send friend request route
    describe("POST /sendFriendRequest", () => {
        //Oscar and new2 are friends
        //Oscar to new2
        it("Should respond with status 200", (done) => {
            chai.request(app)
                .post("/api/sendFriendRequest")
                .send({'sender' : '619ad4d039922280a1c59b99', 'receiver' : '61a6a8636ed606172cd93238'})
                .end((err, response) => {
                    if (err) throw err;
                    response.should.have.status(200);
                    done();
                });
        });
        it("Trying to add someone already in friend list responded with 'You have already been friends'", (done) => {
            chai.request(app)
                .post("/api/sendFriendRequest")
                .send({'sender' : '619ad4d039922280a1c59b99', 'receiver' : '61a6a8636ed606172cd93238'})
                .end((err, response) => {
                    if (err) throw err;
                    response.text.should.equal("You have already been friends");
                    done();
                });
        });
        //new2 sent new4 friend request pending response
        //new2 to new4
        it("Trying to send multiple requests to the same user responded with 'You have already requested'", (done) => {
            chai.request(app)
                .post("/api/sendFriendRequest")
                .send({'sender' : '61a6a8636ed606172cd93238', 'receiver' : '61a6d2caadd13a88762b725d'})
                .end((err, response) => {
                    if (err) throw err;
                    response.text.should.equal("You have already requested");
                    done();
                });
        });
        //new4 to new2
        it("Trying to send request to someone who has sent you one responded with 'Look into your friend requests!'", (done) => {
            chai.request(app)
                .post("/api/sendFriendRequest")
                .send({'sender' : '61a6d2caadd13a88762b725d', 'receiver' : '61a6a8636ed606172cd93238'})
                .end((err, response) => {
                    if (err) throw err;
                    response.text.should.equal("Look into your friend requests!")
                    done();
                });
        });
    });

    //Test accept friend request route
    // describe("POST /acceptFriendRequest", () => {
    //     it("Should respond with status 200 and a specific string", (done) => {
    //         chai.request(app)
    //             .post("/")
    //             .send({'sender' : "Oscar3", 'receiver' : "Oscar"})
    //             .end((err, response) => {
    //                 if (err) throw err;
    //                 response.should.have.status(200);
    //                 expect(response).to.equal("Friend added")
    //             });
    //         done();
    //     });
    // });


    //Test default route
    describe("GET /", () => {
        it("Should respond with status 200", (done) => {
            chai.request(app)
                .get("/")
                .end((err, response) => {
                    if (err) throw err;
                    response.should.have.status(200);
                    done();
                });
        });
        it("Response should be a html file", (done) => {
            chai.request(app)
                .get("/")
                .end((err, response) => {
                    if (err) throw err;
                    response.should.to.be.html;
                    done();
                });
        });
    });
});