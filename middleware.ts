/**
 * Middleware allows you to run code before a request is completed, 
 * then based on the incoming request, you can modify the response by rewriting, 
 * redirecting, adding headers, or setting cookies.
 * @https://nextjs.org/docs/advanced-features/middleware
 */
import { NextResponse } from 'next/server';

export function middleware(req) {

    const { pathname } = req.nextUrl;
    const authCookie = req.cookies.get('SITE_DATA_LOGIN_COOKIE');

    // Determine whether you have permission to enter the dashboard
    // If you use Docker, please do not directly use the server jump `/`
    // such as: /dir/mypage@admin
    //----------------------------------------------------------------
    // if (
    //     /\/\d+\/(.*?)\@admin/.test(pathname) ||
    // ) {

    // }


    //----------------------------------------------------------------
    if (pathname.startsWith('/dashboard')) {
        // If user is not logged in, return login component
        if (!authCookie) return NextResponse.redirect(new URL("/sign-in.html", req.nextUrl));
    }



    //----------------------------------------------------------------
    const response = NextResponse.next();
    if (authCookie !== undefined) {
        response.headers.set('Authorization', `JWT ${authCookie.value}`);
    }

    return response;
}