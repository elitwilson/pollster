//var expect = require('expect.js');

if (!(typeof MochaWeb === 'undefined')){
  var expect = chai.expect;

  MochaWeb.testOnly(function(){
    describe("a group of tests", function(){
      it("should respect equality", function(){
        chai.assert.equal(5,5);
      });
    });
    describe("Homepage Poll Well element", function() {
      it("Should display display response type selection when question is entered and response array is empty", function() {
        chai.should();
        Session.set("poll", function() {
          var poll = {
            questionText: "Here's my question!",
            responses: []
          }
          return poll;
        });
        $('#header').should.have.attr('fasdfa');
        //var question = Session.get("questionSubmitted");
        //var questionDiv = $("div#question").html();
        //expect(questionDiv).to.equal(Session.get("questionText"));
      });

      it("Should show an input for first option after user enters poll question", function() {
        //var test = $('h3#create-poll').text();
        chai.should();
      });
    });
  });
}