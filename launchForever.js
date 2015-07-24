var forever = require('forever-monitor');

var child = new (forever.Monitor)('./bin/www', {
    max: 3,
    silent: true,
    args: [],
    env: {'PORT': '8080'},
    logFile: '/var/log/forever/forever.log',
    outFile: '/var/log/forever/outfile.log',
    errFile: '/var/log/forever/errFile.log',
});

child.on('exit', function () {
    console.log('your-filename.js has exited after 3 restarts');
});
child.on('watch:restart', function(info) {
    console.error('Restaring script because ' + info.file + ' changed');
});

child.on('restart', function() {
    console.error('Forever restarting script for ' + child.times + ' time');
});

child.on('exit:code', function(code) {
    console.error('Forever detected script exited with code ' + code);
});
child.on('error', function(err) {
    console.error(err);
    throw err;
});

child.start();