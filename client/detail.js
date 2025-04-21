document.addEventListener('DOMContentLoaded', () => {
	const shareButton = document.querySelector('.share-button')

	if (navigator.share) {
		shareButton.addEventListener('click', async () => {
			try {
				await navigator.share({
					title: document.title,
					text: 'Check out this crypto coin!',
					url: window.location.href
				})
				console.log('Shared successfully!')
			} catch (err) {
				console.error('Share failed:', err)
			}
		})
	} else {
		shareButton.style.display = 'none'
	}
})