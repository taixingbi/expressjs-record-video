
const { Kafka } = require('kafkajs')

const brokers= ['localhost:9092'];
const topic= 'test';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: brokers
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