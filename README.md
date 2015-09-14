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
Make sure your PB project and PB Widget are running. Connect the widget to the PB project.

In the Widget menu select Tools - Remoting. Set the TCP Server port to 1337 (or whatever port you prefer) and Enable. This will listen for commands coming from the Nod.js server.

## Usage

```
var PBWidget = require('node-pbwidget');

var options = {
    ip: // required
    port: // Default is 1337 if not specified
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

pbWidgetServer = new PBWidget( {ip:'192.168.0.4', port: 1338} );

pbWidgetServer.send(composedCMD1, function(){
    pbWidgetServer.send(composedCMD2, function() {
        console.log('success');
    });
});
```