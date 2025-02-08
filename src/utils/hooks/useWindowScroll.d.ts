export default useWindowScroll;
declare function useWindowScroll({ performance, handle }: {
    performance: any;
    handle: any;
}): (((...args: any[]) => void) | {
    x: number;
    y: number;
})[];
