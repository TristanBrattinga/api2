const socket = new WebSocket(`ws://${location.host}`)

socket.addEventListener('open', () => {
	console.log('Client connected to server')
})

socket.addEventListener('message', async (event) => {
	const msgText = await event.data.text()
	const msgList = document.getElementById('chat-messages')
	const li = document.createElement('li')
	li.textContent = msgText
	msgList.appendChild(li)
})

const form = document.getElementById('chat-form')
const input = document.getElementById('chat-input')

form.addEventListener('submit', (e) => {
	e.preventDefault()
	const msg = input.value
	socket.send(msg)
	input.value = ''
})