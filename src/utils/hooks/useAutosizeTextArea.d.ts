export default useAutosizeTextArea;
declare function useAutosizeTextArea({ el, value, maxHeight, cb }: {
    el: any;
    value: any;
    maxHeight?: number;
    cb: any;
}): {
    reset: () => void;
};
