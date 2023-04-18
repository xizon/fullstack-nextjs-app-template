/**
 * Simulating a Tab Key Press using Enter key
 */
import { useEffect } from "react";

const useEnterKeyDispatchTabListener = ({ el = 'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])', ctrl = false }) => {


    useEffect(() => {
        const listener = (event) => {

            // prevent event handler twice
            event.stopImmediatePropagation();

            if ( ctrl ) {
                if ( (event.code === "Enter" || event.code === "NumpadEnter") && event.ctrlKey ) {
                    handleDispatchTab();
                }
            } else {
                if (event.code === "Enter" || event.code === "NumpadEnter") {
                    handleDispatchTab();
                    
                }
            }

        };

        document.addEventListener("keydown", listener);

        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);


    // Method to find the next element to focus and change the focus to that element
    const handleDispatchTab = () => {
        const tabElements = Array.from(document
            .querySelectorAll(el))
            .reduce((prev, next) => {
                return next.tabIndex > 0
                    ? [[...prev[0], next], prev[1]]
                    : [prev[0], [...prev[1], next]];
            }, [[], []])
            .reduce((prev, next) => ([...prev, ...next.sort((a, b) => a.tabIndex === 0 ? -1 : a.tabIndex > b.tabIndex ? -1 : 1)]), [])
            .reverse();

        
        const currentIndex = tabElements.findIndex((e) => e === document.activeElement);

        console.log(currentIndex);

        // get the next element in the list, "%" will loop around to 0
        const nextIndex = (currentIndex + 1) % tabElements.length;
        tabElements[nextIndex].focus();
    }

};

export default useEnterKeyDispatchTabListener;


