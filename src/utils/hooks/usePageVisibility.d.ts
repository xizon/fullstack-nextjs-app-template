declare type VisibilityCallback = () => void;
declare type UsePageVisibility = (onVisible?: VisibilityCallback, onHidden?: VisibilityCallback, onPageInit?: VisibilityCallback) => void;
declare const usePageVisibility: UsePageVisibility;
export default usePageVisibility;
export { usePageVisibility };
