import { App } from '@tinyhttp/app'
import { Liquid } from 'liquidjs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = new App()

const engine = new Liquid({
	root: path.join(__dirname, 'views'),
	extname: '.liquid'
})

app.get('/', async (req, res) => {
	const html = await engine.renderFile('index')
	res.send(html)
})

app.listen(3000, () => console.log('Started on http://localhost:3000'))