import 'dotenv/config'
import { App } from '@tinyhttp/app'
import { logger } from '@tinyhttp/logger'
import { cookieParser } from '@tinyhttp/cookie-parser'
import { Liquid } from 'liquidjs'
import sirv from 'sirv'
import { fetchCoinDetails, fetchMarketData } from './utils/api.js'

const engine = new Liquid({ extname: '.liquid' })
const app = new App()
const isDev = process.env.NODE_ENV === 'development'
const limitOptions = [25, 50, 100, 200, 250]

const clients = []

app
	.use(logger())
	.use(cookieParser())
	.use('/', sirv(isDev ? 'client' : 'dist'))
	.listen(3000, () => console.log('Server available on http://localhost:3000'))

const getPagination = (page, totalItems, limit) => {
	const totalPages = Math.ceil(totalItems / limit);
	const startItem = (page - 1) * limit + 1;
	const endItem = Math.min(page * limit, totalItems);

	return { totalPages, startItem, endItem };
};

app.get('/', async (req, res) => {
	const query = req.query.q?.toLowerCase() || ''
	const page = parseInt(req.query.page) || 1
	const limit = parseInt(req.query.limit) || 50
	const currency = req.query.currency || req.cookies.currency || 'usd'

	if (!req.cookies.currency) {
		res.setHeader('Set-Cookie', `currency=${currency}; Path=/; Max-Age=${30 * 24 * 60 * 60}`)
	}

	let coins = await fetchMarketData(currency)

	if (query) {
		coins = coins.filter((coin) =>
			coin.name.toLowerCase().includes(query) ||
			coin.symbol.toLowerCase().includes(query)
		)
	}

	const totalItems = coins.length

	const { totalPages, startItem, endItem } = getPagination(page, totalItems, limit);

	const paginatedCoins = coins.slice(startItem -1, endItem)

	return res.send(renderTemplate('server/views/index.liquid', {
		coins: paginatedCoins,
		currentPage: page,
		prevPage: page - 1,
		nextPage: page + 1,
		totalPages,
		limit,
		query,
		startItem,
		endItem,
		totalItems,
		limits: limitOptions,
		currency
	}))
})

app.get('/coin/:id/', async (req, res) => {
	const id = req.params.id
	const currency = req.query.currency || req.cookies.currency || 'usd'

	const coin = await fetchCoinDetails(id, currency)

	return res.send(renderTemplate('server/views/coin.liquid', {
		coin,
		currency
	}))
})

app.get('/favorites', async (req, res) => {
	return res.send(renderTemplate('server/views/favorites.liquid', {
		title: 'Favorites',
	}))
})

app.get('/events', (req, res) => {
	res.setHeader('Content-Type', 'text/event-stream')
	res.setHeader('Cache-Control', 'no-cache')
	res.setHeader('Connection', 'keep-alive')
	res.flushHeaders()

	clients.push(res)

	req.on('close', () => {
		const i = clients.indexOf(res)
		if (i !== -1) clients.splice(i, 1)
	})
})

setInterval(async () => {
	try {
		const currency = 'usd'
		const data = await fetchMarketData(currency)
		const payload = JSON.stringify(data)

		// Send data to all connected clients
		for (const client of clients) {
			client.write(`event: prices\n`)
			client.write(`data: ${payload}\n\n`)
		}
	} catch (error) {
		console.error('Error fetching market data:', error)
	}
}, 60000)

const renderTemplate = (template, data) => {
	const templateData = {
		title: data.title || 'Coinly',
		NODE_ENV: process.env.NODE_ENV || 'production',
		...data
	}

	return engine.renderFileSync(template, templateData)
}

