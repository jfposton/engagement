var model = require('../model');

common = {
    renderTemplate: function(template) {
        return function(req, res) {
            res.render(template, model(template));
        };
    }
};

module.exports = common;
