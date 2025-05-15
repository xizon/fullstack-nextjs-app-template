/**
 * History Tracker
 * @since 20250515
 * 
 * @usage:

const App = () => {
    const { 
        getReady,
        clearHistory,
        goBack,
        getFirstUrl,
        getCurrentUrl,
        getForwardHistory,
        getHistory,
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

    // useEffect(() => {
    //     console.log(getReady(), getFirstUrl(), getCurrentUrl(), getForwardHistory(), getHistory());
    // }, [getReady, getFirstUrl, getCurrentUrl]);

  
    // useEffect(() => {
    //     setTimeout(async () => {
    //         console.log('--> clean history within 2m');
    //         await clearHistory();
    //     }, 2000);
    // }, []);

  
    return (
        <div>

            <div>
                <h3>isReady:</h3>
                <p>{String(getReady())}</p>
            </div>

            <div>
                <h3>First URL:</h3>
                <p>{getFirstUrl()}</p>
            </div>

            <div>
                <h3>Current URL:</h3>
                <p>{getCurrentUrl()}</p>
            </div>

            <div>
                <h3>History ({getHistory().length}):</h3>
                <ul>
                    {getHistory().map((url, index) => (
                        <li key={index}>{url}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Forward History ({getForwardHistory().length}):</h3>
                <ul>
                    {getForwardHistory().map((url, index) => (
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

/**
 * @typedef {Object} HistoryTrackerChange
 * @property {boolean} isReady
 * @property {string[]} history
 * @property {string[]} forwardHistory
 * @property {string} currentUrl
 * @property {string} firstUrl
 * @property {boolean} canGoBack
 * @property {boolean} canGoForward
 */

/**
 * @typedef {Object} UseHistoryTrackerProps
 * @property {(data: HistoryTrackerChange) => void=} onChange
 */

/**
 * @typedef {Object} UseHistoryTrackerReturn
 * @property {() => boolean} getReady
 * @property {() => string[]} getHistory
 * @property {() => string[]} getForwardHistory
 * @property {() => string} getCurrentUrl
 * @property {() => string} getFirstUrl
 * @property {() => Promise<HistoryTrackerChange>} clearHistory
 * @property {(index: number) => void} goToHistory
 * @property {() => Promise<HistoryTrackerChange>} goBack
 * @property {() => Promise<HistoryTrackerChange>} goForward
 * @property {() => boolean} canGoBack
 * @property {() => boolean} canGoForward
 * @property {(url: string) => Promise<HistoryTrackerChange>} addHistoryToFirst
 */

// Create a secure version of useLayoutEffect that is downgraded to useEffect when SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * @param {UseHistoryTrackerProps} props
 * @returns {UseHistoryTrackerReturn}
 */
const useHistoryTracker = (props) => {
    const {
        onChange
    } = props || {};

    const [isReady, setIsReady] = useState(false);
    const historyRef = useRef([]);
    const forwardHistoryRef = useRef([]);
    const firstUrlRef = useRef('');
    const [currentUrl, setCurrentUrl] = useState('');
    
    const canGoBack = useCallback(() => {
        return historyRef.current.length > 1;
    }, []);

    const canGoForward = useCallback(() => {
        return forwardHistoryRef.current.length > 0;
    }, []);

    const initialize = useCallback((ready = false) => {
        if (typeof window === 'undefined') return;
        
        const currentLocation = window.location.href;

        // If the history is empty, set the first record
        if (historyRef.current.length === 0) {
            firstUrlRef.current = currentLocation;
            historyRef.current = [currentLocation];
            setCurrentUrl(currentLocation);

            onChange && onChange({
                isReady: ready,
                history: [currentLocation],
                forwardHistory: [],
                currentUrl: currentLocation,
                firstUrl: currentLocation,
                canGoBack: false,
                canGoForward: false,
            });

        }
        
        setIsReady(true);
    }, [onChange]);

    useIsomorphicLayoutEffect(() => {
        initialize();
    }, [initialize]);

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
        if (historyRef.current.length <= 1) return Promise.reject('History does not meet the criteria (total records are less than 2), cannot go back');
        
        return new Promise((resolve) => {
            // Moves the current URL into the forward history
            const removedUrl = historyRef.current.pop();
            if (removedUrl) {
                forwardHistoryRef.current.push(removedUrl);
            }
            
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
            onChange && onChange(data);
            
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
    }, [onChange, canGoBack, canGoForward]);
    
    const goForward = useCallback(() => {
        if (typeof window === 'undefined') return Promise.reject('Window is undefined');
        if (forwardHistoryRef.current.length === 0) return Promise.reject('Forward history does not meet the criteria (total 0 records), cannot go forward');
        
        return new Promise((resolve) => {
            // Take the URL from the forward history and add it to the main history
            const nextUrl = forwardHistoryRef.current.pop();
            if (nextUrl) {
                historyRef.current.push(nextUrl);
                setCurrentUrl(nextUrl);
            }
            
            // Create initial data object
            const data = {
                isReady: true,
                history: [...historyRef.current],
                forwardHistory: [...forwardHistoryRef.current],
                currentUrl: nextUrl || '',
                firstUrl: firstUrlRef.current,
                canGoBack: canGoBack(),
                canGoForward: canGoForward()
            };
            
            onChange && onChange(data);
            
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
    }, [onChange, canGoBack, canGoForward]);

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
            
            onChange && onChange({
                isReady: true,
                history: [...historyRef.current],
                forwardHistory: [...forwardHistoryRef.current],
                currentUrl: newUrl,
                firstUrl: firstUrlRef.current || newUrl, // Make sure there is always a value
                canGoBack: canGoBack(),
                canGoForward: canGoForward()
            });
        }
    }, [onChange, canGoBack, canGoForward]); // only "onChange"

    const getFirstUrl = useCallback(() => {
        return firstUrlRef.current;
    }, []);

    const getCurrentUrl = useCallback(() => {
        return currentUrl;
    }, [currentUrl]);
    
    const getForwardHistory = useCallback(() => {
        return forwardHistoryRef.current;
    }, []);
    
    const getHistory = useCallback(() => {
        return historyRef.current;
    }, []);

    const getReady = useCallback(() => {
        return isReady;
    }, [isReady]);

    const addHistoryToFirst = useCallback(async (url) => {
        if (typeof window === 'undefined') return Promise.reject('Window is undefined');
        if (!url) return Promise.reject('URL does not exist');

        return new Promise((resolve) => {
            if (historyRef.current.length === 0) {
                firstUrlRef.current = url;
                historyRef.current = [url];
                setCurrentUrl(url);
            } else {
                // Insert at the front
                historyRef.current = [url, ...historyRef.current];
                firstUrlRef.current = url;
            }

            const result = {
                isReady: true,
                history: [...historyRef.current],
                forwardHistory: [...forwardHistoryRef.current],
                currentUrl: currentUrl || url,
                firstUrl: firstUrlRef.current,
                canGoBack: canGoBack(),
                canGoForward: canGoForward()
            };

            onChange && onChange(result);
            resolve(result);
        });
    }, [onChange, currentUrl, canGoBack, canGoForward]);

    const clearHistory = useCallback(async () => {
        if (typeof window === 'undefined') return Promise.reject('Window is undefined');

        return new Promise((resolve) => {
            historyRef.current = [];
            forwardHistoryRef.current = [];
            firstUrlRef.current = '';
            setCurrentUrl('');

            const result = {
                isReady: true,
                history: [],
                forwardHistory: [],
                currentUrl: '',
                firstUrl: '',
                canGoBack: false,
                canGoForward: false
            };
            onChange && onChange(result);

            // After clearHistory(), immediately take the current url as the first history
            // !!!Fixed: "There is still only 1 record of goBack(), and there is no cumulative forward record"
            setTimeout(() => {
                initialize(true);
                resolve(result);
            }, 0);
        });
    }, [onChange, initialize]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Listen for popstate events (browser forward/back)
        window.addEventListener('popstate', handleUrlChange);
        
        // Listen for hashchange events
        window.addEventListener('hashchange', handleUrlChange);

        // !!!Fixed: "Reinitialize the history, but this will not cause the URL to change either"
        // hijack pushState/replaceState
        const rawPushState = window.history.pushState;
        const rawReplaceState = window.history.replaceState;

        window.history.pushState = function (...args) {
            rawPushState.apply(this, args);
            handleUrlChange();
        };
        window.history.replaceState = function (...args) {
            rawReplaceState.apply(this, args);
            handleUrlChange();
        };

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
            window.history.pushState = rawPushState;
            window.history.replaceState = rawReplaceState;
            observer.disconnect();
        };
    }, [handleUrlChange]);

    return {
        getReady,
        getHistory,
        getForwardHistory,
        getCurrentUrl,
        getFirstUrl,
        clearHistory,
        goToHistory,
        goBack,
        goForward,
        canGoBack,
        canGoForward,
        addHistoryToFirst
    };
};

export default useHistoryTracker;