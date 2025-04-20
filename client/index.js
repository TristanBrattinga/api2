document.addEventListener('DOMContentLoaded', () => {
	const currencySelect = document.querySelector('.currency-select')

	currencySelect.addEventListener('change', (e) => {
		const selectedCurrency = e.target.value

		// Save currency in cookie (30 days)
		document.cookie = `currency=${selectedCurrency}; path=/; max-age=${30 * 24 * 60 * 60}`

		window.location.reload()
	})
})