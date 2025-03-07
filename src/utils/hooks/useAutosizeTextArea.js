/**
 * Creating a Textarea with dynamic height
 * 
 * @usage:
 * 
 * const App = () => {
 *     const [value, setValue] = useState("");
 *     const el = useRef(null);
 * 
 *     const { reset } = useAutosizeTextArea({
 *         el: el.current, 
 *         value: value,
 *         cb: (res) => {
 *             console.log('dimensions: ', res);
 *         }
 *     });
 * 
 *     useImperativeHandle(
 *         contentRef,
 *         () => ({
 *             resetHeight: () => {
 *                 reset();
 *             },
 *         }),
 *         [contentRef, reset]
 *     );
 * 
 *     const handleChange = (evt) => {
 *         const val = evt.target?.value;
 *         setValue(val);
 *     };
 * 
 *     const handleReset = () => {
 *         reset();
 *     };
 * 
 *     return (
 *         <div className="App">
 *             <textarea
 *                 onChange={handleChange}
 *                 ref={el}
 *                 rows={3}
 *                 value={value}
 *             />
 *         </div>
 *     );
 * };
 */

import { useEffect, useState, useCallback } from "react";


const useAutosizeTextArea = ({
    el,
    value,
    maxHeight = 0,
    cb
}) => {

    const [defaultRowHeightInit, setDefaultRowHeightInit] = useState(false);

    // Reset function to restore default height
    const reset = useCallback(() => {
        if (!el) return;
        
        const scrollHeight = el.scrollHeight;
        el.style.height = scrollHeight + "px";
        
        // Get current dimensions after reset
        const style = window.getComputedStyle(el);
        const _controlWidth = el.scrollWidth + parseInt(style.borderLeftWidth) + parseInt(style.borderRightWidth);
        cb?.([_controlWidth, scrollHeight]);
    }, [el, cb]);

    useEffect(() => {
        if (!el) return;

        // Initialize default height
        if (!defaultRowHeightInit) {
            el.style.height = 'auto';
            const initialHeight = el.scrollHeight;
            setDefaultRowHeightInit(true);

            // If the height is 0, set it to "auto"
            if (initialHeight === 0) {
                el.style.height = "auto";
            } else {
                el.style.height = initialHeight + "px";
            }

        }

        // Get dimensions
        const style = window.getComputedStyle(el);
        const _controlWidth = el.scrollWidth + parseInt(style.borderLeftWidth) + parseInt(style.borderRightWidth);

        // Calculate height
        el.style.height = 'auto';
        let finalHeight = el.scrollHeight;
        
        // Apply max height limit if needed
        if (maxHeight > 0 && finalHeight > maxHeight) {
            finalHeight = maxHeight;
        }

        // Set final height
        // If the height is 0, set it to "auto"
        if (finalHeight === 0) {
            el.style.height = "auto";
        } else {
            el.style.height = finalHeight + "px";
        }


        // Callback
        cb?.([_controlWidth, finalHeight]);

    }, [el, value, maxHeight, defaultRowHeightInit]);

    return { reset };
};

export default useAutosizeTextArea;