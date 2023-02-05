const pm2 = require('pm2');

pm2.connect(() => {
    pm2.start({
        name: 'server',
        script: 'server.js',
    }, (error) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        console.log('Server started with pm2 successfully');
        pm2.disconnect();
    });
});
