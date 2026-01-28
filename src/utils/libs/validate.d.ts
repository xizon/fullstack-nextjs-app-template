/**
 * Fix And Parse JSON (Support for handling complex escape JSON strings)
 * @desc recursively fix top-level key/value (recursively handles when encountering top-level values that are objects/arrays)
 * @private
 */
/**
 * Fix And Parse JSON (Support for handling complex escape JSON strings)
 * @desc recursively fix top-level key/value (recursively handles when encountering top-level values that are objects/arrays)
 * @private
 */
interface ParseResult {
    success: boolean;
    data?: any;
    error?: string;
    details?: string;
}
declare function fixAndParseJSON(input: string): ParseResult;
declare function isJSON(input: any): boolean;
declare function isValidNumeric(str: unknown): boolean;
declare function isEmpty(input: string | string[]): boolean;
declare function isNumber(input: string): boolean;
declare function isInt(input: string): boolean;
declare function isEmail(input: string): boolean;
declare function isTel(input: string): boolean;
declare function isMobile(input: string): boolean;
export { fixAndParseJSON, isValidNumeric, isJSON, isEmpty, isNumber, isInt, isEmail, isTel, isMobile };
