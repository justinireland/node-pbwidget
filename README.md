# Node-pbWidget
Node module for running Pandora's Box Widget commands. This module allows you to build applications and store logic in node.js with the ability to execute any PB Widget command over a TCP socket.

This can be combined with [pandora-node](https://github.com/justinireland/pandora-node) for full widget and SDK control of Pandora's Box.

## Requirements
* Pandora's Box Manager
* Pandora's Box Widget
* node.js

## Installation

```
npm install node-pbwidget
```

## Widget Setup
Make sure your PB project is running.

Run the widget in /widget/PB Widget Server/. Make sure it is connected to your PB Manager.

The default listening port is 1337. You can change that in the Connection Manager but be sure to reset the connection ID to 1.

## Usage

```
var PBWidget = require('node-pbwidget');

var options = {
    ip: // required
    port: // Optional. Default is 1337
};

pbWidgetServer = new PBWidget(options);

// Send any widget command as a full string with optional callback
pbWidgetServer.send(widgetCMD,cb());
```

## Example
The following example creates a connection to the widget server running at 192.168.0.4 and sends a DeviceSetParam command to change the X position of device 1.1 to 4 and immediately resets the same parameter in the callback.

```
var PBWidget = require('node-pbwidget');

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
```