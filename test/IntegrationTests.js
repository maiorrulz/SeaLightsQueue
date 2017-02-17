var app = require('../app');
var debug = require('debug')('sealightsqueue:server');
var http = require('http');
const request = require('supertest');
const express = require('express');



beforeEach(function() {
    closeServer();
    startServer();
});


describe('POST /queuecontainer', function() {
    it('respond with ', function(done) {
        request(app)
            .get('/')
            .expect(200, done);
    });
});

describe('GET /', function() {
    it('respond with json', function(done) {
        request(app)
            .get('/')
            .expect(200, done);
    });
});


describe('POST /queuecontainer/queue/err', function() {
    it('respond with json', function() {
        return request(app)
            .post('queuecontaisdfsdner/queue/')
            .expect(200)
            .then(function (res) {
                console.log(res.body);
                done();
            })
    });
});





//**********init*************
var server;

function closeServer() {
    if(server !== undefined) {
        server.close();
    }
}

function startServer() {
    var port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);

    server = http.createServer(app);

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);


    function normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }


    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }

}