const currencySymbols = {
	usd: '$',
	eur: '€',
}

export const formatCurrency = (value, currency) => {
	if (typeof value !== 'number') return value

	const valueIsSmall = value < 1

	const locale = currency === 'eur' ? 'de-DE' : 'en-US'
	const symbol = currency === 'eur' ? '€' : '$'

	return (
		symbol +
		value.toLocaleString(locale, {
			minimumFractionDigits: valueIsSmall ? 2 : 0,
			maximumFractionDigits: valueIsSmall ? 10 : 2,
		})
	)
}

export const formatPercentage = (value) => {
	if (typeof value !== 'number') return null

	const rounded = Math.round(value * 100) / 100
	const direction = value > 0 ? 'up' : 'down'

	return {
		display: `${rounded}%`,
		direction,
	}
}