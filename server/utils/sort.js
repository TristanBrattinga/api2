export const getSortState = (currentSortBy, currentSortDir, column) => {
	let nextDir = 'desc'
	if (currentSortBy === column && currentSortDir === 'desc') {
		nextDir = 'asc'
	} else if (currentSortBy === column && currentSortDir === 'asc') {
		nextDir = 'reset'
	}
}