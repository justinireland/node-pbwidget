var net = require('net');

var debug = false;
var cmdStart = '(';
var cmdStop = ')';

function PBWidget(options) {
    port = typeof options.port !== 'undefined' ? options.port : 1337; // Default 1337
    ip = options.ip;
    client = new net.Socket();

    client.on('close', function() {
        if(debug){console.log('Widget connection closed');}
    });
}

PBWidget.prototype.send = function(cmd,callback) {

    client.connect(port, ip, function() {
        if(debug){console.log('Connected to PB Widget');}

        if(debug){console.log('Sending command: ' + cmd);}
        client.write(cmdStart + cmd + cmdStop);

        setTimeout(function(){
            client.destroy();
            if(typeof callback === 'function' && callback()){
                callback();
            }
        },300);
    });
};

module.exports = PBWidget;
