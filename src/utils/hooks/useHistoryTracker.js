/**
 * History Tracker
 * 
 * @usage:

const App = () => {
    const { 
        history, 
        forwardHistory,
        currentUrl, 
        firstUrl, 
        clearHistory,
        goBack
    } = useHistoryTracker({
        onChange: ({ 
            isReady,
            history, 
            forwardHistory,
            currentUrl, 
            firstUrl, 
            canGoBack,
            canGoForward
        } : { 
            isReady: boolean;
            history: string[];
            forwardHistory: string[];
            currentUrl: string;
            firstUrl: string;
            canGoBack: boolean;
            canGoForward: boolean;
        }) => {
            console.log('--> onChange: ',
                isReady,
                history, 
                forwardHistory,
                currentUrl, 
                firstUrl, 
                canGoBack,
                canGoForward
            );
        }
    });

    return (
        <div>

            <div>
                <h3>First URL:</h3>
                <p>{firstUrl}</p>
            </div>

            <div>
                <h3>Current URL:</h3>
                <p>{currentUrl}</p>
            </div>

            <div>
                <h3>History ({history.length}):</h3>
                <ul>
                    {history.map((url, index) => (
                        <li key={index}>{url}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Forward History ({forwardHistory.length}):</h3>
                <ul>
                    {forwardHistory.map((url, index) => (
                        <li key={index}>{url}</li>
                    ))}
                </ul>
            </div>


            
            <button onClick={clearHistory}>
                Clear History
            </button>

            <button onClick={async () => {
                try {
                    const { 
                        isReady,
                        history, 
                        forwardHistory,
                        canGoBack,
                        canGoForward
                    } : { 
                        isReady: boolean;
                        history: string[];
                        forwardHistory: string[];
                        canGoBack: boolean;
                        canGoForward: boolean;
                    } = await goBack();

                    console.log('--> goBack: ', 
                        isReady,
                        history, 
                        forwardHistory,
                        currentUrl, 
                        firstUrl, 
                        canGoBack,
                        canGoForward
                    );
                } catch (error) {
                    console.error('Navigation failed', error);
                }

            }}>
               Back
            </button>

        </div>
    );
};

 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

// Create a secure version of useLayoutEffect that is downgraded to useEffect when SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const useHistoryTracker = (props) => {
    const {
        onChange
    } = props;

    const [isReady, setIsReady] = useState(false);
    const historyRef = useRef([]);
    const forwardHistoryRef = useRef([]);
    const firstUrlRef = useRef('');
    const [currentUrl, setCurrentUrl] = useState('');
    
    const initialize = useCallback(() => {
        if (typeof window === 'undefined') return;
        
        const currentLocation = window.location.href;
        
        // If the history is empty, set the first record
        if (historyRef.current.length === 0) {
            firstUrlRef.current = currentLocation;
            historyRef.current = [currentLocation];
            setCurrentUrl(currentLocation);

            onChange?.({
                isReady: false,
                history: [currentLocation],
                forwardHistory: [],
                currentUrl: currentLocation,
                firstUrl: currentLocation,
                canGoBack: false,
                canGoForward: false
            });

        }
        
        setIsReady(true);
    }, []);

    useIsomorphicLayoutEffect(() => {
        initialize();
    }, [initialize]);


    const clearHistory = useCallback(() => {
        if (typeof window === 'undefined') return;
    
        historyRef.current = [];
        forwardHistoryRef.current = [];
        firstUrlRef.current = '';
        setCurrentUrl('');
        
        onChange?.({
            isReady: true,
            history: [],
            forwardHistory: [],
            currentUrl: '',
            firstUrl: '',
            canGoBack: false,
            canGoForward: false

        });
    }, [onChange]); // only "onChange"

    const goToHistory = useCallback((index) => {
        if (typeof window === 'undefined') return;
        if (index < 0 || index >= historyRef.current.length) return;
        
        const targetUrl = historyRef.current[index];
        if (targetUrl && targetUrl !== window.location.href) {
            window.location.href = targetUrl;
        }
    }, []);

    const goBack = useCallback(() => {
        if (typeof window === 'undefined') return Promise.reject('Window is undefined');
        if (historyRef.current.length <= 1) return Promise.reject('Cannot go back');
        
        return new Promise((resolve) => {
            // Moves the current URL into the forward history
            const removedUrl = historyRef.current.pop();
            forwardHistoryRef.current.push(removedUrl);
            
            const newCurrentUrl = historyRef.current[historyRef.current.length - 1];
            setCurrentUrl(newCurrentUrl);
    
            // Create initial data object
            const data = {
                isReady: true,
                history: [...historyRef.current],
                forwardHistory: [...forwardHistoryRef.current],
                currentUrl: newCurrentUrl,
                firstUrl: firstUrlRef.current,
                canGoBack: canGoBack(),
                canGoForward: canGoForward()
            };
            
            // Notify about the history change
            onChange?.(data);
            
            // Create one-time listener for popstate
            const handlePopState = () => {
                // Remove the listener after it's called
                window.removeEventListener('popstate', handlePopState);
                
                // Get the final data after URL has changed
                const finalData = {
                    isReady: true,
                    history: [...historyRef.current],
                    forwardHistory: [...forwardHistoryRef.current],
                    currentUrl: window.location.href,
                    firstUrl: firstUrlRef.current,
                    canGoBack: canGoBack(),
                    canGoForward: canGoForward()
                };
                
                resolve(finalData);
            };
    
            // Add the listener
            window.addEventListener('popstate', handlePopState);
            
            // Trigger the navigation
            window.history.go(-1);
        });
    }, [onChange]);
    
    const goForward = useCallback(() => {
        if (typeof window === 'undefined') return Promise.reject('Window is undefined');
        if (forwardHistoryRef.current.length === 0) return Promise.reject('Cannot go forward');
        
        return new Promise((resolve) => {
            // Take the URL from the forward history and add it to the main history
            const nextUrl = forwardHistoryRef.current.pop();
            historyRef.current.push(nextUrl);
            setCurrentUrl(nextUrl);
            
            // Create initial data object
            const data = {
                isReady: true,
                history: [...historyRef.current],
                forwardHistory: [...forwardHistoryRef.current],
                currentUrl: nextUrl,
                firstUrl: firstUrlRef.current,
                canGoBack: canGoBack(),
                canGoForward: canGoForward()
            };
            
            onChange?.(data);
            
            // Create one-time listener for popstate
            const handlePopState = () => {
                // Remove the listener after it's called
                window.removeEventListener('popstate', handlePopState);
                
                // Get the final data after URL has changed
                const finalData = {
                    isReady: true,
                    history: [...historyRef.current],
                    forwardHistory: [...forwardHistoryRef.current],
                    currentUrl: window.location.href,
                    firstUrl: firstUrlRef.current,
                    canGoBack: canGoBack(),
                    canGoForward: canGoForward()
                };
                
                resolve(finalData);
            };
    
            // Add the listener
            window.addEventListener('popstate', handlePopState);
            
            // Trigger the navigation
            window.history.go(1);
        });
    }, [onChange]);

    const canGoBack = useCallback(() => {
        return historyRef.current.length > 1;
    }, []);

    const canGoForward = useCallback(() => {
        return forwardHistoryRef.current.length > 0;
    }, []);


    const handleUrlChange = useCallback(() => {
        if (typeof window === 'undefined') return;

        const newUrl = window.location.href;
        
        // If the history is empty, set to the first URL
        if (historyRef.current.length === 0) {
            firstUrlRef.current = newUrl;
        }
        
        // Avoid recording the same URL
        if (historyRef.current[historyRef.current.length - 1] !== newUrl) {
            historyRef.current.push(newUrl);
            
            // Clear the advance history, as new navigation invalidates the advance history
            forwardHistoryRef.current = [];
            setCurrentUrl(newUrl);
            
            onChange?.({
                isReady: true,
                history: [...historyRef.current],
                forwardHistory: [...forwardHistoryRef.current],
                currentUrl: newUrl,
                firstUrl: firstUrlRef.current || newUrl, // Make sure there is always a value
                canGoBack: canGoBack(),
                canGoForward: canGoForward()
            });
        }
    }, [onChange]); // only "onChange"


    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Listen for popstate events (browser forward/back)
        window.addEventListener('popstate', handleUrlChange);
        
        // Listen for hashchange events
        window.addEventListener('hashchange', handleUrlChange);

        // Listen for DOM and property changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    handleUrlChange();
                }
            });
        });

    
        observer.observe(document.body, {
            childList: true, // monitor the addition and deletion of child nodes
            subtree: true, // monitor all descendant nodes
            attributes: true, // monitor attribute changes
            attributeFilter: ['href'] // only monitor changes in the href attribute
        });

        return () => {
            window.removeEventListener('popstate', handleUrlChange);
            window.removeEventListener('hashchange', handleUrlChange);
            observer.disconnect();
        };
    }, [handleUrlChange]);


    return {
        isReady,
        history: historyRef.current,
        forwardHistory: forwardHistoryRef.current,
        currentUrl,
        firstUrl: firstUrlRef.current,
        clearHistory,
        goToHistory,
        goBack,
        goForward,
        canGoBack,
        canGoForward
    };
};

export default useHistoryTracker;