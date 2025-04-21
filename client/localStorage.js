document.addEventListener('DOMContentLoaded', () => {
	function getFavorites() {
		return JSON.parse(localStorage.getItem('favorites') || '[]')
	}

	function toggleFavorite(coinId) {
		let favorites = getFavorites()
		if (favorites.includes(coinId)) {
			favorites = favorites.filter(id => id !== coinId)
		} else {
			favorites.push(coinId)
		}
		localStorage.setItem('favorites', JSON.stringify(favorites))
		updateFavoriteIcons()
	}

	function updateFavoriteIcons() {
		const favorites = getFavorites()
		document.querySelectorAll('.favorite-button').forEach(button => {
			const coinId = button.dataset.coinId
			const icon = button.querySelector('.favorite-icon path')
			if (favorites.includes(coinId)) {
				icon.setAttribute('fill', 'gold')
			} else {
				icon.setAttribute('fill', '#343330')
			}
		})
	}

	document.addEventListener('click', e => {
		if (e.target.closest('.favorite-button')) {
			const button = e.target.closest('.favorite-button')
			const coinId = button.dataset.coinId
			toggleFavorite(coinId)
		}
	})

	updateFavoriteIcons()
})