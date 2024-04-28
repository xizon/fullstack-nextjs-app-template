/**
 * Listens for scrolls the window to a particular place in the document
 * 
 * @usage:

const App = () => {
    const [scrollData, windowScrollUpdate] = useWindowScroll({
        performance: ['debounce', 500],   // "['debounce', 500]" or "['throttle', 500]"
        handle: (scrollData) => {
            // do something
            console.log(scrollData);
        }
    });
};

 */
import { useEffect, useState } from "react";
import { debounce, throttle } from "../libs/performance";


const useWindowScroll = ({
    performance,   // // "['debounce', 500]" or "['throttle', 500]"
    handle
}) => {

    let windowScrollUpdate;
    const [performanceName, performanceLimit] = performance;

    const [scrollData, setScrollData] = useState({
        x: 0,
        y: 0
    });

    const eventHandlerScroll = (e) => {
        const doc = document.documentElement;
        const left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

        const res = {
            x: left,
            y: top
        };

        setScrollData(res);

        if (typeof handle === 'function') handle(res);
    }


    if (performanceName === 'debounce') windowScrollUpdate = debounce(eventHandlerScroll, parseFloat(performanceLimit));
    if (performanceName === 'throttle') windowScrollUpdate = throttle(eventHandlerScroll, parseFloat(performanceLimit));


    useEffect(() => {
        window.addEventListener('scroll', windowScrollUpdate);
        window.addEventListener('touchmove', windowScrollUpdate);

        return () => {
            window.removeEventListener('scroll', windowScrollUpdate);
            window.removeEventListener('touchmove', windowScrollUpdate);
        };
    }, []);

    return [scrollData, windowScrollUpdate];
};


export default useWindowScroll;

