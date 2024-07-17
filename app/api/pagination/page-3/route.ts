import { NextResponse } from "next/server";


type Data = {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: any[];
}

const callback = {
    "page": 3,
    "per_page": 5,
    "total": 13,
    "total_pages": 3,
    "data": [
        {
            "id": 11,
            "email": "george.bluth@reqres.in",
            "name": "George(page 3)",
            "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpa3t7ejo6OcnJyqqqq+vr7FxcWxsbHaW6/4AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABGElEQVRoge3WPW4CMRAFYPO3u2VeWAJlVskBcE4AKaCFSIiW3GAXRSglUYKUY8f20FH6FSne10z3ZI/Gs+uciIiIiIiIiIj8B0/L+o0U9YxgRYnqI3lkZHWW9cDI8pi1R4+aEFUCrXMV5ZIVZrF4bPKzRpjG0mCRnzXEPJYOd/lZPbtcj5HV4WxlkZ/1+dvG0thVKbwdj6FKU0Zx8rjnJBW0t21ZpGPZufbErJrW+x/w5qv0nGWYfGBCy6owpmUVjCV92aUSVnV+lr9mMLK29qhLxh0bHGLpM3p/3asD+xzlGWIdyztjVkdpSIsl4w2FYXhpT1tY2zJ92b8JoV2x68mZkRUmLHilRLnym/ePKSIiIiIiIiJy4w8JSB6Ch2nMZwAAAABJRU5ErkJggg=="
        },
        {
            "id": 12,
            "email": "janet.weaver@reqres.in",
            "name": "Janet(page 3)",
            "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpa3t7ejo6OcnJyqqqq+vr7FxcWxsbHaW6/4AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABGElEQVRoge3WPW4CMRAFYPO3u2VeWAJlVskBcE4AKaCFSIiW3GAXRSglUYKUY8f20FH6FSne10z3ZI/Gs+uciIiIiIiIiIj8B0/L+o0U9YxgRYnqI3lkZHWW9cDI8pi1R4+aEFUCrXMV5ZIVZrF4bPKzRpjG0mCRnzXEPJYOd/lZPbtcj5HV4WxlkZ/1+dvG0thVKbwdj6FKU0Zx8rjnJBW0t21ZpGPZufbErJrW+x/w5qv0nGWYfGBCy6owpmUVjCV92aUSVnV+lr9mMLK29qhLxh0bHGLpM3p/3asD+xzlGWIdyztjVkdpSIsl4w2FYXhpT1tY2zJ92b8JoV2x68mZkRUmLHilRLnym/ePKSIiIiIiIiJy4w8JSB6Ch2nMZwAAAABJRU5ErkJggg=="
        },
        {
            "id": 13,
            "email": "emma.wong@reqres.in",
            "name": "Emma(page 3)",
            "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpa3t7ejo6OcnJyqqqq+vr7FxcWxsbHaW6/4AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABGElEQVRoge3WPW4CMRAFYPO3u2VeWAJlVskBcE4AKaCFSIiW3GAXRSglUYKUY8f20FH6FSne10z3ZI/Gs+uciIiIiIiIiIj8B0/L+o0U9YxgRYnqI3lkZHWW9cDI8pi1R4+aEFUCrXMV5ZIVZrF4bPKzRpjG0mCRnzXEPJYOd/lZPbtcj5HV4WxlkZ/1+dvG0thVKbwdj6FKU0Zx8rjnJBW0t21ZpGPZufbErJrW+x/w5qv0nGWYfGBCy6owpmUVjCV92aUSVnV+lr9mMLK29qhLxh0bHGLpM3p/3asD+xzlGWIdyztjVkdpSIsl4w2FYXhpT1tY2zJ92b8JoV2x68mZkRUmLHilRLnym/ePKSIiIiIiIiJy4w8JSB6Ch2nMZwAAAABJRU5ErkJggg=="
        }
    ]
};

// To handle a GET request to /api/pagination/page-3
export async function GET(req) {
    return NextResponse.json(callback, {
        status: 200
    });
}


// To handle a POST request to /api/pagination/page-3
export async function POST(req) {
    return NextResponse.json(callback, {
        status: 200
    });
}


