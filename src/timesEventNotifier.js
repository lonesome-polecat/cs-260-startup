
class timesEventNotifier {
    initialEvent = null
    handler = null

    constructor() {
        let port = 9800;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        if (window.location.hostname == "localhost") {
            this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        } else {
            this.socket = new WebSocket(`${protocol}://${window.location.hostname}/ws`);
        }
        this.socket.onopen = (event) => {
            console.log("Connected the socket!")
        };
        this.socket.onclose = (event) => {
            console.log("The socket has been closed")
        };
        this.socket.onmessage = async (msg) => {
            try {
                const data = JSON.parse(msg.data);
                this.receiveEvent(data);
            } catch (e) {
                console.log(e)
            }
        };
    }

    broadcastEvent(data) {
        this.socket.send(JSON.stringify(data));
    }

    addHandler(handler) {
        // this.handlers.push(handler);
        this.handler = handler
        this.handler(this.initialEvent)
    }

    removeHandler(handler) {
        // this.handlers.filter((h) => h !== handler);
        this.handler = null
    }

    receiveEvent(event) {
        if (this.handler === null) {
            this.initialEvent = event
        } else {
            this.handler(event)
        }
    }
}

const TimeNotifier = new timesEventNotifier();
export { TimeNotifier };
