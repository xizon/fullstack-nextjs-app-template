/**
 * Determine whether it is the mobile terminal of the specified breakpoint
 * * 
 * @usage:
 * 

const App = () => {

    const isMobile = useIsMobile();

    return (
        <div>
            {isMobile ? (
                <p>This content is hidden on mobile devices.</p>
            ) : (
                <p>This content is visible on larger screens.</p>
            )}
        </div>
    );
}


 */
import { useEffect, useState } from 'react';


const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const checkUserAgent = () => {
        if (!window) return false;
        
        const userAgent = window.navigator.userAgent.toLowerCase();
        const mobileKeywords = [
            'android',
            'iphone',
            'ipad',
            'ipod',
            'webos',
            'blackberry',
            'windows phone',
            'opera mini',
            'mobile',
            'tablet'
        ];

        return mobileKeywords.some(keyword => userAgent.includes(keyword));
    };

    useEffect(() => {
        // Set the mounted state to true after the component has mounted
        setIsMounted(true);

        const handleResize = () => {
            if (window) {
                const isMobileSize = window.innerWidth <= breakpoint;
                const isMobileDevice = checkUserAgent();
                setIsMobile(isMobileSize || isMobileDevice);
            }
        };

        // Add event listener for resize
        window.addEventListener('resize', handleResize);
        // Call the handler once to set the initial state
        handleResize();

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);

    // Only return the isMobile state if the component is mounted
    return isMounted ? isMobile : false;
};

export default useIsMobile;
