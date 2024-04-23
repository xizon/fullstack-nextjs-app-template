/**
 * Real-Time Network Status Detection
 * 
 * @usage:

const App = () => {
  const { isOnline } = useNetworkStatus();
  return (
      <div>
        {isOnline ? 'online' : 'offline'}
      </div>
  );
}


 */

import { useEffect, useState } from "react";

const useNetworkStatus = () => {

    const [isOnline, setOnline] = useState(true);
    const [isNativeShare, setNativeShare] = useState(false);  // fix bug: Reference Error:Navigator not defined with nextjs

    const updateNetworkStatus = () => {
        setOnline(navigator.onLine);
    };

    useEffect(() => {
        if (navigator.share) {
            setNativeShare(true);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("load", updateNetworkStatus);
        window.addEventListener("online", updateNetworkStatus);
        window.addEventListener("offline", updateNetworkStatus);

        return () => {
            window.removeEventListener("load", updateNetworkStatus);
            window.removeEventListener("online", updateNetworkStatus);
            window.removeEventListener("offline", updateNetworkStatus);
        };
    }, [isNativeShare]);

    return { isOnline };
};

export default useNetworkStatus;

