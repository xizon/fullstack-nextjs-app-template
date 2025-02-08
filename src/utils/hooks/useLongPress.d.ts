export default useLongPress;
declare function useLongPress(onLongPress: any, onClick: any, onLeave: any, onHover: any, { shouldPreventDefault, delay }?: {
    shouldPreventDefault?: boolean;
    delay?: number;
}): {
    onMouseDown: (e: any) => void;
    onTouchStart: (e: any) => void;
    onMouseOver: (e: any) => void;
    onMouseUp: (e: any) => void;
    onMouseLeave: (e: any) => void;
    onTouchEnd: (e: any) => void;
};
