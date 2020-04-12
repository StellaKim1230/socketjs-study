const socket = io('http://localhost:3000')

socket.on('connect', () => {
  console.log('client socket connection')
})

socket.emit('login', {
  name: 'jieun',
  userid: 'stellakim1230@gmail.com'
})

socket.on('login', ({ name, userid }) => {
  const $chatLogs = document.getElementById('chatLogs')
  const userHtmlString = `${name}${userid}`

  $chatLogs.innerHTML = userHtmlString
})

const $submitButton = document.getElementById('submitButton')

$submitButton.addEventListener('click', e => {
  e.preventDefault()
  var $msgForm = document.getElementById('msgForm')

  socket.emit('chat', { msg: $msgForm.value })
  $msgForm.value = ''
})

socket.on('s2c chat', (data) => {
  const chatHtmlString = `<div>${data.msg}</div>`
  const $chatLogs = document.getElementById('chatLogs')

  $chatLogs.innerHTML = chatHtmlString
})

// disconnect event
socket.on('disconnect', function() {
  console.log('user disconnected: ' + socket.name);
  const sk = io('http://localhost:3000')

  sk.on('connect', () => {
    console.log('client socket connection')
  })
});

// IIEF로 처리