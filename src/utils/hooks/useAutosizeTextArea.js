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
    const [defaultRowHeight, setDefaultRowHeight] = useState(0);
    const [defaultRowHeightInit, setDefaultRowHeightInit] = useState(false);

    // Reset function to restore default height
    const reset = useCallback(() => {
        if (el && defaultRowHeight > 0) {
            el.style.height = defaultRowHeight + "px";
            
            // Get current dimensions after reset
            const style = el.currentStyle || window.getComputedStyle(el);
            const _controlWidth = el.scrollWidth + parseInt(style.borderLeftWidth) + parseInt(style.borderRightWidth);
            cb?.([_controlWidth, defaultRowHeight]);
        }
    }, [el, defaultRowHeight, cb]);

    useEffect(() => {
        if (el) {
            const style = el.currentStyle || window.getComputedStyle(el);
            const _controlWidth = el.scrollWidth + parseInt(style.borderLeftWidth) + parseInt(style.borderRightWidth);

            // initialize default row height
            if (el.scrollHeight > 0 && !defaultRowHeightInit) {
                setDefaultRowHeight(el.scrollHeight + parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth));
                setDefaultRowHeightInit(true);
            }

            // restore default row height
            if (defaultRowHeight > 0) {
                el.style.height = defaultRowHeight + "px";
            }

            // reset the height momentarily to get the correct scrollHeight for the textarea
            const scrollHeight = el.scrollHeight;

            // then set the height directly, outside of the render loop
            // Trying to set this with state or a ref will product an incorrect value.

            // !!! Compare initial height and changed height
            if (scrollHeight > defaultRowHeight && defaultRowHeight > 0) {
                if (maxHeight != 0 && scrollHeight >= maxHeight) {
                    el.style.height = maxHeight + "px";
                } else {
                    el.style.height = scrollHeight + "px";
                }
            }

            cb?.([_controlWidth, scrollHeight]);
        }
    }, [el, value]);

    return { reset };
};

export default useAutosizeTextArea; 