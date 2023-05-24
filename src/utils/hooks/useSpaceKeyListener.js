/**
 * Run a handle using Space key
 */
import { useEffect } from "react";

const useSpaceKeyListener = ({ el, alt = false, system = '__useSpaceKeyListener' }) => {
    useEffect(() => {

        const handlePressSpace = () => {
            const mouseClickEvents = ["mousedown", "click", "mouseup"];
            function simulateMouseClick(element) {
                if ( element === null ) return;

                mouseClickEvents.forEach((mouseEventType) =>
                    element.dispatchEvent(
                        new MouseEvent(mouseEventType, {
                            view: window,
                            bubbles: true,
                            cancelable: true,
                            buttons: 1
                        })
                    )
                );
            }

            const element = document.querySelector(el);
            simulateMouseClick(element);
        };

        const listener = (event) => {

            // Do not use `stopImmediatePropagation()` here, 
            // otherwise other hooks that listen for Enter key may not work
            if ( alt ) {
                if ( (event.code === "Space") && event.altKey ) {
                    handlePressSpace();
                }
            } else {
                if (event.code === "Space") {
                    handlePressSpace();
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
    }, [el, alt]);

};

export default useSpaceKeyListener;


