var pug = require('pug');
var model = require('../../model');
var baseTemplatePath = __dirname + '/../../views/';

function renderTemplate(template) {
    pug.compileFile(baseTemplatePath + template + '.pug', {self: model(template)});
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
