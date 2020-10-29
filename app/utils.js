
div_hidden("video_end", true);


function div_hidden(id, hidden){
    
    var x = document.getElementById(id);
    console.log(x.style.display);

    if(hidden==true){
        x.style.display = "none";
    }else{
        x.style.display = "block";
    }

    // if(hidden==true){
    //     alert("block");
    //     x.style.display = "block";
    // }else{
    //     alert("none");
    //     x.style.display = "none";
    // }

    // alert(x.style.display);

    // if (x.style.display === "none") {
    //     alert("block");
    //     x.style.display = "block";
    // } else {
    //     alert("none");
    //     x.style.display = "none";
    // }
}

