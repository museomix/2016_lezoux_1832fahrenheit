// Vous êtes sûrs que vous voulez voir ça ?
// Vous savez, j'avais candidaté comme graphiste moi à la base...
// Bon, vous l'aurez voulu !

var input;

( function( w, d, u ){
    var socket = io();

    socket.on( 'data', function( data ){
        // console.log(data);
        // console.log(data);
        input = data;
        input = input.split(',');
    } );
} )( window, document, undefined );

var scroll = 0;
var speed = 0;

var piste,
file,
fileRev,
playing,
fileDur,
fileRevDur;

function preload() {
    piste1 = loadSound('data/bol1.wav');
    piste1rev = loadSound('data/bol1rev.wav');
    piste2 = loadSound('data/bol2.wav');
    piste2rev = loadSound('data/bol2rev.wav');
    piste3 = loadSound('data/bol3.wav');
    piste3rev = loadSound('data/bol3rev.wav');
}

function setup() {
    createCanvas(1440, 900);
    // pis = file.duration();
    // fileRevDur = fileRev.duration();
    // file.playable = true;
    // fileRev.playable = true;
    // file.jump(100,10);
    dureePiste1 = piste1.duration();
    dureePiste2 = piste2.duration();
    dureePiste3 = piste3.duration();
    //console.log(dureePiste1, dureePiste2, dureePiste3);
    b1 = color(0);
    b2 = color(255,0,0);
    c1 = color(204, 102, 0);
    c2 = color(0, 102, 153);
}


function mouseWheel(event) {
    if (event.delta > 1) {
        scroll = constrain(scroll+10, 0, 1000);
    } else if (event.delta < 0) {
        scroll = constrain(scroll-10, -1000, 0);
    }
}

function playSound(piste) {
    if (piste) {
        playing = piste;
        piste.play();
    }
}

function stopSound() {
    // songPos = file._prevTime;
    // console.log(songPos);
    if (playing) {
        playing.pause();
    }
}

var bol0,
bol1,
bol2,
bol3,
bol1rev = false,
bol2rev = false,
bol3rev = false;


var Y_AXIS = 1;
var X_AXIS = 2;
var b1, b2, c1, c2;


function draw() {
    setGradient(0, 0, width, height, b1, b2, Y_AXIS);
    background(0,0,0,80/speed);

    translate(600,100);
    if (input[0] > 100 && !bol1 && scroll > 0) {
        stopSound();
        bol0 = false;
        bol1 = true;
        bol2 = false;
        bol3 = false;
        bol1rev = false;
        bol2rev = false;
        bol3rev = false;
        console.log("Bol 1");
        playSound(piste1);
        if (dureePiste1 - piste1rev._prevTime < dureePiste1) {
            piste1.jump(dureePiste1 - piste1rev._prevTime);
        }
    } else if (input[0] > 100 && !bol1rev && scroll < 0) {
        stopSound();
        bol0 = false;
        bol1 = false;
        bol2 = false;
        bol3 = false;
        bol1rev = true;
        bol2rev = false;
        bol3rev = false;
        console.log("Bol 1 rev");
        playSound(piste1rev);
        if (dureePiste1 - piste1._prevTime < dureePiste1) {
            piste1rev.jump(dureePiste1 - piste1._prevTime);
        }
    }

    if (input[1] > 100 && !bol2 && scroll > 0) {
        stopSound();
        bol0 = false;
        bol1 = false;
        bol2 = true;
        bol3 = false;
        bol1rev = false;
        bol2rev = false;
        bol3rev = false;
        console.log("Bol 2");
        playSound(piste2);
        if (dureePiste2 - piste2rev._prevTime < dureePiste2) {
            piste2.jump(dureePiste2 - piste2rev._prevTime);
        }
    } else if (input[1] > 100 && !bol2rev && scroll < 0) {
        stopSound();
        bol0 = false;
        bol1 = false;
        bol2 = false;
        bol3 = false;
        bol1rev = false;
        bol2rev = true;
        bol3rev = false;
        console.log("Bol 2 rev");
        playSound(piste2rev);
        if (dureePiste2 - piste2._prevTime < dureePiste2) {
            piste2rev.jump(dureePiste2 - piste2._prevTime);
        }
    }

    if (input[2] > 100 && !bol3 && scroll > 0) {
        stopSound();
        bol0 = false;
        bol1 = false;
        bol2 = false;
        bol3 = true;
        bol1rev = false;
        bol2rev = false;
        bol3rev = false;
        console.log("Bol 3");
        playSound(piste3);
        if (dureePiste3 - piste3rev._prevTime < dureePiste3) {
            piste3.jump(dureePiste3 - piste3rev._prevTime);
        }
    } else if (input[2] > 100 && !bol3rev && scroll < 0) {
        stopSound();
        bol0 = false;
        bol1 = false;
        bol2 = false;
        bol3 = false;
        bol1rev = false;
        bol2rev = false;
        bol3rev = true;
        console.log("Bol 3 rev");
        playSound(piste3rev);
        if (dureePiste3 - piste3._prevTime < dureePiste3) {
            piste3rev.jump(dureePiste3 - piste3._prevTime);
        }
    }

    if (input[0] < 50 && input[1] < 50 && input[2] < 50 && !bol0) {
        stopSound();
        bol0 = true;
        bol1 = false;
        bol2 = false;
        bol3 = false;
        console.log("Aucun bol");
    }

    //console.log(scroll);
    // console.log(speed);

    if (scroll > 0) {
        scroll -= 5;
    } else if (scroll < 0) {
        scroll += 5;
    }

    // if (scroll > 0 && !bol1) {
    //     bol1 = true;
    //     bol1rev = false;
    //     console.log("bol 1");
    //     stopSound();
    //     playSound(piste1);
    // } else if (scroll < 0 && bol1 && !bol1rev) {
    //     bol1 = false;
    //     bol1rev = true;
    //     console.log("bol 1 rev");
    //     stopSound();
    //     playSound(piste1rev);
    // }

    if (scroll > 0) {
        if (scroll < 100) {
            speed = map(scroll, 0, 100, 0, 1) ;
        } else if (scroll > 100 && scroll < 900) {
            speed = 1;
        } else if (scroll > 900) {
            speed = map(scroll, 900, 1000, 1, 3);
        }
    } else if (scroll < 0) {
        if (scroll > -100) {
            speed = map(scroll, 0, -100, 0, 1) ;
        } else if (scroll < -100 && scroll > -900) {
            speed = 1;
        } else if (scroll < -900) {
            speed = map(scroll, -900, -1000, 1, 3);
        }
    }


    // background(sqrt(scroll*scroll)+10);
    // background(255);
    if (debugging) {
        noStroke();
        text(speed, 0, 60);
        stroke(255);
        line(0,10,0,40);
        line(100,10,100,40);
        line(400,10,400,40);
        line(500,10,500,40);
        line(-100,10,-100,40);
        line(-400,10,-400,40);
        line(-500,10,-500,40);
        line(scroll/2, 30, scroll/2, 40);
        line(0,100,0,120);
        if (playing && debugging) {
            if (!bol1rev && !bol2rev && !bol3rev) {
                line(playing._prevTime*3, 110, playing._prevTime*3, 120);
            } else if (bol1rev){
                line((dureePiste1 - playing._prevTime)*3, 110, (dureePiste1 - playing._prevTime)*3, 120);
            } else if (bol2rev){
                line((dureePiste2 - playing._prevTime)*3, 110, (dureePiste2 - playing._prevTime)*3, 120);
            } else if (bol3rev){
                line((dureePiste3 - playing._prevTime)*3, 110, (dureePiste3 - playing._prevTime)*3, 120);
            }
        }

        if (bol1 && !bol1rev) {
            line(dureePiste1*3, 100, dureePiste1*3, 120);
            noStroke();
            fill(255);
            text("Bol 1", 10, 100);
        } else if (bol2 && !bol2rev) {
            line(dureePiste2*3, 100, dureePiste2*3, 120);
            noStroke();
            fill(255);
            text("Bol 2", 10, 100);
        } else if (bol3 && !bol3rev) {
            line(dureePiste3*3, 100, dureePiste3*3, 120);
            noStroke();
            fill(255);
            text("Bol 3", 10, 100);
        } else if (!bol1 && bol1rev) {
            line(dureePiste1*3, 100, dureePiste1*3, 120);
            noStroke();
            fill(255);
            text("Bol 1 rev", 10, 100);
        } else if (!bol2 && bol2rev) {
            line(dureePiste2*3, 100, dureePiste2*3, 120);
            noStroke();
            fill(255);
            text("Bol 2 rev", 10, 100);
        } else if (!bol3 && bol3rev) {
            line(dureePiste3*3, 100, dureePiste3*3, 120);
            noStroke();
            fill(255);
            text("Bol 3 rev", 10, 100);
        } else if (bol0) {
            noStroke();
            fill(255);
            text("Aucun bol", 10, 100);
        }
    }
    if (speed == 0) {
        speed = 0.001;
    }

    // console.log(speed);

    if (playing) {
        // console.log(playing);
        playing.rate(speed);
    }

    // console.log(JSON.stringify(playing, null, 4));
    // console.log(deluxeReverseDuration - playing._prevTime);
}

var debugging = true;

function setGradient(x, y, w, h, c1, c2, axis ) {
    noFill();
    if (axis == Y_AXIS) {  // Top to bottom gradient
        for (i = y; i <= y+h; i++) {
            inter = map(i, y, y+h, 0, 1);
            c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x+w, i);
        }
    }
    else if (axis == X_AXIS) {  // Left to right gradient
        for (i = x; i <= x+w; i++) {
            inter = map(i, x, x+w, 0, 1);
            c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y+h);
        }
    }
}


// function draw() {
//     if (scroll >= 0) {
//         deluxe.playable = true;
//         playSound(deluxe);
//         stopSound(deluxeReverse);
//         scroll -= 1;
//         speed = constrain(map(scroll, 0, 230, 0, 1), 0, 1);
//     } else if (scroll < 0) {
//         deluxeReverse.jump(constrain(deluxeReverseDuration - deluxe._prevTime, 0, deluxeReverseDuration));
//         playSound(deluxeReverse);
//         stopSound(deluxe);
//         scroll += 1;
//         speed = constrain(map(-scroll, 0, 230, 0, 1), 0, 1);
//     }
//     background(sqrt(scroll*scroll)+10);
//
//     if (speed == 0) {
//         speed = 0.00001;
//     }
//     playing.rate(speed);
//     console.log(JSON.stringify(playing, null, 4));
//     console.log(deluxeReverseDuration - playing._prevTime);
// }
