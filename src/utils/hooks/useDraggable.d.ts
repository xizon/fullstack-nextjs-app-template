export default useDraggable;
declare function useDraggable({ enabled, preventOutsideScreen, onStart, onStop, onDrag }: {
    enabled: any;
    preventOutsideScreen: any;
    onStart: any;
    onStop: any;
    onDrag: any;
}): {
    dragContentHandle: (nodeEle: any) => void;
    dragHandle: (nodeEle: any) => void;
    resetPosition: () => void;
};
