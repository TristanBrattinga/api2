import 'dotenv/config'
import { App } from '@tinyhttp/app'
import { logger } from '@tinyhttp/logger'
import { cookieParser } from '@tinyhttp/cookie-parser'
import { Router } from '@tinyhttp/router'
import { Liquid } from 'liquidjs'
import sirv from 'sirv'
import { fetchCoinDetails, fetchCoinList, fetchMarketData } from './utils/api.js'
import { getPaginationRange } from './utils/pagination.js'
import { setCookie } from './utils/cookies.js'
import bodyParser from 'body-parser'

const engine = new Liquid({ extname: '.liquid' })
const app = new App()
const router = new Router()
const limitOptions = [25, 50, 100, 200, 250]

const clients = []

app
	.use(logger())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
	.use(cookieParser())
	.use('/', sirv('dist'))
	.listen(3000, () => console.log('Server available on http://localhost:3000'))

app.get('/', async (req, res) => {
	const query = req.query.q?.toLowerCase() || ''
	const page = parseInt(req.query.page) || 1
	const limit = parseInt(req.query.limit) || 100
	const currency = req.query.currency || req.cookies.currency || 'usd'
	const sort = req.query.sort || 'market_cap_desc'

	// Set a cookie for the selected currency
	setCookie(res, 'currency', currency)

	// Build API query
	const queryParams = new URLSearchParams({
		vs_currency: currency,
		order: sort,
		per_page: limit,
		page,
		price_change_percentage: '1h,24h,7d'
	})

	const coinList = await fetchCoinList()
	const totalItems = coinList.length
	const totalPages = Math.ceil(totalItems / limit)
	const startItem = (page - 1) * limit + 1
	const endItem = Math.min(page * limit, totalItems)

	let coins = await fetchMarketData(queryParams.toString())

	if (query) {
		coins = coins.filter((coin) =>
			coin.name.toLowerCase().includes(query) ||
			coin.symbol.toLowerCase().includes(query)
		)
	}

	const paginationRange = getPaginationRange(page, totalPages)

	let favorites = []
	if (req.cookies.favorites) {
		try {
			favorites = JSON.parse(req.cookies.favorites)
		} catch {
			favorites = []
		}
	}

	return res.send(renderTemplate('server/views/index.liquid', {
		coins,
		currentPage: page,
		prevPage: page - 1,
		nextPage: page + 1,
		paginationRange,
		limit,
		query,
		startItem,
		endItem,
		totalItems,
		totalPages,
		limits: limitOptions,
		currency,
		sort,
		favorites,
	}))
})

app.get('/coin/:id/', async (req, res) => {
	const id = req.params.id
	const currency = req.query.currency || req.cookies.currency || 'usd'

	const coin = await fetchCoinDetails(id, currency)

	return res.send(renderTemplate('server/views/detail.liquid', {
		coin,
		currency,
		availableCurrencies: ['usd', 'eur']
	}))
})

// app.get('/api/coin/:id/history', async (req, res) => {
// 	const id = req.params.id
// 	const currency = req.query.currency || req.cookies.currency || 'usd'
//
// 	const now = Math.floor(Date.now() / 1000)
// 	const from = now - 7 * 24 * 60 * 60 // 7 days ago
// 	const to = now
//
// 	try {
// 		const history = await fetchCoinHistory(id, currency, from, to)
// 		const chartData = {
// 			labels: history.prices.map(price => new Date(price[0]).toLocaleDateString()),
// 			prices: history.prices.map(price => price[1]),
// 		}
//
// 		res.json(chartData)
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ error: 'Failed to fetch chart data' })
// 	}
// })

app.get('/favorites', async (req, res) => {
	const query = req.query.q?.toLowerCase() || ''
	const page = parseInt(req.query.page) || 1
	const limit = parseInt(req.query.limit) || 100
	const currency = req.query.currency || req.cookies.currency || 'usd'
	const sort = req.query.sort || 'market_cap_desc'
	const favorites = req.cookies.favorites ? JSON.parse(req.cookies.favorites) : []

	if (favorites.length === 0) {
		return res.send(renderTemplate('server/views/favorite.liquid', {
			coins: [],
			currentPage: page,
			prevPage: page - 1,
			nextPage: page + 1,
			startItem: 0,
			endItem: 0,
			totalItems: 0,
			totalPages: 1,
			limits: limitOptions,
			limit,
			query,
			currency,
			sort,
			favorites,
		}))
	}

	const queryParams = new URLSearchParams({
		vs_currency: currency,
		ids: favorites.join(','),
		order: sort,
		per_page: limit,
		page,
		price_change_percentage: '1h,24h,7d'
	})

	const favoriteCoins = await fetchMarketData(queryParams.toString())

	return res.send(renderTemplate('server/views/favorite.liquid', {
		coins: favoriteCoins,
		currentPage: page,
		prevPage: page - 1,
		nextPage: page + 1,
		startItem: 1,
		endItem: 2,
		totalItems: favoriteCoins.length,
		totalPages: 1,
		limits: limitOptions,
		limit,
		query,
		currency,
		sort,
		favorites,
	}))
})

app.post('/favorite', (req, res) => {
	const { coinId } = req.body
	let favorites    = req.cookies.favorites ? JSON.parse(req.cookies.favorites) : []

	if (favorites.includes(coinId)) {
		favorites = favorites.filter(id => id !== coinId)
	} else {
		favorites.push(coinId)
	}

	// Save the favorites in a cookie
	setCookie(res, 'favorites', JSON.stringify(favorites))

	res.redirect(req.get('Referer') || '/')
})

app.get('/events', (req, res) => {
	res.setHeader('Content-Type', 'text/event-stream')
	res.setHeader('Cache-Control', 'no-cache')
	res.setHeader('Connection', 'keep-alive')
	res.flushHeaders()

	const currency = req.query.currency || 'usd'
	const sort = req.query.sort || 'market_cap_desc'
	const limit = parseInt(req.query.limit) || 100
	const page = parseInt(req.query.page) || 1

	const clientQueryParams = new URLSearchParams({
		vs_currency: currency,
		order: sort,
		per_page: limit,
		page,
		price_change_percentage: '1h,24h,7d'
	})

	const client = {
		id: Date.now(),
		res,
		params: clientQueryParams,
	}

	clients.push(client)

	req.on('close', () => {
		clients.splice(clients.indexOf(client), 1)
	})
})

setInterval(async () => {
	for (const client of clients) {
		try {
			const data = await fetchMarketData(client.params)
			const payload = JSON.stringify(data)

			client.res.write(`event: prices\n`)
			client.res.write(`data: ${payload}\n\n`)
		} catch (error) {
			console.error(`Error fetching data for client ${client.id}:`, error)
		}
	}
}, 60000)

const renderTemplate = (template, data) => {
	const templateData = {
		title: data.title || 'Coinly',
		...data
	}

	return engine.renderFileSync(template, templateData)
}

