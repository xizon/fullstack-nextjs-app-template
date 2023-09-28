export interface CustomWindow extends Window {
    io?: any;
}
/*
declare global {
    interface Window {
        io?: any;
    }
}

or:

declare const window: CustomWindow;
*/

