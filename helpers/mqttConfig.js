const mqtt = require('mqtt')
// const host = 'broker.emqx.io'
// const port = '1883'
// const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
// console.log(clientId)
// const connectUrl = `mqtt://${host}:${port}`
const host = ''
const port = ''
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
console.log(clientId)
const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect('', {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: '',
  password: '',
  reconnectPeriod: 1000,
})
const topic = '/nodejs/mqtt'
exports.mqttConnect = ()=>{
  client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic}'`)
    })
    
  })
  return client
}