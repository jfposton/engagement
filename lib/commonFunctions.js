var model = require('../model');

var env = process.env.NODE_ENV || 'development';

module.exports = {
    renderTemplate: function (template) {
        "use strict";
        return function (req, res) {
            if (env === 'production') {
                res.redirect('/' + req.baseUrl + '.html');
            } else {
                res.render(template, model(template));
            }
        };
    }
};
