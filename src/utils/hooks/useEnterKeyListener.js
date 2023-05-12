/**
 * Run a handle using Enter key
 */
import { useEffect } from "react";

const useEnterKeyListener = ({ el, ctrl = false, alt= false }) => {
    useEffect(() => {

        const handlePressEnter = () => {
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

            if ( ctrl ) {
                if ( (event.code === "Enter" || event.code === "NumpadEnter") && event.ctrlKey ) {
                    handlePressEnter();
                }
            } else if ( alt ) {
                if ( (event.code === "Enter" || event.code === "NumpadEnter") && event.altKey ) {
                    handlePressEnter();
                } 
            } else {
                if (event.code === "Enter" || event.code === "NumpadEnter") {
                    handlePressEnter();
                }
            }

        };

        document.addEventListener("keydown", listener);

        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [el, ctrl, alt]);

};

export default useEnterKeyListener;


