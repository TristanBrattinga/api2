export const getPaginationRange = (currentPage, totalPages) => {
	const range = [];
	const maxButtons = 6;

	const firstPage = 1;
	const lastPage = totalPages;

	let startPage = Math.max(currentPage - 2, firstPage);
	let endPage = Math.min(currentPage + 2, lastPage);

	if (endPage - startPage < maxButtons - 2) {
		if (startPage === firstPage) {
			endPage = Math.min(endPage + (maxButtons - (endPage - startPage + 2)), lastPage - 1);
		} else if (endPage === lastPage) {
			startPage = Math.max(startPage - (maxButtons - (endPage - startPage + 2)), firstPage + 1);
		}
	}

	if (startPage > firstPage) {
		range.push(firstPage, '...');
	}

	for (let i = startPage; i <= endPage; i++) {
		range.push(i);
	}

	if (endPage < lastPage) {
		range.push('...', lastPage);
	}

	return range;
}