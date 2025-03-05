/**
 * Global Url Listener (including micro frontends, frameworks, hashes, etc., applicable to multiple react app)
 * 
 * @usage:

const App = () => {
    const url = useGlobalUrlListener();

    useEffect(() => {
        console.log("URL changed:", url);
    }, [url]);
};

 */
import { useEffect, useState } from "react";

const useGlobalUrlListener = () => {
    // Initialize state with empty string to avoid SSR issues
    const [url, setUrl] = useState('');

    useEffect(() => {
        // Type guard for SSR
        if (typeof window === 'undefined') return;

        // Initialize the URL on the client side
        setUrl(window.location.href);

        // Create MutationObserver instance
        const observer = new MutationObserver(() => {
            setUrl(window.location.href);
        });

        // Start observing
        observer.observe(document, { 
            subtree: true, 
            childList: true 
        });

        // Cleanup function
        return () => observer.disconnect();
    }, []);

    return url;
};

export default useGlobalUrlListener;
