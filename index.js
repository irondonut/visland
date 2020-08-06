const express = require('express')
const app = express()
const server = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(server)
app.use(express.static(path.join(__dirname, '/static')))
const users = []
const getIndex = id => {
  return users.findIndex(user => user.id === id)
}
io.on('connection', socket => {
  socket.on('user-connected', cb => {
    cb(users)
    users.push({id: socket.id})
    io.emit('user-connected', socket.id)
  })
  socket.on('disconnect', () => {
    const index = getIndex(socket.id)
    users.splice(1, index)
    io.emit('user-disconnected', socket.id)
  })
  socket.on('user-move', coordinates => {
    const index = getIndex(socket.id)
    users[index].coordinates = coordinates
    io.emit('user-move', {id: socket.id, coordinates})
  })
})
const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log('listening on: *', port);
})