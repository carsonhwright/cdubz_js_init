class cdWebSocketServer extends WebSocket{
    constructor(ip= "localhost", port= 8080) {
        super(`ws:://${ip}:${port}`);
        this.addEventListener('open', event => {
            console.log('WebSocket connection established!');
            // socket.send('Hello Server!');
            });
        
        this.addEventListener('message', event => {
            console.log('Message from server: ', event.data);
            });

        this.addEventListener('close', event => {
            console.log('WebSocket connection closed: ', event.code, event.reason);
            });

        this.addEventListener('error', error => {
            console.log('WebSocket error: ', error);
            });
        
    }
}

class cdWebSocketClient extends Websocket {
    constructor(ip= "localhost", port= 8080) {
        super(`ws://${ip}:${port}`);
        this.addEventListener('open', event => {
            console.log("Welcome illustrious User, to the cdWebSocketClient.")
            
        })
    }
}