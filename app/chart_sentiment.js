
sample_size= 5;
let p= 0;

function updateChart (data, labels) {
    if(data.length < sample_size){
        let N= sample_size - data.length;
        for(let i=0; i<N; i++){
            data.push(-1);
            labels.push("");
        }
    }
    else{
        data= data.slice(p, p+sample_size)
        labels= labels.slice(p, p+sample_size);
        p = p +1;
    }
    window.chart_sentiment.data.labels= labels;
    window.chart_sentiment.data.datasets[0].data= data;
    window.chart_sentiment.update();
};

window.onload = function chart_sentiment(data, labels){   
    data=[0, 0, 0, 0, 0, 0]
    labels=["00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00"]
    // data=[-1, 0.8, -1, -.07, -1, 1]
    
    var canvas = document.getElementById("canvas");  

        if(canvas.getContext) {  
            var ctx = canvas.getContext("2d");  

            maxValueYPixel= 200;
            minValueYPixel= 130;
            var gradient = ctx.createLinearGradient(0, maxValueYPixel, 0, minValueYPixel);//0 200 0 130
            gradient.addColorStop(0, 'green');
            gradient.addColorStop(1, 'red');

            window.chart_sentiment= new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'sentiment', // Name the series
                        data: data, // Specify the data values array
                        fill: false,
                        borderColor: '#2196f3', // Add custom color border (Line)
                        backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
                        borderWidth: 1, // Specify bar border width
                        borderColor: gradient,
                    }]},
                options: {
                  responsive: false, // Instruct chart js to respond nicely.
                  maintainAspectRatio: true, // Add to prevent default behaviour of full-width/height 
                  scales: {
                    xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Time'
                            }
                        }],
                    yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                // steps: 10,
                                // stepValue: 5,
                                max: 1,
                                min: -1
                            }
                        }]
                },
                }
            });

        }  
};
