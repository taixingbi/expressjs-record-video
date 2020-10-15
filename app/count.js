clockTag= false;
clock= 0

var x = setInterval(function() {

    if(clockTag==true){
        clock = clock + 1
    }

    document.getElementById("demo").innerHTML = clock;
}, 1000);