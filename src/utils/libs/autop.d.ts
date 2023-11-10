/**
 * Text Auto Paragraph
 *
 * @reference: https://developer.wordpress.org/reference/functions/wpautop/
 * @param {String} pee  - The text which has to be formatted. Characters entered, including "Enter" but not <p>, <br> tags
 * @param {?Boolean} br - If set, this will convert all remaining line breaks after paragraphing.
 *                        Line breaks within <script>, <style>, and <svg> tags are not affected.
 * @return {String}     - Text which has been converted into correct paragraph tags.
 */
export function autop(pee: string, br?: boolean | null): string;
/**
 * Undo autop
 *
 * @param {String} str  - The text which has to be formatted. Characters entered, including "Enter" but not <p>, <br> tags
 */
export function reverseAutop(str: string): string;
