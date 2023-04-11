// submit a form using Enter key
import { useEffect } from "react";

const useEnterKeyListener = ({ el }) => {
    useEffect(() => {
        const listener = (event) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                handlePressEnter();
            }
        };

        document.addEventListener("keydown", listener);

        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);

    const handlePressEnter = () => {
        const mouseClickEvents = ["mousedown", "click", "mouseup"];
        function simulateMouseClick(element) {
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
};

export default useEnterKeyListener;


