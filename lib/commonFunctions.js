var model = require('../model');
var Sequelize = require('sequelize');

var env = process.env.NODE_ENV || 'development';
var databaseDir = env === 'production' ? process.env.OPENSHIFT_DATA_DIR : __dirname;
var sequelize = new Sequelize('engagement', 'engagement', 'pandas&love&foo+bar12345', {
        dialect: 'sqlite',
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
        storage: databaseDir + "/database.sqlite"
});

var Song = sequelize.define('song', {
    title: {
        type: Sequelize.STRING,
        unique: 'composite'
    },
    artist: {
        type: Sequelize.STRING,
        unique: 'composite'
    },
    count: {
        type: Sequelize.INTEGER
    }
}, {
    classMethods: {
        addSong: function(title, artist) {
            return Song.sync().then(function() {
                return Song.findOrCreate({
                    where: {
                        title: title,
                        artist: artist
                    }
                }).then(function(song) {
                    var actualSong = song[0];
                    if(actualSong.count === undefined || actualSong.count === null) {
                        actualSong.count = 0;
                    }
                    actualSong.count = actualSong.count + 1;
                    return actualSong.save();
                });
            });
        }
    }
});



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
    },
    Song: Song,
    setupDatabase: function() {
        Song.sync();
    }
};
