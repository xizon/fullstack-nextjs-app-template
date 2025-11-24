/**
 * Watch for to know when a document becomes visible or hidden
 * @param onVisible 
 * @param onHidden  
 * @param onPageInit executed once when the page first loads visibly
 */
/* 
@usage:

const App = () => {
    usePageVisibility(
        () => console.log("🍏 Page is now visible — current tab is active."),
        () => console.log("🍎 Page is hidden — switched to another tab or minimized."),
        () => console.log("🎬 Page initialized while visible.")
    );

    return <div>Try switching tabs to see the console output.</div>;
};

*/
import { useEffect, useRef } from "react";


const usePageVisibility = (
    onVisible,
    onHidden,
    onPageInit
) => {
    const visibleRef = useRef(document.visibilityState === "visible");
    const onVisibleRef = useRef(onVisible);
    const onHiddenRef = useRef(onHidden);
    const initialVisibleTriggeredRef = useRef(false);
    const onPageInitRef = useRef(onPageInit);

    useEffect(() => {
        onVisibleRef.current = onVisible;
    }, [onVisible]);

    useEffect(() => {
        onHiddenRef.current = onHidden;
    }, [onHidden]);

    useEffect(() => {
        onPageInitRef.current = onPageInit;
    }, [onPageInit]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            const isVisible = document.visibilityState === "visible";

            if (isVisible && !visibleRef.current) {
                onVisibleRef.current && onVisibleRef.current();
            }

            if (!isVisible && visibleRef.current) {
                onHiddenRef.current && onHiddenRef.current();
            }

            visibleRef.current = isVisible;
        };

        // It retains the original switching monitor, and can ensure that onPageInit will run when the first screen is loaded.
        if (visibleRef.current && !initialVisibleTriggeredRef.current) {
            initialVisibleTriggeredRef.current = true;
            onPageInitRef.current && onPageInitRef.current();
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);
};


export default usePageVisibility;
export { usePageVisibility };
