// document.addEventListener('DOMContentLoaded', () => {
// 	const shareButton = document.querySelector('.share-button')
//
// 	if (navigator.share) {
// 		shareButton.addEventListener('click', async () => {
// 			try {
// 				await navigator.share({
// 					title: document.title,
// 					text: 'Check out this crypto coin!',
// 					url: window.location.href
// 				})
// 				console.log('Shared successfully!')
// 			} catch (err) {
// 				console.error('Share failed:', err)
// 			}
// 		})
// 	} else {
// 		shareButton.style.display = 'none'
// 	}
// })

import {
	Chart,
	LineController,
	LineElement,
	PointElement,
	LinearScale,
	Title,
	CategoryScale,
	Tooltip,
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

document.addEventListener('DOMContentLoaded', async function () {
	const res = await fetch(`/api/coin/bitcoin/history?currency=usd`);
	const chartData = await res.json();

	const ctx = document.getElementById('myChart').getContext('2d');

	new Chart(ctx, {
		type: 'line',
		data: {
			labels: chartData.labels,
			datasets: [
				{
					label: `Price in usd`,
					data: chartData.prices,
					borderColor: 'rgba(75, 192, 192, 1)',
					fill: false,
				},
			],
		},
		options: {
			responsive: true,
			scales: {
				x: {
					title: { display: true, text: 'Date' },
				},
				y: {
					title: { display: true, text: `Price in usd` },
				},
			},
		},
	});
});