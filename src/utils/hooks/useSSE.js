/**
 * SSE
 * 
 * @usage:

const App = () => {
    const { connected, messages } = useSSE('http://localhost:3000/sse');

    return (
    <div>
        <p>Status: {connected ? '✅ Connected' : '❌ Disconnected'}</p>
        {messages.map((m, i) => <div key={i}>{m}</div>)}
    </div>
    );
};

 */

import { useEffect, useRef, useState } from 'react';

export function useSSE(url, retryDelay = 3000) {
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const sourceRef = useRef(null);
    const reconnectTimer = useRef();

    useEffect(() => {
        if (!url) return;

        function connect() {
            console.log('🔌 Attempting to connect to SSE...');
            const source = new EventSource(url);
            sourceRef.current = source;

            source.onopen = () => {
                console.log('✅ SSE connection established');
                setConnected(true);
            };

            source.onmessage = (event) => {
                setMessages([event.data]);
            };

            source.onerror = (err) => {
                console.error(`⚠️ SSE error, retrying in ${retryDelay} ms`, err);
                setConnected(false);
                source.close();

                // Prevent multiple timers
                clearTimeout(reconnectTimer.current);
                reconnectTimer.current = setTimeout(connect, retryDelay);
            };
        }

        connect();

        // Cleanup on unmount
        return () => {
            clearTimeout(reconnectTimer.current);
            sourceRef.current?.close();
        };
    }, [url, retryDelay]);

    return { connected, messages };
}