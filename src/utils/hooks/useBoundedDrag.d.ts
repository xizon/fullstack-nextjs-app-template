export interface TouchOffset {
    x: number;
    y: number;
}
export interface BoundedDragOptions {
    dragMode?: 'handle' | 'block';
    boundarySelector?: string;
    itemSelector?: string;
    dragHandleSelector?: string;
    onDragStart?: (index: number) => void;
    onDragOver?: (dragIndex: number | null, dropIndex: number | null) => void;
    onDragUpdate?: (dragIndex: number | null, dropIndex: number | null) => void;
    onDragEnd?: (dragIndex: number | null, dropIndex: number | null) => void;
}
export declare const useBoundedDrag: (options?: BoundedDragOptions) => {
    isDragging: boolean;
    dragHandlers: {
        handleDragStart: (e: React.DragEvent | React.TouchEvent, position: number) => false | undefined;
        handleDragOver: (e: React.DragEvent | React.TouchEvent) => void;
        handleDragEnd: (e: React.DragEvent | React.TouchEvent) => void;
    };
};
export default useBoundedDrag;
