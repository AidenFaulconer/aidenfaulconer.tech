const middleware = {}

middleware['middleware'] = require('..\\middleware\\middleware.js')
middleware['middleware'] = middleware['middleware'].default || middleware['middleware']

export default middleware
