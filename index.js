var config = require( './config' ),

    express = require( 'express' ),
    app = express(),
    http = require( 'http' ).Server( app ),
    io = require( 'socket.io' )( http ),

    SerialPort = require( 'serialport' ),
    serialPort = new SerialPort( config.serialPort, {
        baudrate: config.serialRate,
        parser: SerialPort.parsers.readline( '\n' )
    } );


// Create the HTTP Server
http.listen( config.serverPort, function(){
    console.log( 'listening on', config.serverPort );
} );


// Tell the app where the files are and what page to serve
app.use( express.static( __dirname + '/public' ) );
app.get( '/', function( req, res ){
    res.sendFile( 'index.html' );
} );


// Websocket communication between Node Server and Browser
io.on( 'connection', function( socket ){
    console.log( 'a user connected' );
    socket.emit( 'hi' );

    socket.on( 'msg', function( msg ){
        console.log( msg );

        socket.emit( 'received' );
    } );

    socket.on( 'disconnect', function(){
        console.log( 'user disconnected' );
    } );
} );


// Serial communication between Node Server and Arduino
serialPort.on( 'open', function () {
    console.log( config.serialPort + ' open' );

    serialPort.on( 'data', function( data ) {
        console.log( 'data received: ' + data );
        io.emit( 'data', data );

        // try{
        //     var json = JSON.parse( data );
        //     io.emit( 'data', json );
        // }
        // catch( e ){
        //     console.log( data );
        // }
    } );
} );
