export const setCookie = (res, name, value, options) => {
	const defaultOptions = {
		path: '/',
		maxAge: 30 * 24 * 60 * 60 * 1000,
		httpOnly: false
	}

	res.cookie(name, value, {
		...defaultOptions,
		...options
	})
}