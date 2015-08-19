var jade = require('jade');
var model = require('../../model');
var baseTemplatePath = __dirname + '/../../views/';

function renderTemplate(template) {
    jade.compileFile(baseTemplatePath + template + '.jade', {self: model(template)});
}
describe("Routes", function() {
  beforeEach(function() {
  });

  it("Should generate a template without error for each route", function() {
      var renderEveryTemplate = function () {
        renderTemplate('story');
      };
      expect(renderEveryTemplate).not.toThrow();
  });
});