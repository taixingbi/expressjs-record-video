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
last= null;

let session_id= null;
function gen_session(video_id){
    let time_now= new Date().getTime();
    let session_id= time_now + '_' + video_id;
    console.log("session_id", session_id);
    return session_id;
}

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

    // stream_id= config.i+ '-'+ time_now + ".webm";
    stream_id= config.i+ ".webm";
    // console.log( "stream_id..", stream_id );
    let stream_timestamp= new Date().getTime();

    record_send(stream_id, stream_timestamp, url, blob);
    //record_download(url, name);

    last= config.i;
    // audioElement.setAttribute('src', url);
};


const startRecording = () => {
    div_hidden("video_start", true);
    div_hidden("video_end", false);

    session_id= gen_session("user_info");    
    recorder.start();
    clockTag= true;
};

const stopRecording = () => {
    div_hidden("video_end", true);
    div_hidden("video_start", false);

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

function record_send(stream_id, stream_timestamp, url, blob){
    console.log( "url", url);
    console.log( "blob", blob);

    data= {
        topic:"webRecordVideo",
        group:"record",
        session_id: session_id,
        stream_id: stream_id,
        stream_timestamp: stream_timestamp,
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



