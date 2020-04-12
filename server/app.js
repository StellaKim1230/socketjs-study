// const app = require('express')()
const server = require('http').createServer()

const io = require('socket.io')(server)

// app.get('/', (req, res) => {
//   res.sendFile(__dirname, 'index.html')
// })

io.on('connection', (socket) => {
  // 접속한 클라이언트의 정보가 수신되면
  socket.on('login', (data) => {
    console.log('Client logged-in: \n name: ' + data.name + '\n userid: ' + data.userid)

    // socket에 클라이언트 정보를 저장한다
    socket.name = data.name
    socket.userid = data.userid

    // 접속된 모든 클라이언트에게 메시지를 전송한다
    io.emit('login', { name: data.name, userid: data.userid })
  })

  // 클라이언트로부터의 메시지가 수신되면
  socket.on('chat', (data) => {
    console.log('Message from %s: %s', socket.name, data.msg)

    var msg = {
      from: {
        name: socket.name,
        userid: socket.userid
      },
      msg: data.msg
    }

    // socket.broadcast.emit('chat', msg)

    socket.emit('s2c chat', msg)
  })

  // force client disconnect from server
  socket.on('forceDisconnect', () => {
    socket.disconnect()
  })

  socket.on('disconnect', function() {
    console.log('user disconnected: ' + socket.name);
  });
})

server.listen(3000, () => {
  console.log('Socket IO server listening on port 3000')
})
