export function getFilesFromHead(str: any): {
    scriptUrl: any[];
    styleUrls: any[];
    scriptUrls?: undefined;
} | {
    scriptUrls: string[];
    styleUrls: string[];
    scriptUrl?: undefined;
};
export function getBodyCode(str: any): "" | {
    bodyContent: string;
};
