// https://codepen.io/Sambego/pen/ZBPbbR

// console.log("11", document.URL)

const chunks = [];
let recorder = null;
let audioElement = null;
let stream= null;

let videoHtml = document.querySelector('video');

let config= {
    i:-1, // index of chunks
    second: 5
} 
last= null

const saveChunkToRecording = (event) => {
    chunks.push(event.data);
};

const saveRecording = () => {
    if (recorder.state=="recording"){
        var single_chunk= chunks.slice(config.i, config.i+1);
    }else{
        var single_chunk= chunks;
    }

    const blob = new Blob( single_chunk, {
        type: 'video/webm; codecs=opus'
    });

    const url = URL.createObjectURL(blob); //string

    // if(last==config.i){ // stop
    //     name= "full.webm";
    // }else{ //stream
    //     name= config.i+".webm";
    // }
    name= config.i+".webm";

    record_send(name, url, blob);
    //record_download(url, name);
    console.log( "record..", config.i, chunks, name );

    last= config.i;
    // audioElement.setAttribute('src', url);
};

const startRecording = () => {
    recorder.start();
    clockTag= true;
};

const stopRecording = () => {
    recorder.stop();
    clockTag= false;
};

const initRecording = () => {
    audioElement = document.getElementById('video');
    
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        videoHtml.srcObject = stream;

        recorder = new MediaRecorder(stream);

        recorder.ondataavailable = saveChunkToRecording;
        recorder.onstop = saveRecording;

        console.log("timer ms ..", config.second, "second"); 

        setInterval(timerRecroding, config.second*1000);
        function timerRecroding(){
            if( recorder.state=="recording"){
                config.i =  config.i + 1;
                
                recorder.stop();
                recorder.start();  
            } else{
                console.log( "timer idle..");
            }
        }
    });
  };
initRecording();

function record_download(blobURL, name="full") {
  const link = document.createElement("a");
  link.href = blobURL;
  link.download = name + ".webm";
  document.body.appendChild(link);

  link.dispatchEvent(
  new MouseEvent('click', { 
      bubbles: true, 
      cancelable: true, 
      view: window 
  })
  );

  document.body.removeChild(link);
}

function record_send(name, url, blob){
    console.log( "url", url);
    console.log( "blob", blob);

    data= {
        group:"record_test",
        id: name,
        url: url,
        base64:null
    };

    var reader = new window.FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
       base64 = reader.result;
       base64 = base64.split(',')[1];
       data.base64= base64;

       console.log("data->", data );
   
       aixos_post(data);
       console.log( "done");

    }
}



