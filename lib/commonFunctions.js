var model = require('../model');

var env = process.env.NODE_ENV || 'development';

module.exports = {
    renderTemplate: function (template) {
        "use strict";
        return function (req, res) {
            if (env === 'production') {
                var path = req.path;
                if (path === '/') {
                    path = 'story';
                }
                res.redirect(path + '.html');
            } else {
                res.render(template, model(template));
            }
        };
    }
};
