var PBWidget = require('./../index.js');

var cmd1 = 'DeviceSetParam';
var device = '1,1';
var param = 'X Pos';
var paramValue = '4';
var composedCMD1 = cmd1+','+device+','+param+','+paramValue; //'DeviceSetParam,1,1,X Pos,4'

var cmd2 = 'ResetParam';
var composedCMD2 = cmd2+','+device+','+param; //'ResetParam,1,1,X Pos'

pbWidgetServer = new PBWidget( {ip:'192.168.0.4'} );

pbWidgetServer.send(composedCMD1, function(){
    pbWidgetServer.send(composedCMD2, function() {
        console.log('success');
    });
});


