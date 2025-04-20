document.addEventListener('DOMContentLoaded', () => {
	const limitSelect = document.querySelector('.limit-select')
	const limitForm = document.querySelector('.limit-form')

	limitSelect.addEventListener('change', () => {
		limitForm.submit()
	})
})