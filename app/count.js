clockTag= false;
clock= 0

var x = setInterval(function() {

    if(clockTag==true){
        clock = clock + 1
    }

    document.getElementById("clock_video").innerHTML = "video: " + clock + " s";
}, 1000);