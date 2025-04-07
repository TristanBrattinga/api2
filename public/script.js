const socket = new WebSocket(`ws://${location.host}`)

socket.addEventListener('open', () => {
	console.log('Client connected to server')
})