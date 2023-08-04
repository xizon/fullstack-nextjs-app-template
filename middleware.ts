/**
 * Middleware allows you to run code before a request is completed, 
 * then based on the incoming request, you can modify the response by rewriting, 
 * redirecting, adding headers, or setting cookies.
 * @https://nextjs.org/docs/advanced-features/middleware
 */
import { NextResponse } from 'next/server';

export function middleware(req) {

    const { pathname } = req.nextUrl;

    // Determine whether you have permission to enter the dashboard

    //----------------------------------------------------------------
    // if (
    //     pathname === '/' ||
    //     /\/\d+\/(.*?)-management/.test(pathname)
    // ) {
       
    // }


    //----------------------------------------------------------------
    if (pathname.startsWith('/dashboard')) {
        // If user is not logged in, return login component
        const authCookie = req.cookies.get('SITE_DATA_LOGIN_COOKIE');
        if (!authCookie) return NextResponse.redirect(new URL("/sign-in.html", req.nextUrl));
    }



    //----------------------------------------------------------------
    return NextResponse.next();

}