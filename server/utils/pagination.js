export const getPaginationRange = (currentPage, totalPages) => {
	const range = [];
	const maxButtons = 6;

	// Show the first page and last page
	const firstPage = 1;
	const lastPage = totalPages;

	// Center current page
	let startPage = Math.max(currentPage - 2, firstPage);
	let endPage = Math.min(currentPage + 2, lastPage);

	// Ensure 7 items are shown (with ellipses if needed)
	if (endPage - startPage < maxButtons - 2) {
		if (startPage === firstPage) {
			endPage = Math.min(endPage + (maxButtons - (endPage - startPage + 2)), lastPage - 1);
		} else if (endPage === lastPage) {
			startPage = Math.max(startPage - (maxButtons - (endPage - startPage + 2)), firstPage + 1);
		}
	}

	// Handle "..." case
	if (startPage > firstPage) {
		range.push(firstPage, '...');
	}

	// Add the pages in the range
	for (let i = startPage; i <= endPage; i++) {
		range.push(i);
	}

	if (endPage < lastPage) {
		range.push('...', lastPage);
	}

	return range;
}