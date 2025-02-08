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

    useEffect(() => {
        // Set the mounted state to true after the component has mounted
        setIsMounted(true);

        const handleResize = () => {
            if (window) {
                setIsMobile(window.innerWidth <= breakpoint);
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
