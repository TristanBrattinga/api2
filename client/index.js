import './detail.js'
import './index.css'

const prices = new EventSource('/events')
let lastUpdate = Date.now()

// Track last notified prices
const lastNotifiedPrices = {}

const maybeNotify = (coin) => {
	if (Notification.permission !== 'granted') return

	const previous = lastNotifiedPrices[coin.id]
	const current = parseFloat(coin.current_price)

	if (previous && Math.abs(current - previous) / previous > 0.02) {
		new Notification(`${coin.name} price alert!`, {
			body: `${coin.name} is now ${coin.formatted_price}`,
			icon: `${coin.image}`
		})
	}

	lastNotifiedPrices[coin.id] = current
}

prices.addEventListener('prices', e => {
	const coins = JSON.parse(e.data)
	lastUpdate = Date.now()

	coins.forEach(coin => {
		const el = document.querySelector(`[data-coin-id="${coin.id}"]`)
		if (el) {
			el.querySelector(`#price-${coin.id}`).textContent = coin.formatted_price
		}
		maybeNotify(coin)
	})
})

const askNotificationPermission = () => {
	if (Notification.permission === 'default') {
		Notification.requestPermission().then(permission => {
			console.log('Notification permission:', permission)
		})
	}
}

document.addEventListener('DOMContentLoaded', () => {
	askNotificationPermission()
	const currencySelect = document.querySelector('.currency-select')
	const limitSelect = document.querySelector('.limit-select')
	const limitForm = document.querySelector('.limit-form')

	if (limitSelect && limitForm) {
		limitSelect.addEventListener('change', () => {
			limitForm.submit()
		})
	}

	if (currencySelect) {
		currencySelect.addEventListener('change', (e) => {
			const selectedCurrency = e.target.value
			document.cookie = `currency=${selectedCurrency}; path=/; max-age=${30 * 24 * 60 * 60}`

			window.location.reload()
		})
	}

	const fill = document.querySelector('#progressFill')
	const timerText = document.querySelector('#indicatorText')

	if (fill && timerText) {
		function updateProgressBar() {
			const now = Date.now()
			const elapsed = (now - lastUpdate) / 1000 // in seconds
			const remaining = Math.max(60 - elapsed, 0)
			const percentage = Math.min((elapsed / 60) * 100, 100)

			fill.style.width = `${percentage}%`
			timerText.textContent = `Next Price Update in ${Math.ceil(remaining)}s`
		}
		setInterval(updateProgressBar, 100)
	}

	const btn = document.querySelector('.scroll-to-top');

	window.addEventListener('scroll', () => {
		if (window.scrollY > 300) {
			btn.classList.add('show');
		} else {
			btn.classList.remove('show');
		}
	});

	btn.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
})