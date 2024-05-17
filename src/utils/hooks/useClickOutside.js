/**
 * Handles the event of clicking outside of the wrapped component
 * 
 * @usage:

const App = () => {

    const [show, setShow] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useClickOutside({
        enabled: show && dropdownRef.current,
        isOutside: (event: any) => {
            return event.target.closest(`.test__wrapper`) === null && event.target.closest(`.test__wrapper2`) === null;
        },
        handle: (event: any) => {
            // do something
            //...
        },
        spyElement: document
    }, [show, dropdownRef]);
};


 */

import { useEffect, useRef } from 'react';


function useClickOutside({
    enabled,
    isOutside,
    handle,
    spyElement
}, deps) {
    const isOutsideRef = useRef(isOutside);
    const handleRef = useRef(handle);

    useEffect(() => {
        isOutsideRef.current = isOutside;

        // fix possible issue if clicking on a focusable element
        handleRef.current = handle;  
    }, [isOutside, handle]);

    useEffect(() => {
        if (enabled) {
            const eventHandler = (event) => {

                let _isOutsideRef;
                if ( (_isOutsideRef = isOutsideRef.current) !== null && _isOutsideRef !== void 0 && _isOutsideRef.call(isOutsideRef, event) ) {
                    let _handleRef;
                    (_handleRef = handleRef.current) === null || _handleRef === void 0 || _handleRef.call(handleRef, event);
                }
            };

            if (spyElement) {
                spyElement.addEventListener('pointerdown', eventHandler);

                return () => {
                    spyElement.removeEventListener('pointerdown', eventHandler);
                };
            }


        }
    }, [enabled].concat(deps));
}


export default useClickOutside;

