import { App } from '@tinyhttp/app'
import { Liquid } from 'liquidjs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { WebSocketServer } from 'ws'
import serveStatic from 'serve-static'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = new App()

app.use(serveStatic(path.join(__dirname, 'public')))

const engine = new Liquid({
	root: path.join(__dirname, 'views'),
	extname: '.liquid'
})

app.get('/', async (req, res) => {
	const pageContent = await engine.renderFile('index', { name: 'Tristan' })

	const fullPage = await engine.renderFile('layout', {
		title: 'Chat App',
		content: pageContent
	})

	res.send(fullPage)
})

const server = http.createServer(app.handler.bind(app))
const wss = new WebSocketServer({ server })

wss.on('connection', (socket) => {
	console.log('New user connected')

	socket.on('close', () => {
		console.log('User disconnected')
	})
})

server.listen(3000, () => console.log('Started on http://localhost:3000'))