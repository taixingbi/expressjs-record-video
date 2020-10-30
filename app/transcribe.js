
setInterval(transcribe, 4000);

let stream_data= [];
let stream_data_N= 0;

let data_transcibe= [];

async function transcribe(){
    db_name= 'aws-transcribe-result-test-tmp';
    collection_name= 'col';

    console.log('session_id: ', session_id);
    if(session_id==null){
        //console.log('video not started yet, session_id is null');
        return;
    }

    collection_name= session_id;
    await aixos_get(db_name, collection_name);

    if( stream_data_N == data_transcibe.length){
        return; // no new data 
    } else{
        stream_data_N = data_transcibe.length;
    }

    // console.log('data_transcibe: ', data_transcibe);
    let content_transcribe= "";

    let data_sentiment= [];
    let labels_sentiment= [];
    
    for( var i= stream_data_N-1; i>=0; i--){
        let item= data_transcibe[i];
        if( item['transcripts'] == "init" ){ 
            console.log('read audio wrong or recognize_google could not recognize it ')
            continue; 
        }
        let timestamp= item['timestamp']
        if(timestamp==undefined){continue;}

        let timestamp_readable= convertTime(timestamp)
        // content_transcribe += timestamp + ": " + item['transcripts'] + "<br />";
        content_transcribe += timestamp_readable + ": " + item['transcripts'] +  " (" + item['score_comprehend']['Compound'] +")" + "<br />";

        data_sentiment.unshift( item['score_comprehend']['Compound'] );
        labels_sentiment.unshift(timestamp_readable);
    }

    if(content_transcribe!=""){
        document.getElementById("content_transcribe").innerHTML= content_transcribe;
        console.log("chart data", data_sentiment, labels_sentiment);
        updateChart(data_sentiment, labels_sentiment);
    }

}

// chart_sentiment(sentiment_data, sentiment_label);


function convertTime(timestamp){
    // return timestamp;
    ts = new Date(timestamp * 1000);
    ts_str= ts.toISOString(); //+052793-10-10T18:19:55.000Z
    return ts_str.substr(14, 8);
}



// data_transcibe= [ {
//     sessin_id: '1603739186445_user_info',
//     timestamp: 1603739199750,
//     transcripts: 'odysseus encounter hello'
//   },
//   {
//     sessin_id: '1603739186445_user_info',
//     timestamp: 1603739199750,
//     transcripts: 'odysseus encounter hello'
//   }
// ];

// function setTime(){console.log('setInterval(setTime, 1000)')}