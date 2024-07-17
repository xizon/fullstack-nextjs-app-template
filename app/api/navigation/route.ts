import { NextResponse } from "next/server";

const callback = {
    "data": [
        {
            title: "Home",
            icon: false,
            link: "/"
        },
        {
            title: "About",
            icon: false,
            link: "/about.html"
        },
        {
            title: "Nested Routes",
            icon: false,
            link: "/nested-routes.html"
        },
        {
            title: "Markdown Render",
            icon: false,
            link: "/md-render.html"
        },
        {
            title: "Posts",
            icon: false,
            link: "/posts.html"
        },
        {
            title: "Request Cache",
            icon: false,
            link: "/request.ajax.html"
        },
        {
            title: "Pagination",
            icon: false,
            link: "/pagination/1.html"
        },
        {
            title: "Sign In",
            icon: false,
            link: "/sign-in.html"
        },
        {
            title: "Dashboard",
            icon: false,
            link: "/dashboard/index.html"
        }
    ],
    "message": "OK",
    "code": 200
};

// To handle a GET request to /api/navigation
export async function GET(req) {
    return NextResponse.json(callback, {
        status: 200
    });
}


// To handle a POST request to /api/navigation
export async function POST(req) {
    return NextResponse.json(callback, {
        status: 200
    });
}
