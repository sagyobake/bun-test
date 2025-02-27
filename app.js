const server = Bun.serve({
    async fetch(req, server) {
        const success = server.upgrade(req);
        if (success) {
            // Bun automatically returns a 101 Switching Protocols
            // if the upgrade succeeds
            return undefined;
        }

        let path = new URL(req.url).pathname;
        console.log(path);
        if (path === '/') {
            path = './index.html';
        } else {
            path = `.${path}`;
        }
        const file = Bun.file(path);
        return new Response(file);

    },
    websocket: {
        // this is called when a message is received
        async message(ws, message) {
            console.log(`Received ${message}`);
            // send back a message
            ws.send(`You said: ${message}`);
        },
    },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
