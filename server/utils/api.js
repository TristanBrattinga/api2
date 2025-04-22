import { formatCurrency, formatPercentage, formatWebsite } from './format.js'

export const fetchCoinList = async () => {
	try {
		const response = await fetch(`${process.env.COINGECKO_API_BASE_URL}/coins/list`, {
			method:  'GET',
			headers: {
				accept: 'application/json',
				'x-cg-demo-api-key': process.env.COINGECKO_API_KEY
			}
		})

		if (!response.ok) {
			throw new Error('Failed to fetch coin list')
		}

		return await response.json()

	} catch (error) {
		console.error('Error fetching coin list:', error)
		throw error
	}
}

export const fetchMarketData = async (query) => {
	try {
		const response = await fetch(`${process.env.COINGECKO_API_BASE_URL}/coins/markets?${query}`, {
			method:  'GET',
			headers: {
				accept: 'application/json',
				'x-cg-demo-api-key': process.env.COINGECKO_API_KEY
			}
		})

		if (!response.ok) {
			throw new Error('Failed to fetch market data')
		}

		const coins = await response.json()

		return coins.map((coin) => ({
			...coin,
			percentage_1h: formatPercentage(coin.price_change_percentage_1h_in_currency),
			percentage_24h: formatPercentage(coin.price_change_percentage_24h),
			percentage_7d: formatPercentage(coin.price_change_percentage_7d_in_currency),
			formatted_market_cap: formatCurrency(coin.market_cap, coin.vs_currency),
			formatted_price: formatCurrency(coin.current_price, coin.vs_currency),
		}))
	} catch (error) {
		console.error('Error fetching market data:', error)
		throw error
	}
}

export const fetchCoinDetails = async (id, currency) => {
	try {
		const response = await fetch(`${process.env.COINGECKO_API_BASE_URL}/coins/${id}?vs_currency=${currency}`, {
			method:  'GET',
			headers: {
				accept: 'application/json',
				'x-cg-demo-api-key': process.env.COINGECKO_API_KEY
			}
		})

		if (!response.ok) {
			throw new Error('Coin not found...')
		}

		const coin = await response.json()

		return {
			...coin,
			formatted_market_cap: formatCurrency(coin.market_data.market_cap?.[currency], currency),
			formatted_price: formatCurrency(coin.market_data.current_price?.[currency], currency),
			formatted_website: formatWebsite(coin.links?.homepage[0])
		}
	} catch (error) {
		console.error(`Error fetching details for coin ${id}:`, error)
		throw error
	}
}

export const fetchCoinHistory = async (id, currency, from, to) => {
	try {
		const response = await fetch(`${process.env.COINGECKO_API_BASE_URL}/coins/${id}/market_chart/range?vs_currency=${currency}&from=${from}&to=${to}';`, {
			method:  'GET',
			headers: {
				accept: 'application/json',
				'x-cg-demo-api-key': process.env.COINGECKO_API_KEY
			}
		})
		if (!response.ok) {
			throw new Error('Failed to fetch latest prices')
		}
		return await response.json()
	} catch (error) {
		console.error('Error fetching latest prices:', error)
		throw error
	}
}