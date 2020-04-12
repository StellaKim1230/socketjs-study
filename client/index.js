// import primus from 'primus'
// import Primus from 'primus'
primus.library()

const primus = new Primus('http://localhost:3000')


primus.write('login', {
  name: 'jieun',
  userid: 'stellakim1230@gmail.com'
})
