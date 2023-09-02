/**
 * Class Multiple inheritance
 * @param {Constructor} BaseClass      - Parent Classes
 * @returns Constructor
 */
export function multipleClasses(...mixins: any[]): (Base: any) => any;
