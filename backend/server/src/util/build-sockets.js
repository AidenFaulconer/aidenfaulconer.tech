const fs = require('fs')

const buildSockets = (app) => {
    const socketsFolder = '../sockets'
    const sockets = fs.readdirSync(socketsFolder)

    const httpServer = http.createServer(app)
    const io = socketIo(httpServer)

    // Sockets
    io.on('connection', (socket) => {
        console.log('A client connected', socket.id)
    })

    //add sockets
    sockets.forEach((socket) => {
        const socketEndpoint = require(`${socketsFolder}/${socket}`)
        io.on(socket, socketEndpoint)

    })

    //check for unhandled errors
    process.on('unhandledRejection', (err) => {
        console.error('unhandled promise rejection detected')
        console.error(err)
        process.exit(1)
    })
}

module.exports = buildSockets
