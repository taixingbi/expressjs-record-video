
//url= 'https://api.github.com/users/mapbox'
//url= 'http://0.0.0.0:8083/api/demo/'
//let url= 'http://localhost:3000/api/'


async function aixos_post(data){
    let url= document.URL + 'api';

    await axios.post(url, data)
    .then((response) => {
        console.log(response);
    });
}

async function aixos_get(db_name, collection_name){
    // db_name= 'aws-transcribe-result-test-tmp';
    // collection_name= 'col1';
    let url = document.URL + 'api/transcribe/' + db_name + '/' + collection_name;
    console.log('url', url);

    await axios.get(url, {
      method: 'GET',
    }).then((response) => {
        let data= response.data;
        data_transcibe= data;
        console.log("data_transcibe",data_transcibe);

    })
}

 // await fetch(url, {
    //     method: 'GET',
    //     mode: 'cors', // no-cors, *cors, same-origin
    //     headers:{
    //         'X-Requested-With': 'XMLHttpRequest'
    //     }
    // })
    // .then(response => response.json())
    // .then(data => console.log(data));


// $.ajax({
//     url: url,
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     type: "GET", /* or type:"GET" or type:"PUT" */
//     dataType: "json",
//     data: {
//     },
//     success: function (result) {
//         console.log(result);
//     },
//     error: function () {
//         console.log("error");
//     }
// });