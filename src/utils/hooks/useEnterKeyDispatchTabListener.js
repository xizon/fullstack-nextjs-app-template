/**
 * Simulating a Tab Key Press using Enter key
 */
import { useEffect } from "react";

const useEnterKeyDispatchTabListener = ({ el = 'a:not([tabindex="-1"]), button:not([tabindex="-1"]), input, textarea, select, details,[tabindex]:not([tabindex="-1"])', ctrl = false, system = '__useEnterKeyDispatchTabListener' }) => {


    useEffect(() => {


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
                .reverse()
                .filter( el => {
                    return el.tabIndex >= 0 && el.type !== 'hidden';
                });

            const currentIndex = tabElements.findIndex((e) => e === document.activeElement);


            // get the next element in the list, "%" will loop around to 0
            const nextIndex = (currentIndex + 1) % tabElements.length;
            tabElements[nextIndex].focus();
        }


        const listener = (event) => {

            // Do not use `stopImmediatePropagation()` here, 
            // otherwise other hooks that listen for Enter key may not work
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


        // Using "window" object to prevent duplicate keyboard events
        if ( ! window[system] ) {
            document.removeEventListener("keydown", listener);
            document.addEventListener("keydown", listener);
            window[system] = true;
        }
        

        return () => {

            // When using the ".js" file of custom page to mount the CORE PROGRAM, 
            // it is necessary to prevent repeated keyboard events
            if ( ! window['CORE_PROGRAM'] ) window[system] = undefined;

            //
            document.removeEventListener("keydown", listener);
        };
    }, [el, ctrl]);


};

export default useEnterKeyDispatchTabListener;


