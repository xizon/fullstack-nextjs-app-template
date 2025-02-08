export function useBoundedDrag(options?: {}): {
    isDragging: boolean;
    dragHandlers: {
        handleDragStart: (e: any, position: any) => boolean;
        handleDragOver: (e: any) => void;
        handleDragEnd: (e: any) => void;
    };
};
export default useBoundedDrag;
