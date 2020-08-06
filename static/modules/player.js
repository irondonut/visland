import canvas from './canvas.js'
import User from './user.js'
class Player extends User {
  constructor() {
    super()
    this.element = canvas.create('div', {'class': ['player', 'user']})
    this.initMovement()
  }
  set(key, value) {
    this[key] = value
  }
  initMovement() {
    const keycodes = [37, 38, 39, 40]
    window.addEventListener('keydown', e => {
      if (e.keyCode === 38) {
        this.move('y', -1)
      }
      if (e.keyCode === 40) {
        this.move('y', 1)
      }
      if (e.keyCode === 37) {
        this.move('x', -1)
      }
      if (e.keyCode === 39) {
        this.move('x', 1)
      }
      if (keycodes.includes(e.keyCode)) {
        this.socket.emit('user-move', this.coordinates)
      }
    })
  }
}
const player = new Player()
export default player