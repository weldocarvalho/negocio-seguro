import cors from 'cors'

const allowedDomains = [
	'http://localhost:3000',
	'https://beta.blnk.com',
	'https://staging.blnk.com',
	'blnk.com',
]

export default cors({
	origin: function (origin, callback) {
		if (process.env.NODE_ENV === 'DEVELOPMENT') {
			return callback(null, true)
		} else {
			origin !== undefined && allowedDomains.indexOf(origin) !== -1
				? callback(null, true)
				: callback(new Error('NOT_ALLOWED_BY_CORS'))
		}
	},
})
