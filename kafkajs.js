const { Kafka } = require('kafkajs')

//const brokers= ['localhost:9092'];
//const brokers= ['54.91.38.33:9092','54.91.38.33:9093', '54.91.38.33:9094'];
const brokers=[
    'b-1.awskafkatutorialclust.bwvs6a.c10.kafka.us-east-1.amazonaws.com:9094',
    'b-2.awskafkatutorialclust.bwvs6a.c10.kafka.us-east-1.amazonaws.com:9094',
    'b-3.awskafkatutorialclust.bwvs6a.c10.kafka.us-east-1.amazonaws.com:9094']

const topic= 'webRecordVideo';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: brokers,
    ssl: true
})

const producer = kafka.producer();

const run = async (data) => {
    await producer.connect()
    await producer.send({
    topic: topic,
    messages: [
        { value: JSON.stringify(data) },
    ],
    })
    await producer.disconnect()
}

// data= {
//     id: "id",
//     url: "url",
//     base64:"base64--"
// };

module.exports = {
    producer:function main(data){
        console.log("\nkafka.producer....", brokers, topic);

        run(data).catch(console.error);
        console.log("kakfa produce done")
    }
}