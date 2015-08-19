describe("Model", function() {
  var model = require('../../model.js');
  var originalEnv = process.env.NODE_ENV;

  beforeEach(function() {
      process.env.NODE_ENV = originalEnv;
  });

  it("should generate a context with a local imageBasePath in development", function() {
      process.env.NODE_ENV = 'development';
      var errorModel = model('error');
      expect(errorModel.imageBasePath).toBe('');
  });
  
  it("should generate a context with a local imageBasePath in production", function () {
    process.env.NODE_ENV = 'production';
    expect(process.env.NODE_ENV).toBe('production');
    var errorModel = model('error');
          expect(errorModel.imageBasePath).toBe('https://raw.githubusercontent.com/jfposton/engagement/master/public/');

  });

});
