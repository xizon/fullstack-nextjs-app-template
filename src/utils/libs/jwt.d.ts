/**
 * JWT
 */
export const JWT_SECRET: "abC123!";
export const JWT_EXPIRES_IN: number;
export function sign(payload: any, privateKey: any, header: any): string;
export function decode(token: any): any;
export function verify(token: any, privateKey: any): any;
