const express = require('express')
const cors = require('cors')
const socketio = require('socket.io')
const { mqttConnect } = require( './helpers/mqttConfig' )
const app = express()
const server = app.listen(5000,()=>console.log('server connected'))
app.use(express.json())
app.use(cors())

// ! mqtt
const client = mqttConnect()
client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
  if(topic.split('/')[2]=='btn1'){
    io.emit('btn1msg',`topic : ${topic}, msg :${payload.toString()}`)
  }
  else if(topic.split('/')[2]=='btn2'){
    io.emit('btn2msg',`topic : ${topic}, msg :${payload.toString()}`)
  }
  else if(topic.split('/')[2]=='btn3'){
    io.emit('btn3msg',`topic : ${topic}, msg :${payload.toString()}`)
  }
})
app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html')
})

// ! socket io
const io = socketio(server)
io.on('connection',(socket)=>{
  console.log('socketio connected')
})

// ! routes
app.post('/publish/topic/one',(req, res)=>{
  client.subscribe(['/nodejs/btn1'])
  client.publish('/nodejs/btn1', req.body.msg)
  return res.send(req.body)
})
app.post('/publish/topic/two',(req, res)=>{
  client.subscribe(['/nodejs/btn2'])
  client.publish('/nodejs/btn2', req.body.msg)
  return res.send(req.body)
})
app.post('/publish/topic/three',(req, res)=>{
  client.subscribe(['/nodejs/btn3'])
  client.publish('/nodejs/btn3', req.body.msg)
  return res.send(req.body)
})



